const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
    title: { type: String },
    author: { type: String },
    date: { type: String },
    link: { type: String },
    likes: { type: Number },
    tags: { type: Array },
    profile_image: { type: String }
});

module.exports = mongoose.model("Blog", BlogSchema);
