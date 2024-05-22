import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("storybook_pages").del();

    // Inserts seed entries
    // currently hard code image and content
    await knex("storybook_pages").insert([
        {   
            storybook_id: "2",
            page_number: "1", 
            caption: "page 1 caption", 
            image:"example_1.jpg",
        },
        {   
            storybook_id: "2",
            page_number: "2", 
            caption: "page 2 caption", 
            image:"example_1.jpg",
        },
        {   
            storybook_id: "2",
            page_number: "3", 
            caption: "page 3 caption", 
            image:"example_1.jpg",
        },
        {   
            storybook_id: "2",
            page_number: "4", 
            caption: "page 4 caption", 
            image:"example_1.jpg",
        },
        {   
            storybook_id: "2",
            page_number: "5", 
            caption: "page 5 caption", 
            image:"example_1.jpg",
        },
        {   
            storybook_id: "2",
            page_number: "6", 
            caption: "page 6 caption", 
            image:"example_1.jpg",
        },
        {   
            storybook_id: "2",
            page_number: "7", 
            caption: "page 7 caption", 
            image:"example_1.jpg",
        },
        {   
            storybook_id: "2",
            page_number: "8", 
            caption: "page 8 caption", 
            image:"example_1.jpg",
        },
    ]);
};