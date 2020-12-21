import React, { useContext, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import ErrorMessage from "../error/ErrorMessage";
import UserContext from "./UserContext.js";
import { AuthForm } from "./styles";

export default function Login() {
    const [identity, setIdentity] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState();

    const history = useHistory();
    const { setUser } = useContext(UserContext);

    const login = async (e) => {
        e.preventDefault();
        try {
            const userRes = await axios.post("/users/login", {
                identity,
                password,
            });

            setUser({
                token: userRes.data.token,
                user: userRes.data.user,
            });
            localStorage.setItem("auth-token", userRes.data.token);

            history.push("/");
        } catch (err) {
            err.response.data.msg && setError(err.response.data.msg);
        }
    };

    return (
        <AuthForm onSubmit={login}>
            <h2>Login</h2>
            {error && (
                <ErrorMessage error={error} removeError={() => setError()} />
            )}
            <label htmlFor="login-identity">Username/Email</label>
            <input
                type="text"
                onChange={(e) => setIdentity(e.target.value)}
                id="login-identity"
            />
            <label htmlFor="login-password">Password</label>
            <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                id="login-password"
            />
            <input type="submit" />
        </AuthForm>
    );
}
