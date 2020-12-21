import styled from "styled-components";

export const AuthForm = styled.form`
    width: 80%;
    margin: auto;
    background-color: var(--back-color);
    padding: 2rem 4rem;
    margin-top: 2rem;
    border-radius: 1rem;
    h2 {
        text-align: center;
        margin-bottom: 1.5rem;
    }
    input {
        width: 100%;
        padding: 0.4rem 0.4rem;
        margin: 0.5rem 0rem;
        font-size: 0.9rem;
        border-radius: 0.2rem;
        border: 2px solid #cccccc;
    }
    input[type="submit"] {
        background-color: var(--main-color);
        border-color: var(--main-color);
        color: white;
    }
`;
