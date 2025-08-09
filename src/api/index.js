const url = 'https://localhost:7048/api'

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

// export 
