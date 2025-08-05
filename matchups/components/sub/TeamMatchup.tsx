"use client";

interface TeamMatchupProps {
  team1Image: string;
  team2Image: string;
  record: string;
  statLabels: string[];
  headToHeadTeam1Stats: string[];
  headToHeadTeam2Stats: string[];
  historicalTeam1Stats: string[];
  historicalTeam2Stats: string[];
  team1Accolades: string[];
  team2Accolades: string[];
}

export function TeamMatchup({
  team1Image,
  team2Image,
  record,
  statLabels,
  headToHeadTeam1Stats,
  headToHeadTeam2Stats,
  historicalTeam1Stats,
  historicalTeam2Stats,
  team1Accolades,
  team2Accolades,
}: TeamMatchupProps) {
  return (
    <div className="flex flex-col justify-center items-center space-y-6">
      {/* Record */}
      <h2 className="text-xl font-bold text-gray-800">{record}</h2>

      {/* Team Images */}
      <div className="flex justify-around items-center w-full">
        <img
          src={team1Image}
          alt="Team 1"
          className="h-20 w-20 object-contain"
        />
        <span className="text-lg font-semibold text-gray-600">vs</span>
        <img
          src={team2Image}
          alt="Team 2"
          className="h-20 w-20 object-contain"
        />
      </div>

      {/* Head-to-Head Stats */}
      <div className="w-full grid grid-cols-3 gap-4 text-center">
        <div className="space-y-2">
          {headToHeadTeam1Stats.map((stat, i) => (
            <div key={i} className="text-gray-800">
              {stat}
            </div>
          ))}
        </div>
        <div className="space-y-2 font-semibold text-gray-600">
          {statLabels.map((label, i) => (
            <div key={i}>{label}</div>
          ))}
        </div>
        <div className="space-y-2">
          {headToHeadTeam2Stats.map((stat, i) => (
            <div key={i} className="text-gray-800">
              {stat}
            </div>
          ))}
        </div>
      </div>

      {/* Historical Stats */}
      <div className="w-full grid grid-cols-3 gap-4 text-center mt-6">
        <div className="space-y-2">
          {historicalTeam1Stats.map((stat, i) => (
            <div key={i} className="text-gray-500">
              {stat}
            </div>
          ))}
        </div>
        <div className="space-y-2 font-semibold text-gray-400">
          {statLabels.map((label, i) => (
            <div key={i}>Avg (All Time)</div>
          ))}
        </div>
        <div className="space-y-2">
          {historicalTeam2Stats.map((stat, i) => (
            <div key={i} className="text-gray-500">
              {stat}
            </div>
          ))}
        </div>
      </div>

      {/* Accolades */}
      <div className="w-full grid grid-cols-2 gap-8 mt-6 text-sm text-gray-700">
        <div className="space-y-1">
          <h3 className="font-semibold text-center">Team 1 Accolades</h3>
          {team1Accolades.map((item, i) => (
            <div key={i} className="text-center">
              {item}
            </div>
          ))}
        </div>
        <div className="space-y-1">
          <h3 className="font-semibold text-center">Team 2 Accolades</h3>
          {team2Accolades.map((item, i) => (
            <div key={i} className="text-center">
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
