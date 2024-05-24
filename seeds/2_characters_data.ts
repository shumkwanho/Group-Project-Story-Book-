import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("characters").del();

    // Inserts seed entries
    await knex("characters").insert([
        { user_id: "1", name:"Classics", image: "mykid_drawing1.png"},
        { user_id: "1", name:"Funny", image: "123123.png" },
        { user_id: "1", name:"Family&Friends", image: "abcdefg.png" },
        { 
            user_id: "1", 
            name: "Luna the Tiger", 
            image: "DALL·E 2024-05-24 10.32.26.jpg",
            prompt: "Create a digital cartoon image of Luna, a playful and adventurous teenage tiger character for a children's 2D game. Luna is depicted as cheerful with a chubby body shape and average height. Her fur is primarily white and orange with black stripe patterns, featuring gradient shading for depth. She has distinctive green eyes and fluffy cheeks. Luna wears a vibrant yellow monk tunic and carries a brown backpack. The image should be rendered in clean linework with an intermediate level of detail, using a vibrant color palette to make her stand out as a dynamic game asset." }

    ]);
};
