import { Knex } from "knex";

export class StorybookService {
    constructor(private knex: Knex) { }

    loadStorybook = async () =>{
        const data = await this.knex.select("id","bookname","description","target_age").from("storybooks")
        return data
    }

}