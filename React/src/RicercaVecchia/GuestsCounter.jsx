import React from "react";
import styled from "styled-components";
import { FiPlus, FiMinus } from "react-icons/fi";
import { flexbox } from "../styles-lib/mixins";
import { RoundedBtn } from "../styles-lib/button";
import * as c from "../styles-lib/colors";

const GuestsCounter = ({ title, sub, count, cb }) => {
  return (
    <Box>
      <LabelsBox>
        <Title>{title}</Title>
        <Subtitle>{sub}</Subtitle>
      </LabelsBox>
      <ButtonsBox>
        <RoundedBtn onClick={() => cb(title, count - 1)} disabled={count === 0}>
          <FiMinus />
        </RoundedBtn>
        <CountLabel>{count}</CountLabel>
        <RoundedBtn onClick={() => cb(title, count + 1)}>
          <FiPlus />
        </RoundedBtn>
      </ButtonsBox>
    </Box>
  );
};

export default GuestsCounter;

const CountLabel = styled.h4`
  font-size: 1.6rem;
  line-height: 2.2rem;
  font-weight: 600;
  width: 5rem;
  text-align: center;
`;
// const RoundedBtn = styled.button`
//   border-radius: 50%;
//   width: 3.4rem;
//   height: 3.4rem;
//   outline: none;
//   font-size: 1.4rem;
//   font-weight: 100;
//   color: ${c.GREEN};
//   border: 1px solid ${c.GREEN};
//   opacity: ${({ disabled }) => (disabled ? 0.3 : 1)};
//   cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};
//   ${flexbox()};
// `;

const LabelsBox = styled.div`
  /* color:${c.GREY}; */
  ${flexbox({ dir: "column", ai: "flex-start" })}
`;
const ButtonsBox = styled.div`
  ${flexbox()};
  /* border: cyan 1px solid; */
`;
const Title = styled.h3`
  text-transform: capitalize;
  font-size: 1.6rem;
  line-height: 2.2rem;
  font-weight: 600;
`;

const Subtitle = styled.h4`
  text-transform: capitalize;
  font-size: 1.4rem;
  line-height: 1.8rem;
  font-weight: 300;
  padding-top: 0.4rem;
`;

const Box = styled.div`
  /* border: deeppink 1px solid; */
  color: ${c.GREY};
  width: 100%;
  min-height: 5rem;
  ${flexbox({ jc: "space-between" })}
  padding: 0.4rem 2rem;
  margin: 1rem 0;
`;
