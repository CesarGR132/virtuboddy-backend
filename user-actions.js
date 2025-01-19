import { HfInference } from '@huggingface/inference'
import { config } from 'dotenv'
import nodemailer from 'nodemailer'

config()

const hf = new HfInference(process.env.HF_ACCESS_TOKEN)

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
})

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

  static async sendEmail ({ text, recipient, subject }) {
    if (!recipient) {
      throw new Error('No recipient defined')
    }

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: recipient,
      subject,
      html: `<p>${text}</p>`
    }

    try {
      const info = await transporter.sendMail(mailOptions)
      console.log('Email sent successfully:', info.response)
      return info.messageId
    } catch (error) {
      console.error('Error sending email:', error)
      return error.message
    }
  }
}
