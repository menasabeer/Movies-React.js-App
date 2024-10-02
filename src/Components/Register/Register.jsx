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

    function getUserData(eventInfo) {
        let myUser = { ...user };
        myUser[eventInfo.target.name] = eventInfo.target.value;
        setUser(myUser);
    }

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
            setError("An error occurred. Please try again later.");
        }
    }

    function submitRegisterForm(eventInfo) {
        setIsLoading(true);
        eventInfo.preventDefault();
        let validation = validateRegister();
        if (validation.error) {
            setIsLoading(false);
            setErrorList(validation.error.details);
        } else {
            sendRegisterDataToApi();
        }
    }

    function validateRegister() {
        let schema = Joi.object({
            name: Joi.string()
                .min(3)
                .max(12)
                .pattern(/^[A-Z]/)
                .required(),
            email: Joi.string()
                .email({
                    minDomainSegments: 2,
                    tlds: { allow: ["com", "net"] },
                })
                .required(),
            password: Joi.string().pattern(/^[A-Z][a-z]{3,6}/),
            rePassword: Joi.ref("password"),
            phone: Joi.string().pattern(/^01[0-2]{1}[0-9]{8}$/),
        });
        return schema.validate(user, { abortEarly: false });
    }

    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <meta name="description" content="login-page" />
                <title>Register Page</title>
            </Helmet>
            <form onSubmit={submitRegisterForm} className="container w-75 my-3">
                <h2>Register Form</h2>
                <div className="form-group mt-3">
                    <label htmlFor="name">Name : </label>
                    <input
                        onChange={getUserData}
                        type="text"
                        className="my-input form-control"
                        name="name"
                        id="name"
                    />
                    {errorList.map((err, index) =>
                        err.context && err.context.label === "name" ? (
                            <div key={index} className="text-danger">
                                Name should start with a capital letter
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
                    />
                    {errorList.map((err, index) =>
                        err.context && err.context.label === "email" ? (
                            <div key={index} className="text-danger">
                                Email Invalid
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
                    />
                    {errorList.map((err, index) =>
                        err.context && err.context.label === "password" ? (
                            <div key={index} className="text-danger">
                                Password Invalid
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
                    />
                    {errorList.map((err, index) =>
                        err.context && err.context.label === "rePassword" ? (
                            <div key={index} className="text-danger">
                                Passwords do not match
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
                    />
                    {errorList.map((err, index) =>
                        err.context && err.context.label === "phone" ? (
                            <div key={index} className="text-danger">
                                Phone number invalid
                            </div>
                        ) : null
                    )}
                </div>

                <button className="btn btn-primary mt-3 float-end">
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
