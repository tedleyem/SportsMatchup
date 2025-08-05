// pages/index.tsx
import TeamMatchup from "../components/TeamMatchup.jsx";

export default function Home() {
  return (
    <main>
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
        team2Accolades={["🏆 1× Champion", "⭐ 4× All-Stars"]} team1Stats={[]} team2Stats={[]}      />
    </main>
  );
}
