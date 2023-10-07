import { cp, mkdir, rm } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import * as BundleJsRollup from '../BundleJsRollup/BundleJsRollup.js'
import * as Path from '../Path/Path.js'
import * as Replace from '../Replace/Replace.js'
import * as Root from '../Root/Root.js'

const bundleRendererProcess = async () => {
  await Replace.replace({
    path: 'dist/packages/renderer-process/src/parts/GetWorkerUrl/GetWorkerUrl.js',
    occurrence: `'../../../../renderer-worker/src/worker.js'`,
    replacement: `'../../renderer-worker/dist/worker.js'`,
  })
  await BundleJsRollup.bundleJs({
    cwd: Path.absolute('dist/packages/renderer-process'),
    from: 'src/index.js',
    codeSplitting: false,
    allowCyclicDependencies: false,
  })
}

const bundleRendererWorker = async () => {
  await BundleJsRollup.bundleJs({
    cwd: Path.absolute('dist/packages/renderer-worker'),
    from: 'src/worker.js',
    codeSplitting: false,
    allowCyclicDependencies: false,
  })
}

export const buildStatic = async () => {
  const dist = join(Root.root, 'dist')
  await rm(dist, { recursive: true, force: true })
  await mkdir(dist, { recursive: true })
  for (const folder of [
    'packages/renderer-process/src',
    'packages/renderer-worker/src',
    'packages/terminal-library/src',
  ]) {
    await mkdir(dirname(join(Root.root, 'dist', folder)), { recursive: true })
    await cp(join(Root.root, folder), join(dist, folder), { recursive: true })
  }
  await cp(join(Root.root, 'index.html'), join(dist, 'index.html'))
  await Replace.replace({
    path: 'dist/index.html',
    occurrence: 'renderer-process/src/index.js',
    replacement: 'renderer-process/dist/index.js',
  })
  await bundleRendererProcess()
  await bundleRendererWorker()
}
