/* eslint-disable prettier/prettier */
import type { routes } from './index.ts'

export interface ApiDefinition {
  auth: {
    newAccount: {
      store: typeof routes['auth.new_account.store']
    }
    accessTokens: {
      store: typeof routes['auth.access_tokens.store']
    }
  }
  profile: {
    profile: {
      show: typeof routes['profile.profile.show']
    }
    accessTokens: {
      destroy: typeof routes['profile.access_tokens.destroy']
    }
  }
  produtos: {
    show: typeof routes['produtos.show']
    index: typeof routes['produtos.index']
    store: typeof routes['produtos.store']
    edit: typeof routes['produtos.edit']
  }
  clientes: {
    show: typeof routes['clientes.show']
    index: typeof routes['clientes.index']
    store: typeof routes['clientes.store']
    edit: typeof routes['clientes.edit']
  }
  pedidos: {
    show: typeof routes['pedidos.show']
    index: typeof routes['pedidos.index']
    store: typeof routes['pedidos.store']
    edit: typeof routes['pedidos.edit']
  }
}
