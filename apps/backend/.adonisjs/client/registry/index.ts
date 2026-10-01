/* eslint-disable prettier/prettier */
import type { AdonisEndpoint } from '@tuyau/core/types'
import type { Registry } from './schema.d.ts'
import type { ApiDefinition } from './tree.d.ts'

const placeholder: any = {}

const routes = {
  'auth.new_account.store': {
    methods: ["POST"],
    pattern: '/api/v1/auth/signup',
    tokens: [{"old":"/api/v1/auth/signup","type":0,"val":"api","end":""},{"old":"/api/v1/auth/signup","type":0,"val":"v1","end":""},{"old":"/api/v1/auth/signup","type":0,"val":"auth","end":""},{"old":"/api/v1/auth/signup","type":0,"val":"signup","end":""}],
    types: placeholder as Registry['auth.new_account.store']['types'],
  },
  'auth.access_tokens.store': {
    methods: ["POST"],
    pattern: '/api/v1/auth/login',
    tokens: [{"old":"/api/v1/auth/login","type":0,"val":"api","end":""},{"old":"/api/v1/auth/login","type":0,"val":"v1","end":""},{"old":"/api/v1/auth/login","type":0,"val":"auth","end":""},{"old":"/api/v1/auth/login","type":0,"val":"login","end":""}],
    types: placeholder as Registry['auth.access_tokens.store']['types'],
  },
  'profile.profile.show': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/account/profile',
    tokens: [{"old":"/api/v1/account/profile","type":0,"val":"api","end":""},{"old":"/api/v1/account/profile","type":0,"val":"v1","end":""},{"old":"/api/v1/account/profile","type":0,"val":"account","end":""},{"old":"/api/v1/account/profile","type":0,"val":"profile","end":""}],
    types: placeholder as Registry['profile.profile.show']['types'],
  },
  'profile.access_tokens.destroy': {
    methods: ["POST"],
    pattern: '/api/v1/account/logout',
    tokens: [{"old":"/api/v1/account/logout","type":0,"val":"api","end":""},{"old":"/api/v1/account/logout","type":0,"val":"v1","end":""},{"old":"/api/v1/account/logout","type":0,"val":"account","end":""},{"old":"/api/v1/account/logout","type":0,"val":"logout","end":""}],
    types: placeholder as Registry['profile.access_tokens.destroy']['types'],
  },
  'produtos.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/produtos',
    tokens: [{"old":"/api/v1/produtos","type":0,"val":"api","end":""},{"old":"/api/v1/produtos","type":0,"val":"v1","end":""},{"old":"/api/v1/produtos","type":0,"val":"produtos","end":""}],
    types: placeholder as Registry['produtos.index']['types'],
  },
  'produtos.store': {
    methods: ["POST"],
    pattern: '/api/v1/produtos',
    tokens: [{"old":"/api/v1/produtos","type":0,"val":"api","end":""},{"old":"/api/v1/produtos","type":0,"val":"v1","end":""},{"old":"/api/v1/produtos","type":0,"val":"produtos","end":""}],
    types: placeholder as Registry['produtos.store']['types'],
  },
  'produtos.edit': {
    methods: ["PUT"],
    pattern: '/api/v1/produtos',
    tokens: [{"old":"/api/v1/produtos","type":0,"val":"api","end":""},{"old":"/api/v1/produtos","type":0,"val":"v1","end":""},{"old":"/api/v1/produtos","type":0,"val":"produtos","end":""}],
    types: placeholder as Registry['produtos.edit']['types'],
  },
  'clientes.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/clientes',
    tokens: [{"old":"/api/v1/clientes","type":0,"val":"api","end":""},{"old":"/api/v1/clientes","type":0,"val":"v1","end":""},{"old":"/api/v1/clientes","type":0,"val":"clientes","end":""}],
    types: placeholder as Registry['clientes.index']['types'],
  },
  'clientes.store': {
    methods: ["POST"],
    pattern: '/api/v1/clientes',
    tokens: [{"old":"/api/v1/clientes","type":0,"val":"api","end":""},{"old":"/api/v1/clientes","type":0,"val":"v1","end":""},{"old":"/api/v1/clientes","type":0,"val":"clientes","end":""}],
    types: placeholder as Registry['clientes.store']['types'],
  },
  'clientes.edit': {
    methods: ["PUT"],
    pattern: '/api/v1/clientes',
    tokens: [{"old":"/api/v1/clientes","type":0,"val":"api","end":""},{"old":"/api/v1/clientes","type":0,"val":"v1","end":""},{"old":"/api/v1/clientes","type":0,"val":"clientes","end":""}],
    types: placeholder as Registry['clientes.edit']['types'],
  },
  'pedidos.show': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/pedidos/:id',
    tokens: [{"old":"/api/v1/pedidos/:id","type":0,"val":"api","end":""},{"old":"/api/v1/pedidos/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/pedidos/:id","type":0,"val":"pedidos","end":""},{"old":"/api/v1/pedidos/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['pedidos.show']['types'],
  },
  'pedidos.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/pedidos',
    tokens: [{"old":"/api/v1/pedidos","type":0,"val":"api","end":""},{"old":"/api/v1/pedidos","type":0,"val":"v1","end":""},{"old":"/api/v1/pedidos","type":0,"val":"pedidos","end":""}],
    types: placeholder as Registry['pedidos.index']['types'],
  },
  'pedidos.store': {
    methods: ["POST"],
    pattern: '/api/v1/pedidos',
    tokens: [{"old":"/api/v1/pedidos","type":0,"val":"api","end":""},{"old":"/api/v1/pedidos","type":0,"val":"v1","end":""},{"old":"/api/v1/pedidos","type":0,"val":"pedidos","end":""}],
    types: placeholder as Registry['pedidos.store']['types'],
  },
  'pedidos.edit': {
    methods: ["PUT"],
    pattern: '/api/v1/pedidos',
    tokens: [{"old":"/api/v1/pedidos","type":0,"val":"api","end":""},{"old":"/api/v1/pedidos","type":0,"val":"v1","end":""},{"old":"/api/v1/pedidos","type":0,"val":"pedidos","end":""}],
    types: placeholder as Registry['pedidos.edit']['types'],
  },
} as const satisfies Record<string, AdonisEndpoint>

export { routes }

export const registry = {
  routes,
  $tree: {} as ApiDefinition,
}

declare module '@tuyau/core/types' {
  export interface UserRegistry {
    routes: typeof routes
    $tree: ApiDefinition
  }
}
