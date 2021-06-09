import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import MatchDetailCard from "../components/MatchDetailCard";
import MatchSmallCard from "../components/MatchSmallCard";
import "./styles/TeamPage.scss";

const TeamPage = () => {
  const [team, setTeam] = useState({ matches: [] });
  const { teamName } = useParams();
  const winRefs = useRef();
  const loseRefs = useRef();

  function MouseEnter(r) {
    r.current.classList.add("touched");
  }
  function MouseLeave(r) {
    r.current.classList.remove("touched");
  }

  useEffect(() => {
    try {
      const fetchMatches = async () => {
        const response = await fetch(`http://localhost:8081/team/${teamName}`);
        const data = await response.json();
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
      <div className="team-name-section">
        <h1>{team.teamName}</h1>
      </div>

      <h1 className="Win-loss-section">
        <span
          ref={winRefs}
          className="Wins"
          onMouseEnter={() => MouseEnter(winRefs)}
          onMouseLeave={() => MouseLeave(winRefs)}
        >
          Wins
        </span>
        /
        <span
          ref={loseRefs}
          className="Losses"
          onMouseEnter={() => MouseEnter(loseRefs)}
          onMouseLeave={() => MouseLeave(loseRefs)}
        >
          Losses
        </span>
      </h1>

      <div className="match-detail-section">
        <div className="body2">
          <div className="words word-1">
            <span>Latest Matches</span>
          </div>
        </div>
        <MatchDetailCard
          teamName={team.teamName}
          match={team.matches[0]}
        ></MatchDetailCard>
      </div>

      {team.matches.slice(1).map((match, index) => {
        return (
          <MatchSmallCard
            teamName={team.teamName}
            key={index}
            match={match}
          ></MatchSmallCard>
        );
      })}

      <div>
        <a href="#">More</a>
      </div>
    </div>
  );
};

export default TeamPage;
