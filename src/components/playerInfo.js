import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';

// Developer Key - (Update Every 24 Hours)
const API_KEY = "RGAPI-fa5ed9e2-3921-4321-9927-89b21889df66";

function Summoner({ summonerName, summonerLevel, matchList }) {

    return (
        <div>
            <h2>Summoner Name: {summonerName}</h2>
            <h3>Summoner Level: {summonerLevel}</h3>
            <MatchData matchList={matchList} />
        </div>
    )
}

function MatchData({ matchList }) {
    const [matchData, setMatchData] = useState([]);

    const Match_API = `https://americas.api.riotgames.com/lol/match/v5/matches/NA1_4244578001?api_key=${API_KEY}`;
    const matchDataList = [];
    const matchPlayerList = [];

    useEffect(() => {
        async function getPlayerData() {
            try {
                const request = await axios.get(Match_API);
                setMatchData(request.data);
                console.log(request);
                return request;
            } catch (error) {
                console.log(error);
            }
        }
        getPlayerData();
    }, [Match_API]);

    for (var i = 0; i < 20; i++) {
        matchDataList.push
            (
                <li key={matchList[i]}>{matchList[i]}</li>
            );
    }
    
  
    // for (var i = 0; i < 10; i++) {
    //     matchPlayerList.push(<li>{matchData["info"]["participants"][`${i}`]}</li>);
    // }
    console.log({matchData});
 

    return (
        <div>
        <h4>Lastest Match:</h4>

        <h4>Last 20 Matches:</h4>
        <ul>{matchDataList}</ul>
        </div>
    )
}

// Player Data 
function PlayerData() {
    const [searchText, setSearchText] = useState("");
    const [playerData, setPlayerData] = useState([]);
    const [matchList, setMatchList] = useState([]);

    const Summoner_API = `https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${searchText}?api_key=${API_KEY}`;
    const MatchList_API = `https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${playerData.puuid}/ids?api_key=${API_KEY}`;

    // const Test_API = `https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/DrizzzyJ?api_key=${API_KEY}`;

    // Summoner API Request
    useEffect(() => {
        async function getPlayerData() {
            try {
                const request = await axios.get(Summoner_API);
                setPlayerData(request.data);
                console.log(request);
                return request;
            } catch (error) {
                console.log(error);
            }
        }
        getPlayerData();
    }, [Summoner_API]);

    // Match List API Request
    useEffect(() => {
        async function getMatchList() {
            try {
                const request = await axios.get(MatchList_API);
                setMatchList(request.data);
                console.log(request);
                return request;
            } catch (error) {
                console.log(error);
            }
        }
        getMatchList();
    }, [MatchList_API]);

    return (
        <div>
            <h1>Riot Player Search</h1>
            {/* <input type="text" onChange={e => setSearchText(e.target.value)}></input> */}
            <TextField id="standard-basic" label="Search For Player" variant="standard" onChange={e => setSearchText(e.target.value)} sx={{ input: { color: 'black', outline: 'white' } }} />
            {/* <label>Search For Player</label> */}
            {JSON.stringify(playerData) !== '{}' ?
                <>
                    <Summoner summonerName={playerData.name} summonerLevel={playerData.summonerLevel} matchList={matchList} />
                </>
                :
                <><p>No player data</p></>
            }
        </div>
    )

}
export default PlayerData;