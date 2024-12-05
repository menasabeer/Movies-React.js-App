import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Joi from "joi";
import { Helmet } from "react-helmet";

export default function Register() {
    let navigate = useNavigate();
    const [errorList, setErrorList] = useState([]);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        rePassword: "",
        phone: "",
    });

    // Handle form input change
    function getUserData(eventInfo) {
        const { name, value } = eventInfo.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    }

    // Send registration data to the API
    async function sendRegisterDataToApi() {
        try {
            const { data } = await axios.post(
                `https://ecommerce.routemisr.com/api/v1/auth/signup`,
                user
            );
            if (data.message === "success") {
                setIsLoading(false);
                navigate("/Login");
            } else {
                setIsLoading(false);
                setError(data.message);
            }
        } catch (error) {
            setIsLoading(false);
            setError(error?.response?.data?.message || "An error occurred");
            
        }
    }

    // Submit registration form
    function submitRegisterForm(eventInfo) {
        setIsLoading(true);
        eventInfo.preventDefault();
        let validation = validateRegister();
        if (validation.error) {
            setIsLoading(false);
            setErrorList(validation.error.details);
        } else {
            setErrorList([]);
            sendRegisterDataToApi();
        }
    }

    // Validate registration form
    function validateRegister() {
        let schema = Joi.object({
            name: Joi.string()
                .min(3)
                .max(12)
                .pattern(/^[A-Z]/)
                .required()
                .messages({
                    "string.pattern.base": "Name should start with a capital letter",
                    "string.min": "Name should be at least 3 characters",
                    "string.max": "Name should be no longer than 12 characters",
                }),
            email: Joi.string()
                .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
                .required()
                .messages({
                    "string.email": "Email is invalid",
                }),
            password: Joi.string()
                .pattern(/^[A-Z][a-z]{3,6}/)
                .required()
                .messages({
                    "string.pattern.base": "Password should start with an uppercase letter and be 4-7 characters long",
                }),
            rePassword: Joi.ref("password"),
            phone: Joi.string().pattern(/^01[0-2]{1}[0-9]{8}$/).required().messages({
                "string.pattern.base": "Phone number is invalid",
            }),
        });
        return schema.validate(user, { abortEarly: false });
    }

    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <meta name="description" content="Register page for new users" />
                <title>Register Page</title>
            </Helmet>
            <form onSubmit={submitRegisterForm} className="container w-75 my-3">
                <h2>Register Form</h2>

                {error && <div className="alert alert-danger">{error}</div>}

                <div className="form-group mt-3">
                    <label htmlFor="name">Name : </label>
                    <input
                        onChange={getUserData}
                        type="text"
                        className="my-input form-control"
                        name="name"
                        id="name"
                        value={user.name}
                    />
                    {errorList.map((err, index) =>
                        err.context && err.context.label === "name" ? (
                            <div key={index} className="text-danger">
                                {err.message}
                            </div>
                        ) : null
                    )}
                </div>

                <div className="form-group mt-3">
                    <label htmlFor="email">E-mail : </label>
                    <input
                        onChange={getUserData}
                        type="email"
                        className="my-input form-control"
                        name="email"
                        id="email"
                        value={user.email}
                    />
                    {errorList.map((err, index) =>
                        err.context && err.context.label === "email" ? (
                            <div key={index} className="text-danger">
                                {err.message}
                            </div>
                        ) : null
                    )}
                </div>

                <div className="form-group mt-3">
                    <label htmlFor="password">Password : </label>
                    <input
                        onChange={getUserData}
                        type="password"
                        className="my-input form-control"
                        name="password"
                        id="password"
                        value={user.password}
                    />
                    {errorList.map((err, index) =>
                        err.context && err.context.label === "password" ? (
                            <div key={index} className="text-danger">
                                {err.message}
                            </div>
                        ) : null
                    )}
                </div>

                <div className="form-group mt-3">
                    <label htmlFor="rePassword">Confirm Password : </label>
                    <input
                        onChange={getUserData}
                        type="password"
                        className="my-input form-control"
                        name="rePassword"
                        id="rePassword"
                        value={user.rePassword}
                    />
                    {errorList.map((err, index) =>
                        err.context && err.context.label === "rePassword" ? (
                            <div key={index} className="text-danger">
                                {err.message}
                            </div>
                        ) : null
                    )}
                </div>

                <div className="form-group mt-3">
                    <label htmlFor="phone">Phone : </label>
                    <input
                        onChange={getUserData}
                        type="text"
                        className="my-input form-control"
                        name="phone"
                        id="phone"
                        value={user.phone}
                    />
                    {errorList.map((err, index) =>
                        err.context && err.context.label === "phone" ? (
                            <div key={index} className="text-danger">
                                {err.message}
                            </div>
                        ) : null
                    )}
                </div>

                <button className="btn btn-primary mt-3 float-end" disabled={isLoading}>
                    {isLoading ? (
                        <i className="fas fa-spinner fa-spin"></i>
                    ) : (
                        "Register"
                    )}
                </button>
            </form>
        </>
    );
}
