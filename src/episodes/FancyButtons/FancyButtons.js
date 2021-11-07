import React, { useState } from "react";
import styled, { keyframes } from 'styled-components';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    padding-top: 200px;
`;

const StyledButton = styled.button`
    width: 200px;
    height: 50px;
    border: none;
    border: none;
    background-color: transparent;
    margin: 50px;
    padding: 0;
    cursor: pointer;
    font-size: 20px;
    font-weight: bold;
`;

const ButtonA = styled(StyledButton)`
    border: 4px solid black;
    position: relative;
    outline-offset: 0;
    overflow: hidden;
    transition: color 0.2s 0.1s ease-in-out;

    &::before {
        content: '';
        width: 300px;
        height: 300px;
        border-radius: 150px;
        position: absolute;
        background-color: black;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) scale(0);
        transition: transform 0.6s cubic-bezier(.27,.09,.28,1.16);
        z-index: -1;
    }

    &:hover::before {
        transform: translate(-50%, -50%) scale(1);
    }

    &:hover {
        color: white;
    }
`;

const ButtonB = styled(StyledButton)`
    position: relative;
    border: 4px solid black;
    outline-offset: 0;
    overflow: hidden;
    transition: color 0.2s 0.1s ease-in-out;

    &::before {
        content: '';
        width: 100%;
        height: 100%;
        position: absolute;
        background-color: black;
        top: 0;
        left: 0;
        transform: scaleX(0);
        transform-origin: 0;
        transition: transform 0.4s cubic-bezier(.27,.09,.28,1.16);
        z-index: -1;
    }

    &:hover::before {
        transform: scaleX(1);
    }

    &:hover {
        color: white;
    }
`;

const ButtonC = styled(StyledButton)`
    position: relative;
    overflow: hidden;
    border: none;
    box-shadow: inset 0 0 0 4px black;

    &::before {
        content: '';
        width: 300px;
        height: 300px;
        position: absolute;
        background-color: white;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) scale(1) rotate(45deg);
        transition: transform 0.6s ease-in-out;
    }

    &:hover::before {
        transform: translate(-50%, -50%) scale(0) rotate(45deg);
    }

    span {
        position: relative;
        z-index: 2;
    }
`;

const ButtonD = styled(StyledButton)`
    position: relative;
    overflow: hidden;
    border: 4px solid black;

    span {
        position: absolute;
        display: inline-block;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        left: 0;
        top: 0;
        transition: transform 0.6s cubic-bezier(.27,.09,.28,1.16);
    }

    span:nth-child(1) {
        transform: translateY(${({isLoading, isSuccess}) => {
            if (isLoading) return '-100%';
            if (isSuccess) return '-100%';
            return '0%';
        }})
    }

    span:nth-child(2) {
        transform: translateY(${({isLoading, isSuccess}) => {
            if (isLoading) return '0%';
            if (isSuccess) return '-100%';
            return '100%';
        }});
        color: white;

        &::before {
        content: '';
        width: 100%;
        height: 100%;
        position: absolute;
        background-color: black;
        top: 0;
        left: 0;
        transform: scaleX(${({isLoading}) => isLoading ? '1' : '0'});
        transform-origin: 0;
        transition: transform 2.4s 0.5s cubic-bezier(.27,.09,.28,1.16);
        z-index: -1;
    }
    }

    span:nth-child(3) {
        transform: translateY(${({isLoading, isSuccess}) => {
            if (isLoading) return '100%';
            if (isSuccess) return '0%';
            return '200%';
        }})
    }
`;

const moveUpStart = keyframes`
    to {
        transform: translateY(-105%);
    }
`;

const moveUpEnd = keyframes`
    from {
        transform: translateY(100%);
    }
    to {
        transform: translateY(0);
    }
`;

const ButtonE = styled(StyledButton)`
    overflow: hidden;
    position: relative;

    span {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        color: white;
    }
    &:hover span {
        animation: ${moveUpStart} 0.2s forwards, ${moveUpEnd} 0.2s forwards 0.2s;
    }

    &::before {
        position: absolute;
        top: 0;
        left: 0;
        content: '';
        width: 100%;
        height: 100%;
        background-color: black;
        z-index: -1;
        clip-path: polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%);
        transition: clip-path 0.2 ease-in-out;
    }
    &:hover::before {
        transition-duration: 0.4s;
        clip-path: polygon(0% 0%, 90% 0%, 100% 100%, 10% 100%);
    }
`;

const ButtonF = styled(StyledButton)`
    overflow: hidden;
    position: relative;
    border: 4px solid black;
    background-color: white;

    span {
        mix-blend-mode: difference;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        color: white;
    }
    &:hover span {
        animation: ${moveUpStart} 0.2s forwards, ${moveUpEnd} 0.3s forwards 0.2s;
    }

    &::before {
        position: absolute;
        top: 0;
        left: 0;
        content: '';
        width: 100%;
        height: 101%;
        background: black;
        clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);
        transition: clip-path 0.2s ease-in-out;
    }
    &:hover::before {
        transition-duration: 0.4s;
        clip-path: polygon(0 0, 100% 0%, 0 0, 0% 100%);
    }
`;

const FancyButtons = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsSuccess(true);
            setIsLoading(false);
        }, 3000)
    }

    return (
        <Wrapper>
            <ButtonA>Click me</ButtonA>
            <ButtonB>Click me</ButtonB>
            <ButtonC><span>Submit</span></ButtonC>
            <ButtonD isSuccess={isSuccess} isLoading={isLoading} onClick={handleSubmit}>
                <span>Submit</span>
                <span>Loading...</span>
                <span>Success!</span>
            </ButtonD>
            <ButtonE><span>Next</span></ButtonE>
            <ButtonF><span>Next</span></ButtonF>
        </Wrapper>
    )
};

export default FancyButtons;