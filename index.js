import { transcribe } from './openai.js'
import { extractAudio, replaceAudio } from './media.js'

async function main () {
  transcribe('./data/input.mp3', '', './data/transcribe.srt')
  await replaceAudio('./data/input.mp4', './data/input.mp3', './data/output.mp4')
  console.log('# Complete')
}

test()
