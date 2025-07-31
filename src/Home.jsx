import React, { useEffect, useState } from 'react'
import './Home.scss'
// import Post from './Post'
// import { createPost, getMyFeed } from './api';
import { getUserInformation } from './utils';
import ConnectFour from './ConnectFour';
import Dropdown from './components/Dropdown';
import Menu from './Menu';

const Home = () => {

  const [isGameStarted, setIsGameStarted] = useState(false)
  const [isDropdownDisabled, setIsDropdownDisabled] = useState(false);
  const [isGameReady, setIsGameReady] = useState(false)
  const [mode, setMode] = useState(null);
  const [selected, setSelected] = useState({
    dropdown1: '',
    dropdown2: '',
  });

  const handleChange = (id, value) => {
    setSelected((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleDisabledDropdown = () => {
    if (isGameStarted) {
      setIsDropdownDisabled(true)
    }
  }

  const userInformation = getUserInformation();


  useEffect(() => {
    if (mode === 'new') {
      if (selected.dropdown1 !== '' && selected.dropdown2 !== '') {
        setIsGameReady(true)
      } else {
        setIsGameReady(false)
      }
    }
    if (mode === 'load') {
      // poner a los jugadores cargados en el dropdown
    }
  },[mode, selected])

  const options = [
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' },
    { label: 'Orange', value: 'orange' },
    { label: 'Mango', value: 'mango' },
  ];

  return (
    <div className='home'>
      <div className='home-header'>
        <div className='home-header-title'>Connect 4</div>
      </div>
      <div className='initial-menu'>
        <Menu mode={mode} setMode={setMode}/>
      </div>
      
      {(mode === 'new' || isGameReady) && (<div className='select-players'>
        <Dropdown
          id="dropdown1"
          options={options}
          selectedValue={selected.dropdown1}
          onChange={handleChange}
          disabledValues={[selected.dropdown2]}
          disabledDropdown={isDropdownDisabled}
        />
        <Dropdown
          id="dropdown2"
          options={options}
          selectedValue={selected.dropdown2}
          onChange={handleChange}
          disabledValues={[selected.dropdown1]}
          disabledDropdown={isDropdownDisabled}
        />
      </div>)}
      {isGameReady && (<ConnectFour playerOne={selected.dropdown1} playerTwo={selected.dropdown2}/>)}
    </div>
  )
}

export default Home