import React from "react";
import styled from "styled-components";

const TopLayer = styled.div`
  width: 1200px;
  height: 70px;
  border: 1px solid green;
`;

const HeaderTitleLeft = styled.h1`
  font-size: 20px;
  display: flex;
`;
const HeaderTitleRight = styled.h1`
  font-size: 20px;
`;
const Header = () => {
  return (
    <div>
      <TopLayer>
        <HeaderTitleLeft>TodoList</HeaderTitleLeft>
        <HeaderTitleRight>React</HeaderTitleRight>
      </TopLayer>
    </div>
  );
};
export default Header;
