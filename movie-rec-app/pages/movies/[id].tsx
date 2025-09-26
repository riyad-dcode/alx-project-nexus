import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";
import type { TmdbMovie } from "@/lib/tmdb";
import { MovieCard } from "@/components/MovieCard";

const Wrap = styled.div` max-width: 1100px; margin: 0 auto; padding: 16px; display: grid; gap: 16px; `;
const Title = styled.h1` font-size: 24px; margin: 0; color: ${({ theme }) => theme.colors.text}; `;
const Row = styled.div`
  display: grid; grid-template-columns: 1fr; gap: 16px;
  @media (min-width: 900px) { grid-template-columns: 320px 1fr; }
`;
const Poster = styled.img` width: 100%; border-radius: ${({ theme }) => theme.radii.md}; `;
const Overview = styled.p` color: ${({ theme }) => theme.colors.muted}; line-height: 1.6; `;
const Sub = styled.h2` font-size: 18px; margin: 12px 0; color: ${({ theme }) => theme.colors.text}; `;
const Grid = styled.div`
  display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px;
  @media (min-width: 768px) { grid-template-columns: repeat(4, 1fr); }
`;

export default function MovieDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [movie, setMovie] = useState<TmdbMovie | null>(null);
  const [recs, setRecs] = useState<TmdbMovie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    const load = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/movie/${id}`);
        if (!res.ok) throw new Error("Failed to load movie");
        const data = await res.json();
        setMovie(data.movie);
        setRecs(data.recommendations || []);
      } catch (e: unknown) {
        const message = e instanceof Error ? e.message : "Unknown error";
        setError(message);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  if (loading) return <Wrap><Title>Loading…</Title></Wrap>;
  if (error || !movie) return <Wrap><Title>Error: {error || "Movie not found"}</Title></Wrap>;

  const title = movie.title || movie.name || "Untitled";
  const poster = movie.poster_path ? `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/w500${movie.poster_path}` : "/placeholder.png";

  return (
    <Wrap>
      <Row>
        <div><Poster src={poster} alt={title} /></div>
        <div>
          <Title>{title}</Title>
          <Overview>{movie.overview}</Overview>
        </div>
      </Row>
      <Sub>Recommended</Sub>
      <Grid>
        {recs.map((m) => <MovieCard key={m.id} movie={m} />)}
      </Grid>
    </Wrap>
  );
}