import styled from "styled-components";


const UnauthorizedSection = styled.div`
    height: calc(100vh - 80px);
    width: 100%;
    display: grid;
    place-content: center;

    p{
        font-size: 1.5rem;
        font-weight: bold;
    }
`


function Unauthorized() {
    return (
        <UnauthorizedSection>
            <p>Error 401: You are Unauthorized to Perform this Action</p>
        </UnauthorizedSection>
    );
}

export default Unauthorized;