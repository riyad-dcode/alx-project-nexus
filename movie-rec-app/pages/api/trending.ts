import type { NextApiRequest, NextApiResponse } from "next";
import { getTrendingMovies } from "@/lib/tmdb";

export default async function handler(_req: NextApiRequest, res: NextApiResponse) {
  try {
    const results = await getTrendingMovies();
    res.status(200).json({ results });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to fetch trending";
    res.status(500).json({ error: message });
  }
}