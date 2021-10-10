import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';

const AppearAnimation = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`;
const Content = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 20px;
    margin: 100px 30px;

    div {
        width: 100%;
        background-color: lightgray;
        height: 20vh;

        &:hover {
            background-color: pink;
        }
    }
`;

const Navigation = styled.nav`
    display: ${({isOpen})=> isOpen ? 'block' : 'none'};
    width: 100%;
    height: 100vh;
    background-color: white;
    position: absolute;
    left: 0;
    top: 0;
    animation: 0.3s 1 forwards ${AppearAnimation};

    @media (min-width: 720px) {
        display: block;
        width: 300px;
        border-right: 3px solid black;
        animation: none;
        transform: translateX(${({isOpen}) => isOpen ? '0' : '-100%'});
        transition: transform 0.3s ease-in-out;
    }

    ul {
        list-style: none;
        margin: 0;
        padding: 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100%;

        li {
            margin: 20px 0;

            a {
                font-size: 25px;
                text-decoration: none;

                &:hover {
                    text-decoration: underline;
                }
            }
        }
    }
`;

const MenuToggleButton = styled.button`
    width: 40px;
    height: 40px;
    z-index: 2;
    position: absolute;
    top: 20px;
    left: 20px;
    overflow-x: hidden;
    background-color: white;
    border: 3px solid black;

    @media (min-width: 720px) {
        left: 0;
        border-left: none;
        transform: translateX(${({isOpen}) => isOpen ? '300px' : '0'});
        transition: transform 0.3s ease-in-out;
    }

    span:first-child {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        transform: translateX(${({isOpen}) => isOpen ? 'calc(-100% - 3px)' : 0});
        transition: transform ease-in-out 0.3s;


        &::before, &::after {
            position: absolute;
            content: '';
            width: 17px;
            height: 3px;
            background-color: black;
            left: 50%;
        }
        &::before {
            top: 12px;
            transform: translate(-50%, -50%) rotate(45deg);
        }
        &::after {
            bottom: 12px;
            transform: translate(-50%, 50%) rotate(-45deg);
        }
    }

    span:last-child {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: calc(100% + 2px);
        transform: translateX(${({isOpen}) => isOpen ? 'calc(-100% - 3px)' : 0});
        transition: transform ease-in-out 0.3s;


        &::before, &::after {
            position: absolute;
            content: '';
            width: 25px;
            height: 3px;
            background-color: black;
            top: 50%;
            left: 50%;
        }
        &::before {
            transform: translate(-50%, -50%) rotate(45deg);
        }
        &::after {
            transform: translate(-50%, -50%) rotate(-45deg);
        }
    }
`;

const Sidebar = () => {

    const [isOpen, setIsOpen] = useState(false);
    return (
        <>
        <MenuToggleButton isOpen={isOpen} onClick={() => setIsOpen(prevState => !prevState)}>
            <span />
            <span />
        </MenuToggleButton>
            <Navigation isOpen={isOpen}>
                <ul>
                    <li><a tabIndex={isOpen ? null : '-1'} href="/">Lorem</a></li>
                    <li><a tabIndex={isOpen ? null : '-1'} href="/">Lorem</a></li>
                    <li><a tabIndex={isOpen ? null : '-1'} href="/">Lorem</a></li>
                    <li><a tabIndex={isOpen ? null : '-1'} href="/">Lorem</a></li>
                    <li><a tabIndex={isOpen ? null : '-1'} href="/">Lorem</a></li>
                </ul>
            </Navigation>
        <Content>
            <div />
            <div />
            <div />
            <div />
        </Content>
        </>
    );
};

export default Sidebar;
