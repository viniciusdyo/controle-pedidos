import vine from '@vinejs/vine'

export const criarProdutoValidator = vine.create(
  vine.object({
    nome: vine.string().minLength(3).maxLength(200),
    status: vine.enum(['ativo', 'inativo']),
    valorUnidade: vine.number().min(1),
  })
)

export const editarProdutoValidator = vine.create(
  vine.object({
    id: vine.number().min(1),
    nome: vine.string().minLength(3).maxLength(200),
    status: vine.enum(['ativo', 'inativo']),
    valorUnidade: vine.number().min(1),
  })
)

export const buscarProdutoPorIdValidator = vine.create(
  vine.object({
    id: vine.number(),
  })
)
