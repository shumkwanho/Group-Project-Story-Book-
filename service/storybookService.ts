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
        return await this.knex
            .select("bookname", "description", "target_age", "style", "total_page", "category", "created_at")
            .from("storybooks")
            .where("id", id)
    }

    getCharacterByStorybookId = async (id: string) => {
        return await this.knex
            .select("characters.name as character_name")
            .from("storybooks")
            .innerJoin('characters', 'storybooks.character_id', 'characters.id')
            .where('storybooks.id', id);
    }

    createStorybook = async (
        user_id: number, 
        bookname: string, 
        description: string, 
        character_id: number, 
        target_age: number, 
        category: string, 
        total_page: number,
        plot: string
    ) => {
        return await this.knex('storybooks')
            .insert({
                user_id,
                bookname,
                description,
                character_id,
                target_age,
                category,
                total_page,
                plot
            })
            .returning('id');
    }

    getStoryBookCategory = async ()=>{
        let data:{
            all?:number
            category?:any,
            target_age?:any,
            total_page?:any
        } = {}
        data.all = (await this.knex.raw("select * from storybooks")).rows.length
        data.category = (await this.knex.raw("select category, count(category) from storybooks where category is not null group by category ")).rows
        data.total_page = (await this.knex.raw("select total_page, count(total_page) from storybooks where total_page is not null group by total_page ")).rows
        data.target_age = (await this.knex.raw("select target_age, count(target_age) from storybooks where target_age is not null group by target_age ")).rows        
        return data
    }

    filterBook = async(column:string, condition:string[])=>{
        return await this.knex.select("id", "bookname", "description", "target_age").from("storybooks").where(`${column}`,condition)
    }

    storybookSorting = async(category:string)=>{
        return await this.knex.select("id", "bookname", "description", "target_age").from("storybooks").orderBy(category)
    }

    aggregateSorting = async()=>{
        return (await this.knex.raw(`
        select count(storybook_id),bookname,description,target_age,storybook_id 
        from like_relation 
        right join storybooks 
        on storybooks.id = storybook_id 
        group by storybook_id,bookname,description,target_age`)).rows
    }
}

