import { useState } from "react";
import { TeamSelect } from "../sub/team-select";
import { TeamMatchup } from "../sub/TeamMatchup";

export const Versus = () => {
  const [teamA, setTeamA] = useState("");
  const [teamB, setTeamB] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (teamA && teamB) {
      console.log("Submitted:", teamA, "vs", teamB);
      setSubmitted(true);
    }
  };

  return (
    <div
    className="w-full h-full flex flex-col justify-center items-center"
    style={{ backgroundImage: `url("")`, backgroundSize: 'cover', backgroundPosition: 'center' }}
  >
    <div className="flex flex-row justify-evenly items-center w-full h-64">
      <div className="w-[20%] h-[60%] bg-transparent border border-gray-300">
        <TeamSelect
          label="Team A"
          value={teamA}
          onChange={setTeamA}
          options={teams2}
        />
      </div>

        <div className="flex flex-col justify-center items-center text-gray-800">
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

      <div className="w-[20%] h-[60%] bg-transparent border border-gray-300">
        <TeamSelect
          label="Team B"
          value={teamB}
          onChange={setTeamB}
          options={teams2}
        />
      </div>
    </div>

      {submitted && (
        <div className="w-full flex justify-center">
          <div className="w-full max-w-4xl bg-white border border-gray-300 rounded-lg shadow p-6">
            <TeamMatchup
              team1Image={teams2.find((team) => team.id === teamA)?.image || "/images/default.png"}
              team2Image={teams2.find((team) => team.id === teamB)?.image || "/images/default.png"}
              team1Name={teams2.find((team) => team.id === teamA)?.name || "Team A"}
              team2Name={teams2.find((team) => team.id === teamB)?.name || "Team B"}
              record={`${teams2.find((team) => team.id === teamA)?.name || "Team A"} vs ${teams2.find((team) => team.id === teamB)?.name || "Team B"}`}
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

export default Versus;
