import { Knex } from "knex";

export class LikeService {
    constructor(private knex: Knex) { }

    getLikes = async (user_id:string)=>{
        const result = await this.knex.select("storybook_id").from("like_relation").where("user_id",user_id)
        return result
    }


    likeBook = async (user_id:string, storybook_id:string) =>{
        await this.knex.insert ({user_id,storybook_id}).into("like_relation")
    }

    dislikeBook = async (user_id:string, storybook_id:string) =>{
        await this.knex("like_relation").where("user_id", user_id).andWhere("storybook_id",storybook_id).del()
    }
}