import { basename, join } from 'node:path'
import * as rollup from 'rollup'
import * as ExitCode from '../ExitCode/ExitCode.js'
import * as Process from '../Process/Process.js'

/**
 *
 * @param {{from:string,cwd:string, codeSplitting?:boolean, allowCyclicDependencies?:boolean, external?:string[] }} param0
 */
export const bundleJs = async ({
  cwd,
  from,
  codeSplitting = false,
  allowCyclicDependencies = false,
}) => {
  const plugins = []
  /**
   * @type {import('rollup').RollupOptions}
   */
  const inputOptions = {
    cache: false,
    input: join(cwd, from),
    preserveEntrySignatures: 'strict',
    treeshake: {
      propertyReadSideEffects: false,
      // moduleSideEffects: false,
    },
    perf: true,
    onwarn: (message) => {
      // fail build if circular dependencies are found
      if (message.code === 'CIRCULAR_DEPENDENCY') {
        if (message.ids && message.ids[0].includes('node_modules')) {
          return
        }
        if (allowCyclicDependencies) {
          console.warn(`RollUp: ${message.message}`)
        } else {
          console.error(`RollupError: Cyclic dependency detected`)
          console.error(message.message)
          Process.exit(ExitCode.Error)
        }
      } else {
        console.error(`RollUp: ${message.message} ${message.id || ''}`)
      }
    },
    plugins,
  }
  const result = await rollup.rollup(inputOptions)
  if (result.getTimings) {
    const timings = result.getTimings()
    console.log({ timings })
  }
  /**
   * @type {import('rollup').ModuleFormat}
   */
  let outputFormat = 'es'
  /**
   * @type {import('rollup').OutputOptions}
   */
  const outputOptions = {
    paths: {},
    sourcemap: true,
    format: outputFormat,
    name: 'rendererProcess',
    extend: false,
    dir: codeSplitting ? join(cwd, 'dist') : undefined,
    file: codeSplitting ? undefined : join(cwd, 'dist', basename(from)),
    entryFileNames: 'renderer-process.modern.js',
    exports: 'auto',
    sourcemapExcludeSources: true,
    chunkFileNames(x) {
      return `${x.name}.js`
    },
    freeze: false,
    inlineDynamicImports: !codeSplitting,
    minifyInternalExports: false,
    generatedCode: {
      constBindings: true,
      objectShorthand: true,
    },
    hoistTransitiveImports: false,
  }
  await result.write(outputOptions)
}
