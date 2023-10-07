import * as ComputeCacheKey from '../ComputeCacheKey/ComputeCacheKey.js'

const locations = [
  '.nvmrc',
  'lerna.json',
  'package-lock.json',
  'packages/build/package-lock.json',
  'packages/renderer-process/package-lock.json',
  'packages/renderer-worker/package-lock.json',
  'packages/server/package-lock.json',
  '.github/workflows/ci.yml',
  '.github/workflows/pr.yml',
  '.github/workflows/release.yml',
]

const main = async () => {
  const hash = await ComputeCacheKey.computeCacheKey(locations)
  process.stdout.write(hash)
}

main()
