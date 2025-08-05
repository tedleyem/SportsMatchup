import { useState, useEffect } from 'react';
import { getTeams } from '../api/nbaAPI';
interface Team {
  id: number;
  name: string;
  // Add other team properties as needed
}

interface ApiDisplayProps {
  showApi: boolean;
}

export const ApiDisplay = ({ showApi }: ApiDisplayProps) => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!showApi) return; // Only fetch when showApi is true

    const fetchTeams = async () => {
      setLoading(true);
      try {
        const res = await getTeams(); // Await the Promise
        if (!res.ok) {
          throw new Error('Failed to fetch data');
        }
        const json: Team[] = await res.json();
        setTeams(json);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, [showApi]);

  if (!showApi) return null; // Hide component if showApi is false
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold text-gray-200">NBA Teams</h2>
      <ul className="list-disc pl-5">
        {teams.map((team) => (
          <li key={team.id} className="text-gray-200">
            {team.name}
          </li>
        ))}
      </ul>
    </div>
  );
};