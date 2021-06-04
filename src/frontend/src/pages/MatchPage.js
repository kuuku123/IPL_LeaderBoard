import React, {useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import MatchDetailCard from '../components/MatchDetailCard';

const MatchPage = () => {

  const [matches ,setMatches] = useState([]);
  const {teamName, year} = useParams();

  useEffect(() => {
    try {
      const fetchMatches = async () => {
        const response = await fetch(`http://localhost:8081/team/${teamName}/matches?year=${year}`);
        const data = await response.json();
        console.log(data);
        setMatches(data)
      };
      fetchMatches();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className="MatchPage">
      <h1>Match Page</h1> 
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
  )
}

export default MatchPage
