const startButton = document.getElementById('startButton')
const outputDiv = document.getElementById('output')

// Check for browser support
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition || window.msSpeechRecognition

if (SpeechRecognition) {
  const recognition = new SpeechRecognition()
  recognition.lang = 'en-US'
  recognition.interimResults = false
  recognition.maxAlternatives = 1

  let isListening = false

  recognition.onstart = () => {
    startButton.textContent = 'Stop Listening'
    isListening = true
  }

  recognition.onend = () => {
    startButton.textContent = 'Start Voice Input'
    isListening = false
  }

  recognition.onresult = (event) => {
    const text = event.results[0][0].transcript
    outputDiv.textContent = text
  }

  recognition.onerror = (event) => {
    outputDiv.textContent = 'Error occurred in recognition: ' + event.error
  }

  startButton.addEventListener('click', () => {
    if (isListening) {
      recognition.stop()
    } else {
      recognition.start()
    }
  })
} else {
  outputDiv.textContent = 'Speech Recognition API not supported in this browser.'
  startButton.disabled = true
}
