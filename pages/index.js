import React from 'react'
import Head from 'next/head'
import Nav from '../components/nav'
import Blog from '../components/blog'
import fetch from 'isomorphic-unfetch';

const Blogs = ({ blogs }) => (
  <div className="cont">
    <Head>
      <title>Dev.to - Scrape</title>
      <link rel='icon' href='/static/favicon.ico' importance='low' />
    </Head>

    <Nav />

    <div className='hero'>
      <h1 className='title'>Blogs</h1>
    </div>

    <div className="list">
      <ul>
        {blogs.map(blog => (
          <li key={blog.id}>
            <Blog data={blog} />
          </li>
        ))}
      </ul>
    </div>

    <style jsx>{`
      .cont {
        background-color: #F9F9FA;
      }
      .hero {
        width: 100%;
        color: #333;
      }
      .title {
        margin: 0;
        width: 100%;
        padding-top: 80px;
        line-height: 1.15;
        font-size: 48px;
      }
      .title,
      .description {
        text-align: center;
      }
      ul {
        list-style: none;
        max-width: 80%;
        margin: 10px auto;
        padding: 0px;
      }
      li {
        border: 1px solid #ddd;
        margin: 35px auto;
        border-radius: 3px;
        box-shadow: 1px 1px 0px #c2c2c2;
        position: relative;
        background-color: #fff;
        width: 45%;
        min-width: 450px;
      }
    `}</style>
  </div>
);

Blogs.getInitialProps = async ({ req }) => {
  const baseUrl = req ? `${req.protocol}://${req.get('Host')}` : '';
  const res = await fetch(`${baseUrl}/api/blogs`);
  const blogs = await res.json();

  return { blogs }
};


export default Blogs
