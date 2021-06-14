import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.scss";
import MatchPage from "./pages/MatchPage";
import TeamPage from "./pages/TeamPage";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/teams/:teamName/matches/:year">
            <MatchPage></MatchPage>
          </Route>
          <Route path="/teams/:teamName">
            <TeamPage></TeamPage>
          </Route>
          <Route path="/">
            <HomePage></HomePage>
          </Route>


        </Switch>
      </Router>
    </div>
  );
}

export default App;
