import { cp, mkdir, rm } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')

const dist = join(root, 'dist')
await rm(dist, { recursive: true, force: true })
await mkdir(dist, { recursive: true })
for (const folder of [
  'packages/renderer-process/src',
  'packages/renderer-worker/src',
  'packages/terminal-library/src',
]) {
  await mkdir(dirname(join(root, 'dist', folder)), { recursive: true })
  await cp(join(root, folder), join(dist, folder), { recursive: true })
}
await cp(join(root, 'index.html'), join(dist, 'index.html'))
