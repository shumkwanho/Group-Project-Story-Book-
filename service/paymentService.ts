import { Knex } from "knex";

export class PaymentService {
    constructor(private knex: Knex) { }

    createPayment = async (user_id:string) =>{
        await this.knex.insert({ user_id, status:"pending" }).into("payment")
    }

    updatePayment = async(user_id:string,payment_id:string) =>{
        await this.knex.raw("update payment set payment_id = ?,status = 'completed' where user_id = ?",[payment_id,user_id])
    }

    checkUserPayment = async(userId:string)=>{
        return await this.knex("payment")
        .where({
            user_id : userId,
            status:"completed"
        })
        .select("*")
    }
}