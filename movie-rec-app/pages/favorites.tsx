import { useEffect, useState } from "react";
import styled from "styled-components";
import { useFavorites } from "@/context/FavoritesContext";
import { MovieCard } from "@/components/MovieCard";
import type { TmdbMovie } from "@/lib/tmdb";

const Heading = styled.h1` font-size: 22px; margin: 16px; color: ${({ theme }) => theme.colors.text}; `;
const Grid = styled.section`
  display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px; padding: 16px; max-width: 1200px; margin: 0 auto;
  @media (min-width: 768px) { grid-template-columns: repeat(3, 1fr); }
  @media (min-width: 1024px) { grid-template-columns: repeat(5, 1fr); }
  padding: 55px 0px;
`;
const Empty = styled.p` color: ${({ theme }) => theme.colors.muted}; margin: 16px; `;

export default function FavoritesPage() {
  const { favorites } = useFavorites();
  const [movies, setMovies] = useState<TmdbMovie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      if (favorites.length === 0) { setMovies([]); return; }
      setLoading(true);
      try {
        const fetched: TmdbMovie[] = [];
        for (const id of favorites) {
          const res = await fetch(`/api/movie/${id}`);
          if (!res.ok) throw new Error("Failed to fetch favourite");
          const data = await res.json();
          if (data.movie) fetched.push(data.movie as TmdbMovie);
        }
        setMovies(fetched);
      } catch (e: unknown) {
        const msg = e instanceof Error ? e.message : "Unknown error";
        setError(msg);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [favorites]);

  if (loading) return <Heading>Loading favourites…</Heading>;
  if (error) return <Heading>Error: {error}</Heading>;
  if (favorites.length === 0) return <Empty>No favourites yet.</Empty>;

  return (
    <>
      <Grid>
        {movies.map((m) => <MovieCard key={m.id} movie={m} />)}
      </Grid>
    </>
  );
}