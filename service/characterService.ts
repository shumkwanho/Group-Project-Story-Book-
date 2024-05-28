import { Knex } from "knex";

export class CharacterService {
    constructor(private knex: Knex) { }

    loadCharacter = async () => {
        const data = await this.knex
            .select("id", "name", "image")
            .from("characters")
        return data
    }

    loadCharacterById = async (character_id: string) => {
        const data = await this.knex
            .select("name", "prompt", "requirement", "image")
            .from("characters")
            .where("id", character_id)
        return data;
    }

    createCharacter = async (
        user_id: string, 
        name: string, 
        image: string, 
        prompt: string,
        requirement: string
    ) => {
        await this.knex
            .insert({ 
                user_id, name, image, prompt, requirement
            })
            .into("characters")
    }

    deleteCharacter = async (character_id: string) => {
        await this.knex("characters")
            .where("id", character_id)
            .del()
    }
}