import { Exception } from '@adonisjs/core/exceptions'
import { type HttpContext } from '@adonisjs/core/http'

export default class BusinessRuleException extends Exception {
  public async handle(error: this, ctx: HttpContext) {
    ctx.response.status(error.status).send({
      sucesso: false,
      erro: error.message,
    })
  }
}
