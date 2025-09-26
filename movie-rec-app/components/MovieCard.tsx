import Link from "next/link";
import styled from "styled-components";
import { useFavorites } from "@/context/FavoritesContext";
import type { TmdbMovie } from "@/lib/tmdb";

const Card = styled.article`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radii.md};
  box-shadow: ${({ theme }) => theme.shadow.sm};
  overflow: hidden;
  transition: transform .2s ease, box-shadow .2s ease;
  &:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,.3); }
`;
const Poster = styled.img`
  width: 100%;
  display: block;
  aspect-ratio: 2/3;
  object-fit: cover;
`;
const Content = styled.div`padding: 12px 14px; `;
const TitleRow = styled.div` display: flex; align-items: center; justify-content: space-between; gap: 8px; `;
const Title = styled.h3` font-size: 14px; margin: 0; color: ${({ theme }) => theme.colors.text}; `;
const FavBtn = styled.button`
  background: transparent; border: 0px solid ${({ theme }) => theme.colors.muted}; color: ${({ theme }) => theme.colors.muted};
  border-radius: 999px; padding: 4px 8px; cursor: pointer; font-size: 12px;
  &:hover { border-color: ${({ theme }) => theme.colors.primary}; color: ${({ theme }) => theme.colors.primary}; }
`;

type Props = { movie: TmdbMovie };

export function MovieCard({ movie }: Props) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const title = movie.title || movie.name || "Untitled";
  const posterUrl = movie.poster_path ? `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/w342${movie.poster_path}` : "/placeholder.png";
  const fav = isFavorite(movie.id);

  return (
    <Card>
      <Link href={`/movies/${movie.id}`}>
        <Poster src={posterUrl} alt={title} loading="lazy" />
      </Link>
      <Content>
        <TitleRow>
          <Title>{title}</Title>
          <FavBtn onClick={() => toggleFavorite(movie.id)} aria-pressed={fav}>
            {fav ? "❤️" : "🖤"}
          </FavBtn>
        </TitleRow>
      </Content>
    </Card>
  );
}