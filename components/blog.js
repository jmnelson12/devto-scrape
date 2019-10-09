import React from 'react'

const Blog = ({ data }) => (
    <>
        <div className="pic">
            <img src={data.profile_image} alt={data.author} />
        </div>
        <div className="title">
            {/* Not using link component because we are linking to external page */}
            <a href={data.link} target="_blank" rel="noopener">{data.title}</a>
        </div>
        <div className="author date">
            <p>{data.author} - {data.date}</p>
        </div>
        <div className="tags">
            <ul>
                {data.tags.map(tag => (
                    <li key={tag}>
                        #{tag}
                    </li>
                ))}
            </ul>
        </div>
        <div className="likes">
            <p>{data.likes}</p>
        </div>

        <style jsx>{`

        `}</style>
    </>
);

export default Blog;
