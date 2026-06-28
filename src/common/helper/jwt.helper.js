import jwt from "jsonwebtoken";
import { JWT_REFRESH_SECRET_KEY,JWT_SECRET_KEY } from "../constant/app.constant.js";

export const signAccessToken = (payload) =>{
    console.log('JWT_SECRET_KEY',JWT_SECRET_KEY)
    return jwt.sign(payload,JWT_SECRET_KEY,{expiresIn:"1h"})
}

export const verifyAccessToken = (token,option) =>{
    return jwt.verify(token,JWT_SECRET_KEY,option)
}

export const signRefreshToken = (payload) =>{
    return jwt.sign(payload,JWT_REFRESH_SECRET_KEY,{expiresIn:"7d"})
}

export const verifyRefreshAccessToken = (token) =>{
    return jwt.verify(token,JWT_REFRESH_SECRET_KEY)
}