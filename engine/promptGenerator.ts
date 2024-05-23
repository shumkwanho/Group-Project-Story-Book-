export function storybookPrompt(characterName: string, targetAge: number, category: string, totalPage: number) {
    let prompt = 
    `You are a storybook generator. Generate a children story book of ${totalPage} pages. The target age group of the storybook is ${targetAge} years old. The name of the main character is "${characterName}". The category the the story is under ${category}Each page must involve a main character in a scenario. The scenario should always:
1. be in a setting; 
2. have the main character doing an activity (use dynamic verbs, not passive things like "waiting" or "watching")
3. have the main character showing a strong emotion.

Respond with the following exact format in JSON (do not add any conclusions at the end):
{
Story_Name: ...

Plot: [
    {
        Scenario: 1
        Setting: ...
        Activity: ...
        Emotion: ...
        Description: ...
    },
    {
        Scenario: 2
        Setting: ...
        Activity: ...
        Emotion: ...
        Description: ...
    },
    ...
    {
        Scenario: ${totalPage}
        Setting: ...
        Activity: ...
        Emotion: ...
        Description: ...
    }
]
}
    `;

    return prompt
}

export function characterPrompt() {
    let prompt = {
        "character_features": {
            "species_type": "tiger", //(e.g., tiger, cat, human, robot)
            "gender": "female", //(e.g., male, female, non-binary)
            "name": "Luna", 
            "age": "teenager", //(e.g., child, teenager, adult, elderly)
            "body_shape": "chubby", //(e.g., slim, muscular, chubby, petite)
            "height_size": "average", //(e.g., tall, short, average)
            "distinctive_features": ["green eyes", "fluffy cheeks"], //(e.g., fluffy cheeks, tuft on head, big eyes)
            "facial_expression": "cheerful", //(e.g., happy, sad, angry, surprised)
            "clothing_outfit": "yellow monk tunic", //(e.g., monk tunic, superhero costume, casual wear)
            "accessories": ["brown backpack"] //(e.g., hat, glasses, backpack, weapon)
        },
        "color_theme": {
            "primary_colors": ["white", "orange"], //(e.g., yellow, blue, red)
            "secondary_colors": ["black"], //(e.g., green, purple, orange)
            "pattern_markings": ["stripes"], //(e.g., stripes, spots, solid color)
            "gradient_shading": "gradient shading" //(e.g., gradient shading, flat colors)
        },
        "drawing_style": {
            "art_style": "cartoon", //(e.g., cartoon, realistic, chibi, manga)
            "linework": "clean", //(e.g., clean, sketchy, bold, fine)
            "detail_level": "intermediate", //(e.g., highly detailed, minimalist, intermediate)
            "color_palette": "vibrant", //(e.g., vibrant, pastel, monochrome)
            "medium": "digital" //(e.g., digital, watercolor, pencil sketch)
        },
        "intended_use": {
            "purpose": "2D game asset", //(e.g., 2D game asset, animation, illustration)
            "emotion_tone": "playful and adventurous", //(e.g., playful, serious, whimsical)
            "audience": "children" //(e.g., children, teenagers, adults)
        }
    }
}