import {BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom';
import Home from './Home';
import Cliente from './Cliente';
import Vendedor from './Vendedor';
import Comissao from './Comissao';


function App() {
  return (
    <Router>
      <div className="App">
         <Routes>

            <Route exact path="/">
              <Home/>
            </Route>

            <Route exact path="/Comissao">
              <Comissao/>
            </Route>

            <Route exact path="/Cliente">
              <Cliente/>
            </Route>

            <Route exact path="/Vendedor">
              <Vendedor/>
            </Route>

          </Routes>
      </div>
    </Router>
  );
}

export default App;
