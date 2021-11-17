import React from 'react';
import styled, { keyframes } from 'styled-components';
import {ButtonB} from "../FancyButtons/FancyButtons";

const MoveUpStart = keyframes`
  to {
    transform: translateY(-105%);
  }
`;

const MoveUpEnd = keyframes`
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
`;

const SlideLeft = keyframes`
  0% {
    transform: translateX(100%);
  }
  25% {
    transform: translateY(0%);
  }
  75% {
    transform: translateY(0%);
  }
  100% {
    transform: translateX(-100%);
  }
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    transform: translateX(100%);
    width: 100%;
    height: 100%;
    background-color: #181818;
    transform-origin: 0 0;
    animation: ${SlideLeft} 1s 0.5s forwards;
  }
`;

const TextContainer = styled.div`
  transform: rotate(-25deg);
`;

const StyledText = styled.span`
  margin: 0;
  font-size: 105px;
  display: block;
  overflow: hidden;
  line-height: 0.9;
  font-weight: bold;

  &::before {
    display: block;
    content: '${({content}) => content ? content : ''}';
    animation: ${MoveUpStart} 0.5s forwards, ${MoveUpEnd} 0.5s 1.5s forwards;
  }
`;

const StyledButton = styled(ButtonB)`
  width: 150px;
  height: 40px;
  font-size: 15px;
  position: absolute;
  top: 70%;
`;

const firstSlide = ['Start', 'here'];
const lastSlide = ['End', 'there'];

const Demo1 = () => {
  const [toggle, setToggle] = React.useState(true);
  const [content, setContent] = React.useState(firstSlide);

  const handleClick = () => {
    setToggle(!toggle);
  }

  React.useEffect(() => {
    setTimeout(() => {
      if (toggle) {
        setContent(firstSlide);
      } else {
        setContent(lastSlide);
      }
    }, 600);
  }, [toggle]);
    return (
        <Wrapper key={toggle}>
            <TextContainer>
                <StyledText content={content[0]}/>
                <StyledText content={content[1]} />
            </TextContainer>
            <StyledButton onClick={handleClick}>Next</StyledButton>
        </Wrapper>
    )
};

export default Demo1;
