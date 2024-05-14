import config from './config.js'
import fs from 'fs'
import { stringifySync } from 'subtitle'
import OpenAI from 'openai'

const openai = new OpenAI(config.openai)

export async function transcribe (fileName, outputFileName, prompt = '') {
  console.log('[OpenAI] Transcribing')
  const res = await openai.audio.transcriptions.create({
    file: fs.createReadStream(fileName),
    model: 'whisper-1',
    response_format: 'verbose_json',
    timestamp_granularities: ['segment'], // 'word' does not work well
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

export async function analyze (fileName, outputFileName, prompt = '') {
  console.log('[OpenAI] Analyzing')
  const input = fs.readFileSync(fileName).toString()
  const completion = await openai.chat.completions.create({
    messages: [{ role: 'user', content: `Find transcribing mistakes in the subtitle file. Be sensitive and careful. A list of concepts: ${prompt}. Only output the suspicious keywords and their context:\n\n${input}` }],
    model: 'gpt-4o',
  })
  fs.writeFileSync(outputFileName, completion.choices[0].message.content)
  console.log(`[OpenAI] Analyzing Complete. Token Usage: ${completion.usage.prompt_tokens} + ${completion.usage.completion_tokens}`)
}
