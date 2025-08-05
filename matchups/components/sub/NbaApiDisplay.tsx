"use client"; // Mark as client component for interactivity

import { useState, useEffect } from "react";
import { getTeams, getPlayers, getGames } from "../api/nbaAPI";
import { NextResponse } from "next/server";

// This function is to proxy requests to keep the api key server-side for now
export async function GET() {
  // fetch the API route here
  const response = await fetch("/api/nba/teams");
  const teams = await response.json();
  try {
    const teams = await getTeams(); // Uses RAPIDAPI_KEY server-side
    return NextResponse.json(teams);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch teams" },
      { status: 500 }
    );
  }
}

interface Team {
  id: number;
  name: string;
  nickname: string;
}

interface Player {
  id: number;
  firstname: string;
  lastname: string;
}

interface Game {
  id: number;
  date: { start: string };
  teams: { home: { name: string }; visitors: { name: string } };
}

export default function ApiDisplay() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [players, setPlayers] = useState<Player[]>([]);
  const [games, setGames] = useState<Game[]>([]);
  const [selectedTeamId, setSelectedTeamId] = useState<string>("");
  const [date, setDate] = useState<string>("2024-10-22"); // Example date
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch teams on component mount
  useEffect(() => {
    async function fetchTeams() {
      try {
        setLoading(true);
        const teamsData = await getTeams();
        setTeams(teamsData);
      } catch (err) {
        setError("Failed to fetch teams");
      } finally {
        setLoading(false);
      }
    }
    fetchTeams();
  }, []);

  // Fetch players when a team is selected
  const handleTeamSelect = async (teamId: string) => {
    setSelectedTeamId(teamId);
    try {
      setLoading(true);
      const playersData = await getPlayers(teamId);
      setPlayers(playersData);
    } catch (err) {
      setError("Failed to fetch players");
    } finally {
      setLoading(false);
    }
  };

  // Fetch games for a specific date
  const handleFetchGames = async () => {
    try {
      setLoading(true);
      const gamesData = await getGames(date);
      setGames(gamesData);
    } catch (err) {
      setError("Failed to fetch games");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">NBA Data Explorer</h1>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* Teams Dropdown */}
      <div className="mb-4">
        <label htmlFor="teamSelect" className="block text-sm font-medium">
          Select a Team:
        </label>
        <select
          id="teamSelect"
          value={selectedTeamId}
          onChange={(e) => handleTeamSelect(e.target.value)}
          className="mt-1 p-2 border rounded"
        >
          <option value="">Select a team</option>
          {teams.map((team) => (
            <option key={team.id} value={team.id}>
              {team.name} ({team.nickname})
            </option>
          ))}
        </select>
      </div>

      {/* Players List */}
      {players.length > 0 && (
        <div className="mb-4">
          <h2 className="text-xl font-semibold">Players</h2>
          <ul className="list-disc pl-5">
            {players.map((player) => (
              <li key={player.id}>
                {player.firstname} {player.lastname}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Games Input and Button */}
      <div className="mb-4">
        <label htmlFor="dateInput" className="block text-sm font-medium">
          Enter Game Date (YYYY-MM-DD):
        </label>
        <input
          id="dateInput"
          type="text"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          placeholder="YYYY-MM-DD"
          className="mt-1 p-2 border rounded"
        />
        <button
          onClick={handleFetchGames}
          className="ml-2 p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Fetch Games
        </button>
      </div>

      {/* Games List */}
      {games.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold">Games on {date}</h2>
          <ul className="list-disc pl-5">
            {games.map((game) => (
              <li key={game.id}>
                {game.teams.visitors.name} vs {game.teams.home.name} at{" "}
                {new Date(game.date.start).toLocaleString()}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
