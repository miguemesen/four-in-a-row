import React, { useEffect, useState } from 'react'
import './Home.scss'
// import Post from './Post'
// import { createPost, getMyFeed } from './api';
import { getUserInformation } from './utils';
import ConnectFour from './ConnectFour';

const Home = () => {

  const userInformation = getUserInformation();


  useEffect(() => {

  },[])

  return (
    <div className='home'>
      <div className='home-header'>
        <div className='home-header-title'>Connect 4</div>
      </div>
      <ConnectFour />
    </div>
  )
}

export default Home