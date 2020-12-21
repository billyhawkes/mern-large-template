import React from "react";
import styled from "styled-components";

const StyledError = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #f26666;
    color: white;
    padding: 0.7rem;
    margin-bottom: 1.5rem;
    border-radius: 1rem;
`;
const StyledExitButton = styled.button`
    font-weight: bold;
    width: 1.3rem;
    height: 1.3rem;
    border: none;
    border-radius: 50%;
`;

export default function ErrorMessage({ error, removeError }) {
    return (
        <StyledError>
            <p>{error}</p>
            <StyledExitButton onClick={removeError}>X</StyledExitButton>
        </StyledError>
    );
}
