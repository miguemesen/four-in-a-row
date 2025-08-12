import React, { useEffect, useState } from 'react'
import './Home.scss'
import { getUserInformation } from './utils';
import ConnectFour from './ConnectFour';
import Dropdown from './components/Dropdown';
import Menu from './Menu';
import { getAllGames, getAllPlayers } from './api';

const Home = () => {

  const [player, setPlayer] = useState("🔴");
  const [winner, setWinner] = useState(null);
  const [players, setPlayers] = useState([]);
  const [allGames, setAllGames] = useState();
  const [loadGame, setLoadGame] = useState();
  const [game, setGame] = useState();
  const [isGameStarted, setIsGameStarted] = useState(false)
  const [isGameFinished, setIsGameFinished] = useState(true)
  const [isDropdownDisabled, setIsDropdownDisabled] = useState(false);
  const [isGameReady, setIsGameReady] = useState(false)
  const [mode, setMode] = useState(null);
  const [selected, setSelected] = useState({
    dropdown1: '',
    dropdown2: '',
  });
  const [showLoad, setShowLoad] = useState(false);
  const [isDraw, setIsDraw] = useState(false);

  const fetchAllGames = async () => {
    try {
      const data = await getAllGames();
      setAllGames(data);
    } catch (error) {
      console.error("Error fetching all games:", error);
    }
  }

  const fetchPlayers = async () => {
    try {
      const data = await getAllPlayers();
      setPlayers(data);
    } catch (error) {
      console.error("Error fetching players:", error);
    }
  };

  const handleChange = (id, value) => {
    setSelected((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const userInformation = getUserInformation();


  useEffect(() => {
    if (mode === 'new' || mode === 'newGame') {
      setShowLoad(false)
      setSelected({
        dropdown1: '',
        dropdown2: '',
      })
      setLoadGame(undefined)
      setWinner(undefined);
      setIsDraw(false)
      setGame(undefined);
      setIsGameStarted(false)
      setIsGameFinished(false)
      setIsGameReady(false)
    }
    if (mode === 'load') {
      setSelected({
        dropdown1: '',
        dropdown2: '',
      })
      setLoadGame(undefined)
      setWinner(undefined);
      setGame(undefined);
      setIsGameStarted(false)
      setIsGameFinished(false)
      setIsGameReady(false)
      setShowLoad(true)
    }
    if (mode === 'playingLoad') {
      setIsGameStarted(true)
      setShowLoad(false)
    }
  },[mode])

  useEffect(() => {
    if (selected.dropdown1 !== '' && selected.dropdown2 !== '') {
      setIsGameReady(true)
    } else {
      setIsGameReady(false)
    }
  }, [selected])

  useEffect(() => {
    fetchPlayers()
    fetchAllGames();
  }, [showLoad])

  useEffect(() => {
    if(isGameStarted) {
      setIsDropdownDisabled(true)
    } else if (!isGameStarted) {
      setIsDropdownDisabled(false)
    }
  }, [isGameStarted, isGameFinished])




  return (
    <div className='home'>
      <div className='home-header'>
        <div className='home-header-title'>Connect 4</div>
      </div>
      <div className='initial-menu'>
        <Menu setIsDraw={setIsDraw} showLoad={showLoad} setShowLoad={setShowLoad} isGameStarted={isGameStarted} isGameReady={isGameReady} setGame={setGame} setSelected={setSelected} setWinner={setWinner} setPlayer={setPlayer} setIsGameReady={setIsGameReady} setIsGameStarted={setIsGameStarted} setIsGameFinished={setIsGameFinished} mode={mode} setMode={setMode} allGames={allGames} setLoadGame={setLoadGame}/>
      </div>
      {(mode === 'new' || isGameReady) && (<div className='select-players'>
        <Dropdown
          id="dropdown1"
          options={players}
          selectedValue={selected.dropdown1}
          onChange={handleChange}
          disabledValues={[selected.dropdown2]}
          disabledDropdown={isDropdownDisabled}
        />
        <Dropdown
          id="dropdown2"
          options={players}
          selectedValue={selected.dropdown2}
          onChange={handleChange}
          disabledValues={[selected.dropdown1]}
          disabledDropdown={isDropdownDisabled}
        />
      </div>)}
      {isGameReady && !showLoad &&(<ConnectFour isDraw={isDraw} setIsDraw={setIsDraw} winner={winner} setWinner={setWinner} player={player} setPlayer={setPlayer} loadedGame={loadGame} game={game} setGame={setGame} playerOne={selected.dropdown1} playerTwo={selected.dropdown2} players={players} isGameStarted={isGameStarted} setIsGameStarted={setIsGameStarted} setIsGameFinished={setIsGameFinished} setIsDropdownDisabled={setIsDropdownDisabled}/>)}
    </div>
  )
}

export default Home