import Navbar from './components/Navbar';
import './App.css';
import { Redirect, Route, Switch } from "react-router-dom";
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import ErrorPage from './components/ErrorPage';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Switch>
      <Route path="/" exact>
        <Redirect to="/home"></Redirect>
      </Route>
      <Route path="/home">
        <Home />
      </Route>

      <Route path="/login">
        <Login />
      </Route>

      <Route path="/signup">
        <Signup />
      </Route>

      <Route path="**">
        <ErrorPage />
      </Route>
      </Switch>

    </div>
  );
}

export default App;
