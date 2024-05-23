import { Knex } from "knex";

export class PaymentService {
    constructor(private knex: Knex) { }

    createPayment = async (user_id:string) =>{
        await this.knex.insert({ user_id, status:"pending" }).into("payment")
    }

    updatePayment = async(user_id:string,payment_id:string) =>{
        await this.knex.raw('update payment set payment_id = ?,status = finished where user_id = ?',[payment_id,user_id])
    }
}