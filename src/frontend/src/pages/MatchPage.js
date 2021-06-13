import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MatchDetailCard from "../components/MatchDetailCard";
import YearSelector from '../components/YearSelector';
import "./styles/MatchPage.scss";

const MatchPage = () => {
  const [matches, setMatches] = useState([]);
  const { teamName, year } = useParams();

  useEffect(() => {
    try {
      const fetchMatches = async () => {
        const response = await fetch(
          `http://localhost:8081/team/${teamName}/matches?year=${year}`
        );
        const data = await response.json();
        console.log(data);
        setMatches(data);
      };
      fetchMatches();
    } catch (error) {
      console.log(error);
    }
  }, [teamName, year]);

  return (
    <div className="MatchPage">
      <div className="year-selector">
        <h>Select Year</h>
        <YearSelector teamName={teamName}></YearSelector>
      </div>
      <div>
        <h1 className="page-heading">{teamName} matches in {year}</h1>
        {matches.map((match, index) => {
          return (
            <MatchDetailCard
              key={index}
              teamName={teamName}
              match={match}
            ></MatchDetailCard>
          );
        })}
      </div>
    </div>
  );
};

export default MatchPage;
