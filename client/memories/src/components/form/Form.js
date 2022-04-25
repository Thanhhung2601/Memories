import React, { useEffect, useState } from 'react'
import useStyles from './styles'
import { TextField, Button, Typography, Paper } from '@material-ui/core'
import FileBase from 'react-file-base64'
import { useDispatch } from 'react-redux'
import { createPost, updatePost } from '../../actions/posts'
import { useSelector } from 'react-redux'

const Form = ({ currentId, setCurrenId }) => {
    const [postData, setPostData] = useState({
        title: '',
        message: '',
        tags: '',
        selectedFile: '',
    })
    console.log(postData)
    const post = useSelector((state) =>
        currentId ? state.posts.find((post) => post._id === currentId) : null
    )
    const user = JSON.parse(localStorage.getItem('profile'))
    const dispatch = useDispatch()
    const classes = useStyles()
    const handleSubmit = () => {
        if (currentId) {
            dispatch(
                updatePost(currentId, { ...postData, name: user?.result?.name })
            )
        } else {
            dispatch(createPost({ ...postData, name: user?.result?.name }))
        }
        clear()
    }
    const clear = () => {
        setPostData({
            title: '',
            message: '',
            tags: '',
            selectedFile: '',
        })
        setCurrenId(null)
    }

    useEffect(() => {
        setPostData(post)
    }, [post])

    if (!user?.result?.name) {
        return (
            <Paper className={classes.paper}>
                <Typography variant="h6" align="center">
                    please sign in to create your own memories and like other's
                    memories
                </Typography>
            </Paper>
        )
    }

    return (
        <Paper className={classes.paper}>
            <form
                autoComplete="off"
                noValidate
                className={`${classes.root} ${classes.form}`}
                onSubmit={handleSubmit}
            >
                <Typography variant="h6">
                    {currentId ? 'Update' : 'Craete'} a memory
                </Typography>

                <TextField
                    name="title"
                    variant="outlined"
                    label="Title"
                    fullWidth
                    value={postData?.title}
                    onChange={(e) =>
                        setPostData({ ...postData, title: e.target.value })
                    }
                />
                <TextField
                    name="message"
                    variant="outlined"
                    label="Message"
                    fullWidth
                    value={postData?.message}
                    onChange={(e) =>
                        setPostData({ ...postData, message: e.target.value })
                    }
                />
                <TextField
                    name="tags"
                    variant="outlined"
                    label="Tags"
                    fullWidth
                    value={postData?.tags}
                    onChange={(e) =>
                        setPostData({
                            ...postData,
                            tags: e.target.value.split(','),
                        })
                    }
                />
                <div className={classes.fileInput}>
                    <FileBase
                        type="file"
                        multiple={false}
                        onDone={({ base64 }) =>
                            setPostData({ ...postData, selectedFile: base64 })
                        }
                    />
                </div>
                <Button
                    size="large"
                    fullWidth
                    variant="contained"
                    className={classes.buttonSubmit}
                    onClick={handleSubmit}
                >
                    Submit
                </Button>
                <hr></hr>
                <Button
                    size="large"
                    type="submit"
                    fullWidth
                    variant="contained"
                    onClick={clear}
                >
                    Clear
                </Button>
            </form>
        </Paper>
    )
}

export default Form
