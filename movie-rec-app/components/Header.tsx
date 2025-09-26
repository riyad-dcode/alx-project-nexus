import Link from "next/link";
import styled from "styled-components";

const Bar = styled.header`
  position: sticky; top: 0; z-index: 10;
  background: ${({ theme }) => theme.colors.surface};
  border-bottom: 1px solid rgba(255,255,255,.06);
  padding: 20px 0;
`;
const Wrap = styled.div`
  max-width: 1200px; margin: 0 auto; padding: 12px 16px;
  display: flex; align-items: center; justify-content: space-between; gap: 12px;
`;
const Title = styled.span`
  font-weight: 700; color: ${({ theme }) => theme.colors.text};
  font-size: 30px;
`;
const Nav = styled.nav`
  display: flex; align-items: center; gap: 55px;
  a { color: ${({ theme }) => theme.colors.muted}; text-decoration: none; }
  a:hover { color: ${({ theme }) => theme.colors.primary}; }
`;

export function Header() {
  return (
    <Bar>
      <Wrap>
        <Title>Movie App</Title>
        <Nav>
          <Link href="/">Trending Movies</Link>
          <Link href="/favorites">My Favourite Movies</Link>
        </Nav>
      </Wrap>
    </Bar>
  );
}