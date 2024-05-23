import { Knex } from "knex";

export class StorybookService {
    constructor(private knex: Knex) { }

    loadStorybook = async () => {
        const data = await this.knex
            .select("id", "bookname", "description", "target_age")
            .from("storybooks")
        return data
    }

    getStroyBookInfoById = async (id?: string) => {
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
}