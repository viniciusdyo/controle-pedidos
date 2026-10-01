import { PedidoItenSchema } from '#database/schema'
import { belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Pedido from './pedido.ts'

export default class PedidoItem extends PedidoItenSchema {
  public static table = 'pedido_itens'

  @belongsTo(() => Pedido)
  declare pedido: BelongsTo<typeof Pedido>
}
