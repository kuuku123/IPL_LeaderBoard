import React, { useEffect, useState } from "react";
import TeamTile from "../components/TeamTile";
import "./styles/HomePage.scss";

const HomePage = () => {
  const [teams, setTeam] = useState([]);

  useEffect(() => {
    try {
      const fetchAllTeams = async () => {
        const response = await fetch(`${process.env.REACT_APP_API_ROOT_URL}/team`);
        const data = await response.json();
        setTeam(data);
      };
      fetchAllTeams();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className="HomePage">
      <div className="header-section">
        <h1 className="app-name">TonyLim IPL Dashboard</h1>
      </div>
      <div className="team-grid">
        {teams.map((team) => {
          return <TeamTile key={team.id} teamName={team.teamName}></TeamTile>;
        })}
      </div>
    </div>
  );
};

export default HomePage;
