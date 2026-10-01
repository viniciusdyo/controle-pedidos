import { criarClienteValidator, editarClienteValidator } from '#validators/cliente_validator'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import ClienteService from '../../services/cliente_service.ts'

@inject()
export default class ClientesController {
  constructor(private clienteService: ClienteService) {}

  async index({ response }: HttpContext) {
    const clientes = await this.clienteService.listarClientes()

    return response.ok({
      sucesso: true,
      dados: clientes,
    })
  }

  async store({ response, request }: HttpContext) {
    const clientePayload = await request.validateUsing(criarClienteValidator)

    const cliente = await this.clienteService.criarCliente(clientePayload)

    return response.created({
      sucesso: true,
      dados: cliente,
    })
  }
  async edit({ response, request }: HttpContext) {
    const clientePayload = await request.validateUsing(editarClienteValidator)

    const cliente = await this.clienteService.editarCliente(clientePayload)

    return response.ok({
      sucesso: true,
      dados: cliente,
    })
  }
}
