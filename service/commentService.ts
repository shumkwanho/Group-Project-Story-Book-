import { Knex } from "knex";

export class CommentService {
    constructor(private knex: Knex){ }

        getAllComment = async (content: string, user_id: string, storybook_id: string) => {
            let result = await this.knex
            .select("username","content", "comments.id")
            .from("comments")
            .join("users","user_id","=","users.id")
        
            return result
        }
        
        createComment = async (content: string, user_id: string, storybook_id: string) => {
            let result = await this.knex
            .insert ({content, user_id, storybook_id })
            .into("comments")

            return result
        }

        updateComment = async (content: string,  comment_id: string) => {
           
           console.log(content, comment_id);
           
            let result = await this.knex
            ("comments")
            .update({
                content: content,
                updated_at: this.knex.fn.now()
            })
            .where("id", comment_id)
            .orderBy("created_at", "asc")

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
