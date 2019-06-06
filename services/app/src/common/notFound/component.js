import React from 'react';
import styled from 'styled-components';

const MainWrapper = styled.div`
  position: relative;
  height: 100vh;
  background: linear-gradient(
    135deg,
    #1e5799 0%,
    #207cca 32%,
    #207cca 32%,
    #2989d8 50%,
    #1e5799 97%,
    #7db9e8 100%
  );
`;

const TitleWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, -50%);
  text-transform: uppercase;
  text-align: center;
  color: white;
  font-weight: bold;

  h1 {
    font-size: 5rem;
    margin: 0;
  }

  p {
    font-size: 2rem;
    margin: 0;
  }
`;

const NotFound = ({ staticContext = {} }) => {
  staticContext.status = 404;

  return (
    <MainWrapper>
      <TitleWrapper>
        <h1>404</h1>
        <p>page not found</p>
      </TitleWrapper>
    </MainWrapper>
  );
};

export default NotFound;
