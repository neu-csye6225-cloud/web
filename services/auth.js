import {Buffer} from 'buffer'
import bcrypt from "bcrypt"
import { findUserbyUsername } from './userService.js';

export async function checkToken(req, res ,next){
    const arr = getCredentials(req)
    const username = arr[0];
    const password = arr[1];
    const user = await findUserbyUsername(username);
    if(!user){
        return res.status(401).json("Unauthorized")
    }
    const passwordCheck = await bcrypt.compare(password, user.password)
    if(!passwordCheck){
        return res.status(401).json("Unauthorized")
    }
    return next()
}

export const getCredentials = (req)=>{;
    const token = req.header('Authorization')
    //decode the base64 to string
    const originalCred = Buffer.from(token.substring(6),'base64').toString('utf-8')
    const arr= originalCred.split(':');
    return arr;
}