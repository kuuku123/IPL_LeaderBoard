import "./App.css";
import TeamPage from "./pages/TeamPage";
import { BrowserRouter as Router, Route ,Switch} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch >
        <Route path="/teams/:teamName/matches/:year">
          <MatchPage></MatchPage>
        </Route>
        <Route path="/teams/:teamName">
          <TeamPage></TeamPage>
        </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
