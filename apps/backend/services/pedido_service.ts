import BusinessRuleException from '#exceptions/business_rule_exception'
import Cliente from '#models/cliente'
import Pedido from '#models/pedido'
import Produto from '#models/produto'
import {
  type atualizarStatusPedido,
  type buscarPedidoPorId,
  type criarPedidoValidator,
} from '#validators/pedido_validator'
import db from '@adonisjs/lucid/services/db'
import { type Infer } from '@vinejs/vine/types'

type CriarPedidoPayload = Infer<typeof criarPedidoValidator>
type AtualizarStatusPedido = Infer<typeof atualizarStatusPedido>
type BuscarPedidoPorId = Infer<typeof buscarPedidoPorId>
export default class PedidoService {
  public async criarPedido(payload: CriarPedidoPayload) {
    const transacao = await db.transaction()

    try {
      let valorTotal = 0

      const pedidoItensSnapshot: Array<{
        produtoId: number
        nome: string
        valorUnidade: number
        quantidade: number
      }> = []

      const cliente = await Cliente.findOrFail(payload.clienteId, { client: transacao })

      for (const item of payload.pedidoItens) {
        const produto = await Produto.findOrFail(item.produtoId, { client: transacao })

        if (produto.status === 'inativo') {
          throw new BusinessRuleException(
            'O produtos inativos não podem ser inseridos no pedido.',
            { status: 400 }
          )
        }

        valorTotal += produto.valorUnidade * item.quantidade

        pedidoItensSnapshot.push({
          produtoId: produto.id,
          nome: produto.nome,
          valorUnidade: produto.valorUnidade,
          quantidade: item.quantidade,
        })
      }

      const pedido = new Pedido()
      pedido.clienteId = cliente.id
      pedido.valorTotal = valorTotal
      pedido.status = 'PENDENTE'
      pedido.cancelado = false

      pedido.useTransaction(transacao)
      await pedido.save()

      await pedido.related('pedidoItens').createMany(pedidoItensSnapshot)

      await transacao.commit()

      return pedido
    } catch (error) {
      await transacao.rollback()

      if (error instanceof BusinessRuleException) {
        throw error
      }
      throw new BusinessRuleException('Erro interno ao processar o pedido.', { status: 500 })
    }
  }

  public async atualizarStatusPedido(payload: AtualizarStatusPedido) {
    const transacao = await db.transaction()

    try {
      const pedido = await Pedido.findOrFail(payload.pedidoId, { client: transacao })

      pedido.status = payload.status

      pedido.useTransaction(transacao)
      await pedido.save()

      await transacao.commit()
      return pedido
    } catch (error) {
      await transacao.rollback()

      if (error instanceof BusinessRuleException) {
        throw error
      }

      throw new BusinessRuleException('Erro interno ao processar o pedido.', { status: 500 })
    }
  }

  public async listarPedidos() {
    const pedidos = await Pedido.query().preload('cliente').preload('pedidoItens')
    console.log('lista')
    return pedidos
  }

  public async buscarPedidoPorId(payload: BuscarPedidoPorId) {
    const id = payload.id

    console.log('PAYLOAD NO SERVICE:', payload)
    const pedido = await Pedido.query()
      .where('id', id)
      .preload('cliente')
      .preload('pedidoItens')
      .firstOrFail()

    return pedido
  }
}
