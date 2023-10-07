import { cp, mkdir, rm } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import * as Root from '../Root/Root.js'

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
}
