import styled from "styled-components";

export const StyledHeader = styled.header`
  background-color: ${({ theme }) => theme.colors.header};
  background-image: url("https://cutewallpaper.org/21/tumblr-youtube-backgrounds/Best-49-Vaporwave-Tumblr-Backgrounds-on-HipWallpaper-.gif");
  background-repeat: no-repeat;
  background-size: cover;
  color: white;
  height: 400px;
  padding: 40px 0;
`;

export const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 40px;
  @media (max-width: ${({ theme }) => theme.mobile}) {
    flex-direction: column;
  }
`;

export const StyledLogo = styled.div`
  font-size: 30px;
  @media (max-width: ${({ theme }) => theme.mobile}) {
    margin-bottom: 40px;
  }
`;

export const StyledImage = styled.img`
  width: 375px;
  height: 300px;
  margin-left: 40px;
  @media (max-width: ${({ theme }) => theme.mobile}) {
    margin-top: 40px;
  }
`;
