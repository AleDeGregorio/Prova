import styled from "styled-components";
import { darken } from "polished";

export const Bottone = styled.button`
  position: relative;
  text-align: center;
  border-radius: 0.3rem;
  border: none;
  background-color: #ff5a5f;
  color: white;
  font-weight: bold;
  font-size: 1.6rem;
  padding: 1.5rem 2rem;
  cursor: pointer;
  width: 100%;

  @media (min-width: 740px) {
    width: auto;
  }

  &:after {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    border-radius: 0.5rem;
    transition: 0.2s transform;
  }

  &:focus,
  &:active {
    outline: none;
    background-color: ${darken(0.1, "#ff5a5f")};

    &:after {
      border: 1px solid black;
      transform: scaleX(1.02) scaleY(1.2);

      @media (min-width: 740px) {
        transform: scaleX(1.1) scaleY(1.2);
      }
    }
  }
`;
