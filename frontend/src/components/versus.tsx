import { useState, useEffect } from "react";
import { TeamSelect } from "./team-select";
import { TeamMatchup } from "./TeamMatchup";
import { RevealBlock } from "./RevealBlock";

interface VersusProps {
  teams: { id: string; name: string; image: string }[];
}

export const Versus = ({ teams }: VersusProps) => {
  const [teamA, setTeamA] = useState("");
  const [teamB, setTeamB] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (teamA && teamB) {
      console.log("Submitted:", teamA, "vs", teamB);
      setSubmitted(true);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setTeamA("");
    setTeamB("");
  };

  return (
    <div className="flex flex-col w-full bg-black text-white">
      <div className="flex flex-col items-center py-12 space-y-8">
        <div className="flex flex-row justify-evenly items-center w-full max-w-4xl">
          <TeamSelect
            label="Team A"
            value={teamA}
            onChange={setTeamA}
            options={teams}
          />
          <h2 className="text-lg font-bold">VS</h2>
          <TeamSelect
            label="Team B"
            value={teamB}
            onChange={setTeamB}
            options={teams}
          />
        </div>

        <div className="flex flex-col items-center space-y-2">
          <button
            onClick={handleSubmit}
            disabled={!teamA || !teamB}
            className={`px-6 py-2 rounded-lg font-semibold transition ${
              teamA && teamB
                ? "bg-orange text-white hover:bg-orange-light"
                : "bg-gray-medium hover:bg-gray-dim text-gray-light cursor-not-allowed"
            }`}
          >
            Submit
          </button>
          <button
            onClick={handleReset}
            className={`text-sm text-gray-light hover:text-white underline transition-opacity duration-300 ${
              submitted ? "opacity-100 visible" : "opacity-0 invisible"
            }`}
          >
            Reset
          </button>
        </div>
      </div>

      <div className="w-full px-4 pb-12">
        <RevealBlock show={submitted}>
          <TeamMatchup
            team1Image={
              teams.find((team) => team.id === teamA)?.image ||
              "/images/default.png"
            }
            team2Image={
              teams.find((team) => team.id === teamB)?.image ||
              "/images/default.png"
            }
            record={`${
              teams.find((team) => team.id === teamA)?.name || "Team A"
            } vs ${teams.find((team) => team.id === teamB)?.name || "Team B"}`}
            statLabels={["PPG", "RPG", "APG", "3P%"]}
            headToHeadTeam1Stats={["101.4", "45.2", "24.1", "36.1%"]}
            headToHeadTeam2Stats={["98.7", "43.5", "22.8", "38.6%"]}
            historicalTeam1Stats={["99.8", "44.9", "23.5", "35.4%"]}
            historicalTeam2Stats={["100.2", "46.1", "25.0", "37.0%"]}
            team1Accolades={["🏆 3× Champs", "⭐ 5× All-Stars"]}
            team2Accolades={["🏆 1× Champion", "⭐ 4× All-Stars"]}
          />
        </RevealBlock>
      </div>
    </div>
  );
};
export default Versus;
