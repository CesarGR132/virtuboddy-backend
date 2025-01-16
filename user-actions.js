import { HfInference } from '@huggingface/inference'
import { config } from 'dotenv'
import nodemailer from 'nodemailer'

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

  static async sendEmail ({ email, text }) {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
      }
    })

    const mailOptions = {
      from: email,
      to: 'cesargabriel132@gmail.com',
      subject: 'Sending Email using Node.js',
      text
    }

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error)
      } else {
        console.log('Email sent: ' + info.response)
        return info.response
      }
    })
  }
}
