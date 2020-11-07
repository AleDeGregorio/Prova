import styled from "styled-components";
import { darken } from "polished";
import { RED, GREEN } from "./colors";
import { flexbox } from "./mixins";

export const CTA = styled.button`
  background: ${RED};
  color: white;
  text-transform: capitalize;
  padding: 1.5rem 2.5rem;
  font-size: 1.6rem;
  font-weight: 600;
  letter-spacing: normal;
  border-radius: 0.4rem;
  border: none;
  outline: none;
  cursor: pointer;

  &:active {
    background: ${darken(0.25, RED)};
  }
`;

export const RoundedBtn = styled.button`
  background: white;
  border-radius: 50%;
  width: 3.4rem;
  height: 3.4rem;
  outline: none;
  font-size: 1.4rem;
  font-weight: 100;
  color: ${GREEN};
  border: 1px solid ${GREEN};
  opacity: ${({ disabled }) => (disabled ? 0.3 : 1)};
  cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};
  ${flexbox()};
`;
export const LinkBtn = styled.button`
  outline: none;
  font-size: 1.4rem;
  font-weight: 600;
  color: ${GREEN};
  background: transparent;
  border: none;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;