import ffmpeg from 'fluent-ffmpeg'

const run = (inputFileNames, options, outputFileName) => new Promise(r => {
  const cmd = ffmpeg()
  for (const f of inputFileNames) cmd.input(f)
  cmd.addOptions(options)
  cmd.on('progress', progress => {
    process.stdout.clearLine(0)
    process.stdout.cursorTo(0)
    process.stdout.write(`[FFmpeg] ${progress?.timemark}  ${progress?.percent?.toFixed(1)}%`)
  })
  cmd.on('end', () => {
    process.stdout.write('\n')
    r()
  })
  cmd.save(outputFileName)
})

// ffmpeg -i input.mp4 -q:a 0 -map a output.mp3
export function extractAudio (videoFileName, outputFileName) {
  console.log('[FFmpeg] Extracting audio from video')
  return run([videoFileName], ['-q:a 0', '-map a'], outputFileName)
}

// ffmpeg -i input.mp3 -af "highpass=50,lowpass=10000,afftdn" output.mp3
export function denoiseAudio (audioFileName, outputFileName) {
  console.log('[FFmpeg] Denoising audio')
  return run([audioFileName], ['-af highpass=50,lowpass=10000,afftdn'], outputFileName)
}

// ffmpeg -i input.mp3 -af loudnorm=I=-15:LRA=7:tp=-2 output.mp3
export function normalizeAudio (audioFileName, outputFileName) {
  console.log('[FFmpeg] Normalizing audio')
  return run([audioFileName], ['-af loudnorm=I=-15:LRA=7:tp=-2'], outputFileName)
}

// ffmpeg -i input.mp4 -i input.mp3 -c:v copy -map 0:v:0 -map 1:a:0 output.mp4
export function replaceAudio (videoFileName, audioFileName, outputFileName) {
  console.log('[FFmpeg] Replacing audio in video')
  return run([videoFileName, audioFileName], ['-c:v copy', '-map 0:v:0', '-map 1:a:0'], outputFileName)
}