import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'pedido_itens'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('pedido_id').unsigned().references('id').inTable('pedidos').onDelete('CASCADE')

      table
        .integer('produto_id')
        .unsigned()
        .references('id')
        .inTable('produtos')
        .onDelete('RESTRICT')

      table.string('nome').notNullable()
      table.decimal('valor_unidade', 12, 2).notNullable()
      table.integer('quantidade').notNullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
