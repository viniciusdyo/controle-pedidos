/* eslint-disable prettier/prettier */
/// <reference path="../manifest.d.ts" />

import type { ExtractBody, ExtractErrorResponse, ExtractQuery, ExtractQueryForGet, ExtractResponse } from '@tuyau/core/types'
import type { InferInput, SimpleError } from '@vinejs/vine/types'

export type ParamValue = string | number | bigint | boolean

export interface Registry {
  'auth.new_account.store': {
    methods: ["POST"]
    pattern: '/api/v1/auth/signup'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/user').signupValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/user').signupValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/new_account_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/new_account_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'auth.access_tokens.store': {
    methods: ["POST"]
    pattern: '/api/v1/auth/login'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/user').loginValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/user').loginValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/access_tokens_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/access_tokens_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'profile.profile.show': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/account/profile'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/profile_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/profile_controller').default['show']>>>
    }
  }
  'profile.access_tokens.destroy': {
    methods: ["POST"]
    pattern: '/api/v1/account/logout'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/access_tokens_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/access_tokens_controller').default['destroy']>>>
    }
  }
  'produtos.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/produtos'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/produtos_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/produtos_controller').default['index']>>>
    }
  }
  'produtos.store': {
    methods: ["POST"]
    pattern: '/api/v1/produtos'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/produto_validator').criarProdutoValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/produto_validator').criarProdutoValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/produtos_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/produtos_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'produtos.edit': {
    methods: ["PUT"]
    pattern: '/api/v1/produtos'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/produto_validator').editarProdutoValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/produto_validator').editarProdutoValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/produtos_controller').default['edit']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/produtos_controller').default['edit']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'clientes.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/clientes'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/clientes_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/clientes_controller').default['index']>>>
    }
  }
  'clientes.store': {
    methods: ["POST"]
    pattern: '/api/v1/clientes'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/cliente_validator').criarClienteValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/cliente_validator').criarClienteValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/clientes_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/clientes_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'clientes.edit': {
    methods: ["PUT"]
    pattern: '/api/v1/clientes'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/cliente_validator').editarClienteValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/cliente_validator').editarClienteValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/clientes_controller').default['edit']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/clientes_controller').default['edit']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'pedidos.show': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/pedidos/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQueryForGet<InferInput<(typeof import('#validators/pedido_validator').buscarPedidoPorId)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/pedidos_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/pedidos_controller').default['show']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'pedidos.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/pedidos'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/pedidos_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/pedidos_controller').default['index']>>>
    }
  }
  'pedidos.store': {
    methods: ["POST"]
    pattern: '/api/v1/pedidos'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/pedido_validator').criarPedidoValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/pedido_validator').criarPedidoValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/pedidos_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/pedidos_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'pedidos.edit': {
    methods: ["PUT"]
    pattern: '/api/v1/pedidos'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/pedido_validator').atualizarStatusPedido)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/pedido_validator').atualizarStatusPedido)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/pedidos_controller').default['edit']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/pedidos_controller').default['edit']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
}
