import axios from "axios";
import Joi from "joi";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";

export default function Login({ saveUserData }) {
    const [errorList, setErrorList] = useState([]);
    let navigate = useNavigate();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState({
        email: "",
        password: "",
    });

    function getUserData(eventInfo) {
        let myUser = { ...user };
        myUser[eventInfo.target.name] = eventInfo.target.value;
        setUser(myUser);
        // console.log(myUser)
    }

    async function sendLoginDataToApi() {
        let { data } = await axios.post(
            "https://ecommerce.routemisr.com/api/v1/auth/signin",
            user
        );
        // console.log(data)
        if (data.message === "success") {
            setLoading(false);
            localStorage.setItem("userToken", data.token);
            saveUserData();
            navigate("/");
        } else {
            setError(data.message);
            setLoading(false);
        }
    }

    function submitLoginForm(eventInfo) {
        setLoading(true);
        eventInfo.preventDefault();
        let validation = validateLoginForm();
        if (validation.error) {
            setLoading(false);
            setErrorList(validation.error.details);
        } else {
            sendLoginDataToApi();
            setErrorList([]);
        }
    }

    function validateLoginForm() {
        let scheme = Joi.object({
            email: Joi.string()
                .email({ tlds: { allow: ["com", "net"] } })
                .required(),
            password: Joi.string().required(),
        });
        return scheme.validate(user, { abortEarly: false });
    }

    return (
        <>
            <form onSubmit={submitLoginForm} className="container w-75 my-3">
                <h2>Login Form</h2>
                {error.length > 0 ? (
                    <div className="alert alert-danger my-2 py-2">{error}</div>
                ) : (
                    ""
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
                    />
                    {errorList.filter(
                        (err) => err.context.label === "email"
                    )[0] ? (
                        <div className="alert text-danger py-0">
                            {
                                errorList.filter(
                                    (err) => err.context.label === "email"
                                )[0]?.message
                            }
                        </div>
                    ) : (
                        ""
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
                    />
                    {errorList.filter(
                        (err) => err.context.label === "password"
                    )[0] ? (
                        <div className="alert text-danger py-0">
                            {
                                errorList.filter(
                                    (err) => err.context.label === "password"
                                )[0]?.message
                            }
                        </div>
                    ) : (
                        ""
                    )}
                </div>
                <p>
                    don't have account?{" "}
                    <Link className="text-decoration-none" to="/register">
                        register
                    </Link>
                </p>

                <button type="submit" className="btn btn-info float-end">
                    {loading === true ? (
                        <i className="fas fa-spinner fa-spin"></i>
                    ) : (
                        "Login"
                    )}
                </button>
                <div className="clearfix"></div>
            </form>
        </>
    );
}
