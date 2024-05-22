import { Knex } from "knex";

export class CommentService {
    constructor(private knex: Knex){ }

        getAllComment = async (content: string, user_id: string, storybook_id: string) => {
            let result = await this.knex
            .select("*")
            .from("comments")
        
            return result
        }
        
        createComment = async (content: string, user_id: string, storybook_id: string) => {
            await this.knex
            .insert ({content, user_id, storybook_id })
            .into("comments")
        }

        updateComment = async (content: string,  comment_id: string) => {
            let result = await this.knex
            ("comments")
            .update({
                content,
                updated_at: this.knex.fn.now()
            })
            .where("id", comment_id)

            return result
        }

        deleteComment = async (comment_id: string) => {
            let result = await this.knex
            ("comments")
            .where("id", comment_id)
            .del();

            console.log(result)
            
        }
    }
