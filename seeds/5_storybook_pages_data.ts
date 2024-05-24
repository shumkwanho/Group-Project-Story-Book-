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
            image:"example_2.jpg",
        },
        {   
            storybook_id: "2",
            page_number: "3", 
            caption: "page 3 caption", 
            image:"example_3.jpg",
        },
        {   
            storybook_id: "2",
            page_number: "4", 
            caption: "page 4 caption", 
            image:"example_4.jpg",
        },
        {   
            storybook_id: "2",
            page_number: "5", 
            caption: "page 5 caption", 
            image:"example_5.jpg",
        },
        {   
            storybook_id: "2",
            page_number: "6", 
            caption: "page 6 caption", 
            image:"example_6.jpg",
        },
        {   
            storybook_id: "2",
            page_number: "7", 
            caption: "page 7 caption", 
            image:"example_7.jpg",
        },
        {   
            storybook_id: "2",
            page_number: "8", 
            caption: "page 8 caption", 
            image:"example_8.jpg",
        },
        {   
            storybook_id: "4",
            page_number: "1", 
            caption: `Luna the Tiger ventured deep into the lush jungle, eager to explore its hidden secrets. Her heart raced with excitement as she weaved through tall trees and listened to the sounds of nature.`, 
            image:"DALL·E 2024-05-24 12.38.12.jpg",
            prompt: `Create a detailed digital cartoon illustration of Luna, a playful and adventurous teenage tiger character designed for a children's game. Luna is depicted as cheerful, with a chubby body shape and average height. Her fur is primarily white and orange, adorned with black stripes, and enhanced with gradient shading to add depth. She has distinctive green eyes and fluffy cheeks that enhance her facial expression. Luna wears a vibrant yellow monk tunic and carries a brown backpack, embodying a blend of tradition and adventure.

            This scene is set in a lush jungle where Luna is exploring, her emotion charged with excitement. The setting is filled with tall trees and the ambient sounds of nature, capturing a vivid and dynamic backdrop for Luna’s adventures.
            
            The image should be rendered in clean linework with an intermediate level of detail, using a vibrant color palette to emphasize her dynamic presence in the game. The digital medium should ensure that the cartoon style remains bright and engaging, appealing directly to a young audience. The depiction should convey a sense of playfulness and adventure, resonating with the emotional tone of excitement.
            `
        },
        {   
            storybook_id: "4",
            page_number: "2", 
            caption: `In the misty mountains, Luna found an enormous rock wall. With determination in her eyes, she started climbing, using her claws to grip the rugged surface. She never gave up, even when it seemed difficult.`, 
            image:"DALL·E 2024-05-24 12.40.05.jpg",
            prompt: `Create a digital cartoon illustration of Luna, a teenage tiger character designed for a children's game. Luna is depicted as a cheerful, chubby tiger with an average height, primarily dressed in a vibrant yellow monk tunic and carrying a brown backpack. Her fur features white and orange colors with black stripes, and her face is adorned with green eyes and fluffy cheeks, enhancing her cheerful expression. The scene is set in misty mountains where Luna is shown climbing an enormous rock wall. Her eyes reflect determination as she grips the rugged surface with her claws, showcasing her adventurous spirit. The mountain's mist adds an atmospheric depth to the background, emphasizing Luna's challenge and her unyielding spirit. The illustration should be rendered in a cartoon style with clean linework and an intermediate level of detail. Use a vibrant color palette to highlight Luna's dynamic presence against the misty mountain backdrop. The digital medium should ensure that the art remains bright and engaging, resonating with the emotions of determination and adventure, specifically tailored for a young audience.`
        },
        {   
            storybook_id: "4",
            page_number: "3", 
            caption: `At the glistening river, Luna couldn't resist the temptation to take a refreshing dip. She splashed and played with the water, her joyful laughter echoing through the trees. It was a moment of pure happiness.`, 
            image:"DALL·E 2024-05-24 12.43.49.jpg",
            prompt: `Create a vibrant digital cartoon illustration of Luna, a playful and adventurous teenage tiger character, tailored for a children's game. Luna is depicted as a cheerful, chubby tiger with average height, dressed in a vibrant yellow monk tunic and carrying a brown backpack. Her fur is primarily white and orange with black stripe patterns, accented with gradient shading to add depth. Her face is animated with green eyes and fluffy cheeks, enhancing her cheerful expression. The scene unfolds at a glistening river where Luna is gleefully splashing in the water. Her joy is palpable as she plays, with her laughter resonating through the trees, creating a moment of pure happiness. The background features the sparkling river under a bright sky, adding to the scene's light-hearted and joyful ambiance. This illustration should be rendered in a cartoon style with clean linework and an intermediate level of detail. The vibrant color palette should highlight Luna's dynamic presence against the playful river setting, with the digital medium ensuring the artwork remains bright and engaging for a young audience. The depiction should capture the emotion of joy, resonating with Luna's playful and adventurous spirit.
            `
        },
        {   
            storybook_id: "4",
            page_number: "4", 
            caption: `In the enchanted meadow, Luna felt an overwhelming delight. She twirled and danced among the colorful flowers, their fragrant petals swirling around her. It was a magical moment she would never forget.`, 
            image:"DALL·E 2024-05-24 12.47.02.jpg",
            prompt: `Create a vibrant digital cartoon illustration of Luna, a teenage tiger character tailored for a children's game. Luna is depicted as cheerful, with a chubby body shape and average height, sporting a vibrant yellow monk tunic and carrying a brown backpack. Her fur is primarily white and orange with black stripes, featuring gradient shading for depth. Her distinctive green eyes and fluffy cheeks enhance her facial expression, making her appear lively and engaging.

            The scene is set in an enchanted meadow where Luna is dancing, overwhelmed with delight. She twirls among the colorful flowers, their fragrant petals swirling around her, creating a magical atmosphere. This moment of pure joy and enchantment is captured vividly against the backdrop of the lush meadow, bright and filled with life.
            
            The illustration should be rendered in a cartoon style with clean linework and an intermediate level of detail. A vibrant color palette should be used to highlight Luna's dynamic presence in this delightful setting, with the digital medium ensuring the artwork is bright and appealing to a young audience. The depiction should convey the emotion of delight, emphasizing Luna's playful and adventurous spirit in this magical moment.            
            `
        },

    ]);
};