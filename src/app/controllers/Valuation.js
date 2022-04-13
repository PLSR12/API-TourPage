import * as Yup from 'yup'
import Valuation from '../models/Valuation'

class ValuationController {
  async store (request, response) {
    const schema = Yup.object().shape({
      valuation: Yup.string().required(),
      name: Yup.string().required()
    })

    try {
      await schema.validateSync(request.body, { abortEarly: false })
    } catch (erro) {
      return response.status(400).json({
        error: erro.errors
      })
    }

    const { valuation,name } = request.body

    const valuationClient = await Valuation.create({
      valuation,
      name
    })

    return response.json(valuationClient)
  }

  async index (request, response) {
    const valuationsClient = await Valuation.findAll()

    return response.json(valuationsClient)
  }
}

export default new ValuationController()
