import styled from "styled-components";
import { Wrapper } from "../styles/GlobalStyle.style";
import { Link } from "react-router-dom";
import { useUser } from "../context/userContext";
import axios from "axios";

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

const LogoutButton = styled.button`
   color: black;
   border: none;
   background-color: transparent;
   font-size: 1.1rem;
   cursor: pointer;
  /* @media screen and (min-width: 768px) {
    font-size: 1.5rem;
  } */
`


function Header() {
  const { userInfo, setUserInfo } = useUser();

  const handleLogout = () => {
    axios
      .post("http://localhost:8000/api/logout", {}, { withCredentials: true })
      .then(() => {
        setUserInfo(null)
      })
      .catch((error) => console.log(error));
  };

  return (
    <StyledHeader>
      <Wrapper>
        <HeaderContainer>
          <StyledLogo to="/">MyBlog</StyledLogo>
          {userInfo ? (
            <Navigation>
              <Link to="/create-blog">Create new blog</Link>
              <LogoutButton type="button" onClick={handleLogout}>
                Logout {`(${userInfo.username})`}
              </LogoutButton>
            </Navigation>
          ) : (
            <Navigation>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </Navigation>
          )}
        </HeaderContainer>
      </Wrapper>
    </StyledHeader>
  );
}

export default Header;
