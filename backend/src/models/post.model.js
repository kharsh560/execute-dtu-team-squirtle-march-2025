import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  posterUrl: {
    type: String,
    required: true,
  },
  content: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Content",
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  summary: {
    type: String,
  },
  minutesRead: {
    type: String,
  },
  tags: [
    {
      type: String,
    },
  ],
}, {timestamps: true});

const Post = mongoose.model("Post", postSchema);

export {Post};

/*
summary: 450 characters
description: 15 words ~ 70 characters
*/