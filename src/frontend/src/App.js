import logo from './logo.svg';
import './App.css';
import TeamPage from './pages/TeamPage';
import MatchDetailCard from './components/MatchDetailCard';
import MatchSmallCard from './components/MatchSmallCard';



function App() {
  return (
    <div className="App">
      <TeamPage></TeamPage>
      <MatchDetailCard></MatchDetailCard>
      <MatchSmallCard></MatchSmallCard>
      <MatchSmallCard></MatchSmallCard>
      <MatchSmallCard></MatchSmallCard>
    </div>
  );
}

export default App;
