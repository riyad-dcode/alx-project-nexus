import type { NextApiRequest, NextApiResponse } from "next";
import { getMovieDetails, getRecommendations } from "@/lib/tmdb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  if (!id || Array.isArray(id)) return res.status(400).json({ error: "Invalid id" });

  try {
    const [movie, recommendations] = await Promise.all([
      getMovieDetails(id),
      getRecommendations(id),
    ]);
    res.status(200).json({ movie, recommendations });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to fetch movie";
    res.status(500).json({ error: message });
  }
}