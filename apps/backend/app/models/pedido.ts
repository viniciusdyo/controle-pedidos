import { PedidoSchema } from '#database/schema'
import { belongsTo, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Cliente from './cliente.ts'
import PedidoItem from './pedido_item.ts'
import type Produto from './produto.ts'

export default class Pedido extends PedidoSchema {
  @belongsTo(() => Cliente)
  declare cliente: BelongsTo<typeof Cliente>

  @hasMany(() => PedidoItem)
  declare pedidoItens: HasMany<typeof PedidoItem>

  adicionarItem(produto: Produto, quantidade: number) {
    if (produto.valorUnidade <= 0) {
      throw new Error('O preço do produto a ser adicionado não pode ser menor ou igual a zero.')
    }

    if (produto.status === 'inativo') {
      throw new Error('O produto adicionado não pode estar inativo.')
    }

    const pedidoItem = new PedidoItem()
    pedidoItem.produtoId = produto.id
    pedidoItem.nome = produto.nome
    pedidoItem.valorUnidade = produto.valorUnidade
    pedidoItem.quantidade = quantidade

    const itensAtuais = this.pedidoItens ?? []

    this.$setRelated('pedidoItens', [...itensAtuais, pedidoItem])

    this.calcularValorTotal()
  }

  calcularValorTotal() {
    this.pedidoItens.forEach((item) => {
      this.valorTotal += item.valorUnidade
    })
  }
}
