import './App.css';
import {BrowserRouter, Route, Switch} from "react-router-dom"
import LandingPage from "./Components/LandingPage"
import Home from './Components/Home';
import VideoGameCreate from "./Components/VideoGameCreate"
import VideoGameDetails from "./Components/VideogameDetails"

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
      <Route exact path="/" component= {LandingPage}></Route>
      <Route exact path="/home" component={Home} ></Route>
      <Route exact path="/videogame" component={VideoGameCreate} ></Route>
      <Route exact path="/home/:id" component={VideoGameDetails} ></Route>
      {/* <Route path ="*" component={Home} ></Route> */}
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
