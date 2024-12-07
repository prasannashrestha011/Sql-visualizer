"use client"

import { signIn, signOut, useSession } from "next-auth/react";

export default function Home() {
  const {data:session}=useSession()
  return(
    session?<>
       <p>Welcome, {session.user.email || 'User'}!</p>
    <button onClick={()=>signOut()}>Sign out</button>
    </>:<>
    <button onClick={()=>signIn()}>

      Sign in</button>
    </>
  )
}
