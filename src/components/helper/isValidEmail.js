export const isValidEmail = (textInput) => {
  const regexText = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  return regexText.test(textInput)
}
