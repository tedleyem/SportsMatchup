const API_KEY = process.env.NEXT_PUBLIC_API_KEY; // Security Tip: Store your API key in .env.local
const API_HOST = "api-nba-v1.p.rapidapi.com";
const BASE_URL = "https://api-nba-v1.p.rapidapi.com";

// Helper function to handle API requests (error handling)
async function fetchFromApi(
  endpoint: string,
  params: Record<string, string> = {}
) {
  const url = new URL(`${BASE_URL}${endpoint}`);
  Object.keys(params).forEach((key) =>
    url.searchParams.append(key, params[key])
  );

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": API_KEY || "",
      "X-RapidAPI-Host": API_HOST,
    },
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.statusText}`);
  }

  const data = await response.json();
  return data.response; // The API wraps responses in a "response" key
}

// API functions
export async function getTeams() {
  return fetchFromApi("/teams");
}

export async function getPlayers(teamId: string) {
  return fetchFromApi("/players", { team: teamId, season: "2024" });
}

export async function getGames(date: string) {
  return fetchFromApi("/games", { date });
}

export async function getStandings(conference: string) {
  return fetchFromApi("/standings", {
    league: "standard",
    season: "2024",
    conference,
  });
}

export async function getPlayerStats(playerId: string) {
  return fetchFromApi("/players/statistics", { id: playerId, season: "2024" });
}
