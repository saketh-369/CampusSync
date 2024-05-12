// import React, { useState } from 'react'
// import './Post.css'
// import Comment from '../../img/comment.png'
// import Share from '../../img/share.png'
// import Heart from '../../img/like.png'
// import NotLike from '../../img/notlike.png'
// import { useSelector } from 'react-redux'
// import { likePost } from '../../api/PostRequest'

// function Post({data}) {
//   const {user} = useSelector((state)=>state.authReducer.authData)

//   const [liked, setLiked] = useState(data.likes.includes(user._id))
//   const [likes, setLikes] = useState(data.likes.length)
//   const handleLike = () => {
//     setLiked((prev)=>!prev)
//     likePost(data._id, user._id)
//     liked? setLikes((prev)=> prev -1) : setLikes((prev)=> prev+1)
//   }

//   return (
//     <div className='Post'>
//       <img src={data.img? process.env.REACT_APP_PUBLIC_FOLDER + data.image: ""} alt="" />

//       <div className="postReact">
//         <img src={liked?Heart:NotLike} alt=""  style={{cursor: "pointer"}} onClick={handleLike}/>
//         <img src={Comment} alt="" />
//         <img src={Share} alt="" />
//       </div>

//       <span style={{color: "var(--gray)", fontSize:'12px'}}>{likes} likes</span>
//       <div className="detail">
//         <span><b>{data.name}</b></span>
//         <span> {data.desc}</span>
//       </div>
//     </div>
//   )
// }

// export default Post



import React, { useState, useEffect } from "react";
import "./Post.css";
import Comment from "../../img/comment.png";
import Share from "../../img/share.png";
import Heart from "../../img/like.png";
import NotLike from "../../img/notlike.png";
import { getPostSync, likePost } from "../../api/PostRequest";
import { useSelector } from "react-redux";

const Post = ({ data , Plikes}) => {
  const { user } = useSelector((state) => state.authReducer.authData);
  const [liked, setLiked] = useState(data.likes.includes(user._id));
  const [likes, setLikes] = useState(data.likes.length)
  const [loading, setloading] = useState(true)
  
  const fetchPost = (user)=>{
    getPostSync(data._id).then((res)=>{
      setLiked(res?.likes?.includes(user._id))
      setLikes(res?.likes?.length)
      console.log('likes ',res)
    }).catch((err)=>{
      console.log(err)
    })
  }
  useEffect(()=>{
    if(data){
      fetchPost(user)
    }
    
    setloading(false)
    
  },[data,user])
  // console.log("HER",data.likes, data)

  
  
  const handleLike = () => {
    likePost(data._id, user._id);
    setLiked((prev) => !prev);
    liked? setLikes((prev)=>prev-1): setLikes((prev)=>prev+1)
  };
  if(!loading){
    return (
      <div className="Post">
        <img
          src={data.image ? process.env.REACT_APP_PUBLIC_FOLDER + data.image : ""}
          alt=""
        />
  
        <div className="postReact">
          <img
            src={liked ? Heart : NotLike}
            alt=""
            style={{ cursor: "pointer" }}
            onClick={handleLike}
          />
          <img src={Comment} alt="" />
          <img src={Share} alt="" />
        </div>
  
        <span style={{ color: "var(--gray)", fontSize: "12px" }}>
          {likes} likes
        </span>
        <div className="detail">
          <span>
            <b>{data.name} </b>
          </span>
          <span>{data.desc}</span>
        </div>
      </div>
    );
  }
  else{
    return(<div>Loading</div>);
  }
};

export default Post;