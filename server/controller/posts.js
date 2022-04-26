import mongoose from 'mongoose'
import PostMessage from '../model/postMessage.js'

export const getPosts = async (req, res) => {
    const { page } = req.query
    console.log(page)
    try {
        const limit = 8
        const startIndex = (Number(page) - 1) * limit
        const total = await PostMessage.countDocuments({})

        const posts = await PostMessage.find()
            .sort({ _id: -1 })
            .limit(limit)
            .skip(startIndex)

        res.status(200).json({
            data: posts,
            currentPage: Number(page),
            numberOfPage: Math.ceil(total / limit),
        })
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const createPost = async (req, res) => {
    const post = req.body
    const newPost = new PostMessage({
        ...post,
        creator: req.userId,
        createdAt: new Date().toISOString(),
    })
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

    if (!req.userId) return res.json({ message: 'Unauthenticated' })

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send('No post with id')
    }
    const post = await PostMessage.findById(id)

    const index = post.likes.findIndex((id) => id === String(req.userId))
    if (index === -1) {
        post.likes.push(req.userId)
    } else {
        post.likes = post.likes.filter((id) => id !== String(req.userId))
    }

    const updatePost = await PostMessage.findByIdAndUpdate(id, post, {
        new: true,
    })
    res.json(updatePost)
}

export const getPostsBySearch = async (req, res) => {
    console.log(req.query)
    const { search, tags } = req.query
    try {
        const title = new RegExp(search, 'i')
        const posts = await PostMessage.find({
            $or: [{ title }, { tags: { $in: tags.split(',') } }],
        })
        res.json({ data: posts })
    } catch (error) {
        console.log(error)
    }
}
