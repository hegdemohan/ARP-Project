import React, { Component } from "react";
import "./SignIn.Component.css";
import { Route, withRouter } from "react-router-dom";

class SignInComponent extends Component {
  signInObject = {};
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };

    this.signIn = this.signIn.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  signIn() {
    this.signInObject.userName = this.state.email;
    this.signInObject.passWord = this.state.passWord;
    if (
      this.state.email == "aravind@gmail.com" &&
      this.state.password == "123"
    ) {
      this.props.history.push("/StudentDetails");
    } else if (
      this.state.email == "admin@gmail.com" &&
      this.state.password == "1234"
    ) {
      this.props.history.push("/requests");
    } else {
      alert("Please give valid credentials");
    }
    // call the api
    // get the response
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  //   handleSubmit() {
  //     e.preventDefault();
  //     if (this.state.email == "a@g.c" && this.state.password == "123") {
  //     }
  //   }

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
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="form-control"
                      placeholder="Email address"
                      onChange={this.onChange}
                      required
                    />
                    <label htmlFor="email">Email address</label>
                  </div>
                  <div className="form-label-group">
                    <input
                      type="password"
                      id="password"
                      name="password"
                      className="form-control"
                      placeholder="Password"
                      onChange={this.onChange}
                      required
                    />
                    <label htmlFor="password">Password</label>
                  </div>
                  <button
                    className="btn btn-lg btn-primary btn-block text-uppercase"
                    type="submit"
                    onClick={this.signIn}
                  >
                    Sign in
                  </button>
                  <div className="mt-4">
                    <a href="#">Forgot password?</a>
                  </div>
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
