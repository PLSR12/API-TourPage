import Sequelize, { Model } from 'sequelize'

class Valuation extends Model {
  static init(sequelize) {
    super.init(
      {
        valuation: Sequelize.STRING,
        name: Sequelize.STRING,
      },

      {
        sequelize,
      }
    )
    return this
  }
}

export default Valuation
