import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("characters").del();

    // Inserts seed entries
    await knex("characters").insert([
        { 
            user_id: "1", 
            name: "Luna the Tiger", 
            image: "DALL·E 2024-05-24 10.32.26.jpg",
            prompt: "Create a digital cartoon image of Luna, a playful and adventurous teenage tiger character for a children's 2D game. Luna is depicted as cheerful with a chubby body shape and average height. Her fur is primarily white and orange with black stripe patterns, featuring gradient shading for depth. She has distinctive green eyes and fluffy cheeks. Luna wears a vibrant yellow monk tunic and carries a brown backpack. The image should be rendered in clean linework with an intermediate level of detail, using a vibrant color palette to make her stand out as a dynamic game asset.",
            requirement: 'empty'
        },
        { 
            user_id: "1", 
            name: "Loki the Sheep", 
            image: "1716792751367.jpeg",
            prompt: "Draw a fictional character named Loki, a teenage male sheep with a slim body shape and short height. He has distinctive features of fluffy white wool. Loki is often seen wearing a colorful t-shirt and shorts, along with a wristband. The character should portray a friendly and approachable appearance. Use the color theme of blue as the primary color and green as the secondary color. Incorporate stripes as pattern markings and create a light to dark gradient shading. The drawing style should be cartoon-like, with clean linework and an intermediate level of detail. Use a vibrant color palette and the medium of watercolor to bring the character to life. This prompt aims to create an illustration of Loki, targeting a children's audience.",
            requirement: '{"character_features":{"species_type":"sheep","gender":"male","name":"Loki","age":"teenager","body_shape":"slim","height_size":"short","distinctive_features":"fluffy white wool","clothing_outfit":"colorful t-shirt and shorts","accessories":"wristband"},"color_theme":{"primary_colors":"blue","secondary_colors":"green","pattern_markings":"stripes","gradient_shading":"light to dark"},"drawing_style":{"art_style":"cartoon","linework":"clean","detail_level":"intermediate","color_palette":"vibrant","medium":"watercolor"},"intended_use":{"purpose":"illustration","audience":"children"}}'
        },
        { 
            user_id: "1", 
            name: "Nana the Elephant", 
            image: "1716790694152.jpeg",
            prompt: "Draw a fictional character named Nana, she is a female elephant. Nana is a chubby and short elephant with big round eyes. She is a child and wears a pink dress. She also has a flower clip as an accessory. The color theme for Nana is primarily pink and secondary colors are purple. Her body features polka dot pattern markings and a soft gradient shading. The drawing style should be cartoon-like with clean linework and intermediate level of detail. Use a vibrant color palette and depict Nana using watercolor as the medium. The intended use of this illustration is for children.",
            requirement: 'empty'
        },
        { 
            user_id: "1", 
            name: "Loki the Sheep", 
            image: "1716792896403.jpeg",
            prompt: "Draw a fictional character named Loki, a male sheep who is a teenager. Loki has a slim body shape with short height. He stands out with his fluffy white fur and floppy ears. He is wearing a colorful t-shirt with a playful design and denim shorts. Completing his outfit, he has sneakers on and a wristband with a charm. The primary colors for his color theme are bright blue, while the secondary colors are sunflower yellow and grass green. Loki doesn't have any markings on his fur. The drawing style should be a cartoon with clean linework and an intermediate level of detail. Use a vibrant color palette, particularly using watercolor as the medium. The intended use of this image is for an illustration aimed at children.",
            requirement: '{"character_features":{"species_type":"sheep","gender":"male","name":"Loki","age":"teenager","body_shape":"slim","height_size":"short","distinctive_features":"Fluffy white fur, floppy ears","clothing_outfit":"Colorful t-shirt with a playful design, denim shorts","accessories":"Sneakers, a wristband with a charm"},"color_theme":{"primary_colors":"Bright blue","secondary_colors":"Sunflower yellow, grass green","pattern_markings":"No markings","gradient_shading":"No gradient shading"},"drawing_style":{"art_style":"cartoon","linework":"clean","detail_level":"intermediate","color_palette":"vibrant","medium":"watercolor"},"intended_use":{"purpose":"illustration","audience":"children"}}'
        },
        { 
            user_id: "1", 
            name: "Yuko the Cat", 
            image: "1716803792305.jpeg",
            prompt: "Create an adorable fictional character named Yuko. Yuko is a female child cat with a petite body shape and short height. She has large round eyes with long eyelashes, giving her a cute and innocent appearance. Yuko's color theme consists of pink and purple as primary colors, with light blue and yellow as secondary colors. She has distinctive stripes as pattern markings on her fur. To bring her to life, draw Yuko in a Pixar art style with clean linework and an intermediate level of detail. Use a vibrant color palette and the medium of watercolor to add liveliness to the illustration. Keep in mind that the intended use of this prompt is for an illustration targeting children.",
            requirement: '{"character_features":{"species_type":"cat","gender":"female","name":"Yuko","age":"child","body_shape":"petite","height_size":"short","distinctive_features":"large round eyes, long eyelashes","clothing_outfit":"","accessories":""},"color_theme":{"primary_colors":"pink, purple","secondary_colors":"light blue, yellow","pattern_markings":"stripes","gradient_shading":""},"drawing_style":{"art_style":"pixar","linework":"clean","detail_level":"intermediate","color_palette":"vibrant","medium":"watercolor"},"intended_use":{"purpose":"illustration","audience":"children"}}'
        },
        { 
            user_id: "1", 
            name: "Yuko the Cat", 
            image: "1716804286875.jpeg",
            prompt: `Draw a vibrant and colorful illustration of a fictional character named Yuko. Yuko is a young female cat with a petite body shape and short height. She has big round eyes with long eyelashes, which are her distinctive features. She is wearing a colorful sundress and has a flower-shaped hair clip as an accessory.

            For the color theme, use primary colors such as pink, yellow, and blue as well as secondary colors like purple and green. Yuko has stripes as her pattern markings, and the shading should be soft and gradient.
            
            The art style should be reminiscent of Pixar animations, with clean linework and intermediate level of detail. Use a vibrant color palette and the medium of watercolor to bring Yuko to life.
            
            This illustration is intended for children as the audience and is meant for the purpose of capturing their imagination.`,
            requirement: '{"character_features":{"species_type":"cat","gender":"female","name":"Yuko","age":"child","body_shape":"petite","height_size":"short","distinctive_features":"big round eyes, long eyelashes","clothing_outfit":"colorful sundress","accessories":"flower-shaped hair clip"},"color_theme":{"primary_colors":"pink, yellow, blue","secondary_colors":"purple, green","pattern_markings":"stripes","gradient_shading":"soft"},"drawing_style":{"art_style":"pixar","linework":"clean","detail_level":"intermediate","color_palette":"vibrant","medium":"watercolor"},"intended_use":{"purpose":"illustration","audience":"children"}}'
        },
        { 
            user_id: "1", 
            name: "Molly the Bear", 
            image: "1716871587840.jpeg",
            prompt: `Draw Molly, a chubby bear girl with big round eyes and rosy cheeks. She is a child bear wearing a pink dress with polka dots and a bow on her head. Molly is of average height for a child. Her distinct features are emphasized with her big round eyes and rosy cheeks. The color theme for Molly's illustration is primarily pink and yellow, with secondary colors of white. Her dress is decorated with polka dots. The drawing style should be akin to Pixar animation, featuring clean linework and intermediate level of detail. The color palette ought to be vibrant, while the medium used is watercolor. The intended use of this prompt is for an illustration, targeting children as the audience.`,
            requirement: '{"character_features":{"species_type":"Bear","gender":"Female","name":"Molly","age":"Child","body_shape":"Chubby","height_size":"Average","distinctive_features":"Big round eyes, rosy cheeks","clothing_outfit":"A pink dress with polka dots","accessories":"A bow on her head"},"color_theme":{"primary_colors":"Pink, yellow","secondary_colors":"White","pattern_markings":"Polka dots","gradient_shading":"None"},"drawing_style":{"art_style":"pixar","linework":"clean","detail_level":"intermediate","color_palette":"vibrant","medium":"watercolor"},"intended_use":{"purpose":"illustration","audience":"children"}}'
        },
        { 
            user_id: "1", 
            name: "Money the Robot", 
            image: "1716871828463.jpeg",
            prompt: `Draw a fictional character named Money, a robot with a masculine appearance. Money is a teenager with a muscular physique and a short height. He has distinctive features, such as glowing eyes. He is often seen wearing a hoodie and jeans, along with a baseball cap. The primary colors used in his design are red, while blue is used as the secondary color. Money has striped pattern markings on his body. The character should have a Pixar-like art style with clean linework and an intermediate level of detail. The color palette should be vibrant, and the medium used for coloring is watercolor. This illustration is intended for children.`,
            requirement: '{"character_features":{"species_type":"Robot","gender":"Male","name":"Money","age":"Teenager","body_shape":"Muscular","height_size":"Short","distinctive_features":"Glowing eyes","clothing_outfit":"Hoodie and jeans","accessories":"Baseball cap"},"color_theme":{"primary_colors":"Red","secondary_colors":"Blue","pattern_markings":"Stripes","gradient_shading":"Yes"},"drawing_style":{"art_style":"pixar","linework":"clean","detail_level":"intermediate","color_palette":"vibrant","medium":"watercolor"},"intended_use":{"purpose":"illustration","audience":"children"}}'
        },
        { 
            user_id: "1", 
            name: "Pinky the Gnome", 
            image: "1716872228945.jpeg",
            prompt: `"In a vibrant and whimsical Pixar art style, create an illustration of a fictional character named Pinky. Pinky is an elderly female Gnome with a chubby body shape and an average height. She has rosy cheeks and oversized spectacles that give her a unique look. Donned in a patterned dress and apron, Pinky wears a flower-shaped hat as an accessory. The color theme for this illustration should primarily consist of pink with secondary colors of purple. Add polka dot pattern markings to enhance the character's charm. With clean linework and intermediate detail level, bring Pinky to life using a watercolor medium. The intended use of this illustration is for children, so make sure to keep it playful and captivating."`,
            requirement: '{"character_features":{"species_type":"Gnome","gender":"Female","name":"Pinky","age":"Elderly","body_shape":"Chubby","height_size":"Average","distinctive_features":"Rosy cheeks, oversized spectacles","clothing_outfit":"Patterned dress and apron","accessories":"Flower-shaped hat"},"color_theme":{"primary_colors":"Pink","secondary_colors":"Purple","pattern_markings":"Polka dots","gradient_shading":"None"},"drawing_style":{"art_style":"pixar","linework":"clean","detail_level":"intermediate","color_palette":"vibrant","medium":"watercolor"},"intended_use":{"purpose":"illustration","audience":"children"}}'
        },
        { 
            user_id: "1", 
            name: "Happy the Unicorn", 
            image: "1716872719041.jpeg",
            prompt: `Draw a vibrant illustration of a fictional character named Happy, an elderly male unicorn with a slim body shape and a tall height. Happy has a distinctive curved horn on his head. He is wearing a colorful robe and round spectacles. The primary colors of the character should be blue, with yellow as the secondary colors. The character should have stripes as pattern markings and should not have any gradient shading. The art style should be inspired by Pixar, with clean linework and intermediate level of detail. The medium used for this illustration should be watercolor. The intended use of this illustration is for a children's audience.`,
            requirement: '{"character_features":{"species_type":"Unicorn","gender":"Male","name":"Happy","age":"Elderly","body_shape":"Slim","height_size":"Tall","distinctive_features":"Curved horn","clothing_outfit":"Colorful robe","accessories":"Round spectacles"},"color_theme":{"primary_colors":"Blue","secondary_colors":"Yellow","pattern_markings":"Stripes","gradient_shading":"None"},"drawing_style":{"art_style":"pixar","linework":"clean","detail_level":"intermediate","color_palette":"vibrant","medium":"watercolor"},"intended_use":{"purpose":"illustration","audience":"children"}}'
        },
    ]);
};
