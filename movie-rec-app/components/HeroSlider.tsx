import { useState, useEffect } from "react";
import Link from "next/link";
import styled, { keyframes } from "styled-components";
import type { TmdbMovie } from "@/lib/tmdb";

const slideIn = keyframes`
  from { opacity: 0; transform: scale(1.1); }
  to { opacity: 1; transform: scale(1); }
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const HeroContainer = styled.section`
  position: relative;
  height: 70vh;
  min-height: 500px;
  max-height: 800px;
  overflow: hidden;
  margin-bottom: 40px;
`;



const Slide = styled.div<{ $isActive: boolean; $backgroundImage: string }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    135deg,
    rgba(0, 0, 0, 0.7) 0%,
    rgba(0, 0, 0, 0.3) 50%,
    rgba(0, 0, 0, 0.8) 100%
  );
  background-image: url(${props => props.$backgroundImage});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  opacity: ${props => props.$isActive ? 1 : 0};
  transition: opacity 1s ease-in-out;
  animation: ${props => props.$isActive ? slideIn : 'none'} 1s ease-out;
`;

const SlideContent = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 60px 100px;
  @media (max-width: 768px) {
    padding: 60px 20px;
  }
  color: white;
  z-index: 2;
  animation: ${fadeIn} 1.2s ease-out 0.3s both;
`;

const MovieTitle = styled.h1`
  font-size: 3.5rem;
  font-weight: 800;
  margin: 0 0 20px 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
  line-height: 1.1;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
  
  @media (max-width: 480px) {
    font-size: 2rem;
  }
`;

const MovieOverview = styled.p`
  font-size: 1.2rem;
  line-height: 1.6;
  margin: 0 0 30px 0;
  max-width: 600px;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  
  @media (max-width: 768px) {
    font-size: 1rem;
    -webkit-line-clamp: 2;
  }
`;

const CTAButton = styled(Link)`
  display: inline-block;
  background: rgb(13, 27, 38);
  color: white;
  padding: 15px 30px;
  border-radius: 10px;
  text-decoration: none;
  font-weight: 600;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(255, 255, 255, 0.64);
  
  &:hover {
    background:rgb(13, 27, 38);
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(255, 255, 255, 0.64);
  }
`;

const DotsContainer = styled.div`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 12px;
  z-index: 3;
`;

const Dot = styled.button<{ $isActive: boolean }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 2px solid white;
  background: ${props => props.$isActive ? 'white' : 'transparent'};
  cursor: pointer;
  transition: all 0.3s ease;
  opacity: 0.8;
  
  &:hover {
    opacity: 1;
    transform: scale(1.2);
  }
`;

const LoadingOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${({ theme }) => theme.colors.background};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.2rem;
  z-index: 1;
`;

type HeroSliderProps = {
  movies: TmdbMovie[];
  loading?: boolean;
};

export function HeroSlider({ movies, loading }: HeroSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const top5Movies = movies.slice(0, 5);

  useEffect(() => {
    if (top5Movies.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % top5Movies.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [top5Movies.length]);

  if (loading) {
    return (
      <HeroContainer>
        <LoadingOverlay>Loading trending movies...</LoadingOverlay>
      </HeroContainer>
    );
  }

  if (top5Movies.length === 0) {
    return null;
  }

  const getBackdropUrl = (movie: TmdbMovie) => {
    if (movie.backdrop_path) {
      return `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/original${movie.backdrop_path}`;
    }
    return movie.poster_path 
      ? `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/original${movie.poster_path}`
      : '/placeholder-hero.jpg';
  };

  return (
    <HeroContainer>
      {top5Movies.map((movie, index) => {
        const title = movie.title || movie.name || "Untitled";
        const overview = movie.overview || "No description available.";
        
        return (
          <Slide
            key={movie.id}
            $isActive={index === currentSlide}
            $backgroundImage={getBackdropUrl(movie)}
          >
            <SlideContent>
              <MovieTitle>{title}</MovieTitle>
              <MovieOverview>{overview}</MovieOverview>
              <CTAButton href={`/movies/${movie.id}`}>
                View Details →
              </CTAButton>
            </SlideContent>
          </Slide>
        );
      })}
      
      <DotsContainer>
        {top5Movies.map((_, index) => (
          <Dot
            key={index}
            $isActive={index === currentSlide}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </DotsContainer>
    </HeroContainer>
  );
}
