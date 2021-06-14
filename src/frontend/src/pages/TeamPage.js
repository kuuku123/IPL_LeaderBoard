import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import MatchDetailCard from "../components/MatchDetailCard";
import MatchSmallCard from "../components/MatchSmallCard";
import "./styles/TeamPage.scss";
import { PieChart } from "react-minimal-pie-chart";
import {Link} from 'react-router-dom';

const TeamPage = () => {
  const [team, setTeam] = useState({ matches: [] });
  const { teamName } = useParams();
  const winRefs = useRef();
  const loseRefs = useRef();

  const defaultLabelStyle = {
  fontSize: '17px',
};

  function MouseEnter(r) {
    r.current.classList.add("touched");
  }
  function MouseLeave(r) {
    r.current.classList.remove("touched");
  }

  useEffect(() => {
    try {
      const fetchTeam = async () => {
        const response = await fetch(`http://localhost:8081/team/${teamName}`);
        const data = await response.json();
        setTeam(data);
      };
      fetchTeam();
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
        <PieChart
          data={[
            {
              title: "Loss",
              value: team.totalMatches - team.totalWins,
              color: "#a34d5d",
            },
            { title: "Win", value: team.totalWins, color: "#4da375" },
          ]}
          viewBoxSize={[130, 90]}
          center={[80, 50]}
          label={({ dataEntry }) => `${dataEntry.title} : ${dataEntry.value}` }
           labelStyle={{
          ...defaultLabelStyle,
        }}
        />
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

      <div className="more-link">
        <Link to={`/teams/${teamName}/matches/${process.env.REACT_APP_DATA_END_YEAR}`}>More ></Link>
      </div>
    </div>
  );
};

export default TeamPage;
