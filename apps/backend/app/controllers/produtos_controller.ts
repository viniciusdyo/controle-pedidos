// import type { HttpContext } from '@adonisjs/core/http'

import { criarProdutoValidator, editarProdutoValidator } from '#validators/produto_validator'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'
import ProdutoService from '../../services/produto_service.ts'

@inject()
export default class ProdutosController {
  constructor(private produtoService: ProdutoService) {}

  async index({ response }: HttpContext) {
    const produtos = await this.produtoService.listarProdutos()

    return response.ok({
      sucesso: true,
      dados: produtos,
    })
  }
  async store({ response, request }: HttpContext) {
    const produtoPayload = await request.validateUsing(criarProdutoValidator)
    const produto = await this.produtoService.criarProduto(produtoPayload)

    return response.created({
      sucesso: true,
      dados: produto,
    })
  }
  async edit({ response, request }: HttpContext) {
    const produtoPayload = await request.validateUsing(editarProdutoValidator)
    const produto = await this.produtoService.editarProduto(produtoPayload)

    return response.ok({
      sucesso: true,
      dados: produto,
    })
  }
}
