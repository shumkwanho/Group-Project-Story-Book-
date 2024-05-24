import { Knex } from "knex";

export class StorybookService {
    constructor(private knex: Knex) { }

    loadAllStorybook = async () => {
        const data = await this.knex
            .select("id", "bookname", "description", "target_age")
            .from("storybooks")
        return data
    }

    getStoryBookInfoById = async (id?: string) => {
        return await this.knex('storybooks')
            .select(
                'storybooks.bookname',
                'storybooks.description',
                'storybooks.target_age',
                'storybooks.category',
                'storybooks.total_page',
                'characters.name as character_name'
            )
            .innerJoin('characters', 'storybooks.character_id', 'characters.id')
            .where('storybooks.id', id);
    }

    getStoryBookById = async (id: string) => {
        return await this.knex.select("bookname", "description", "create_at", "target_age", "style", "catafory", "total_page").from("storybooks")
            .where("id", id)
    }

    getCharacterByStorybookId = async (id: string) => {
        return await this.knex.select("characters.name as character_name")
            .from("storybooks")
            .innerJoin('characters', 'storybooks.character_id', 'characters.id')
            .where('storybooks.id', id);
    }
}