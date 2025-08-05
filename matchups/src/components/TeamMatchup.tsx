// components/TeamMatchup.tsx
"use client";

import styles from "./TeamMatchup.module.css";
import { useState } from "react";

type TeamMatchupProps = {
  team1Image: string;
  team2Image: string;
  record: string;
  team1Stats: string[];
  team2Stats: string[];
  statLabels: string[];
  team1Accolades: string[];
  team2Accolades: string[];
  headToHeadTeam1Stats: string[];
  headToHeadTeam2Stats: string[];
  historicalTeam1Stats: string[];
  historicalTeam2Stats: string[];
};

export default function TeamMatchup({
  team1Image,
  team2Image,
  record,
  statLabels = [],

  headToHeadTeam1Stats = [],
  headToHeadTeam2Stats = [],
  historicalTeam1Stats = [],
  historicalTeam2Stats = [],

  team1Accolades = [],
  team2Accolades = [],
}: TeamMatchupProps) {
  const [showHeadToHead, setShowHeadToHead] = useState(true);

  const team1Stats = showHeadToHead
    ? headToHeadTeam1Stats
    : historicalTeam1Stats;
  const team2Stats = showHeadToHead
    ? headToHeadTeam2Stats
    : historicalTeam2Stats;

  return (
    <div className={styles.container}>
      <div className={styles.imagesRow}>
        <img src={team1Image} alt="Team 1" className={styles.teamImage} />
        <div className={styles.vsSection}>
          <span className={styles.vsText}>VS</span>
          <span className={styles.record}>{record}</span>
        </div>
        <img src={team2Image} alt="Team 2" className={styles.teamImage} />
      </div>

      <div className={styles.accoladesSection}>
        <div className={styles.accoladesColumn}>
          {team1Accolades.map((badge, idx) => (
            <span key={idx} className={styles.badge}>
              {badge}
            </span>
          ))}
        </div>
        <div className={styles.accoladesColumn}>
          {team2Accolades.map((badge, idx) => (
            <span key={idx} className={styles.badge}>
              {badge}
            </span>
          ))}
        </div>
      </div>

      <button
        onClick={() => setShowHeadToHead((prev) => !prev)}
        className={styles.toggleButton}
      >
        {showHeadToHead ? "Show Historical Stats" : "Show Head-to-Head Stats"}
      </button>

      <div className={styles.statsRow}>
        <div className={styles.statGrid}>
          {team1Stats.map((value, idx) => (
            <div key={idx} className={styles.statTile}>
              <div className={styles.statValue}>{value}</div>
              <div className={styles.statLabel}>{statLabels[idx]}</div>
            </div>
          ))}
        </div>

        <div className={styles.statGrid}>
          {team2Stats.map((value, idx) => (
            <div key={idx} className={styles.statTile}>
              <div className={styles.statValue}>{value}</div>
              <div className={styles.statLabel}>{statLabels[idx]}</div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.statsTable}>
        {statLabels.map((label, index) => (
          <div key={index} className={styles.row}>
            <span>{team1Stats[index]}</span>
            <span className={styles.label}>{label}</span>
            <span>{team2Stats[index]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
