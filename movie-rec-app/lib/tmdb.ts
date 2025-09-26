const TMDB_API_BASE_URL = "https://api.themoviedb.org/3";

function getAuthHeaders() {
  const token = process.env.TMDB_BEARER_TOKEN;
  if (!token) throw new Error("TMDB_BEARER_TOKEN is not set");
  return { Authorization: `Bearer ${token}`, Accept: "application/json" } as const;
}

export async function tmdbFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${TMDB_API_BASE_URL}${path}`, {
    ...init,
    headers: { ...getAuthHeaders(), ...(init?.headers || {}) },
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`TMDB error ${res.status}: ${await res.text()}`);
  return res.json();
}

export type TmdbMovie = {
  id: number;
  title?: string;
  name?: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date?: string;
  vote_average: number;
};

export type TmdbListResponse<T> = {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
};

export async function getTrendingMovies(): Promise<TmdbMovie[]> {
  const data = await tmdbFetch<TmdbListResponse<TmdbMovie>>("/trending/movie/week");
  return data.results;
}

export async function getMovieDetails(id: string | number): Promise<TmdbMovie> {
  return tmdbFetch<TmdbMovie>(`/movie/${id}`);
}

export async function getRecommendations(id: string | number): Promise<TmdbMovie[]> {
  const data = await tmdbFetch<TmdbListResponse<TmdbMovie>>(`/movie/${id}/recommendations`);
  return data.results;
}