import { useEffect, useState } from "react";
import "./App.css";
import { Navbar } from "./components/navbar";
import Versus from "./components/versus";
import { Footer } from "./components/footer";

function App() {
  const [showApi, setShowApi] = useState(false);
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    fetch("http://backend:5000/api/teams")  // Use service name 'backend'
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("Fetched teams:", data);
        setTeams(data);
      })
      .catch((err) => {
        console.error("Failed to fetch teams:", err.message);
      });
  }, []);

  return (
    <div className="w-full min-h-screen flex flex-col bg-black">
      <Navbar showApi={showApi} setShowApi={setShowApi} />

      <div className="overflow-y-auto">
        <Versus teams={teams} />
        <Footer />
      </div>
    </div>
  );
}

export default App;
