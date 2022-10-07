import { Route, Switch } from "react-router-dom";

import NavBar from "./layout/NavBar";
import MenuRow from "./layout/MenuRow";
import MyDay from "./component/MyDay/MyDay";

function App() {
  return (
    <div>
      <NavBar />

      <main>
        <MenuRow />
        <Switch>
          <Route path="/myday">
            <MyDay />
          </Route>
          <Route path="/important"></Route>
          <Route path="/planned"></Route>
          <Route path="/assigned_to_me"></Route>
          <Route path="/inbox"></Route>
        </Switch>
      </main>
    </div>
  );
}

export default App;
