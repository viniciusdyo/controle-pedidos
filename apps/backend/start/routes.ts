/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import { controllers } from '#generated/controllers'
import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

router.get('/', () => {
  return { hello: 'world' }
})

router
  .group(() => {
    router
      .group(() => {
        router.post('signup', [controllers.NewAccount, 'store'])
        router.post('login', [controllers.AccessTokens, 'store'])
      })
      .prefix('auth')
      .as('auth')

    router
      .group(() => {
        router.get('profile', [controllers.Profile, 'show'])
        router.post('logout', [controllers.AccessTokens, 'destroy'])
      })
      .prefix('account')
      .as('profile')
      .use(middleware.auth())

    router.group(() => {
      router.get('produtos', [controllers.Produtos, 'index'])
      router.post('produtos', [controllers.Produtos, 'store'])
      router.put('produtos', [controllers.Produtos, 'edit'])
    })
    router.group(() => {
      router.get('clientes', [controllers.Clientes, 'index'])
      router.post('clientes', [controllers.Clientes, 'store'])
      router.put('clientes', [controllers.Clientes, 'edit'])
    })
    router.group(() => {
      router.get('pedidos/:id', [controllers.Pedidos, 'show'])
      router.get('pedidos', [controllers.Pedidos, 'index'])
      router.post('pedidos', [controllers.Pedidos, 'store'])
      router.put('pedidos', [controllers.Pedidos, 'edit'])
    })
  })
  .prefix('/api/v1')
