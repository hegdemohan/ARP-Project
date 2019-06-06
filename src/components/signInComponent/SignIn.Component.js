import React, { Component } from "react";
import "./SignIn.Component.css";
import axios from "axios";
var http = require("http");
http.post = require("http-post");

class SignInComponent extends Component {
  login = "https://396603ad.ngrok.io/api/Login"
  studentRequestData = "https://396603ad.ngrok.io/api/getStudentRequestData?type=all"
  studentData = "https://396603ad.ngrok.io/api/getStudentData/"
  signInObject = {};
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      passWord: "",
      responseObject: ""
    };

    this.signIn = this.signIn.bind(this);
    this.onChange = this.onChange.bind(this);
    this.moveToRegistration = this.moveToRegistration.bind(this);
  }
  async signIn(e) {
    e.preventDefault();
    await axios
      .post(
        // "http://192.168.0.102:4005/api/login",
        this.login,
        {
          email: this.state.email,
          password: this.state.passWord
        },
      )
      .then(res => {
        if (res.data.isAdmin) {
          axios
            .get(
              // "http://192.168.0.102:4005/api/getStudentRequestData?type=all"
              this.studentRequestData
            )
            .then(res => {
              console.log("Success");
              this.props.history.push("/requests/");
            });
        }
        else {
          axios
            .get(
              // "http://192.168.0.102:4005/api/getStudentData/" + res.data.studentID
              this.studentData + res.data.studentID

            )
            .then(resp => {
              console.log("Success");
              localStorage.setItem("StudentData", JSON.stringify(resp.data));
              this.props.history.push("/studentDetails/");
            });
        }
      });
  }

  moveToRegistration() {
    this.props.history.push("/Registration/");
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
                    <input
                      type="email"
                      id="email"
                      className="form-control text-center"
                      placeholder="Email address"
                      onChange={this.onChange}
                      required
                    />
                    <label htmlFor="email">Email address</label>
                  </div>
                  <div className="form-label-group">
                    <input
                      type="password"
                      id="passWord"
                      className="form-control text-center"
                      placeholder="Password"
                      onChange={this.onChange}
                      required
                    />
                    <label htmlFor="passWord">Password</label>
                  </div>
                  <button
                    className="btn btn-lg btn-primary btn-block text-uppercase"
                    type="submit"
                    onClick={this.signIn}
                  >
                    Sign in
                  </button>
                  <div className="mt-4">
                    <a className="anchor_tag">Forgot password?</a>
                  </div>
                  <hr className="my-4" />
                  <div>Haven't registered yet?</div>
                  <a className="anchor_tag" onClick={this.moveToRegistration}>
                    Register now
                  </a>
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
