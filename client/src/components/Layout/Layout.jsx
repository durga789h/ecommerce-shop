import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import {Helmet} from "react-helmet";
import { Toaster } from "react-hot-toast";
const Layout = ({children,title,description,keywords,author}) => { // in place of props we can also use {children} for that<main> {children} </main>
    return ( <div>
        <Helmet>
            <meta charSet="utf-8"/>
            <meta name="description"  content={description}/>
            <meta name="keywords"  content={keywords}/>
            <meta name="author" content={author}></meta>
            <title>{title}</title>
        </Helmet>
        <Header/>
        <main style={{minHeight:"80vh"}}>
        <Toaster />
        {children}
        </main>
        <Footer/>
    </div> );
}
 Layout.defaultProps={
    title:"Ecommerce app -shop now",
    description:"mern stack project",
    keywords:"mern node mongodb react vite",
    author:"mern-stack"
 }
export default Layout;