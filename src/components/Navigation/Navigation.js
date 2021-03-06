import React from 'react';
import {NavLink} from "react-router-dom";
import styled from "styled-components";

const Nav = styled.nav`
  width: 235px;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: auto;
  background-color: #eee;
  position: absolute;
  right: 0;
  top: 50px;
  transform: translateX(${({isOpen}) => isOpen ? '0' : '100%'});
  transition: transform 0.5s ease-in-out;
  z-index: 10;
`;

const NavList = styled.ul`
  padding: 0;
  list-style: none;
`;

const NavListItem = styled.li`
  margin: 10px 0;
`;

const activeClassName = 'selected';
const StyledNavLink = styled(NavLink).attrs(props => ({
    tabIndex: props.isOpen ? null : '-1',
    activeClassName,
}))`
  font-family: 'IBM Plex Mono', monospace;
  text-decoration: none;
  color: black;
  font-size: 14px;

  &.${activeClassName} {
    font-weight: bold;
  }
`;

const NavButton = styled.button`
  width: 40px;
  height: 40px;
  background-color: #eee;
  border: none;
  position: absolute;
  left: -40px;
`;

const Navigation = () => {

  const [isOpen, setIsOpen] = React.useState(false);

  return (
      <Nav isOpen={isOpen}>
          <NavButton onClick={() => setIsOpen(!isOpen)}>🍔</NavButton>
          <NavList>
              <NavListItem>
                <StyledNavLink isOpen={isOpen} exact to="/">Home</StyledNavLink>
              </NavListItem>
              <NavListItem>
                <StyledNavLink isOpen={isOpen} to="/infinite-scroll">Infinite Scroll</StyledNavLink>
              </NavListItem>
              <NavListItem>
                <StyledNavLink isOpen={isOpen} to="/accordion-faq">Accordion Faq</StyledNavLink>
              </NavListItem>
              <NavListItem>
                <StyledNavLink isOpen={isOpen} to="/sidebar">Sidebar</StyledNavLink>
              </NavListItem>
              <NavListItem>
                <StyledNavLink isOpen={isOpen} to="/combobox">Combobox</StyledNavLink>
              </NavListItem>
              <NavListItem>
                <StyledNavLink isOpen={isOpen} to="/fancy-buttons">Fancy Buttons</StyledNavLink>
              </NavListItem>
              <NavListItem>
                <StyledNavLink isOpen={isOpen} to="/cool-transitions">Cool Transitions</StyledNavLink>
              </NavListItem>
              <NavListItem>
                <StyledNavLink isOpen={isOpen} to="/svg-animation">SVG animation</StyledNavLink>
              </NavListItem>
          </NavList>
      </Nav>
  )
};

export default Navigation;