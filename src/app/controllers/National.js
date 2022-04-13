import * as Yup from 'yup'
import National from '../models/National'

class NationalController {
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

    const pack = await National.create({
      name,
      description,
      path,
      price
    })

    return response.json(pack)
  }

  async index (request, response) {
    const packs = await National.findAll()

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

    const packId = await National.findByPk(id)

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

    const pack = await National.update(
      {
        name,
        price,
        description,
        path
      },

      { where: { id } }
    )
    return response.json({message: "Atualizado com sucesso"})
  }
}

export default new NationalController()
