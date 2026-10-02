import BusinessRuleException from '#exceptions/business_rule_exception'
import Produto from '#models/produto'
import {
  type buscarProdutoPorIdValidator,
  type criarProdutoValidator,
  type editarProdutoValidator,
} from '#validators/produto_validator'
import db from '@adonisjs/lucid/services/db'
import { type Infer } from '@vinejs/vine/types'

type CriarProdutoPayload = Infer<typeof criarProdutoValidator>
type EditarProdutoPayload = Infer<typeof editarProdutoValidator>
type BuscarProdutoPorIdPayload = Infer<typeof buscarProdutoPorIdValidator>

export default class ProdutoService {
  public async criarProduto(payload: CriarProdutoPayload) {
    const transacao = await db.transaction()
    try {
      const produto = new Produto()
      produto.nome = payload.nome
      produto.status = payload.status
      produto.valorUnidade = payload.valorUnidade

      produto.useTransaction(transacao)
      await produto.save()
      await transacao.commit()

      return produto
    } catch (error) {
      await transacao.rollback()
      if (error instanceof BusinessRuleException) {
        throw error
      }

      throw new BusinessRuleException('Erro interno ao criar novo produto.', { status: 500 })
    }
  }

  public async editarProduto(payload: EditarProdutoPayload) {
    const transacao = await db.transaction()
    try {
      const produto = await Produto.findOrFail(payload.id, { client: transacao })
      produto.nome = payload.nome
      produto.status = payload.status
      produto.valorUnidade = payload.valorUnidade

      produto.useTransaction(transacao)
      await produto.save()

      await transacao.commit()
      return produto
    } catch (error) {
      await transacao.rollback()
      if (error instanceof BusinessRuleException) {
        throw error
      }

      throw new BusinessRuleException('Erro interno ao atualizar produto.', { status: 500 })
    }
  }

  public async listarProdutos() {
    const produtos = await Produto.query().orderBy('id', 'asc')
    return produtos
  }

  public async buscarClientePorId(payload: BuscarProdutoPorIdPayload) {
    const produto = await Produto.findOrFail(payload.id)
    return produto
  }
}
