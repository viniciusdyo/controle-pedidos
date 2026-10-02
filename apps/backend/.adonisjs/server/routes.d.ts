import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'auth.new_account.store': { paramsTuple?: []; params?: {} }
    'auth.access_tokens.store': { paramsTuple?: []; params?: {} }
    'profile.profile.show': { paramsTuple?: []; params?: {} }
    'profile.access_tokens.destroy': { paramsTuple?: []; params?: {} }
    'produtos.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'produtos.index': { paramsTuple?: []; params?: {} }
    'produtos.store': { paramsTuple?: []; params?: {} }
    'produtos.edit': { paramsTuple?: []; params?: {} }
    'clientes.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'clientes.index': { paramsTuple?: []; params?: {} }
    'clientes.store': { paramsTuple?: []; params?: {} }
    'clientes.edit': { paramsTuple?: []; params?: {} }
    'pedidos.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'pedidos.index': { paramsTuple?: []; params?: {} }
    'pedidos.store': { paramsTuple?: []; params?: {} }
    'pedidos.edit': { paramsTuple?: []; params?: {} }
  }
  GET: {
    'profile.profile.show': { paramsTuple?: []; params?: {} }
    'produtos.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'produtos.index': { paramsTuple?: []; params?: {} }
    'clientes.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'clientes.index': { paramsTuple?: []; params?: {} }
    'pedidos.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'pedidos.index': { paramsTuple?: []; params?: {} }
  }
  HEAD: {
    'profile.profile.show': { paramsTuple?: []; params?: {} }
    'produtos.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'produtos.index': { paramsTuple?: []; params?: {} }
    'clientes.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'clientes.index': { paramsTuple?: []; params?: {} }
    'pedidos.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'pedidos.index': { paramsTuple?: []; params?: {} }
  }
  POST: {
    'auth.new_account.store': { paramsTuple?: []; params?: {} }
    'auth.access_tokens.store': { paramsTuple?: []; params?: {} }
    'profile.access_tokens.destroy': { paramsTuple?: []; params?: {} }
    'produtos.store': { paramsTuple?: []; params?: {} }
    'clientes.store': { paramsTuple?: []; params?: {} }
    'pedidos.store': { paramsTuple?: []; params?: {} }
  }
  PUT: {
    'produtos.edit': { paramsTuple?: []; params?: {} }
    'clientes.edit': { paramsTuple?: []; params?: {} }
    'pedidos.edit': { paramsTuple?: []; params?: {} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}