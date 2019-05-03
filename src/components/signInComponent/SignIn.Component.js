import React, { Component } from 'react';
import './SignIn.Component.css'
import { Route, withRouter } from 'react-router-dom'

class SignInComponent extends Component {
    signInObject = {};
    constructor(props) {
        super(props)
        this.state = {
            userName: '',
            passWord: ''
        }

        this.signIn = this.signIn.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    signIn() {
        this.signInObject.userName = this.state.userName;
        this.signInObject.passWord = this.state.passWord;
        window.location.href = '/dashboard';
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
                                        <input type="email" id="userName" className="form-control" placeholder="Email address" onChange={this.onChange} required />
                                        <label htmlFor="userName">Email address</label>
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