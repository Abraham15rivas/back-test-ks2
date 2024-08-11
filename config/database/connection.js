import { Sequelize } from 'sequelize';

/* Models */
import User from '../../models/user.js';

/* Defined Models */
const modelDefiners = [
  User
]

const connectDB = () => {
  return new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    {
      dialect: 'postgres',
      host: process.env.DB_HOST
    }
  )
}

const dbConnection = connectDB()

// We define all models according to their files.
const defineModels = () => {
  for (const modelDefiner of modelDefiners) {
    modelDefiner(dbConnection)
  }
}

const checkTableExists = async (table) => {
  const queryInterface = dbConnection.getQueryInterface();
  const tables = await queryInterface.showAllTables();
  return tables.includes(`${table}`)
}

export const syncModel = async (listOfModelsToSync) => {
  try {
    defineModels()

    if (listOfModelsToSync.length) {
      for (const modelSync of listOfModelsToSync) {
        const tableExist = await checkTableExists(modelSync.table)

        if(tableExist) {
          console.log(`the ${modelSync.table} table already exists in the database`)
        } else {
          await dbConnection.models[modelSync.model].sync()
          console.log(`the ${modelSync.table} table was created successfully`)
        }
      }
    } else {
      await dbConnection.sync()
    }
  } catch (error) {
    console.log(error)
  }
}

export const getModel = (nameModel) => {
  try {
    defineModels()
    return dbConnection.models[nameModel]
  } catch (error) {
    console.log(error)
  }
}

export const getTransaction = async () => {
  try {
    defineModels()
    let transaction = await dbConnection.transaction()
    return transaction
  } catch (error) {
    console.log(error)
  }
}