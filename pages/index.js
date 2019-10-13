import React from 'react'
import Head from 'next/head'
import Nav from '../components/nav'
import Blog from '../components/blog'
import getBaseURL from '../lib/getBaseURL';
import fetch from 'isomorphic-unfetch';

const Blogs = ({ blogs }) => {
  const blogList = (blogs && blogs.length !== 0) ?
    <ul>
      {blogs.map(blog => {
        if (blog.id && blog.title) {
          return (
            <li key={blog.id}>
              <Blog data={blog} />
            </li>
          );
        }
        return false;
      })}
      <style jsx>{`
        ul {
          list-style: none;
          max-width: 80%;
          margin: 10px auto;
          padding: 0px;
        }
        li {
          border: 1px solid #ddd;
          margin: 25px auto;
          border-radius: 3px;
          box-shadow: 1px 1px 0px #c2c2c2;
          position: relative;
          background-color: #fff;
          width: 70%;
          min-width: 450px;
          display: flex;
          padding: 10px;
          box-sizing: border-box;
        }
      `}</style>
    </ul> : <h2>Sorry, No Blogs Found :(</h2>;

  return (
    <div className="cont">
      <Head>
        <title>Dev.to - Scrape</title>
        <link rel='icon' href='/static/favicon.ico' importance='low' />
      </Head>

      <Nav />

      <div className='hero'>
        <h1 className='title'>Top 20 Dev.to Blogs of the Week</h1>
      </div>

      <div className="list">
        {blogList}
      </div>

      <style jsx>{`
      :global(body) {
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, Avenir Next, Avenir, Helvetica, sans-serif;
        background-color: #F9F9FA;
        padding-bottom: 40px;
      }
      .hero {
        width: 100%;
        color: #333;
        margin-bottom: 40px;
        text-align: center;
      }
      .title {
        margin: 0;
        width: 100%;
        padding-top: 40px;
        line-height: 1.15;
        font-size: 48px;
      }
    `}</style>
    </div>
  )
};

Blogs.getInitialProps = async ({ req }) => {
  const baseURL = getBaseURL(req);
  const res = await fetch(`${baseURL}/api/blogs`);
  const blogs = await res.json();

  return { blogs }
};


export default Blogs
