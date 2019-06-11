import React, { Component } from "react";
import "./SignIn.Component.css";
import axios from "axios";


class SignInComponent extends Component {
  login = "https://dee35bf9.ngrok.io/api/Login"
  studentRequestData = "https://dee35bf9.ngrok.io/api/getStudentRequestData?type=all"
  studentData = "https://dee35bf9.ngrok.io/api/getStudentData/"
  signInObject = {};
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      passWord: "",
      responseObject: "",
      errormsg: ""

    };

    this.signIn = this.signIn.bind(this);
    this.onChange = this.onChange.bind(this);
    this.moveToRegistration = this.moveToRegistration.bind(this);
  }
  async signIn(e) {
    e.preventDefault();
    var loader = document.getElementById("loader");
    loader.className = "fullScreen";
    loader.firstChild.style.display = "inline-block";

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
        console.log(res);
        if (res.statusText != "No Content" && (res.data != undefined || res.data != "") && res.data.isAdmin) {
          axios
            .get(
              // "http://192.168.0.102:4005/api/getStudentRequestData?type=all"
              this.studentRequestData
            )
            .then(res => {
              loader.className = "";
              loader.firstChild.style.display = "none";
              this.props.history.push("/requests/");
              // this.props.navigation.state.params.refresh();
            }).catch(error => {
              loader.className = "";
              loader.firstChild.style.display = "none";
              console.log(error.response);
            });
        }
        else if (res.statusText != "No Content" && (res.data != undefined || res.data != "")) {
          axios
            .get(
              // "http://192.168.0.102:4005/api/getStudentData/" + res.data.studentID
              this.studentData + res.data.studentID

            )
            .then(resp => {
              loader.className = "";
              loader.firstChild.style.display = "none";
              localStorage.setItem("StudentData", JSON.stringify(resp.data));
              if (resp.data.subjects.length === 0) {
                console.log("newuser");
                localStorage.setItem("newUser", "true");
              }
              else {
                localStorage.setItem("newUser", "false");
              }
              this.props.history.push("/studentDetails/");
              // this.props.navigation.state.params.refresh();

            });
        }
        else {
          loader.className = "";
          loader.firstChild.style.display = "none";
          this.setState({ errormsg: "Invalid Credentials" });
          // this.state.errormsg = "Invalid Credentials";
          console.log(this.state.errormsg);
          console.log("no login");
        }
      }).catch(error => {
        loader.className = "";
        loader.firstChild.style.display = "none";
        console.log(error.response);
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
      <div>
        <div id="loader">
          <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </div>
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
                    <div className="errormsgs">
                      {this.state.errormsg}
                    </div>
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
      </div>
    );
  }
}

export default SignInComponent;
