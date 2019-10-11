import React from 'react'
import Link from 'next/link'

const links = [
  { href: 'https://github.com/jmnelson12/devto-scrape', label: 'View on GitHub' }
].map(link => {
  link.key = `nav-link-${link.href}-${link.label}`
  return link
})

const Nav = () => (
  <nav>
    <ul>
      {links.map(({ key, href, label }) => (
        <li key={key}>
          <a href={href}>{label}</a>
        </li>
      ))}
    </ul>

    <style jsx>{`
      nav {
        text-align: center;
      }
      ul {
        display: flex;
        justify-content: space-between;
      }
      nav > ul {
        padding: 4px 16px;
      }
      li {
        display: flex;
        padding: 6px 8px;
      }
      a {
        color: #222;
        font-size: 14px;
        text-decoration: none;
      }
    `}</style>
  </nav>
)

export default Nav
