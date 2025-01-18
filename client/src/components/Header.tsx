import styled from "styled-components";
import { Wrapper } from "../styles/GlobalStyle.style";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../context/userContext";
import axiosApi from "../api/axios";

const StyledHeader = styled.header`
  height: 80px;
  display: flex;
  align-items: center;
  margin-block: .8rem;
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

const CreateButton = styled.button`
  color: black;
  border: none;
  background-color: transparent;
  font-size: 0.8rem;
  cursor: pointer;
  @media screen and (min-width: 768px) {
    font-size: 1rem;
  }
`;

const LogoutButton = styled.button`
  color: black;
  border: none;
  background-color: transparent;
  font-size: 0.8rem;
  cursor: pointer;
  @media screen and (min-width: 768px) {
    font-size: 1rem;
  }
`;

function Header() {
  const { userInfo, setUserInfo } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    axiosApi
      .post("/auth/logout")
      .then(() => {
        setUserInfo(null);
        localStorage.removeItem("user_id");
        localStorage.removeItem("accessToken");
        navigate("/");
      })
      .catch((error) => console.log(error));
  };

  return (
    <StyledHeader>
      <Wrapper>
        <HeaderContainer>
          <StyledLogo to="/">Blogger</StyledLogo>
          {userInfo ? (
            <Navigation>
              <CreateButton>
                <Link to="/create-blog">Create new blog</Link>
              </CreateButton>
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
