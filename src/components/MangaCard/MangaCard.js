import styled from "styled-components";

export const MangaDiv = styled.div`
  display: flex;
  align-items: center;
  justify-items: center;
  flex-direction: column;
  padding: 50px;
  gap: 10px;

  a {
    text-decoration: none;
    font-weight: bold;
  }

  > img {
    max-height: 250px;
  }
`