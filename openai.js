import config from './config.js'
import fs from 'fs'
import { stringifySync } from 'subtitle'
import OpenAI from 'openai'

const openai = new OpenAI(config.openai)

export async function transcribe (fileName, prompt = '', outputFileName) {
  console.log('[OpenAI] Transcribing')
  const res = await openai.audio.transcriptions.create({
    file: fs.createReadStream(fileName),
    model: 'whisper-1',
    response_format: 'verbose_json',
    timestamp_granularities: ['word', 'segment'],
    prompt
  })
  const nodes = res.segments.map(s => ({
    type: 'cue',
    data: { start: s.start * 1000, end: s.end * 1000, text: s.text }
  }))
  const srt = stringifySync(nodes, { format: 'SRT' })
  if (outputFileName) fs.writeFileSync(outputFileName, srt)
  console.log('[OpenAI] Transcription Complete')
  return srt
}