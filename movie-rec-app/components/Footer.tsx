import styled from "styled-components";

const Bar = styled.footer`
  margin-top: 40px;
  background: ${({ theme }) => theme.colors.surface};
  border-top: 1px solid rgba(255,255,255,.06);
`;
const Wrap = styled.div`
  max-width: 1200px; margin: 0 auto; padding: 16px;
  color: ${({ theme }) => theme.colors.muted}; font-size: 13px;
  text-align: center;
`;

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <Bar>
      <Wrap>Movie App · {year}</Wrap>
    </Bar>
  );
}