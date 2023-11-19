import React from 'react'
import PostItem from './PostItem';

const PostList = ({ posts, title, remove }) => {
    
    if (!posts.length) {
        return <h1 style={{ margin: '10px', textAlign: 'center', paddingTop: '15px' }}>Посты не найдены</h1>
    }

    return (
        <div>

            <h1 style={{ textAlign: 'center', margin: '25px' }}>
                {title}
            </h1>


                {posts.map((post, index) =>
                        <PostItem remove={remove} number={index + 1} post={post} key={post.id}/>
                )}
        </div>
    )
}

export default PostList


