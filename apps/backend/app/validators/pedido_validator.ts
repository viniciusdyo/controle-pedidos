import vine from '@vinejs/vine'

export const criarPedidoValidator = vine.create(
  vine.object({
    clienteId: vine.number(),
    status: vine.enum(['PENDENTE', 'EM-PREPARACAO', 'PRONTO', 'FINALIZADO']),
    pedidoItens: vine
      .array(
        vine.object({
          produtoId: vine.number(),
          quantidade: vine.number().min(1),
        })
      )
      .minLength(1),
  })
)

export const atualizarStatusPedido = vine.create(
  vine.object({
    pedidoId: vine.number(),
    status: vine.enum(['PENDENTE', 'EM-PREPARACAO', 'PRONTO', 'FINALIZADO']),
  })
)

export const buscarPedidoPorId = vine.create(
  vine.object({
    id: vine.number(),
  })
)
