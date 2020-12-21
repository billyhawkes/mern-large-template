import React, { useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import UserConext from "./user/UserContext";

const StyledNavLink = styled(Link)`
    margin: 0rem 2rem;
`;
const StyledHeader = styled.header`
    background-color: var(--main-color);
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 4rem;
    color: white;
    padding: 0rem 2rem;
`;

export default function Header() {
    const { user, setUser } = useContext(UserConext);
    const logout = () => {
        localStorage.setItem("auth-token", "");
        setUser({
            token: undefined,
            user: {},
        });
    };
    return (
        <StyledHeader>
            <Link to="/">
                <h1>Project Name</h1>
            </Link>
            {user.user.id ? (
                <StyledNavLink onClick={logout} to="/">
                    Logout
                </StyledNavLink>
            ) : (
                <nav>
                    <StyledNavLink to="/register">Register</StyledNavLink>
                    <StyledNavLink to="/login">Login</StyledNavLink>
                </nav>
            )}
        </StyledHeader>
    );
}
