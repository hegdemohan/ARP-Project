import React, { Component } from "react";
import "./SignIn.Component.css";
import axios from "axios";
import { ToastsContainer, ToastsStore, ToastsContainerPosition } from 'react-toasts';

class SignInComponent extends Component {
  login = "http://b5560796.ngrok.io/api/Login"
  studentRequestData = "http://b5560796.ngrok.io/api/getStudentRequestData?type=all"
  studentData = "http://b5560796.ngrok.io/api/getStudentData/"
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




  componentDidMount() {
    if (sessionStorage.getItem("userLoggedin") && !sessionStorage.getItem("isAdmin")) {
      this.props.history.push("/studentDetails/");
    } else if (sessionStorage.getItem("userLoggedin") && sessionStorage.getItem("isAdmin")) {
      this.props.history.push("/requests/");
    }
  }

  async signIn(e) {
    e.preventDefault();
    if (this.state.email !== "" && this.state.passWord !== "") {
      var loader = document.getElementById("loader");
      loader.className = "fullScreen";
      loader.firstChild.style.display = "inline-block";

      await axios
        .post(
          this.login,
          {
            email: this.state.email,
            password: this.state.passWord
          },
        )
        .then(res => {
          if (res.statusText !== "No Content" && (res.data !== undefined || res.data !== "") && res.data.isAdmin) {
            sessionStorage.setItem("isAdmin", res.data.isAdmin);
            axios
              .get(
                this.studentRequestData
              )
              .then(res => {
                ToastsStore.success("You're now Logged In!");
                loader.className = "";
                loader.firstChild.style.display = "none";
                sessionStorage.setItem("userLoggedin", true);
                sessionStorage.setItem("userData", JSON.stringify(res.data));
                window.setTimeout(function () {
                  window.location.href = "/requests/";
                }, 1000);
              }).catch(error => {
                loader.className = "";
                loader.firstChild.style.display = "none";
              });
          }
          else if (res.statusText !== "No Content" && (res.data !== undefined || res.data !== "")) {
            axios
              .get(
                this.studentData + res.data.studentID

              )
              .then(resp => {
                ToastsStore.success("You're now Logged In!");
                loader.className = "";
                loader.firstChild.style.display = "none";
                sessionStorage.setItem("userData", JSON.stringify(resp.data));
                if (resp.data.subjects.length === 0) {
                  sessionStorage.setItem("newUser", "true");
                }
                else {
                  sessionStorage.setItem("newUser", "false");
                }
                sessionStorage.setItem("userLoggedin", true);
                window.setTimeout(function () {
                  window.location.href = '/studentDetails/';
                }, 1000);
              });
          }
          else {
            ToastsStore.warning("Invalid Credentials!");
            loader.className = "";
            loader.firstChild.style.display = "none";
            document.getElementById("signin").reset();
          }
        }).catch(error => {
          ToastsStore.info("Please check your Internet Connection!");
          loader.className = "";
          loader.firstChild.style.display = "none";
        });
    }
    else {
      ToastsStore.info("Please enter credentials!");
    }
  }

  moveToRegistration() {
    this.props.history.push("/registration/");
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
                  <form className="form-signin" id="signin">
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
                    <ToastsContainer position={ToastsContainerPosition.BOTTOM_CENTER} store={ToastsStore} />
                    <div className="errormsgs">
                      {this.state.errormsg}
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
