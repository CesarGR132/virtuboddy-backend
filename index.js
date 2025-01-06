import express from 'express'
import { PORT } from './config.js'
import { UserActions } from './user-actions.js'
import cors from 'cors'
import multer from 'multer'

const app = express()
const upload = multer()

app.use(cors({
  origin: 'http://localhost:3000'
}))

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/summarize', async (req, res) => {
  const { text } = req.body

  try {
    const textSummarized = await UserActions.summarize({ text })
    res.send(textSummarized)
  } catch (error) {
    res.status(500).send(error.message)
  }
})

app.post('/speech-to-text', upload.single('audio'), async (req, res) => {
  const { buffer } = req.file

  try {
    const text = await UserActions.SpeechToText({ audio: buffer })
    res.send(text)
  } catch (error) {
    console.log(error)
    res.status(500).send(error.message)
  }
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
