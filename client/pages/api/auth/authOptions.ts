

import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
const clientId=process.env.CLIENT_ID
const clientSecret=process.env.CLIENT_SECRET 
const nextAuthSecret=process.env.NEXT_AUTH_SECRET
if(!clientId || !clientSecret ||!nextAuthSecret){
    throw Error("invalid creds")
}
declare module 'next-auth'{
    interface Session{
        accessToken?:string ,
        user:{
            username:string 
            email:string 
            profileUrl:string
        }
    }
}
const authOptions:NextAuthOptions={
    providers:[
        GoogleProvider({ 
            clientId, 
            clientSecret
        })
    ],
    secret:nextAuthSecret ,
    callbacks:{
        async jwt({token,account}){
            if(account){
                token.accessToken=account.access_token 
            }
            return token 
        },
        async session({session,token}){
    
                session.accessToken=token.accessToken as string 
                
            return session
        }
    }
}
export {authOptions}