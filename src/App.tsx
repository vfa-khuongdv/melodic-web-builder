import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AudioProvider } from "@/contexts/AudioContext";
import { PlayerBar } from "@/components/PlayerBar";
import { TrackDetail } from "@/pages/TrackDetail";

function App() {
  return (
    <Router>
      <AudioProvider>
        <div className="min-h-screen pb-24">
          <Routes>
            <Route path="/" element={<div>Home Page</div>} />
            <Route path="/track/:id" element={<TrackDetail />} />
          </Routes>
          <PlayerBar />
        </div>
      </AudioProvider>
    </Router>
  );
}

export default App;