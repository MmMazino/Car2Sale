import React from 'react'
import Link from 'next/link'
import Stack from 'react-bootstrap/Stack';
import { useSession, signIn, signOut } from "next-auth/react"

export default function Component() {
}

export const Navbar = () => {
  const { data: session } = useSession()
  if (session) {
    return (
      <>
        <nav className='navbar container'>
          <div>
            <Link href='/'><img src='#' alt='logobrand' /></Link>
          </div>
          <Stack direction='horizontal' gap={3}>
            <Link href="/">Home
            </Link>
            <Link href="/">ซื้อรถ
            </Link>
            <Link href="/salecar">ขายรถ
            </Link>
            <Link href={`/user/${session.user.id}`}>
              {session.user.fname}{session.user.lname}
            </Link>
            <button onClick={() => signOut()}>Sign out</button>
          </Stack>
        </nav>
      </>
    )
  }
  return (
    <>
    <nav className='navbar container'>
      <div>
        <Link href='/'><img src='#' alt='logobrand' /></Link>
      </div>
      <Stack direction='horizontal' gap={3}>
        <Link href="/">
          Home
        </Link>
        <Link href="/">
          ซื้อรถ
        </Link>
        <Link href="/salecar">
          ขายรถ
        </Link>
        <button onClick={() => signIn()}>Sign in</button>
        <Link href="/register">
          register
        </Link>
      </Stack>
    </nav>
  </>
  )
}
