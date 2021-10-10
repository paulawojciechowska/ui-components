import React from 'react';
import {data} from './data';
import styled, {keyframes} from "styled-components";

const showBox = keyframes`
  0% {
    transform: scaleY(0);
  }
  100% {
    transform: scaleY(1);
  }
`;

const showContent = keyframes`
  0% {
    opacity: 0;
    transform: translateX(-2%);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
`;
const Wrapper = styled.div`
  width: 100%;
  padding: 100px; 
`;

const StyledDetails = styled.details`
  width: 600px;
  margin: 30px 0;
  summary {
    font-size: 24px;
    list-style: none;
    cursor: pointer;
    position: relative;
  }

  summary::after {
    content: '>';
    position: absolute;
    left: -30px;
    transition: transform 0.2s ease-in-out;
  }

  &[open] {
    summary::after {
      transform: rotate(90deg);
    }
  }

  &[open] div {
    display: block;
  }

  summary:focus-visible {
    outline: 3px solid #f9e852;
  }

  div {
    display: none;
    transform: scaleY(0);
    transform-origin: 0 0;
    animation: 0.4s ease-in-out 1 forwards ${showBox};
    margin: 20px 0;
    background-color: #f9e852;
    padding: 20px 40px;
    border-left: 10px solid black;

    p {
      opacity: 0;
      animation: 0.2s 0.4s ease-in 1 forwards ${showContent}
    }
  }

  @media not all and (min-resolution:.001dpcm) {
    @supports (-webkit-apperance:none) and (stroke-color:transparent) {
      summary::-webkit-details-marker {
        display: none;
      }
      summary:focus {
        outline: 3px solid #f9e852;
      }
    }
  }
`;

const AccordionFaq = () => {
    return (
      <Wrapper>
        {data.map(item => 
        <StyledDetails key={item.title}>
          <summary>{item.title}</summary>
          <div>
            <p>{item.content}</p>
          </div>
        </StyledDetails>)}
      </Wrapper>
    )
};

export default AccordionFaq;