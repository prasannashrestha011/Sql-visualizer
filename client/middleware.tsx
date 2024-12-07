import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req:NextRequest){
    console.log("running")
    const token=await getToken({req,secret:process.env.NEXT_AUTH_SECRET})
    console.log(token)
    if(!token && !req.url.includes("/login")){
        return NextResponse.redirect(new URL("/login",req.url))
    }
    if(req.url.includes("/login") && token){
        return NextResponse.redirect(new URL("/",req.url))
    }
    return NextResponse.next()
}
export const config={
    matcher:['/','/login']
}