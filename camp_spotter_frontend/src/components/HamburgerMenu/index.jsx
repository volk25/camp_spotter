import React from "react";
import styled from "styled-components";

const HamburgerMenuContainer = styled.div`
  display: flex;
`;

const HamburgerIcon = styled.div`
  color: ${({ reverseColor }) => (reverseColor ? "#000" : "#fff")};
  cursor: pointer;
  z-index: 99;
  transition: all 250ms ease-in-out;
`;

const MenuContainer = styled.div`
  min-width: 300px;
  width: 100%;
  max-width: 44%;
  height: 100%;
  background-color: #fff;
  box-shadow: -2px 0 2 px rgba(15, 15, 15, 0.3);
  z-index: 99;
  position: fixed;
  top: 0;
  right: 0;
  user-select: none;
  padding: 1em 2.5em;
`;

export function HamburgerMenu(props) {
  return (
    <HamburgerMenuContainer>
      <HamburgerIcon>Icon</HamburgerIcon>
      <HamburgerMenu>Menu</HamburgerMenu>
    </HamburgerMenuContainer>
  );
}
