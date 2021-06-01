import React, { useEffect, useState } from "react";
import MatchDetailCard from "../components/MatchDetailCard";
import MatchSmallCard from "../components/MatchSmallCard";

const TeamPage = () => {
  const [team, setTeam] = useState({matches:[]});

  useEffect(() => {
    try {
      const fetchMatches = async () => {
        const response = await fetch(
          "http://localhost:8081/team/Delhi%20Capitals"
        );
        const data = await response.json();
        console.log(data)
        setTeam(data)
      };
      fetchMatches();
    } catch (error) {
      console.log(error);
    }
  },[]);

  return (
    <div className="TeamPage">
      <h1>{team.teamName}</h1>
      <MatchDetailCard match={team.matches[0]}></MatchDetailCard>

      {team.matches.slice(1).map((match,index) =>{
        return (
          <MatchSmallCard key={index} match={match}></MatchSmallCard>
        )
      })}
    </div>
  );
};

export default TeamPage;
