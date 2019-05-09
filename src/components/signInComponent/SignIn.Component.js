import React, { Component } from 'react';
import './SignIn.Component.css'
import axios from 'axios'
import { Route, withRouter } from 'react-router-dom'

class SignInComponent extends Component {
    signInObject = {};
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            passWord: '',
            responseObject: ''
        }

        this.signIn = this.signIn.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    signIn() {
        console.log("here")
        axios.post("https://0ab80a65-1441-4447-b497-11020f9f0b0e.mock.pstmn.io/login", { "email": this.state.email, "password": this.state.passWord }).then(res => {
            // this.setState({ availableSubjects: res.data});
            this.setState({ responseObject: res.data });
            if (this.state.responseObject.isAdmin === false) {
                this.signInObject.email = this.state.email;
                this.signInObject.passWord = this.state.passWord;
                window.location.href = '/studentDetails';
            }
        }).catch(function (error) {
            console.log(error);
        });
        // call the api
        // get the response
    }

    onChange(e) {
        this.setState({ [e.target.id]: e.target.value });
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                        <div className="card card-signin my-5">
                            <div className="card-body">
                                <h5 className="card-title text-center">Sign In</h5>
                                <form className="form-signin">
                                    <div className="form-label-group">
                                        <input type="email" id="email" className="form-control" placeholder="Email address" onChange={this.onChange} required />
                                        <label htmlFor="email">Email address</label>
                                    </div>
                                    <div className="form-label-group">
                                        <input type="password" id="passWord" className="form-control" placeholder="Password" onChange={this.onChange} required />
                                        <label htmlFor="passWord">Password</label>
                                    </div>
                                    <button className="btn btn-lg btn-primary btn-block text-uppercase" type="submit" onClick={this.signIn}>Sign in</button>
                                    <div className="mt-4"><a href='#'>Forgot password?</a></div>
                                    <hr className="my-4" />
                                    <div>Haven't registered yet?</div>
                                    <a href="#">Register now</a>
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

export default SignInComponent;