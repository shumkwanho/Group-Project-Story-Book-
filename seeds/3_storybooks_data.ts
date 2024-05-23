import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("storybooks").del();

    // Inserts seed entries
    await knex("storybooks").insert([
        {   
            user_id: "1",
            character_id: "2", 
            bookname: "Abc book", 
            description:"first starting ABC",
            is_public: "true", 
            target_age: "5",
            category: "Learning",
            total_page: "8"
        },
        {  
            user_id: "1", 
            character_id: "2", 
            bookname: "Animal book", 
            description:"Animal book",
            is_public: "true", 
            target_age: "5",
            category: "Adventure",
            total_page: "8"
        },
        {  
            user_id: "1", 
            character_id: "2",
            bookname: "Insect book", 
            description:"first starting ABC",
            is_public: "true", 
            target_age: "5" 
        }
    ]);
};
