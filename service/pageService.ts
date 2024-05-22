import { Knex } from "knex";

export class PageService {
    constructor(private knex: Knex) {}

    async getAllPageByStorybookId(storybookId) {
        return await this.knex
            .select('page_number', 'caption', 'image')
            .from('storybook_pages')
            .orderBy('page_number', 'asc')
            .where('storybook_id', '=', storybookId);
    }
}