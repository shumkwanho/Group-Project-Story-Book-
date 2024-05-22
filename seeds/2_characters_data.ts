import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("characters").del();

    // Inserts seed entries
    await knex("characters").insert([
        { user_id: "1", character_name:"Classics", image_name: "mykid_drawing1.png"},
        { user_id: "1", character_name:"Funny", image_name: "123123.png" },
        { user_id: "1", character_name:"Family&Friends", image_name: "abcdefg.png" }
    ]);
};
