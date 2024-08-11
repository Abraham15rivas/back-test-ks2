import validatorRequest from '../../helpers/validatorRequest.js';
import { getModel, getTransaction } from '../../config/database/connection.js';
import { success, serverError, validationError } from '../../helpers/apiResponses.js';

const User = getModel('user')

const handlerError = (error) => {
  const detectedError = (error.errors.length) ? error.errors[0] : error.parent
  const message = `${detectedError?.type ?? 'Validation error'}`
  let customMessage = null
  const data = []

  if (detectedError?.path === 'email') {
    customMessage = 'Make sure you have a valid email address that is unique.'
  }

  if (detectedError?.path === 'name') {
    customMessage = `The name field must have a length within the character range, minimum: ${detectedError.validatorArgs[0]} and maximum: ${detectedError.validatorArgs[1]}.`
  }

  if (detectedError?.path && detectedError?.message) {
    data.push(`${detectedError.path}: ${detectedError.message}`)
  } else if (detectedError?.detail) {
    data.push(detectedError.detail)
  }

  if (customMessage) data.push(customMessage)

  return { message, data }
}

export const listUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'name', 'email', 'createdAt', 'updatedAt']
    })

    return success(res, 'User list', 200, users)
  } catch (error) {
    return serverError(res, error)
  }
}

export const showUser = async (req, res) => {
  try {
    const userId = req.params.id

    const user = await User.findOne({
      attributes: ['id', 'name', 'email', 'createdAt', 'updatedAt'],
      where: {
        id: userId
      }
    })

    if (user) {
      return success(res, 'User', 200, user)
    }

    return success(res, 'User not found', 404)
  } catch (error) {
    return serverError(res, error)
  }
}

export const createUser = async (req, res) => {
  const transaction = await getTransaction()

  try {
    const params = req.body
    const validation = validatorRequest({
      name: 'required',
      email: 'required'
    }, params)

    if (!validation.success) {
      return validationError(res, 'Validation error', validation.data)
    }

    const user = await User.create({
      name: params.name,
      email: params. email
    }, { transaction: transaction })

    await transaction.commit()

    return success(res, 'User successfully registered', 200, user)
  } catch (error) {
    await transaction.rollback()

    if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
      const { message, data } = handlerError(error)
      return validationError(res, message, data)
    }

    return serverError(res, error)
  }
}

export const updateUser = async (req, res) => {
  const transaction = await getTransaction()

  try {
    const params = { ...req.body, ...req.params }

    const validation = validatorRequest({
      id: 'required',
      name: 'required',
      email: 'required'
    }, params)

    if (!validation.success) {
      return validationError(res, 'Validation error', validation.data)
    }

    const user = await User.update({
      name: params.name,
      email: params.email
    }, {
      where: {
        id: params.id
      }
    }, { transaction: transaction })

    await transaction.commit()

    if (user[0]) {
      return success(res, 'User successfully updated', 200)
    }

    return success(res, 'User not found', 404)
  } catch (error) {
    console.log(error)
    await transaction.rollback()

    if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
      const { message, data } = handlerError(error)
      return validationError(res, message, data)
    }

    return serverError(res, error)
  }
}

export const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id

    const user = await User.destroy({
      where: {
        id: userId
      }
    })

    if (user) {
      return success(res, 'User successfully deleted', 200)
    }

    return success(res, 'User not found', 404)
  } catch (error) {
    return serverError(res, error)
  }
}