//TODO: take in parameters
export function genCharacterRequirementJSON() {
    let characterRequirementJSON = {
        "character_features": {
            "species_type": "tiger",
            //choice: tiger, cat, human, robot, wolf, elephant, fox, alien, dragon, bear, unicorn, fairy, gnome, mermaid
            "gender": "male",
            //choice: male, female
            "name": "Zeno",
            //free input
            "age": "teenager",
            //choice: child, teenager, adult, elderly
            "body_shape": "chubby",
            //choice: slim, muscular, chubby, petite
            "height_size": "average",
            //choice: tall, short, average
            "distinctive_features": ["big green eyes", "fluffy cheeks"],
            //choice (at most 2): fluffy cheeks, tuft on head, big green eyes, freckles, pointed ears, pixie ears, button nose, raindrop dimples

            // "facial_expression": "cheerful",
            // //choice: cheerful, happy, sad, angry, surprised, mischievous
            
            "clothing_outfit": "yellow monk tunic",
            //choice (with color): monk tunic, superhero costume, casual wear, space suit, pirate outfit, royal gown, ninja attire, cowboy costume, school uniform, business suit, beachwear, vintage dress, sports gear
            "accessories": ["brown backpack"]
            //choice (with color): hat, glasses, backpack, weapon, magic wand
        },
        "color_theme": {
            "primary_colors": ["white", "orange"],
            //choice (at most 2): yellow, blue, red, white, orange, green, purple, cyan, magenta, teal, silver, gold, maroon, navy, turquoise, lime, peach, beige, lavender, grey, tan, cream
            "secondary_colors": ["black"],
            //choice (at most 2 / differ from primary_colors): yellow, blue, red, white, orange, green, purple, cyan, magenta, teal, silver, gold, maroon, navy, turquoise, lime, peach, beige, lavender, grey, tan, cream
            "pattern_markings": ["stripes"],
            //choice: stripes, spots, solid color
            "gradient_shading": "gradient shading"
            //choice: gradient shading, flat colors
        },
        "drawing_style": {
            "art_style": "pixar",
            //choice: cartoon, chibi, manga, pixar, studio ghibli
            //for our app, fixed with "cartoon"
            "linework": "clean",
            //choice: clean, sketchy, bold, fine)
            "detail_level": "intermediate",
            //choice: highly detailed, minimalist, intermediate
            "color_palette": "vibrant",
            //choice: vibrant, pastel, monochrome, warm, cool
            "medium": "watercolor"
            //choice: digital, watercolor, pencil sketch
        },
        "intended_use": {
            "purpose": "illustration", 
            //choice: 2D game asset, animation, illustration
            //for our app, fixed with "illustration"

            // "emotion_tone": "playful and adventurous", 
            // //choice: playful, whimsical, adventurous, comedic, energetic
            // //for our app, fixed with playful and adventurous

            "audience": "children" 
            //choice: children, teenagers, adults)
            //for our app, fixed with children
        }
    }

    return characterRequirementJSON
}