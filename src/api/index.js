const url = 'http://localhost:5274/api'

export const getAllPlayers = async () => {
  try {
    const response = await fetch(`${url}/Jugador`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching players:', error);
    throw error;
  }
}

export const postPlayer = async (player) => {
  try {
    const response = await fetch(`${url}/Jugador`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(player),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error creating player:', error);
    throw error;
  }
}

export const winnerPlayer = async (id) => {
  try {
    const response = await fetch(`${url}/Jugador/jugadorGanador/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return
  } catch (error) {
    console.error('Error adding point to winner:', error);
    throw error;
  }
}

export const loserPlayer = async (id) => {
  try {
    const response = await fetch(`${url}/Jugador/jugadorPerdedor/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return;
  } catch (error) {
    console.error('Error subtracting point to winner:', error);
    throw error;
  }
}

export const drawPlayer = async (id) => {
  try {
    const response = await fetch(`${url}/Jugador/jugadorEmpate/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return
  } catch (error) {
    console.error('Error adding draw to players:', error);
    throw error;
  }
}


// ------------- Partida -----------------

export const getAllGames = async () => {
  try {
    const response = await fetch(`${url}/Partida`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching games:', error);
    throw error;
  }
}

export const getGameById = async (id) => {
  try {
    const response = await fetch(`${url}/Partida/${id}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching game:', error);
    throw error;
  }
}

export const postGame = async (game) => {
  try {
    const response = await fetch(`${url}/Partida`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(game),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error creating game:', error);
    throw error;
  }
}

export const updateGame = async (id, game) => {
  try {
    const response = await fetch(`${url}/Partida/${id}`, {
      method: 'PUT',
      headers: {
        'accept': '*/*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(game),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return
  } catch (error) {
    console.error('Error updating game:', error);
    throw error;
  }
}