import express from 'express'
import { PORT } from './config.js'
import { UserActions } from './user-actions.js'
import cors from 'cors'

const app = express()

app.use(cors())

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

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
