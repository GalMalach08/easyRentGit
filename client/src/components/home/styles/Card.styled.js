import styled from "styled-components";

export const StyledCard = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;

  justify-content: space-around;
  background-color: #fff;
  border-radius: 15px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
  margin: 40px 20px;
  padding: 60px;
  cursor: pointer;

  &:hover {
    box-shadow: 10px 10px rgba(33, 33, 33, 0.2);
  }
  img {
    width: 80%;
    height: 200px;
  }
  & > div {
    flex: 1;
  }
  @media (max-width: ${({ theme }) => theme.mobile}) {
    flex-direction: column;
  }
`;
