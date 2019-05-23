import React, { Component } from "react";
import "./SignIn.Component.css";
import axios from "axios";
var http = require("http");
http.post = require("http-post");

class SignInComponent extends Component {
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
  componentDidMount() {
    const data = {
      email: "1sri93ram@gmail.com",
      password: "pass1234"
    };
    fetch("http://192.168.0.104:4005/api/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-origin": "*"
      },
      body: data
    }).then(data => {
      console.log(data);
    });
  }
  signIn(e) {
    // return <Redirect to="/studentDetails/" />
    // if (this.state.email === "student@gmail.com" && this.state.passWord === "1234") {
    //     this.props.history.push('/studentDetails/');
    // } else if (this.state.email === "admin@gmail.com" && this.state.passWord === "1234") {
    //     this.props.history.push('/requests/');

    // }
    // else {
    //     alert("Please give valid credentials");
    // }
    e.preventDefault();
    // fetch("")
    // var http = new XMLHttpRequest();
    // var url = "http://192.168.0.104:4005/api/login";
    // var params = {
    //   email: this.state.email,
    //   password: this.state.passWord
    // };
    // http.open("POST", url, true);

    // //Send the proper header information along with the request
    // http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    // http.onreadystatechange = function() {
    //   //Call a function when the state changes.
    //   if (http.readyState == 4 && http.status == 200) {
    //     alert(http.responseText);
    //   }
    // };
    // http.send(params);
    // axios
    //   .post(
    //     "http://192.168.0.104:4005/api/login",
    //     {
    //       email: this.state.email,
    //       password: this.state.passWord
    //     },
    //     {
    //       headers: {
    //         "Content-Type": "application/x-www-form-urlencoded",
    //         // "Access-Control-Request-Headers": "*",
    //         "Access-Control-Allow-Headers": "*",
    //         "Access-Control-Allow-origin": "*"
    //       }
    //     }
    //   )
    //   .then(res => {
    //     console.log(res.data);
    //     // this.setState({ availableSubjects: res.data});
    //     this.setState({ responseObject: res.data });
    //     if (this.state.responsesObject.isAdmin === false) {
    //       this.signInObject.email = this.state.email;
    //       this.signInObject.passWord = this.state.passWord;
    //       this.props.history.push("/studentDetails/");
    //     }
    //   })
    //   .catch(function(error) {
    //     console.log(error);
    //   });
    // call the api
    // get the response
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
