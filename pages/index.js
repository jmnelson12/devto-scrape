import React from 'react'
import Head from 'next/head'
import Nav from '../components/nav'
import fetch from 'isomorphic-unfetch';

const Home = () => (
  <div>
    <Head>
      <title>Dev.to - Scrape</title>
      <link rel='icon' href='/static/favicon.ico' importance='low' />
    </Head>

    <Nav />

    <div className='hero'>
      <h1 className='title'>Under Construction!</h1>
    </div>

    <style jsx>{`
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
    `}</style>
  </div>
)
Home.getInitialProps = async () => {
  const res = await fetch('http://localhost:3000/api/blogs');
  const data = await res.json();

  console.log(data);

  return { "nada": "oioi" }
}

export default Home
