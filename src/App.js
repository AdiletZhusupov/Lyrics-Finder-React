import { Route, BrowserRouter, Routes } from "react-router-dom";
import MyNav from "./components/MyNav";
import Tracks from "./components/Tracks";
import TrackInfo from "./components/TrackInfo";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <MyNav text="LyricFinder" />
        <Routes>
          <Route exact path="/" element={<Tracks />} />
          <Route exact path="/details/:id" element={<TrackInfo />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
