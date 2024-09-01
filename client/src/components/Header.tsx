import styled from "styled-components";
import { Wrapper } from "../styles/GlobalStyle.style";
import { Link } from "react-router-dom";

const StyledHeader = styled.header`
  height: 80px;
  display: flex;
  align-items: center;
`;

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Navigation = styled.nav`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const StyledLogo = styled(Link)`
  color: black;
  font-weight: bold;
  
  @media screen and (min-width: 768px) {
    font-size: 1.5rem;
  }
`;

function Header() {
  return (
    <StyledHeader>
      <Wrapper>
        <HeaderContainer>
          <StyledLogo to="/">MyBlog</StyledLogo>
          <Navigation>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </Navigation>
        </HeaderContainer>
      </Wrapper>
    </StyledHeader>
  );
}

export default Header;
