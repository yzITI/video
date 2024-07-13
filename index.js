import { extractAudio, replaceAudio, denoiseAudio, normalizeAudio } from './media.js'

const videoFileName = '../Raw/video.mp4'
const audioFileName = '../Raw/audio.mp3'
const outputFileName = '../Raw/output.mp4'

async function main () {
  await extractAudio(videoFileName, audioFileName)
  await denoiseAudio(audioFileName, './temp.mp3')
  await normalizeAudio('./temp.mp3', audioFileName)
  await replaceAudio(videoFileName, audioFileName, outputFileName)
  console.log('# Complete')
}

main()
