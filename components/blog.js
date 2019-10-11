import React from 'react'

const Blog = ({ data }) => (
    <>
        <div className="pic">
            <img src={data.profile_image} alt={data.author} />
        </div>
        <div className="content">
            <div className="title">
                {/* Not using link component because we are linking to external page */}
                <a href={data.link} target="_blank" rel="noopener">
                    <h3>{data.title}</h3>
                </a>
            </div>
            <div className="author date">
                <h4>{data.author} - {data.date}</h4>
            </div>
            <div className="tags">
                {data.tags.map(tag => (
                    <a href={`https://dev.to/t/${tag}`} key={tag} target="_blank">
                        #{tag}
                    </a>
                ))}
            </div>
            <div className="likes">
                <p>{data.likes} likes</p>
            </div>
        </div>

        <style jsx>{`
            .content {
                margin-left: 12px;
                padding-top: 10px;
            }

            .pic {
                float: left;
                height: 50px;
                width: 50px;
                margin-left: 12px;
                margin-top: 3px;
                border-radius: 50px;
                padding: 8px 0px 11px;
            }
            .pic img {
                height: 100%;
                width: 100%;
                border-radius: 50px;
            }
            a {
                text-decoration: none;
            }

            h3 {
                margin: 0px;
                font-size: 27px;
                line-height: 32px;
                color: #222;
            }

            .author.date > h4 {
                font-size: 17px;
                max-width: 80%;
                padding: 0px;
                margin: 5px 0px;
                font-weight: 500;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                color: #666666;
            }

            .tags a {
                display: inline-block;
                color: #222;
                margin-right: 10px;
                font-size: 16px;
            }
        `}</style>
    </>
);

export default Blog;
