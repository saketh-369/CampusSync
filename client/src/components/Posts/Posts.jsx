// import React, { useEffect } from 'react'
// import './Posts.css'
// import {useDispatch, useSelector} from 'react-redux'
// import Post from '../Post/Post'
// import { getTimelinePosts } from '../../api/PostRequest'
// import { useParams } from 'react-router-dom'
// const Posts = () => {
  
//   const dispatch = useDispatch()
//   const {user}=useSelector((state)=> state.authReducer.authData)
//   let {posts, loading} = useSelector((state)=>state.postReducer)
//   const params = useParams()

//   useEffect(()=> { 
//     dispatch(getTimelinePosts(user._id))
//   },[])

//   if(!posts) return "no posts";
//   if(params.id) posts = posts.filter((post)=> post.userId === params.id)
//   return (
//     <div className='Posts'>
//       {loading
//         ? "Fetching Posts..."
//         : posts.map((post,id)=>{
//         return <Post data={post} id={id}/>;
//       })}
//     </div>
//   );
// };

// export default Posts


import React, { useEffect, useState } from 'react';
import './Posts.css';
import { useSelector } from 'react-redux';
import Post from '../Post/Post';
// import { getTimelinePosts } from '../../api/PostRequest';
import { useParams } from 'react-router-dom';
import { getPost } from '../../api/PostRequest';

const Posts = () => {
  // const dispatch = useDispatch();
  // const { user } = useSelector((state) => state.authReducer.authData);
  const { posts: allPosts, loading } = useSelector((state) => state.postReducer);
  const params = useParams();
  const [posts,setposts] = useState(allPosts)
  // let posts = allPosts; // Assign allPosts to posts initially

  // useEffect(() => {
  //   dispatch(getTimelinePosts(user._id));
  // }, [dispatch, user._id]); // Include dispatch and user._id in the dependency array
  const profile = localStorage.getItem('profile');
  const userId = params.id ? params.id : JSON.parse(profile).user._id

  const fetchpost = ()=>{
    getPost().then((res)=>{
       setposts(res)
    }).catch((err)=>{
      console.log(err)
    })
  }
  useEffect(() => {
    fetchpost();
    // let poste = allPosts.filter((post) => post.userId === userId);
    // setposts(poste)
  }, [])

  
  return (
    <div className='Posts'>
      {loading ? "Fetching Posts..." : posts.map((post, id) => (
        <Post key={id} data={post} Plikes={post.likes.length} id={id} />
      ))}
    </div>
  );
};

export default Posts;

