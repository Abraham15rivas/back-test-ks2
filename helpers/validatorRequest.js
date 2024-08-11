const validatorRequest = (fields, params) => {
  try {
    let success = true
    const data = []

    for (let index = 0; index < Object.entries(fields).length; index++) {
      const field = Object.entries(fields)[index]
      const key = field[0]
      const value = field[1]

      if (value === 'required' && !params[key]) {
        data.push(`The ${key} field is required`)
        success = false
      }
    }

    return { success, data }
  } catch (error){
    console.log(error)
  }
}

export default validatorRequest
