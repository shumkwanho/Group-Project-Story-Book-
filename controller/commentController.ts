import { CommentService } from "../service/commentService";
import { Request, Response } from "express";
// import { form } from "../utils/formidable";

export class CommentController{
    constructor(private service: CommentService){ }
    
    getAllComment = async (req: Request, res: Response) => {
        try {
            const { content, comments_id, username } = req.query;
            const comments = await this.service.getAllComment(
                content as string,
                comments_id as string,
                username as string,
                
            );
            // res.status(200).json({ message: "Get All Comment Success"})
            res.status(200).json({ comments })
            // console.log(comments)
        } catch (error) {
            console.log(error);
            res.status(500).json ({ message: "Internal Server Error"})
        }
    }

    createComment = async (req:Request, res: Response) => {
        try{
            let user_id = "1"
            let storybook_id = "1"
            const  content  = req.body.text
            const comment = await this.service.createComment(content, user_id, storybook_id);

            
            // res.status(200).json({ message: "create comment success"})
            res.status(200).json({ comment })

            
        } catch (error){
            console.log(error)
            res.status(500).json ({ message: "Internal Server Error"})
        }
    }

    updateComment = async (req: Request, res: Response) => {
        try {
          const { content, comment_id } = req.body;
          await this.service.updateComment(content, comment_id);
          res.status(200).json({ message: 'Comment updated' });
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: 'Internal server error' });
        }
      };

    deleteComment = async (req: Request, res: Response) => {
        try{
            console.log(req.body)
            const { commentId } = req.body
            await this.service.deleteComment(commentId)
            res.status(200).json({ message: "delete success"})
        } catch (error){
            console.log(error);
            res.status(500).json ({ message: "Internal Server Error"})
        }
    }
}