import Link from "next/link";
import { useState, useEffect } from "react";
import styled from "styled-components";

const Bar = styled.header`
  position: sticky; top: 0; z-index: 10;
  background: ${({ theme }) => theme.colors.surface};
  border-bottom: 1px solid rgba(255,255,255,.06);
  padding: 20px 0;
`;
const Wrap = styled.div`
  max-width: 1500px; margin: 0 auto; padding: 12px 16px;
  display: flex; align-items: center; justify-content: space-between; gap: 12px;
`;
const Title = styled.span`
  font-weight: 700; color: ${({ theme }) => theme.colors.text};
  font-size: 30px;
`;
const Nav = styled.nav<{ $isOpen: boolean }>`
  display: flex; align-items: center; gap: 55px;
  a { color: ${({ theme }) => theme.colors.muted}; text-decoration: none; }
  a:hover { color: ${({ theme }) => theme.colors.primary}; }

  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${({ theme }) => theme.colors.surface};
    flex-direction: column;
    justify-content: center;
    gap: 40px;
    transform: ${props => props.$isOpen ? 'translateX(0)' : 'translateX(-100%)'};
    transition: transform 0.3s ease-in-out;
    z-index: 1000;
    
    a {
      font-size: 1.5rem;
      font-weight: 600;
    }
  }
`;

const HamburgerButton = styled.button<{ $isOpen: boolean }>`
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  z-index: 1001;
  
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  
  span {
    width: 25px;
    height: 3px;
    background: ${({ theme }) => theme.colors.text};
    transition: all 0.3s ease;
    transform-origin: center;
    
    &:nth-child(1) {
      transform: ${props => props.$isOpen ? 'rotate(45deg) translate(6px, 6px)' : 'none'};
    }
    
    &:nth-child(2) {
      opacity: ${props => props.$isOpen ? '0' : '1'};
    }
    
    &:nth-child(3) {
      transform: ${props => props.$isOpen ? 'rotate(-45deg) translate(6px, -6px)' : 'none'};
    }
  }
`;

const Overlay = styled.div<{ $isOpen: boolean }>`
  display: none;
  
  @media (max-width: 768px) {
    display: ${props => props.$isOpen ? 'block' : 'none'};
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 999;
  }
`;

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  return (
    <Bar>
      <Wrap>
        <Title>Movie App</Title>
        <HamburgerButton 
          $isOpen={isMenuOpen} 
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </HamburgerButton>
        <Nav $isOpen={isMenuOpen}>
          <Link href="/" onClick={closeMenu}>Trending Movies</Link>
          <Link href="/favorites" onClick={closeMenu}>My Favourite Movies</Link>
        </Nav>
      </Wrap>
      <Overlay $isOpen={isMenuOpen} onClick={closeMenu} />
    </Bar>
  );
}