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

Create temporary directory `/data` at the root level, and put your mp4 video file into it. Then modify the file names in `index.js` accordingly, as well as the prompting for speech-to-text.

Run the workflow:
```
node .
```
