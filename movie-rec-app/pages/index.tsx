import { useEffect, useState } from "react";
import styled from "styled-components";
import { MovieCard } from "@/components/MovieCard";
import type { TmdbMovie } from "@/lib/tmdb";

const Grid = styled.section`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
  padding: 16px;
  max-width: 1200px;
  margin: 0 auto;
  @media (min-width: 768px) { grid-template-columns: repeat(3, 1fr); }
  @media (min-width: 1024px) { grid-template-columns: repeat(5, 1fr); }
`;
const Heading = styled.h1` font-size: 22px; margin: 16px; color: ${({ theme }) => theme.colors.text}; `;

export default function Home() {
  const [trending, setTrending] = useState<TmdbMovie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/trending");
        if (!res.ok) throw new Error("Failed to load trending");
        const data = await res.json();
        setTrending(data.results || []);
      } catch (e: unknown) {
        const message = e instanceof Error ? e.message : "Unknown error";
        setError(message);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) return <Heading>Loading trending…</Heading>;
  if (error) return <Heading>Error: {error}</Heading>;

  return (
    <>
      <Heading>Trending Movies</Heading>
      <Grid>
        {trending.map((m) => (
          <MovieCard key={m.id} movie={m} />
        ))}
      </Grid>
    </>
  );
}