import BusinessRuleException from '#exceptions/business_rule_exception'
import Cliente from '#models/cliente'
import {
  type buscarClientePorIdValidator,
  type criarClienteValidator,
  type editarClienteValidator,
} from '#validators/cliente_validator'
import db from '@adonisjs/lucid/services/db'
import { type Infer } from '@vinejs/vine/types'

type CriarClientePayload = Infer<typeof criarClienteValidator>
type EditarClientePayload = Infer<typeof editarClienteValidator>
type BuscarClientePorIdPayload = Infer<typeof buscarClientePorIdValidator>

export default class ClienteService {
  public async criarCliente(payload: CriarClientePayload) {
    const transacao = await db.transaction()
    try {
      const cliente = new Cliente()
      cliente.nome = payload.nome
      cliente.telefone = payload.telefone

      cliente.useTransaction(transacao)
      await cliente.save()
      await transacao.commit()

      return cliente
    } catch (error) {
      await transacao.rollback()

      if (error instanceof BusinessRuleException) {
        throw error
      }

      throw new BusinessRuleException('Erro interno ao cadastrar novo cliente', { status: 500 })
    }
  }

  public async editarCliente(payload: EditarClientePayload) {
    const transacao = await db.transaction()

    try {
      const cliente = await Cliente.findOrFail(payload.id, { client: transacao })
      cliente.nome = payload.nome
      cliente.telefone = payload.telefone

      cliente.useTransaction(transacao)
      await cliente.save()

      await transacao.commit()

      return cliente
    } catch (error) {
      await transacao.rollback()

      if (error instanceof BusinessRuleException) {
        throw error
      }

      throw new BusinessRuleException(`Erro interno ao editar cliente.`, { status: 500 })
    }
  }
  public async listarClientes() {
    const clientes = await Cliente.all()
    return clientes
  }

  public async buscarClientePorId(payload: BuscarClientePorIdPayload) {
    const cliente = await Cliente.findOrFail(payload.id)
    return cliente
  }
}
