import {
  atualizarStatusPedido,
  buscarPedidoPorId,
  criarPedidoValidator,
} from '#validators/pedido_validator'
import { inject } from '@adonisjs/core'
import { type HttpContext } from '@adonisjs/core/http'
import type PedidoService from '../../services/pedido_service.ts'

@inject()
export default class PedidoController {
  constructor(private pedidoService: PedidoService) {}

  async criarPedido({ request, response }: HttpContext) {
    const pedidoPayload = await request.validateUsing(criarPedidoValidator)

    const pedido = await this.pedidoService.criarPedido(pedidoPayload)

    return response.created({
      sucesso: true,
      dados: pedido,
    })
  }

  async atualizarStatusPedido({ request, response }: HttpContext) {
    const atualizarPedidoPayload = await request.validateUsing(atualizarStatusPedido)

    const pedido = await this.pedidoService.atualizarStatusPedido(atualizarPedidoPayload)

    return response.ok({
      sucesso: true,
      dados: pedido,
    })
  }

  async listarTodosPedidos({ response }: HttpContext) {
    const pedidos = await this.pedidoService.listarPedidos()
    return response.ok({
      sucesso: true,
      dados: pedidos,
    })
  }

  async buscarPedidoPorId({ request, response }: HttpContext) {
    const buscarPedidoPorIdPayload = await request.validateUsing(buscarPedidoPorId)

    const pedido = await this.pedidoService.buscarPedidoPorId(buscarPedidoPorIdPayload)

    return response.ok({
      sucesso: true,
      dados: pedido,
    })
  }
}
