import { Request, Response } from "express";
import { UserService } from "../service/userService";
import bcrypt from 'bcrypt';

export class UserController {
    constructor(private service: UserService) { }

    checkLogin = async (req: Request, res: Response) => {
        if (req.session.userId) {
            return res.json({ data: req.session.userId })
        }
        return res.json({ messgae: "Did not login" })
    }

    login = async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body;
            
            const user = (await this.service.login(email))[0]

            if (!user) {
                // If no user record is found, return a 401 Unauthorized error
                return res.status(401).json({ message: 'Invalid credentials user not exist' });
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (!isPasswordValid) {
                // If the password doesn't match, return a 401 Unauthorized error
                return res.status(401).json({ message: 'Invalid credentials password not match' });
            }

            req.session.userId = (user.id).toString()
            req.session.save()
            // The password matches, return a 202 Accepted response
            return res.status(202).json({ message: 'Login successful', data: user.id });
        } catch (error) {
            console.error('Error in login route:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }


    register = async (req: Request, res: Response) => {
        try {
            const { username, email, password, confirmPassword } = req.body;
            // 1. Check if passwords match
            if (!password || !confirmPassword) {
                return res.status(400).json({ message: 'Password and confirm password fields are required' });
            }

            if (password !== confirmPassword) {
                return res.status(400).json({ message: 'Passwords do not match' });
            }

            const existingUser = await this.service.checkDuplicateUser(username, email)
            if (existingUser[0]) {
                return res.status(400).json({ message: 'Username or email already exists' });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const userId = await this.service.register(username,email,password)

            req.session.userId = userId.toString()
            req.session.save()
            res.status(200).json({ message: 'Registration successful' });

        } catch (error) {
            console.error('Error in login route:', error);
            return res.status(500).json({ message: 'Internal server error' })
        }
    }

    logout = (req: Request, res: Response) =>{
        try {
            req.session.destroy((e)=>{
                res.json({"message":"logoutSuccess"})
            })

        } catch (error) {
            console.error('Error in login route:', error);
            return res.status(500).json({ message: 'Internal server error' })
        }
    }

    getUserInfo = async (req: Request, res: Response) =>{
        try {
            const userId = req.session.userId
            const data = (await this.service.getUserInfo(userId as string))[0]
            return res.json({data})
        } catch (error) {
            console.error('Error in login route:', error);
            return res.status(500).json({ message: 'Internal server error' })
        }
    }


}