import { transcribe } from './openai.js'
import { extractAudio, replaceAudio, denoiseAudio, normalizeAudio } from './media.js'

const prompt = ''

const videoFileName = '../Raw/video.mp4'
const audioFileName = '../Raw/audio.mp3'
const outputFileName = '../Raw/output.mp4'
const subtitleFileName = '../Raw/subtitle.srt'

async function main () {
  await extractAudio(videoFileName, audioFileName)
  await denoiseAudio(audioFileName, './data/temp.mp3')
  await normalizeAudio('./data/temp.mp3', audioFileName)
  let promise = null
  try {
    promise = transcribe(audioFileName, prompt, subtitleFileName)
  } catch (e) { console.log(e) }
  await replaceAudio(videoFileName, audioFileName, outputFileName)
  await promise
  console.log('# Complete')
}

main()
