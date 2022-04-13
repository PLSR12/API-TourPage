import Sequelize from 'sequelize'

import International from '../app/models/International'
import National from '../app/models/National'
import Valuation from '../app/models/Valuation'

import configDataBase from '../config/database'

const models = [International, National, Valuation]

class Database {
  constructor () {
    this.init()
  }

  init () {
    this.connection = new Sequelize(configDataBase)
    models.map(model => model.init(this.connection))
  }
}

export default new Database()
