"use client";
import { useState } from "react";
import { TeamSelect } from "../sub/team-select";
import { TeamMatchup } from "../sub/TeamMatchup";

export const Versus = () => {
  const [teamA, setTeamA] = useState("");
  const [teamB, setTeamB] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const nbaTeams = [
    { id: "lakers", name: "LA Lakers" },
    { id: "warriors", name: "Golden State Warriors" },
    { id: "heat", name: "Miami Heat" },
    { id: "bucks", name: "Milwaukee Bucks" },
  ];

  const teams = [
    { id: "ATL", name: "Atlanta Hawks" },
    { id: "BOS", name: "Boston Celtics" },
    { id: "BKN", name: "Brooklyn Nets" },
    { id: "CHA", name: "Charlotte Hornets" },
    { id: "CHI", name: "Chicago Bulls" },
    { id: "CLE", name: "Cleveland Cavaliers" },
    { id: "DAL", name: "Dallas Mavericks" },
    { id: "DEN", name: "Denver Nuggets" },
    { id: "DET", name: "Detroit Pistons" },
    { id: "GSW", name: "Golden State Warriors" },
    { id: "HOU", name: "Houston Rockets" },
    { id: "IND", name: "Indiana Pacers" },
    { id: "LAC", name: "Los Angeles Clippers" },
    { id: "LAL", name: "Los Angeles Lakers" },
    { id: "MEM", name: "Memphis Grizzlies" },
    { id: "MIA", name: "Miami Heat" },
    { id: "MIL", name: "Milwaukee Bucks" },
    { id: "MIN", name: "Minnesota Timberwolves" },
    { id: "NOP", name: "New Orleans Pelicans" },
    { id: "NYK", name: "New York Knicks" },
    { id: "OKC", name: "Oklahoma City Thunder" },
    { id: "ORL", name: "Orlando Magic" },
    { id: "PHI", name: "Philadelphia 76ers" },
    { id: "PHX", name: "Phoenix Suns" },
    { id: "POR", name: "Portland Trail Blazers" },
    { id: "SAC", name: "Sacramento Kings" },
    { id: "SAS", name: "San Antonio Spurs" },
    { id: "TOR", name: "Toronto Raptors" },
    { id: "UTA", name: "Utah Jazz" },
    { id: "WAS", name: "Washington Wizards" },
  ];

  const handleSubmit = () => {
    if (teamA && teamB) {
      console.log("Submitted:", teamA, "vs", teamB);
      setSubmitted(true); // ✅ Trigger rendering
    }
  };

  return (
    <div className="w-full h-full flex flex-col justify-center content-center">
      <div className="flex flex-row justify-evenly content-center w-full h-64">
        <div className="w-[20%] h-[60%] bg-white border border-gray-300">
          <div className="w-full h-full"></div>
          <TeamSelect
            label="Team A"
            value={teamA}
            onChange={setTeamA}
            options={teams}
          />
        </div>

        <div className="flex flex-col justify-center content-center text-gray-800">
          <h2 className="text-center text-lg">VS</h2>
          <button
            onClick={handleSubmit}
            disabled={!teamA || !teamB}
            className={`px-6 py-2 rounded-lg font-semibold transition ${
              teamA && teamB
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            Submit
          </button>
        </div>

        <div className="w-[20%] h-[60%] bg-white border border-gray-300">
          <div className="w-full h-full"></div>
          <TeamSelect
            label="Team B"
            value={teamB}
            onChange={setTeamB}
            options={teams}
          />
        </div>
      </div>

      {/* ✅ Conditionally render TeamMatchup */}
      {submitted && (
        <div className="w-full flex justify-center">
          <div className="w-full max-w-4xl bg-white border border-gray-300 rounded-lg shadow p-6">
            <TeamMatchup
              team1Image="/images/team1.png"
              team2Image="/images/team2.png"
              record="Team 1 leads 12–8"
              statLabels={["PPG", "RPG", "APG", "3P%"]}
              headToHeadTeam1Stats={["101.4", "45.2", "24.1", "36.1%"]}
              headToHeadTeam2Stats={["98.7", "43.5", "22.8", "38.6%"]}
              historicalTeam1Stats={["99.8", "44.9", "23.5", "35.4%"]}
              historicalTeam2Stats={["100.2", "46.1", "25.0", "37.0%"]}
              team1Accolades={["🏆 3× Champs", "⭐ 5× All-Stars"]}
              team2Accolades={["🏆 1× Champion", "⭐ 4× All-Stars"]}
            />
          </div>
        </div>
      )}
    </div>
  );
};
