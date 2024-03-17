# Video
Video processing for ITI video accounts

## Prerequisite

- Install `ffmpeg` and `ffprobe` (https://ffmpeg.org/download.html) and put them into `PATH`
- Install Nodejs (https://nodejs.org/en/download)

## Get Started

Install dependencies
```
npm i
```

Create `config.js` at the root level:

```js
export default {
  openai: {
    apiKey: 'Your OpenAI apiKey',
    baseURL: 'OpenAI endpoint' // optional
  }
}
```
