import React, { useContext, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import ErrorMessage from "../error/ErrorMessage";
import UserContext from "./UserContext.js";
import { AuthForm } from "./styles";

export default function Register() {
    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [passwordCheck, setPasswordCheck] = useState();
    const [error, setError] = useState();

    const history = useHistory();
    const { setUser } = useContext(UserContext);

    const register = async (e) => {
        e.preventDefault();
        try {
            const userRes = await axios.post("/users/register", {
                username,
                email,
                password,
                passwordCheck,
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
        <AuthForm onSubmit={register}>
            <h2>Register</h2>
            {error && (
                <ErrorMessage error={error} removeError={() => setError()} />
            )}
            <label htmlFor="register-username">Username</label>
            <input
                type="text"
                onChange={(e) => setUsername(e.target.value)}
                id="register-username"
            />
            <label htmlFor="register-email">Email</label>
            <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                id="register-email"
            />
            <label htmlFor="register-password">Password</label>
            <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                id="register-password"
            />
            <input
                type="password"
                placeholder="Verify Password"
                onChange={(e) => setPasswordCheck(e.target.value)}
            />
            <input type="submit" />
        </AuthForm>
    );
}
