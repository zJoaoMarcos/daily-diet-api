import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.dropTable('users')

  await knex.schema.alterTable('meals', (table) => {
    table.string('session_id')
    table.dropColumn('owner')
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.createTable('users', (table) => {
    table.uuid('id').primary()
    table.string('first_name').notNullable()
    table.string('last_name')
    table.string('email').unique()
  })

  await knex.schema.alterTable('meals', (table) => {
    table.dropColumn('session_id')
    table.string('owner')
  })
}
