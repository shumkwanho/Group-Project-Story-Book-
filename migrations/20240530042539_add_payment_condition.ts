import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.raw("ALTER TABLE users ADD is_first_attempt BOOLEAN;")
    await knex.raw("ALTER TABLE users ALTER COLUMN is_first_attempt SET DEFAULT false;")
}


export async function down(knex: Knex): Promise<void> {
    await knex.raw("ALTER TABLE users DROP COLUMN is_first_attempt;")
}

