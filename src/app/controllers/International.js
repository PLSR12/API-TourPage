import * as Yup from 'yup'
import International from '../models/International'

class InternationalController {
  async store (request, response) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      description: Yup.string().required(),
      price: Yup.number().required()
    })

    try {
      await schema.validateSync(request.body, { abortEarly: false })
    } catch (erro) {
      return response.status(400).json({
        error: erro.errors
      })
    }

    const { filename: path } = request.file
    const { name, description, price } = request.body

    const pack = await International.create({
      name,
      description,
      path,
      price
    })

    return response.json(pack)
  }

  async index (request, response) {
    const packs = await International.findAll()

    return response.json(packs)
  }

  async update (request, response) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      description: Yup.string().required(),
      price: Yup.number().required()
    })

    try {
      await schema.validateSync(request.body, { abortEarly: false })
    } catch (erro) {
      return response.status(400).json({
        error: erro.errors
      })
    }

    const { id } = request.params

    const packId = await International.findByPk(id)

    if (!packId) {
      return response.status(401).json({
        error: 'Pack not found, verify your pack Id is correct.'
      })
    }

    let path
    if (request.file) {
      path = request.file.filename
    }

    const { name, description, price } = request.body

    const pack = await International.update(
      {
        name,
        price,
        description,
        path
      },

      { where: { id } }
    )
    return response.status(200).json({ name,price,description,path})
  }
}

export default new InternationalController()
