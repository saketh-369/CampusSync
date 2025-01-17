import React from 'react'
import './Home.css'
import ProfileSide from '../../components/profileSide/Profileside'; 
import PostSide from '../../components/PostSide/PostSide';
import RightSide from '../../components/RightSide/RightSide';

function Home() {
  return (
    <div className='Home'>
      <ProfileSide/>
      <PostSide/>
      <RightSide/>
    </div>
  )
}

export default Home
