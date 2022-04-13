import Sequelize, { Model } from 'sequelize'

class International extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        description: Sequelize.STRING,
        price: Sequelize.INTEGER,
        path: Sequelize.STRING,
        url: {
          type: Sequelize.VIRTUAL,
          get() {
            return `http://localhost:3001/international-file/${this.path}`
          },
        },
      },

      {
        sequelize,
      }
    )
    return this
  }
}

export default International 
