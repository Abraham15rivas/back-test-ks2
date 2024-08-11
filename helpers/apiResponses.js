export const success = (callback, message, code = 200, data = []) => {
  const result = {
    success: true,
    message,
    data
  }
  return callback.status(code).json(result)
}

export const serverError = (callback, error) => {
  const result = {
    success: false,
    message: 'Internal server error',
    error
  }
  return callback.status(500).json(result)
}

export const validationError = (callback, message, data = []) => {
  const result = {
    success: false,
    message,
    data
  }
  return callback.status(403).json(result)
}