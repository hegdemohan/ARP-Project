import React, { Component } from 'react'
import './Registration.Component.css'
import axios from "axios";

class Registration extends Component {
    constructor(props) {
        super(props)
        this.state = {
            firstName: "",
            lastName: "",
            matriculationNumber: 0,
            loginDetails: {
                email: "",
                password: ""
            },
            errorData: ""
        }
        this.register = this.register.bind(this);
        this.onChange = this.onChange.bind(this);

    }
    async register(e) {
        e.preventDefault();
        await axios
            .post(
                // "http://192.168.0.102:4005/api/register",
                "https://99a1aa37.ngrok.io/api/register",
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
                console.log(res.data);
                this.props.history.push("/signin/");
            })
            .catch(error => {
                if (error.response.status == 409) {
                    console.log(error.response.status);
                    console.log(error.message);
                    this.setState({ errorData: "Matriculation Number or Email Address already exists" });
                }
            });
    }
    onChange(e) {
        const that = e.target.value;
        if (e.target.id == "email") {
            this.setState(prevState => ({
                loginDetails: {
                    ...prevState.loginDetails,
                    email: that
                }
            }))
        }
        else if (e.target.id == "password") {
            this.setState(prevState => ({
                loginDetails: {
                    ...prevState.loginDetails,
                    password: that
                }
            }))
        }
        else {
            this.setState({ [e.target.id]: e.target.value });
        }

    }
    render() {
        return (
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
                                    <div className="form-label-group">
                                        <input type="text" id="lastName" className="form-control text-center" placeholder="Last Name" onChange={this.onChange} required />
                                        <label htmlFor="lastName">Last Name</label>
                                    </div>
                                    <div className="form-label-group">
                                        <input type="number" id="matriculationNumber" className="form-control text-center" placeholder="Matriculation Number" onChange={this.onChange} required />
                                        <label htmlFor="matriculationNumber">Matriculation Number</label>
                                    </div>
                                    <div className="form-label-group">
                                        <input type="email" id="email" className="form-control text-center" placeholder="Email address" onChange={this.onChange} required />
                                        <label htmlFor="email">Email address</label>
                                    </div>
                                    <div className="form-label-group">
                                        <input type="password" id="password" className="form-control text-center" placeholder="Password" onChange={this.onChange} required />
                                        <label htmlFor="password">Password</label>
                                    </div>
                                    <div className="form-label-group">
                                        <input type="password" id="confirmPassWord" className="form-control text-center" placeholder="Confirm Password" required />
                                        <label htmlFor="confirmPassWord">Confirm Password</label>
                                    </div>
                                    <button className="btn btn-lg btn-primary btn-block text-uppercase" type="submit" onClick={this.register}>Register</button>
                                    <div className="errormsg my-3">
                                        {this.state.errorData}
                                    </div>
                                    <hr className="my-4" />
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Registration;