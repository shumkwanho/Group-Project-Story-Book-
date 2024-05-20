import { Knex } from "knex";

export class characterService {
    constructor(private knex: Knex) { }

    createCharacter = async (userId: string, characterName: string, image_name: string) => {
        await this.knex.insert({ userId, characterName, image_name }).into("characters")
    }

    deleteCharacter = async (characterId: string) => {
        await this.knex("characters").where("characterId", "id").del()
    }
}