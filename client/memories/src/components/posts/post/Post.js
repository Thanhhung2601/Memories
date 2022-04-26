import React from 'react'
import useStyles from './styles'
import {
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Button,
    Typography,
    ButtonBase,
} from '@material-ui/core'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt'
import ThumbUpAltOutlined from '@material-ui/icons/ThumbDownAltOutlined'
import DeleteIcon from '@material-ui/icons/Delete'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import moment from 'moment'
import { useDispatch } from 'react-redux'
import { deletePost, likePost } from '../../../actions/posts'
import { useHistory } from 'react-router-dom'

const Post = ({ post, setCurrenId }) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const user = JSON.parse(localStorage.getItem('profile'))
    const history = useHistory()

    const handleDelete = () => {
        dispatch(deletePost(post._id))
    }

    const handleLike = () => {
        dispatch(likePost(post._id))
    }

    const openPost = () => {
        history.push(`/posts/${post._id}`)
    }

    const Likes = () => {
        if (post.likes.length > 0) {
            return post.likes.find(
                (like) => like === (user?.result?.googleId || user?.result?._id)
            ) ? (
                <>
                    <ThumbUpAltIcon fontSize="small" />
                    &nbsp;
                    {post.likes.length > 2
                        ? `You and ${post.likes.length - 1} others`
                        : `${post.likes.length} like${
                              post.likes.length > 1 ? 's' : ''
                          }`}
                </>
            ) : (
                <>
                    <ThumbUpAltOutlined fontSize="small" />
                    &nbsp;{post.likes.length}{' '}
                    {post.likes.length === 1 ? 'Like' : 'Likes'}
                </>
            )
        }

        return (
            <>
                <ThumbUpAltOutlined fontSize="small" />
                &nbsp;Like
            </>
        )
    }

    return (
        <Card className={classes.card} onClick={openPost}>
            <CardMedia
                className={classes.media}
                image={post.selectedFile}
                title={post.title}
            />
            <div className={classes.overlay}>
                <Typography variant="h6">{post.creator}</Typography>
                <Typography variant="body2">
                    {moment(post.craetedAt).fromNow()}
                </Typography>
            </div>
            <div className={classes.overlay2}>
                {(user?.result?.googleId === post?.creator ||
                    user?.result?._id === post?.creator) && (
                    <Button
                        style={{ color: 'white' }}
                        size="small"
                        onClick={() => setCurrenId(post._id)}
                    >
                        <MoreHorizIcon fontSize="default" />
                    </Button>
                )}
            </div>
            <div className={classes.details}>
                <Typography variant="body2" color="textSecondary">
                    {post.tags.map((tag) => `#${tag} `)}
                </Typography>
            </div>
            <CardContent>
                <Typography className={classes.title} variant="h5" gutterBottom>
                    {post.title}
                </Typography>
                <Typography className={classes.title} variant="h6" gutterBottom>
                    {post.message}
                </Typography>
            </CardContent>
            <CardActions className={classes.cardActions}>
                <Button
                    size="small"
                    color="primary"
                    disabled={!user?.result}
                    onClick={handleLike}
                >
                    <Likes />
                </Button>
                {(user?.result?.googleId === post?.creator ||
                    user?.result?._id === post?.creator) && (
                    <Button size="small" color="primary" onClick={handleDelete}>
                        <DeleteIcon fontSize="small" /> Delete
                    </Button>
                )}
            </CardActions>
        </Card>
    )
}

export default Post
