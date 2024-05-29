import { Knex } from "knex";

export class UserService {
    constructor(private knex: Knex) { }

    login = async (email: string) => {
        return await this.knex.select('*').from("users").where('email', email)
    }

    checkDuplicateUser = async (username: string, email: string) => {
        return await this.knex.select("*").from("users").where("email", email).orWhere("username", username)
    }


    register = async (username: string, email: string, password: string) => {
        return await this.knex.insert({ username, email, password }).into("users").returning("id")
    }

    getUserInfo = async (userId: string) => {
        return this.knex.select("id", "username", "email").from("users").where("id", userId)
    }

    getStorybookbyUserId = async (userId: string) => { 
        return this.knex.select("id","character_id","bookname","description","target_age","created_at","category","total_page")
                .from("storybooks").where("user_id",userId)
    }       
}