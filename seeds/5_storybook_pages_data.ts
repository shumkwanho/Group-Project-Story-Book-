import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("storybook_pages").del();

    // Inserts seed entries
    // currently hard code image and content
    await knex("storybook_pages").insert([
        {
            storybook_id: "1",
            page_number: "1",
            caption: "Luna the Tiger ventured deep into the lush jungle, eager to explore its hidden secrets. Her heart raced with excitement as she weaved through tall trees and listened to the sounds of nature.",
            image: "DALL-E 2024-05-24 12.38.12.jpg",
            prompt: "Create a detailed digital cartoon illustration of Luna, a playful and adventurous teenage tiger character designed for a children's game. Luna is depicted as cheerful, with a chubby body shape and average height. Her fur is primarily white and orange, adorned with black stripes, and enhanced with gradient shading to add depth. She has distinctive green eyes and fluffy cheeks that enhance her facial expression. Luna wears a vibrant yellow monk tunic and carries a brown backpack, embodying a blend of tradition and adventure.\n\n            This scene is set in a lush jungle where Luna is exploring, her emotion charged with excitement. The setting is filled with tall trees and the ambient sounds of nature, capturing a vivid and dynamic backdrop for Luna\u2019s adventures.\n            \n            The image should be rendered in clean linework with an intermediate level of detail, using a vibrant color palette to emphasize her dynamic presence in the game. The digital medium should ensure that the cartoon style remains bright and engaging, appealing directly to a young audience. The depiction should convey a sense of playfulness and adventure, resonating with the emotional tone of excitement.\n            "
        },
        {
            storybook_id: "1",
            page_number: "2",
            caption: "In the misty mountains, Luna found an enormous rock wall. With determination in her eyes, she started climbing, using her claws to grip the rugged surface. She never gave up, even when it seemed difficult.",
            image: "DALL-E 2024-05-24 12.40.05.jpg",
            prompt: "Create a digital cartoon illustration of Luna, a teenage tiger character designed for a children's game. Luna is depicted as a cheerful, chubby tiger with an average height, primarily dressed in a vibrant yellow monk tunic and carrying a brown backpack. Her fur features white and orange colors with black stripes, and her face is adorned with green eyes and fluffy cheeks, enhancing her cheerful expression. The scene is set in misty mountains where Luna is shown climbing an enormous rock wall. Her eyes reflect determination as she grips the rugged surface with her claws, showcasing her adventurous spirit. The mountain's mist adds an atmospheric depth to the background, emphasizing Luna's challenge and her unyielding spirit. The illustration should be rendered in a cartoon style with clean linework and an intermediate level of detail. Use a vibrant color palette to highlight Luna's dynamic presence against the misty mountain backdrop. The digital medium should ensure that the art remains bright and engaging, resonating with the emotions of determination and adventure, specifically tailored for a young audience."
        },
        {
            storybook_id: "1",
            page_number: "3",
            caption: "At the glistening river, Luna couldn't resist the temptation to take a refreshing dip. She splashed and played with the water, her joyful laughter echoing through the trees. It was a moment of pure happiness.",
            image: "DALL-E 2024-05-24 12.43.49.jpg",
            prompt: "Create a vibrant digital cartoon illustration of Luna, a playful and adventurous teenage tiger character, tailored for a children's game. Luna is depicted as a cheerful, chubby tiger with average height, dressed in a vibrant yellow monk tunic and carrying a brown backpack. Her fur is primarily white and orange with black stripe patterns, accented with gradient shading to add depth. Her face is animated with green eyes and fluffy cheeks, enhancing her cheerful expression. The scene unfolds at a glistening river where Luna is gleefully splashing in the water. Her joy is palpable as she plays, with her laughter resonating through the trees, creating a moment of pure happiness. The background features the sparkling river under a bright sky, adding to the scene's light-hearted and joyful ambiance. This illustration should be rendered in a cartoon style with clean linework and an intermediate level of detail. The vibrant color palette should highlight Luna's dynamic presence against the playful river setting, with the digital medium ensuring the artwork remains bright and engaging for a young audience. The depiction should capture the emotion of joy, resonating with Luna's playful and adventurous spirit.\n            "
        },
        {
            storybook_id: "1",
            page_number: "4",
            caption: "In the enchanted meadow, Luna felt an overwhelming delight. She twirled and danced among the colorful flowers, their fragrant petals swirling around her. It was a magical moment she would never forget.",
            image: "DALL-E 2024-05-24 12.47.02.jpg",
            prompt: "Create a vibrant digital cartoon illustration of Luna, a teenage tiger character tailored for a children's game. Luna is depicted as cheerful, with a chubby body shape and average height, sporting a vibrant yellow monk tunic and carrying a brown backpack. Her fur is primarily white and orange with black stripes, featuring gradient shading for depth. Her distinctive green eyes and fluffy cheeks enhance her facial expression, making her appear lively and engaging.\n\n            The scene is set in an enchanted meadow where Luna is dancing, overwhelmed with delight. She twirls among the colorful flowers, their fragrant petals swirling around her, creating a magical atmosphere. This moment of pure joy and enchantment is captured vividly against the backdrop of the lush meadow, bright and filled with life.\n            \n            The illustration should be rendered in a cartoon style with clean linework and an intermediate level of detail. A vibrant color palette should be used to highlight Luna's dynamic presence in this delightful setting, with the digital medium ensuring the artwork is bright and appealing to a young audience. The depiction should convey the emotion of delight, emphasizing Luna's playful and adventurous spirit in this magical moment.            \n            "
        },
        {
            storybook_id: "2",
            page_number: "7",
            caption: "At a vibrant carnival, Loki's eyes sparkle with excitement. He joyfully hops onto a colorful Ferris wheel, going round and round, enjoying the thrilling ride.",
            image: "1716800823455.jpeg",
            prompt: "Generate an image of Loki, a teenage male sheep with a slim body shape and short height. He has distinctive fluffy white wool and is wearing a colorful t-shirt and shorts with a wristband as an accessory. The primary colors of the image should be blue, while green should be used as secondary colors. Loki should have stripes as pattern markings and the image should have a light to dark gradient shading. The art style of the image should be cartoon with clean linework and an intermediate level of detail. Vibrant and vibrant colors should be used for the color palette. The medium of the image should be watercolor. The intended use of the image is for children's illustration, and it should depict Loki at a vibrant carnival with lively attractions. He should be shown riding a colorful Ferris wheel, filled with excitement. The camera angle of the image should be a medium-shot."
        },
        {
            storybook_id: "2",
            page_number: "1",
            caption: "Loki the sheep frolics in a green meadow, complete with beautiful flowers. With a burst of excitement, he jumps over small rocks, his woolly coat bouncing in the breeze.",
            image: "1716800627907.jpeg",
            prompt: "Create an illustration of Loki, a teenage male sheep with a slim body shape and short height. Loki has distinctive features of fluffy white wool. He is wearing a colorful t-shirt and shorts, along with a wristband as an accessory. The primary colors of the color theme are blue, complemented by secondary colors of green. Loki also has stripes as pattern markings, with a gradient shading that transitions from light to dark. The drawing style should be cartoon-like, with clean linework and an intermediate level of detail. The color palette should be vibrant, resembling watercolor. This illustration is intended for children as the audience and can be used for various purposes, such as an illustration in a book or on a poster. The scenario takes place in a green meadow with colorful flowers. Loki is depicted in the illustration jumping joyfully over small rocks, his woolly coat bouncing in the breeze. The emotion conveyed is excitement. Capture this scene from a wide-shot camera angle."
        },
        {
            storybook_id: "2",
            page_number: "2",
            caption: "Venturing into a lush forest, Loki's eyes widen with curiosity. He eagerly explores hidden pathways between tall trees, his hooves tapping gently on the soft forest floor.",
            image: "1716800664396.jpeg",
            prompt: "Generate an image of Loki, a teenage male sheep with a slim body shape and short height. He has distinctive features of fluffy white wool. Loki is wearing a colorful t-shirt and shorts, along with a wristband as an accessory. The color theme of the image should have primary colors of blue and secondary colors of green. Loki has stripes as pattern markings, and the image should have a light to dark gradient shading. The drawing style is a cartoon with clean linework and an intermediate level of detail. The color palette should be vibrant, and the medium used is watercolor. The intended use of the image is for illustration targeted towards children. The scenario for the image is set in a lush forest filled with tall trees. Loki is shown exploring hidden pathways within the forest. His emotion is curiosity, conveyed through his wide eyes. The camera angle for the image is a medium-shot. The description of the scenario is: \"Venturing into a lush forest, Loki's eyes widen with curiosity. He eagerly explores hidden pathways between tall trees, his hooves tapping gently on the soft forest floor.\""
        },
        {
            storybook_id: "2",
            page_number: "3",
            caption: "On a sandy beach, Loki's face lights up with joy. He energetically builds a grand sandcastle, using his hoof to carefully sculpt the towers and moats.",
            image: "1716800700946.jpeg",
            prompt: "Draw Loki, a teenage male sheep with a slim body shape and short height. He has distinctive features of fluffy white wool. He is wearing a colorful t-shirt and shorts with a wristband as an accessory. The primary colors of his outfit are blue and the secondary colors are green. The pattern on his clothing consists of stripes. The color palette for this illustration should be vibrant, and the drawing style should be a clean cartoon with an intermediate level of detail. The medium used for this artwork is watercolor. \n\nThis illustration is intended for children and will depict Loki on a sandy beach with rolling waves. He will be shown building a grand sandcastle with joy on his face. The camera angle for this image should be a full-shot, capturing the entire scene. Loki will be using his hoof to carefully sculpt the towers and moats of the sandcastle."
        },
        {
            storybook_id: "2",
            page_number: "4",
            caption: "High up in snowy mountains, Loki feels thrilled. With a mischievous grin, he slides down the snowy slopes, shouting in delight as fluffy snowflakes spray around him.",
            image: "1716800739684.jpeg",
            prompt: "Generate an image of a male teenage sheep character named Loki. Loki has a slim body shape and is short in height. He has distinctive features of fluffy white wool. He is depicted wearing a colorful t-shirt and shorts, along with a wristband as an accessory. \n\nThe color theme of the illustration should consist of primary colors of blue, secondary colors of green, and pattern markings in stripes. There should be a gradient shading from light to dark. \n\nThe art style of the image should be cartoon-like with clean linework and an intermediate level of detail. The color palette should be vibrant, and the medium used should be watercolor.\n\nThe intended use of the illustration is for children, and the purpose is to capture the thrill of the character. The scenario is set in snowy mountains with glistening peaks. Loki is actively engaged in sliding down snowy slopes. The emotion portrayed is thrill, and the camera angle should be close-up. \n\nThe description of the scene is as follows: High up in snowy mountains, Loki feels thrilled. With a mischievous grin, he slides down the snowy slopes, shouting in delight as fluffy snowflakes spray around him."
        },
        {
            storybook_id: "2",
            page_number: "5",
            caption: "Entering an enchanted garden, Loki's heart fills with happiness. He playfully chases colorful butterflies, his woolly coat fluttering along with the fluttering wings.",
            image: "1716800770146.jpeg",
            prompt: "Create an illustration of Loki, a teenage male sheep with a slim body shape and a short height. Loki has distinctive features of fluffy white wool and is dressed in a colorful t-shirt and shorts with a wristband. The primary colors of the illustration should be blue, while the secondary colors should be green. Loki has stripes as pattern markings, and the gradient shading should transition from light to dark. The drawing style should be cartoon-like, with clean linework and an intermediate level of detail. The color palette should be vibrant, resembling watercolor art. Draw Loki in an enchanted garden filled with colorful butterflies. He is playfully chasing the butterflies, displaying a heart filled with happiness. The camera angle should capture a wide-shot of Loki, showing his woolly coat fluttering along with the fluttering wings of the butterflies. The intended use of this illustration is for children."
        },
        {
            storybook_id: "2",
            page_number: "6",
            caption: "Reaching a majestic mountain peak, Loki is struck with amazement. He stands still, taking in the breathtaking view of the golden sunset, feeling a sense of tranquility within.",
            image: "1716800795693.jpeg",
            prompt: "Create an illustration of Loki, a teenage male sheep with a slim body shape and short height. Loki is known for his fluffy white wool and is wearing a colorful t-shirt and shorts, along with a wristband. The primary colors in the color theme are blue, while the secondary colors are green. The pattern markings include stripes, and the gradient shading ranges from light to dark. The drawing style should be a cartoon with clean linework and intermediate detail level, using a vibrant color palette and watercolor as the medium. The intended use is for illustration, targeting children as the audience. The scenario is set on a majestic mountain peak during sunset, where Loki is seen admiring the breathtaking view. His emotion is amazement, and the camera angle should capture a full-shot of him. The description should convey the moment of Loki standing still, taking in the stunning golden sunset and feeling a sense of tranquility within."
        },
        {
            storybook_id: "2",
            page_number: "8",
            caption: "In a magnificent fairy tale castle, Loki's heart fills with delight. He gracefully dances at a dazzling ball, surrounded by magic and enchantment.",
            image: "1716800856142.jpeg",
            prompt: "Create an illustration of Loki, a teenage male sheep with a slim body shape and short height. Loki has distinctive features of fluffy white wool and is wearing a colorful t-shirt and shorts with a wristband as accessories. The primary colors of the character and outfit are blue, and there are secondary colors of green. Loki has striped pattern markings on his body, and the shading on the illustration should transition from light to dark. The art style is cartoon with clean linework and an intermediate level of detail. The color palette should be vibrant, and the medium used is watercolor. This illustration is intended for children as the audience and serves the purpose of being an illustration. The scenario is set in a fairy tale castle with towering turrets. Loki is engaged in the activity of dancing at a magical ball. The emotion portrayed in the illustration is delight, and the camera angle should be a close-up view. The description of the scene is as follows: \"In a magnificent fairy tale castle, Loki's heart fills with delight. He gracefully dances at a dazzling ball, surrounded by magic and enchantment.\""
        },
        {
            storybook_id: "3",
            page_number: "1",
            caption: "Loki the sheep happily pranced through the sunny meadow, jumping over colorful hurdles with a big smile on his face. The wide-shot captured his cheerful spirit as he gracefully leaped over each obstacle.",
            image: "1716802439047.jpeg",
            prompt: "Draw Loki the teenage male sheep, a slim and short character with fluffy white wool. He is wearing a colorful t-shirt and shorts, along with a wristband. The scene is set in a sunny meadow filled with vibrant flowers and tall grass. Loki is joyful and prances happily through the meadow, jumping over colorful hurdles. His expression is accompanied by a big smile, and the camera angle captures this playful activity in a wide-shot. His distinctive features, such as his fluffy white wool, are beautifully highlighted in the watercolor art style. The clean linework and intermediate level of detail bring the cartoon illustration to life, while the gradient shading seamlessly transitions from light to dark. The color palette features vibrant primary colors, with hints of green and striped pattern markings. Create an illustration of Loki gracefully leaping over each hurdle, perfectly capturing his cheerful spirit."
        },
        {
            storybook_id: "3",
            page_number: "2",
            caption: "Deep in the lush forest, Loki spotted a juicy apple hanging high up on a tall tree. With a determined look, he swiftly climbed the tree trunk branch by branch. The full-shot showed Loki's persistence and the beautiful surroundings filled with chirping birds.",
            image: "1716802477857.jpeg",
            prompt: "Generate an image of Loki, a male teenage sheep, in a dense forest with towering trees and chirping birds. He has a slim body shape and is of short height. Loki is wearing a colorful t-shirt and shorts, along with a wristband. His distinctive feature is his fluffy white wool. The forest has a color theme of blue and green, with stripes and light to dark gradient shading. The art style is cartoon with clean linework and intermediate detail level. The color palette is vibrant, resembling watercolor medium. The intended use is for illustrating to a children's audience. In this scenario, Loki is climbing a tall tree to reach a juicy apple. He shows determination as he swiftly climbs the tree trunk branch by branch. The camera angle is a full-shot showcasing Loki's persistence and the beautiful surroundings with chirping birds."
        },
        {
            storybook_id: "3",
            page_number: "3",
            caption: "Loki and his friends hopped onto a sturdy raft, ready for an exciting river adventure. They maneuvered through the rushing waters, their expressions of delight captured in close-up shots. Loki couldn't contain his excitement as they splashed and laughed together.",
            image: "1716802504934.jpeg",
            prompt: "Generate an image of Loki, a male teenage sheep with a slim, short stature and distinctive fluffy white wool. He is wearing a colorful t-shirt, shorts, and a wristband. The primary colors of the color theme are blue, and the secondary colors are green with striped pattern markings and a light to dark gradient shading. The drawing style is a vibrant cartoon with clean linework, intermediate detail level, and a watercolor color palette. The intended use of the illustration is for children. The scenario is set in a sparkling river rushing through a rocky canyon. Loki and his friends are rafting downstream, filled with excitement. The camera angle is close-up, capturing their expressions of delight as they maneuver through the rushing waters. Loki cannot contain his excitement as they splash and laugh together."
        },
        {
            storybook_id: "3",
            page_number: "4",
            caption: "Inside the enchanting cave, Loki discovered a puzzle that would unlock a hidden treasure chest. With a curious mind, he carefully examined the clues and solved the riddles. Each medium-shot showcased Loki's concentration and the mesmerizing glow of the colorful crystals surrounding him.",
            image: "1716802533808.jpeg",
            prompt: "Create an illustration of Loki, a male teenage sheep with a slim body shape and short height. Loki has distinctive features of fluffy white wool and wears a colorful t-shirt and shorts along with a wristband. The artwork should be in a cartoon art style with clean linework and intermediate detail level. The color palette should be vibrant, resembling a watercolor painting. The primary colors used should be blue, while the secondary colors should be green. The pattern markings should consist of stripes, and the artwork should incorporate a light-to-dark gradient shading. The purpose of this illustration is to target children as the audience. The scenario is set in a mysterious cave glowing with colorful crystals. Loki is engaged in solving puzzles to open a hidden treasure chest. He feels curious throughout the activity. The camera angle should capture Loki in a medium-shot, highlighting his concentration and the mesmerizing glow of the colorful crystals surrounding him."
        },
        {
            storybook_id: "3",
            page_number: "5",
            caption: "In the lively market, Loki met new friends who taught him a joyful dance. With a beaming smile, Loki joined the festive celebration, his energetic movements captured in full-shot. The colorful market and lively music added to the excitement of the moment.",
            image: "1716802555543.jpeg",
            prompt: "Draw Loki, a male teenage sheep with a slim body shape, short height, and distinctive fluffy white wool. Loki is wearing a colorful t-shirt and shorts, accessorized with a wristband. The primary color theme of the illustration is blue, with secondary colors in green. Loki has stripes as pattern markings, and the shading gradient goes from light to dark. The art style is a clean cartoon, with an intermediate level of detail and a vibrant color palette resembling watercolor. The intended use of this illustration is for children. \n\nGenerate an image of Loki in a bustling market with vibrant stalls and lively music. He is seen joyfully performing a dance with new friends. Loki's expression is ecstatic, with a beaming smile on his face. The camera angle captures him in a full-shot, showcasing his energetic movements. The market is colorful, adding to the excitement of the moment."
        },
        {
            storybook_id: "3",
            page_number: "6",
            caption: "As the sun set over the peaceful farm, Loki gathered with his farm animal friends to share stories and laughter. The wide-shot depicted the warm atmosphere, with Loki expressing contentment as they all enjoyed each other's company, surrounded by the beauty of the golden sunset.",
            image: "1716802590656.jpeg",
            prompt: "Create an illustration of Loki, a teenage male sheep, in a peaceful farm bathed in a golden sunset. Loki has a slim body shape and is of short height, adorned with fluffy white wool. He is wearing a colorful t-shirt and shorts along with a wristband. The primary colors of the color theme are blue, complemented by secondary colors of green, incorporating stripes as pattern markings and a gradient shading that transitions from light to dark. The drawing style should be a cartoon with clean linework, an intermediate level of detail, and a vibrant color palette resembling watercolor. This illustration is intended for children. Loki is engaged in the activity of sharing stories and laughter with his farm animal friends. The scene is captured in a wide-shot, portraying a warm atmosphere where Loki and his companions are content and enjoy each other's company, surrounded by the breathtaking beauty of the golden sunset."
        },
        {
            storybook_id: "4",
            page_number: "1",
            caption: "Yuko the cat woke up with a jolt, feeling a burst of excitement bubbling inside her. She quickly crawled out of bed, ready for an adventurous day!",
            image: "1716804439458.jpeg",
            prompt: "Draw Yuko, a young female cat with a petite body shape and short height size, in her cozy and colorful bedroom. She has big round eyes with long eyelashes that give her a cute and innocent appearance. Yuko is wearing a colorful sundress and a flower-shaped hair clip as an accessory. The color theme of the illustration consists of primary colors like pink, yellow, and blue, along with secondary colors like purple and green. Her fur has stripes as distinctive markings, and the overall gradient shading is soft. The drawing style should be Pixar-like, with clean linework and an intermediate level of detail. The color palette should be vibrant, enhancing the lively atmosphere of the scene. Use a watercolor medium to bring out the desired effect. Yuko is shown in a medium-shot camera angle, demonstrating her excitement as she crawls out of bed to start her adventurous day."
        },
        {
            storybook_id: "4",
            page_number: "2",
            caption: "Yuko dashed out to her sunny backyard. Her eyes sparkled with determination as she spotted a tall tree calling out to her. With a leap, she started climbing higher and higher, eager to see the world from up above.",
            image: "1716804467534.jpeg",
            prompt: "Generate an image of Yuko, a young female cat with big round eyes, long eyelashes, and a petite body shape. She is wearing a colorful sundress and a flower-shaped hair clip. The primary colors of the color theme are pink, yellow, and blue, while the secondary colors are purple and green. Yuko has distinctive stripes on her fur, and the shading should be soft, creating a gentle gradient effect. The art style should resemble Pixar, with clean linework and an intermediate level of detail. The color palette should be vibrant, and the medium used should be watercolor. The intended use of the illustration is for children, and it should depict Yuko in her sunny backyard. She is shown climbing a tall tree with determination. The camera angle should be a wide shot, capturing the entire scene. The prompt description is as follows: \"Draw Yuko, a young female cat with big round eyes and long eyelashes. She has a petite body shape and is wearing a colorful sundress with a flower-shaped hair clip. Her fur has distinctive stripes, and the shading should be soft with a gradient effect. The art style should resemble Pixar, with clean linework and an intermediate level of detail. The color palette should be vibrant, and the medium used should be watercolor. The illustration is intended for children and should depict Yuko in her sunny backyard. She is climbing a tall tree with determination, eager to see the world from up above.\""
        },
        {
            storybook_id: "4",
            page_number: "3",
            caption: "Running through a beautiful meadow, Yuko giggled with joy as she spotted a group of fluttering butterflies. She couldn't resist the temptation and started chasing them around, her paws lightly touching the soft grass.",
            image: "1716804489932.jpeg",
            prompt: "Draw Yuko, a young female cat with a petite body shape and short height, wearing a colorful sundress and a flower-shaped hair clip. Her big round eyes, adorned with long eyelashes, gaze excitedly at the scene before her. The primary colors of the setting are pink, yellow, and blue, while the secondary colors are purple and green. Yuko has distinctive striped markings on her fur. The grassy meadow by the shimmering lake serves as the backdrop. With a Pixar art style, the illustration showcases clean linework and an intermediate level of detail. The vibrant color palette and watercolor medium enhance the lively atmosphere. Yuko's emotions radiate pure joy as she engages in her favorite activity of chasing colorful butterflies. The camera angle captures a full shot of Yuko running through the meadow, her paws delicately touching the soft grass."
        },
        {
            storybook_id: "4",
            page_number: "4",
            caption: "Venturing into a mysterious forest, Yuko's curiosity grew stronger. She sniffed the air and followed a narrow path, her eyes wide open with anticipation. Every step she took revealed new surprises and intriguing secrets.",
            image: "1716804523344.jpeg",
            prompt: "Draw Yuko, a young female cat with a petite body shape and short height size, wearing a colorful sundress and a flower-shaped hair clip. She has big round eyes with long eyelashes. The primary colors of the color theme are pink, yellow, and blue, while the secondary colors are purple and green. Yuko's body has stripes as pattern markings, and there is a soft gradient shading in the illustration. The art style is Pixar, with clean linework and an intermediate level of detail. The color palette is vibrant, and the medium used for the illustration is watercolor. The intended use of the illustration is for children. \n\nThe scenario is set in a mysterious forest, where Yuko is engaged in the activity of exploring hidden paths. Her emotion is curiosity, and the camera angle for the illustration is a wide-shot. The description of the scenario is as follows: Venturing into a mysterious forest, Yuko's curiosity grew stronger. She sniffed the air and followed a narrow path, her eyes wide open with anticipation. Every step she took revealed new surprises and intriguing secrets."
        },
        {
            storybook_id: "4",
            page_number: "5",
            caption: "In a bustling marketplace, Yuko's heart filled with warmth as she noticed scared and lonely animals who had lost their owners. With a gentle touch, she guided them, showing them the way home, her eyes brimming with kindness.",
            image: "1716804550790.jpeg",
            prompt: "Draw Yuko, a female cat with a petite body shape and short height, wearing a colorful sundress with a flower-shaped hair clip. She has big round eyes and long eyelashes. The color theme consists of primary colors like pink, yellow, and blue, along with secondary colors like purple and green. Yuko's body has stripes as pattern markings, and the shading is done with a soft gradient. The art style should be similar to Pixar, with clean linework and intermediate level of detail. Use a vibrant color palette and the medium of watercolor.\n\nThe illustration depicts Yuko in a bustling marketplace, where she is engaged in the activity of helping lost animals find their way. Her expression radiates kindness as she gently guides these scared and lonely animals, showing them the way home. Her eyes are brimming with warmth, and the camera angle is a close-up of Yuko's face.\n\nCreate an illustration of Yuko in the bustling marketplace, helping lost animals with her kindheartedness."
        },
        {
            storybook_id: "4",
            page_number: "6",
            caption: "As the sun began to set, Yuko followed a familiar path back to her cozy bedroom. With each step, a sense of contentment washed over her, knowing that she had filled her adventurous day with thrilling experiences and happy memories.",
            image: "1716804580769.jpeg",
            prompt: "Create an illustration of Yuko, a female child cat with a petite body shape and short height. She has big round eyes, long eyelashes, and wears a colorful sundress with a flower-shaped hair clip. The primary colors of the color theme are pink, yellow, and blue, while the secondary colors are purple and green. Yuko has distinctive striped markings and the artwork should have soft gradient shading. The chosen art style is Pixar, with clean linework and intermediate detail level. Use a vibrant color palette and the medium of watercolor. The intended use of the illustration is for children, specifically depicting Yuko returning to her cozy bedroom. She is portrayed in a medium-shot camera angle, exuding contentment. The description emphasizes the setting sun, Yuko's familiar path, and her sense of fulfillment after a day filled with thrilling experiences and happy memories."
        }
    ]);
};