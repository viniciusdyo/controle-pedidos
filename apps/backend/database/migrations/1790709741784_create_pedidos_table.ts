import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'pedidos'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table
        .integer('cliente_id')
        .unsigned()
        .references('id')
        .inTable('clientes')
        .onDelete('RESTRICT')

      table.decimal('valor_total', 12, 2).notNullable()
      table
        .enum('status', ['PENDENTE', 'EM-PREPARACAO', 'PRONTO', 'FINALIZADO'])
        .defaultTo('PENDENTE')

      table.boolean('cancelado').defaultTo(false)

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
