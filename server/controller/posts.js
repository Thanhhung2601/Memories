import mongoose from 'mongoose'
import PostMessage from '../model/postMessage.js'

export const getPosts = async (req, res) => {
    try {
        const postsMessage = await PostMessage.find()
        console.log(postsMessage)
        res.status(200).json(postsMessage)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const createPost = async (req, res) => {
    const post = req.body
    const newPost = new PostMessage(post)
    try {
        await newPost.save()
        res.status(201).json(newPost)
    } catch (error) {
        res.status(409).json({ message: error.message })
    }
}

export const updatePost = async (req, res) => {
    const { id } = req.params
    const post = req.body
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send('No post with id')
    }
    const updatePost = await PostMessage.findByIdAndUpdate(id, post, {
        new: true,
    })
    res.json(updatePost)
}

export const deletePost = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send('No post with id')
    }
    await PostMessage.findByIdAndRemove(id)
    res.json({ message: 'post delete success' })
}

export const likePost = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send('No post with id')
    }
    const post = await PostMessage.findById(id)
    const updatePost = await PostMessage.findByIdAndUpdate(
        id,
        { likeCount: post.likeCount + 1 },
        { new: true }
    )
    res.json(updatePost)
}
