import React from 'react'
import Head from 'next/head'
import Nav from '../components/nav'
import Blog from '../components/blog'
import getBaseURL from '../lib/getBaseURL';
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
  // const baseURL = getBaseURL(req);
  // const res = await fetch(`${baseURL}/api/blogs`);
  // const blogs = await res.json();

  const blogs = [
    {
      id: 1,
      title: "Call for DEV Contributors",
      author: "Jess Lee",
      date: "Oct 8",
      link: "https://dev.to/jess/call-for-dev-contributors-posts-on-front-page-do-not-load-until-scrolled-down-5e6a",
      likes: 32,
      tags: ["hacktoberfest", "contibutorswanted"],
      profile_image: "https://res.cloudinary.com/practicaldev/image/fetch/s--keXvKGCk--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://thepracticaldev.s3.amazonaws.com/uploads/user/profile_image/264/40d89fb9-4de0-414d-8a06-f52ddda0bc75.jpg"
    },
    {
      id: 2,
      title: "Intro to Regex for Web Developers",
      author: "Chris Achard",
      date: "Oct 8",
      link: "https://dev.to/chrisachard/intro-to-regex-for-web-developers-2fj4",
      likes: 115,
      tags: ["webdev", "javascript", "beginners"],
      profile_image: "https://res.cloudinary.com/practicaldev/image/fetch/s--LiuJdax8--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://thepracticaldev.s3.amazonaws.com/uploads/user/profile_image/212474/928651b2-e082-4350-aeb3-25a861a8aa76.png"
    },
    {
      id: 3,
      title: "Kicking It Olds School - IRC with Irssi",
      author: "Liz Rodriguez",
      date: "Oct 8",
      link: "https://dev.to/binarydigit/kicking-it-old-school-irc-with-irssi-2ile",
      likes: 4,
      tags: ["tech", "chat", "irc", "irssi"],
      profile_image: "https://res.cloudinary.com/practicaldev/image/fetch/s--njL3IxBY--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://thepracticaldev.s3.amazonaws.com/uploads/user/profile_image/20006/31a82875-38d6-4516-a348-29c071cd0a9e.jpg"
    }
  ];

  return { blogs }
};


export default Blogs
