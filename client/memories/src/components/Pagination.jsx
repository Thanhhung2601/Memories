import React from 'react'
import { Pagination, PaginationItem } from '@material-ui/lab'
import styles from './styles'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPosts } from '../actions/posts'

const Paginate = ({ page }) => {
    const { numberOfPage } = useSelector((state) => state.posts)
    console.log(numberOfPage)
    const classes = styles()
    const dispatch = useDispatch()
    console.log(page)
    useEffect(() => {
        if (page) {
            dispatch(getPosts(page))
        }
    }, [page])

    return (
        <Pagination
            classes={{ ul: classes.ul }}
            count={numberOfPage}
            page={Number(page) || 1}
            variant="outlined"
            color="primary"
            renderItem={(item) => (
                <PaginationItem
                    {...item}
                    component={Link}
                    to={`/posts?page=${item.page}`}
                />
            )}
        ></Pagination>
    )
}

export default Paginate
