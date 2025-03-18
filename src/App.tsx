import { Outlet } from "react-router-dom";
import "./styles/App.css";
import Provider from "./provider/Provider";
function App() {
  return (
    <Provider>
      <Outlet />
    </Provider>
  );
}

export default App;
