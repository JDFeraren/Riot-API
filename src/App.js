import {useState} from 'react';
import axios from 'axios';

function App() {
  const [summoner, setSummoner] = useState("");
  const [playerData, setPlayerData] = useState("");
  const [matches, setMatches] = useState("");
  const API_KEY = "RGAPI-6b544b93-a539-4f67-bd95-e27d24d75685";

  async function onClick(event) {
    await searchForPlayer();
  }

  async function searchForPlayer() {
    var API_CALL_STRING = `https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summoner}?api_key=${API_KEY}`;

    await axios.get(API_CALL_STRING).then(function (response) {
      setPlayerData(response.data);
    }).catch(function (error) {
      console.log(error);
    });
  }

  async function getMatches() {
    var API_CALL_STRING = `https://na1.api.riotgames.com/lol/match/v5/matches/by-puuid/${playerData.puuid}/ids?api_key${API_KEY}`; 
    axios.get(API_CALL_STRING).then(function (response) {
      setMatches(response.data);
    }).catch(function (error) {
      console.log(error);
    });
  }

  console.log(playerData);

  return (
    <div className="container">
      <h1>Riot Player Search</h1>
      <input type="text" onChange={e => setSummoner(e.target.value)}></input>
      <button onClick={e => onClick(e)}>Search For Player</button>
      <button onClick={e => getMatches(e)}>Get Matches</button>
    

      {JSON.stringify(playerData) !== "{}" ?
      <>
        <p>{playerData.name}</p>
        <p>Summoner Level {playerData.summonerLevel}</p>
        <p>Puuid: {playerData.puuid}</p>
        <p>Matches {matches}</p>
      </> 
      :
      <><p>No player data</p></>
      }

    </div>
  );
}

export default App;
