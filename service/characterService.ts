import { Knex } from "knex";

export class CharacterService {
    constructor(private knex: Knex) { }

    loadCharacter = async () =>{
        const data = await this.knex.select("id","name","image").from("characters")
        return data
    }
    createCharacter = async (
        user_id: string, 
        name: string, 
        image: string, 
        prompt: string
    ) => {
        await this.knex
            .insert({ 
                user_id, name, image, prompt 
            })
            .into("characters")
    }

    deleteCharacter = async (character_id: string) => {
        await this.knex("characters").where("id", character_id).del()
    }
}