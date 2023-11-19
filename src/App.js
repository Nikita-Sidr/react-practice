import React, { useEffect, useMemo, useState } from 'react'
import './styles/App.css'
import PostList from './components/PostList';
import PostForm from './components/PostForm';
import MyInput from './components/ UI/input/MyInput';
import MyModal from './components/ UI/MyModal/MyModal';
import MyButton from './components/ UI/button/MyButton';
import PostService from './components/API/PostService';
import { getPagesArray, getPagesCount } from './utils/pages';
import Paginator from './components/ UI/pagination/Paginator';

function App() {

  const [posts, setPosts] = useState([])
  const [isPostsLoading, setIsPostsLoading] = useState(false)
  const [searchQuery, setSeacrchQuery] = useState('')
  const [modal, setModal] = useState(false)
  const [limit, setLimit] = useState(10)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)

  useEffect(() => {
    fetchPosts()
  }, [page])

  const changePage = (page) => {
    setPage(page)
  }

  const createPost = (newPost) => {
    setPosts([...posts, newPost])
    setModal(false)
  }

  async function fetchPosts() {
    setIsPostsLoading(true)
    const response = await PostService.getAll(limit, page)
    setPosts(response.data)
    setIsPostsLoading(false)
    const totalCount = response.headers['x-total-count']
    setTotalPages(getPagesCount(totalCount, limit))
  }


  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id))
  }

  const searchedInput = useMemo(() => {
    return posts.filter(post => post.body.toLowerCase().includes(searchQuery))
  }, [searchQuery, posts])

  return (
    <div className="App">
      <MyButton onClick={fetchPosts}>Get Posts</MyButton>
      <MyButton style={{ margin: '15px 0' }} onClick={() => setModal(true)}>Создать Пост</MyButton>
      <MyModal visible={modal} setVisible={setModal}><PostForm create={createPost} /></MyModal>
      <MyInput placeholder='Поиск' value={searchQuery} onChange={e => setSeacrchQuery(e.target.value)} />

      <Paginator page={page} changePage={changePage} totalPages={totalPages}/>

      {isPostsLoading
        ?  <h1>Loading...</h1>
        : <PostList remove={removePost} posts={searchedInput} title='Posts' />
      }


    </div>
  );
}

export default App;
