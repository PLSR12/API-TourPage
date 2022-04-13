import Sequelize, { Model } from 'sequelize'

class National extends Model {
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
            return `http://localhost:3001/national-file/${this.path}`
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

export default National
