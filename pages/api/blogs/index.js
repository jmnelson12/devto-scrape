// Fake users data
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

export default (req, res) => {
    // Get data from your database
    res.status(200).json(blogs)
}
