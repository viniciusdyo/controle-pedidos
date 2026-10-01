import vine from '@vinejs/vine'

export const criarClienteValidator = vine.create(
  vine.object({
    nome: vine.string().minLength(3).maxLength(250),
    telefone: vine.string().minLength(11).maxLength(12),
  })
)

export const editarClienteValidator = vine.create(
  vine.object({
    id: vine.number().min(1),
    nome: vine.string().minLength(3).maxLength(250),
    telefone: vine.string().minLength(11).maxLength(12),
  })
)
