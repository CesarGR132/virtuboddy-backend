import { HfInference } from '@huggingface/inference'
import { config } from 'dotenv'

config()

const hf = new HfInference(process.env.HF_ACCESS_TOKEN)

export class UserActions {
  static async summarize ({ text }) {
    const textSummarized = await hf.summarization({
      model: 'facebook/bart-large-cnn',
      inputs: text,
      parameters: {
        max_length: 50
      }
    })
    return textSummarized
  }
}
