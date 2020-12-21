import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// UI
import Header from "./components/Header";
import "./App.css";

// Views
import Register from "./components/user/Register";
import Login from "./components/user/Login";

// Context
import UserContext from "./components/user/UserContext";
import axios from "axios";

export default function App() {
    const [user, setUser] = useState({
        token: undefined,
        user: {},
    });

    useEffect(() => {
        const tokenCheck = async () => {
            const token = localStorage.getItem("auth-token");
            // Check for first time on site
            if (token === null) return localStorage.setItem("auth-token", "");

            // Login User
            const userRes = await axios.get("/users/", {
                headers: { "x-auth-token": token },
            });
            if (userRes) {
                setUser({
                    token,
                    user: {
                        id: userRes.data.id,
                        username: userRes.data.username,
                    },
                });
            }
        };
        tokenCheck();
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            <Router>
                <Header></Header>
                <div className="container">
                    <Switch>
                        <Route exact path="/">
                            <h2
                                style={{
                                    marginTop: "2rem",
                                    textAlign: "center",
                                }}
                            >
                                {user.user.username || "Please Login/Register"}
                            </h2>
                        </Route>
                        <Route path="/register">
                            <Register></Register>
                        </Route>
                        <Route path="/login">
                            <Login></Login>
                        </Route>
                    </Switch>
                </div>
            </Router>
        </UserContext.Provider>
    );
}
