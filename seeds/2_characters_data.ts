import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("characters").del();

    // Inserts seed entries
    await knex("characters").insert([
        { user_id: "1", name:"Classics", image: "mykid_drawing1.png"},
        { user_id: "1", name:"Funny", image: "123123.png" },
        { user_id: "1", name:"Family&Friends", image: "abcdefg.png" }
    ]);
};
