import * as Assert from '../Assert/Assert.js'

const toArray = (segments) => {
  const parts = []
  for (const segment of segments) {
    parts.push(segment.segment)
  }
  return parts
}

export const splitString = (string) => {
  Assert.string(string)
  if (string.length === 1) {
    return string
  }
  try {
    const segmenterDe = new Intl.Segmenter('en', {
      granularity: 'grapheme',
    })
    const segments = segmenterDe.segment(string)
    const parts = toArray(segments)
    return parts
  } catch {
    return string.split('')
  }
}
