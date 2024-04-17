import React from 'react'
import Layout from '../components/Layout/Layout'
import { Link } from 'react-router-dom'

export default function Pagenotfound() {
  return (
    <div  className='w-full text-red-700 bg-green-300 text-center'>
      <Layout title={"go back-page not found"}>
        <div className='mt-52 font-serif' style={{fontSize:"32px"}}>
          <h1>404 error</h1>
          <h2>Oops ! page not found</h2>
          <Link to="/" className="underline font-bold"> Back to home
          </Link>
        </div>
      
      </Layout>
    </div>
  )
}
