import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("storybooks").del();

    // Inserts seed entries
    await knex("storybooks").insert([
        {
            user_id: "1",
            character_id: "1",
            bookname: "Luna's Adventure",
            description: "Luna's Adventure",
            is_public: "true",
            target_age: "6",
            category: "adventure",
            total_page: "4",
            plot: "empty example"
        },
        {
            user_id: "1",
            character_id: "2",
            bookname: "Loki the Sheep's Adventurous Day",
            description: "Join Loki the sheep on his thrilling adventure as he explores different places and discovers new things!",
            is_public: "false",
            target_age: "6",
            category: "adventure",
            total_page: "8",
            plot: "{\"story_name\":\"Loki the Sheep's Adventurous Day\",\"description_summary\":\"Join Loki the sheep on his thrilling adventure as he explores different places and discovers new things!\",\"scenario\":[{\"page\":1,\"setting\":\"Green meadow with colorful flowers\",\"activity\":\"Jumping joyfully over small rocks\",\"emotion\":\"Excitement\",\"camera_angle\":\"Wide-shot\",\"description\":\"Loki the sheep frolics in a green meadow, complete with beautiful flowers. With a burst of excitement, he jumps over small rocks, his woolly coat bouncing in the breeze.\"},{\"page\":2,\"setting\":\"Lush forest filled with tall trees\",\"activity\":\"Exploring hidden pathways\",\"emotion\":\"Curiosity\",\"camera_angle\":\"Medium-shot\",\"description\":\"Venturing into a lush forest, Loki's eyes widen with curiosity. He eagerly explores hidden pathways between tall trees, his hooves tapping gently on the soft forest floor.\"},{\"page\":3,\"setting\":\"Sandy beach with rolling waves\",\"activity\":\"Building a sandcastle\",\"emotion\":\"Joy\",\"camera_angle\":\"Full-shot\",\"description\":\"On a sandy beach, Loki's face lights up with joy. He energetically builds a grand sandcastle, using his hoof to carefully sculpt the towers and moats.\"},{\"page\":4,\"setting\":\"Snowy mountains with glistening peaks\",\"activity\":\"Sliding down snowy slopes\",\"emotion\":\"Thrill\",\"camera_angle\":\"Close-up\",\"description\":\"High up in snowy mountains, Loki feels thrilled. With a mischievous grin, he slides down the snowy slopes, shouting in delight as fluffy snowflakes spray around him.\"},{\"page\":5,\"setting\":\"Enchanted garden with colorful butterflies\",\"activity\":\"Chasing butterflies playfully\",\"emotion\":\"Happiness\",\"camera_angle\":\"Wide-shot\",\"description\":\"Entering an enchanted garden, Loki's heart fills with happiness. He playfully chases colorful butterflies, his woolly coat fluttering along with the fluttering wings.\"},{\"page\":6,\"setting\":\"Majestic mountain peak during sunset\",\"activity\":\"Admiring the breathtaking view\",\"emotion\":\"Amazement\",\"camera_angle\":\"Full-shot\",\"description\":\"Reaching a majestic mountain peak, Loki is struck with amazement. He stands still, taking in the breathtaking view of the golden sunset, feeling a sense of tranquility within.\"},{\"page\":7,\"setting\":\"Vibrant carnival with lively attractions\",\"activity\":\"Riding a colorful Ferris wheel\",\"emotion\":\"Excitement\",\"camera_angle\":\"Medium-shot\",\"description\":\"At a vibrant carnival, Loki's eyes sparkle with excitement. He joyfully hops onto a colorful Ferris wheel, going round and round, enjoying the thrilling ride.\"},{\"page\":8,\"setting\":\"Fairy tale castle with towering turrets\",\"activity\":\"Dancing at a magical ball\",\"emotion\":\"Delight\",\"camera_angle\":\"Close-up\",\"description\":\"In a magnificent fairy tale castle, Loki's heart fills with delight. He gracefully dances at a dazzling ball, surrounded by magic and enchantment.\"}]}"
        },
        {
            user_id: "1",
            character_id: "4",
            bookname: "Loki's Adventure",
            description: "Join Loki the sheep on his exciting adventure through different settings filled with fun activities, strong emotions, and captivating camera angles.",
            is_public: "false",
            target_age: "6",
            category: "adventure",
            total_page: "6",
            plot: "{\"story_name\":\"Loki's Adventure\",\"description_summary\":\"Join Loki the sheep on his exciting adventure through different settings filled with fun activities, strong emotions, and captivating camera angles.\",\"scenario\":[{\"page\":1,\"setting\":\"A sunny meadow with colorful flowers and tall grass\",\"activity\":\"Jumping over hurdles in a playful manner\",\"emotion\":\"Joyful\",\"camera_angle\":\"Wide-shot\",\"description\":\"Loki the sheep happily pranced through the sunny meadow, jumping over colorful hurdles with a big smile on his face. The wide-shot captured his cheerful spirit as he gracefully leaped over each obstacle.\"},{\"page\":2,\"setting\":\"A dense forest with towering trees and chirping birds\",\"activity\":\"Climbing a tall tree to reach a juicy apple\",\"emotion\":\"Determined\",\"camera_angle\":\"Full-shot\",\"description\":\"Deep in the lush forest, Loki spotted a juicy apple hanging high up on a tall tree. With a determined look, he swiftly climbed the tree trunk branch by branch. The full-shot showed Loki's persistence and the beautiful surroundings filled with chirping birds.\"},{\"page\":3,\"setting\":\"A sparkling river rushing through a rocky canyon\",\"activity\":\"Rafting downstream with friends\",\"emotion\":\"Excited\",\"camera_angle\":\"Close-up\",\"description\":\"Loki and his friends hopped onto a sturdy raft, ready for an exciting river adventure. They maneuvered through the rushing waters, their expressions of delight captured in close-up shots. Loki couldn't contain his excitement as they splashed and laughed together.\"},{\"page\":4,\"setting\":\"A mysterious cave glowing with colorful crystals\",\"activity\":\"Solving puzzles to open a hidden treasure chest\",\"emotion\":\"Curious\",\"camera_angle\":\"Medium-shot\",\"description\":\"Inside the enchanting cave, Loki discovered a puzzle that would unlock a hidden treasure chest. With a curious mind, he carefully examined the clues and solved the riddles. Each medium-shot showcased Loki's concentration and the mesmerizing glow of the colorful crystals surrounding him.\"},{\"page\":5,\"setting\":\"A bustling market with vibrant stalls and lively music\",\"activity\":\"Performing a joyful dance with new friends\",\"emotion\":\"Ecstatic\",\"camera_angle\":\"Full-shot\",\"description\":\"In the lively market, Loki met new friends who taught him a joyful dance. With a beaming smile, Loki joined the festive celebration, his energetic movements captured in full-shot. The colorful market and lively music added to the excitement of the moment.\"},{\"page\":6,\"setting\":\"A peaceful farm bathed in a golden sunset\",\"activity\":\"Sharing stories and laughter with the farm animals\",\"emotion\":\"Content\",\"camera_angle\":\"Wide-shot\",\"description\":\"As the sun set over the peaceful farm, Loki gathered with his farm animal friends to share stories and laughter. The wide-shot depicted the warm atmosphere, with Loki expressing contentment as they all enjoyed each other's company, surrounded by the beauty of the golden sunset.\"}]}"
        },
        {
            user_id: "1",
            character_id: "6",
            bookname: "Yuko's Adventurous Day",
            description: "Join Yuko the cat as she embarks on a thrilling adventure filled with excitement and surprises.",
            is_public: "false",
            target_age: "6",
            category: "adventure",
            total_page: "6",
            plot: "{\"story_name\":\"Yuko's Adventurous Day\",\"description_summary\":\"Join Yuko the cat as she embarks on a thrilling adventure filled with excitement and surprises.\",\"scenario\":[{\"page\":1,\"setting\":\"Yuko's cozy and colorful bedroom\",\"activity\":\"crawling out of bed\",\"emotion\":\"excitement\",\"camera_angle\":\"medium-shot\",\"description\":\"Yuko the cat woke up with a jolt, feeling a burst of excitement bubbling inside her. She quickly crawled out of bed, ready for an adventurous day!\"},{\"page\":2,\"setting\":\"Yuko's sunny backyard\",\"activity\":\"climbing a tall tree\",\"emotion\":\"determination\",\"camera_angle\":\"wide-shot\",\"description\":\"Yuko dashed out to her sunny backyard. Her eyes sparkled with determination as she spotted a tall tree calling out to her. With a leap, she started climbing higher and higher, eager to see the world from up above.\"},{\"page\":3,\"setting\":\"A grassy meadow by a shimmering lake\",\"activity\":\"chasing colorful butterflies\",\"emotion\":\"joy\",\"camera_angle\":\"full-shot\",\"description\":\"Running through a beautiful meadow, Yuko giggled with joy as she spotted a group of fluttering butterflies. She couldn't resist the temptation and started chasing them around, her paws lightly touching the soft grass.\"},{\"page\":4,\"setting\":\"A mysterious forest\",\"activity\":\"exploring hidden paths\",\"emotion\":\"curiosity\",\"camera_angle\":\"wide-shot\",\"description\":\"Venturing into a mysterious forest, Yuko's curiosity grew stronger. She sniffed the air and followed a narrow path, her eyes wide open with anticipation. Every step she took revealed new surprises and intriguing secrets.\"},{\"page\":5,\"setting\":\"A bustling marketplace\",\"activity\":\"helping lost animals find their way\",\"emotion\":\"kindness\",\"camera_angle\":\"close-up\",\"description\":\"In a bustling marketplace, Yuko's heart filled with warmth as she noticed scared and lonely animals who had lost their owners. With a gentle touch, she guided them, showing them the way home, her eyes brimming with kindness.\"},{\"page\":6,\"activity\":\"returning to Yuko's cozy bedroom\",\"emotion\":\"contentment\",\"camera_angle\":\"medium-shot\",\"description\":\"As the sun began to set, Yuko followed a familiar path back to her cozy bedroom. With each step, a sense of contentment washed over her, knowing that she had filled her adventurous day with thrilling experiences and happy memories.\"}]}"
        }
    ]);
};
