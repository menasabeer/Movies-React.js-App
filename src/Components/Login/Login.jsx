import axios from "axios";
import Joi from "joi";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Login({ saveUserData }) {
    const [errorList, setErrorList] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState({
        email: "",
        password: "",
    });

    let navigate = useNavigate();

    // Handle input changes
    function getUserData(eventInfo) {
        const { name, value } = eventInfo.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    }

    // Send login data to API
    async function sendLoginDataToApi() {
        try {
            setLoading(true);
            const { data } = await axios.post(
                "https://ecommerce.routemisr.com/api/v1/auth/signin",
                user
            );
            if (data.message === "success") {
                localStorage.setItem("userToken", data.token);
                saveUserData(); // Call this to save the user data
                navigate("/");
            } else {
                setError(data.message);
            }
        } catch (err) {
            setError("email or password is incorrect");
        } finally {
            setLoading(false);
        }
    }

    // Submit login form
    function submitLoginForm(eventInfo) {
        eventInfo.preventDefault();
        const validation = validateLoginForm();

        if (validation.error) {
            setErrorList(validation.error.details);
            setError(""); // Clear any general errors if validation fails
        } else {
            setErrorList([]);
            sendLoginDataToApi();
        }
    }

    // Validate the login form
    function validateLoginForm() {
        const schema = Joi.object({
            email: Joi.string()
                .email({ tlds: { allow: ["com", "net"] } })
                .required(),
            password: Joi.string().required(),
        });
        return schema.validate(user, { abortEarly: false });
    }

    return (
        <form onSubmit={submitLoginForm} className="container w-75 my-3">
            <h2>Login Form</h2>

            {error && (
                <div className="alert alert-danger my-2 py-2">{error}</div>
            )}

            <div className="my-3">
                <label className="mt-3" htmlFor="email">
                    Email:
                </label>
                <input
                    onChange={getUserData}
                    type="email"
                    className="form-control mb-1 my-input"
                    name="email"
                    id="email"
                    value={user.email}
                />
                {errorList.some((err) => err.context.label === "email") && (
                    <div className="alert text-danger py-0">
                        {
                            errorList.find(
                                (err) => err.context.label === "email"
                            )?.message
                        }
                    </div>
                )}
            </div>

            <div className="my-3">
                <label htmlFor="password">Password:</label>
                <input
                    onChange={getUserData}
                    type="password"
                    className="form-control mb-1 my-input"
                    name="password"
                    id="password"
                    value={user.password}
                />
                {errorList.some((err) => err.context.label === "password") && (
                    <div className="alert text-danger py-0">
                        {
                            errorList.find(
                                (err) => err.context.label === "password"
                            )?.message
                        }
                    </div>
                )}
            </div>

            <p>
                Don't have an account?{" "}
                <Link className="text-decoration-none" to="/register">
                    Register
                </Link>
            </p>

            <button
                type="submit"
                className="btn btn-info float-end"
                disabled={loading}
            >
                {loading ? <i className="fas fa-spinner fa-spin"></i> : "Login"}
            </button>
            <div className="clearfix"></div>
        </form>
    );
}
