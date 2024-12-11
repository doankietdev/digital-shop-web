class UIError {
  constructor(messages = [], statusCode) {
    if (statusCode) {
      this.statusCode = statusCode
    }
    this.messages = messages
  }
}

export default UIError
