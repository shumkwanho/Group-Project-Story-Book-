import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("users").del();

    // Inserts seed entries
    await knex("users").insert([
        { username: "amy1234" ,email: "amy1234@gmail.com", password:"1234"},
        { username: "peter5678" ,email: "peter5678@gmail.com", password:"1234" },
        { username: "bob1314" ,email: "bob1314@gmail.com", password:"1234" }
    ]);
};
