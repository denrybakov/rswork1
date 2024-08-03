
export const isValidPass = (textInput) => {
  const regexText = /^[A-Za-z0-9@._/]+$/
  return regexText.test(textInput)
}
