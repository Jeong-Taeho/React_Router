import { pages } from "./data";
import NavigationPage from "./pages/NavigationPage";
import { Reset } from "styled-reset";

const App = () => {
  return (
    <div>
      <Reset />
      <NavigationPage pages={pages} />
    </div>
  );
};

export default App;
