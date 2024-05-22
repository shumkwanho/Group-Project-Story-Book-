import { Knex } from "knex";

export class CharacterService {
    constructor(private knex: Knex) { }

    loadCharacter = async () =>{
        const data = await this.knex.select("*").from("characters")
        return data
    }
    createCharacter = async (user_id: string, character_name: string, image_name: string) => {
        await this.knex.insert({ user_id, character_name, image_name }).into("characters")
    }

    deleteCharacter = async (character_id: string) => {
        await this.knex("characters").where("id", character_id).del()
    }
}