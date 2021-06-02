import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MatchDetailCard from "../components/MatchDetailCard";
import MatchSmallCard from "../components/MatchSmallCard";

const TeamPage = () => {
  const [team, setTeam] = useState({ matches: [] });
  const { teamName } = useParams();

  useEffect(() => {
    try {
      const fetchMatches = async () => {
        const response = await fetch(`http://localhost:8081/team/${teamName}`);
        const data = await response.json();
        console.log(data);
        setTeam(data);
      };
      fetchMatches();
    } catch (error) {
      console.log(error);
    }
  }, [teamName]);

  if (!team || !team.teamName) {
    return <h1>Team not found</h1>;
  }

  return (
    <div className="TeamPage">
      <h1>{team.teamName}</h1>
      <MatchDetailCard
        teamName={team.teamName}
        match={team.matches[0]}
      ></MatchDetailCard>

      {team.matches.slice(1).map((match, index) => {
        return (
          <MatchSmallCard
            teamName={team.teamName}
            key={index}
            match={match}
          ></MatchSmallCard>
        );
      })}
    </div>
  );
};

export default TeamPage;
