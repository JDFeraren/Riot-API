import React, {useState} from 'react' ;
import axios from 'axios';

const API_KEY = "RGAPI-4df8466f-4e5a-48bf-9275-0688260b4d0a";

function Summoner(props) {
    return (
        <div>
            <h2>Summoner Name: {props.summonerName}</h2>
            <h3>Summoner Level: {props.summonerLevel}</h3>
            <h4>Matches: {props.matches}</h4>
        </div>
    )
}

function PlayerData() {
    const [searchText, setSearchText] = useState("");
    const [playerData, setPlayerData] = useState("");

    const [matches, setMatches] = useState([]);
    const [matchId, setMatchId] = useState("");
    const [matchInfo, setMatchInfo] = useState("");

    const Summoner_API = `https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${searchText}?api_key=${API_KEY}`;
    const Match_API = `https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${playerData.puuid}/ids?api_key=${API_KEY}`; 

    async function getPlayerData(e) {
      await axios.get(Summoner_API).then(function (response) {
            setPlayerData(response.data);
          }).catch(function (error) {
            console.log(error);
          });
    }

    function getMatches() {
        axios.get(Match_API).then(function (response) {
            setMatches(response.data);
        }).catch(function (error) {
            console.log(error);
        });
    }

    return (
        <div>
            <h1>Riot Player Search</h1>
            <input type="text" onChange={e => setSearchText(e.target.value)}></input>
            <button onClick={e => getPlayerData(e)}>Search For Player</button>
            {JSON.stringify(playerData) !== '{}' ? 
            <><Summoner summonerName={playerData.name} summonerLevel={playerData.summonerLevel} matches={matches}/></>
            :
            <><p>No player data</p></>
            }
        </div>
    )

}

export default PlayerData;