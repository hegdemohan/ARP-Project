import React, { Component } from 'react'
import './Registration.Component.css'
import axios from "axios";
import { ToastsContainer, ToastsStore, ToastsContainerPosition } from 'react-toasts';

class Registration extends Component {
    constructor(props) {
        super(props)
        this.state = {
            firstName: "",
            lastName: "",
            matriculationNumber: 0,
            confirmPassword: "",
            loginDetails: {
                email: "",
                password: ""
            },
            errorData: {
                errorFirstName: "",
                errorLastName: "",
                errorMatrNum: "",
                errorEmail: "",
                errorPassword: "",
                errorUserExist: ""
            },
            registerClicked: false,
        }
        this.register = this.register.bind(this);
        this.onChange = this.onChange.bind(this);
        this.validData = this.validData.bind(this);
    }
    async register(e) {
        e.preventDefault();
        this.state.registerClicked = true;
        if (this.validData()) {
            var loader = document.getElementById("loader");
            loader.className = "fullScreen";
            loader.firstChild.style.display = "inline-block";
            await axios
                .post(
                    "http://b5560796.ngrok.io/api/register",
                    {
                        firstName: this.state.firstName,
                        lastName: this.state.lastName,
                        matriculationNumber: this.state.matriculationNumber,
                        loginDetails: {
                            email: this.state.loginDetails.email,
                            password: this.state.loginDetails.password
                        }
                    },
                )
                .then(res => {
                    ToastsStore.success("Successfully Registered!");
                    loader.className = "";
                    loader.firstChild.style.display = "none";
                    window.setTimeout(function () {
                        window.location.href = '/signin/';
                    }, 1000);
                })
                .catch(error => {
                    loader.className = "";
                    loader.firstChild.style.display = "none";
                    if (error.response === undefined) {
                        ToastsStore.info("Please check your Internet Connection!");
                    }
                    else if (error.response.status === 409) {
                        this.setState(prevState => ({
                            errorData: {
                                ...prevState.errorData,
                                errorUserExist: "Matriculation Number or Email Address already exists"
                            }
                        }))
                    }
                });
        }
    }

    validData() {
        this.setState({
            errorData: {
                errorFirstName: "",
                errorLastName: "",
                errorMatrNum: "",
                errorEmail: "",
                errorPassword: "",
                errorUserExist: ""
            }
        })
        var isValid = true;
        if (this.state.firstName === "" || this.state.firstName === undefined) {
            this.setState(prevState => ({
                errorData: {
                    ...prevState.errorData,
                    errorFirstName: "Please enter First Name"
                }
            }))
            isValid = false;
        }
        if (this.state.lastName === "" || this.state.lastName === undefined) {
            this.setState(prevState => ({
                errorData: {
                    ...prevState.errorData,
                    errorLastName: "Please enter Last Name"
                }
            }))
            isValid = false;
        }
        if (this.state.matriculationNumber === "" || this.state.matriculationNumber === undefined) {
            this.setState(prevState => ({
                errorData: {
                    ...prevState.errorData,
                    errorMatrNum: "Please enter Matriculation Number"
                }
            }))
            isValid = false;
        }
        if (this.state.loginDetails.email === "" || this.state.loginDetails.email === undefined || !/\S+@\S+\.\S+/.test(this.state.loginDetails.email)) {
            this.setState(prevState => ({
                errorData: {
                    ...prevState.errorData,
                    errorEmail: "Please enter a valid Email Address"
                }
            }))
            isValid = false;
        }
        if (this.state.loginDetails.password === "" || this.state.loginDetails.password === undefined) {
            this.setState(prevState => ({
                errorData: {
                    ...prevState.errorData,
                    errorPassword: "Password can not be empty"
                }
            }))
            isValid = false;
        } else if (this.state.loginDetails.password !== this.state.confirmPassword) {
            this.setState(prevState => ({
                errorData: {
                    ...prevState.errorData,
                    errorPassword: "Passwords did not match"
                }
            }))
            isValid = false;
        }
        return isValid;
    }

    onChange(e) {
        const that = e.target.value;
        if (e.target.id === "email") {
            this.setState(prevState => ({
                loginDetails: {
                    ...prevState.loginDetails,
                    email: that
                }
            }), () => {
                if (this.state.registerClicked) {
                    this.validData();
                }
            })
        }
        else if (e.target.id === "password") {
            this.setState(prevState => ({
                loginDetails: {
                    ...prevState.loginDetails,
                    password: that
                }
            }), () => {
                if (this.state.registerClicked) {
                    this.validData();
                }
            })
        }
        else {
            this.setState({ [e.target.id]: e.target.value }, () => {
                if (this.state.registerClicked) {
                    this.validData();
                }
            });
        }

    }
    render() {
        return (
            <div>
                <div id="loader">
                    <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                            <div className="card card-signin my-5">
                                <div className="card-body">
                                    <h5 className="card-title text-center">Registration Form</h5>
                                    <form className="form-signin">
                                        <div className="form-label-group">
                                            <input type="text" id="firstName" className="form-control text-center" placeholder="First Name" onChange={this.onChange} required />
                                            <label htmlFor="firstName">First Name</label>
                                        </div>
                                        <div className="errormsg my-3">
                                            {this.state.errorData.errorFirstName}
                                        </div>
                                        <div className="form-label-group">
                                            <input type="text" id="lastName" className="form-control text-center" placeholder="Last Name" onChange={this.onChange} required />
                                            <label htmlFor="lastName">Last Name</label>
                                        </div>
                                        <div className="errormsg my-3">
                                            {this.state.errorData.errorLastName}
                                        </div>
                                        <div className="form-label-group">
                                            <input type="number" id="matriculationNumber" className="form-control text-center" placeholder="Matriculation Number" onChange={this.onChange} required />
                                            <label htmlFor="matriculationNumber">Matriculation Number</label>
                                        </div>
                                        <div className="errormsg my-3">
                                            {this.state.errorData.errorMatrNum}
                                        </div>
                                        <div className="form-label-group">
                                            <input type="email" id="email" className="form-control text-center" placeholder="Email address" onChange={this.onChange} required />
                                            <label htmlFor="email">Email address</label>
                                        </div>
                                        <div className="errormsg my-3">
                                            {this.state.errorData.errorEmail}
                                        </div>
                                        <div className="form-label-group">
                                            <input type="password" id="password" className="form-control text-center" placeholder="Password" onChange={this.onChange} required />
                                            <label htmlFor="password">Password</label>
                                        </div>
                                        <div className="form-label-group">
                                            <input type="password" id="confirmPassword" className="form-control text-center" placeholder="Confirm Password" onChange={this.onChange} required />
                                            <label htmlFor="confirmPassword">Confirm Password</label>
                                        </div>
                                        <div className="errormsg my-3">
                                            {this.state.errorData.errorPassword}
                                        </div>
                                        <button className="btn btn-lg btn-primary btn-block text-uppercase" type="submit" onClick={this.register}>Register</button>
                                        {/* <ToastContainer  /> */}
                                        <ToastsContainer position={ToastsContainerPosition.BOTTOM_CENTER} store={ToastsStore} />
                                        <div className="errormsg my-3">
                                            {this.state.errorData.errorUserExist}
                                        </div>
                                        <hr className="my-4" />
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Registration;