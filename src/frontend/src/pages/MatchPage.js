import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import MatchDetailCard from "../components/MatchDetailCard";
import YearSelector from "../components/YearSelector";
import "./styles/MatchPage.scss";

const MatchPage = () => {
  const [matches, setMatches] = useState([]);
  const { teamName, year } = useParams();

  useEffect(() => {
    try {
      const fetchMatches = async () => {
        const response = await fetch(
          `${process.env.REACT_APP_API_ROOT_URL}/team/${teamName}/matches?year=${year}`
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
        <h2>Select Year</h2>
        <YearSelector teamName={teamName}></YearSelector>
      </div>
      <div>
        <h1 className="page-heading">
          {teamName} matches in {year}
        </h1>

        {matches.length >0 ?
        matches.map((match) => {
          return (
            <MatchDetailCard
              key={match.id}
              teamName={teamName}
              match={match}
            ></MatchDetailCard>
          );
        }) : <h1>No Matching Data in Year {year}</h1>}
      </div>
      <div>
        <h1>
          <Link to={`/`}>Home</Link>
        </h1>
      </div>
    </div>
  );
};

export default MatchPage;
