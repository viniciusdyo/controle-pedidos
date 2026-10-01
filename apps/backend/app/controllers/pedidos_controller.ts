// import type { HttpContext } from '@adonisjs/core/http'
import {
  atualizarStatusPedido,
  buscarPedidoPorId,
  criarPedidoValidator,
} from '#validators/pedido_validator'
import { inject } from '@adonisjs/core'
import { type HttpContext } from '@adonisjs/core/http'
import PedidoService from '../../services/pedido_service.ts'

@inject()
export default class PedidosController {
  constructor(private pedidoService: PedidoService) {}

  async store({ request, response }: HttpContext) {
    const pedidoPayload = await request.validateUsing(criarPedidoValidator)

    const pedido = await this.pedidoService.criarPedido(pedidoPayload)

    return response.created({
      sucesso: true,
      dados: pedido,
    })
  }

  async edit({ request, response }: HttpContext) {
    const atualizarPedidoPayload = await request.validateUsing(atualizarStatusPedido)

    const pedido = await this.pedidoService.atualizarStatusPedido(atualizarPedidoPayload)

    return response.ok({
      sucesso: true,
      dados: pedido,
    })
  }

  async index({ response }: HttpContext) {
    const pedidos = await this.pedidoService.listarPedidos()
    return response.ok({
      sucesso: true,
      dados: pedidos,
    })
  }

  async show({ params, response }: HttpContext) {
    const idPedido = await buscarPedidoPorId.validate(params)
    const pedido = await this.pedidoService.buscarPedidoPorId(idPedido)
    return response.ok({
      sucesso: true,
      dados: pedido,
    })
  }
}
