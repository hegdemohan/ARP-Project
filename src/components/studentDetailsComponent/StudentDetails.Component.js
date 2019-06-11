import React, { Component } from 'react';
import './StudentDetails.Component.css';
import axios from 'axios'
import HeaderComponent from '../headerComponent/Header.Component';

class StudentDetails extends Component {
    temp;
    subjects;
    constructor(props) {
        super(props)
        this.state = {
            subjectsObject: '',
            userDetailsObject: {},
            newUser: false

        }
        this.init = this.init.bind(this);
        this.navigate = this.navigate.bind(this);
    }

    componentDidMount() {
        if (sessionStorage.getItem("userLoggedin")) {
            this.init();
        } else {
            this.props.history.push("/signin/");
        }
    }

    navigate(buttonClicked) {
        if (buttonClicked == "statusCheck") {
            this.props.history.push("/checkStatus/");
            return;
        }
        else if (buttonClicked == "new") {
            this.props.history.push("/dashboard/");
        } else {
            this.props.history.push("/dashboard/");
        }

    }

    init() {
        // this.temp = { "firstName": "Mohan", "lastName": "Hegde", "matriculationNo": "1212", "subjects": [] }
        var data = JSON.parse(sessionStorage.getItem("userData"));
        var newUser = sessionStorage.getItem("newUser");
        // console.log(newUser);
        this.setState({ userDetailsObject: data });
        // this.state.userDetailsObject.firstName = data.firstName;
        // this.state.userDetailsObject.lastName = data.lastName;
        // this.state.userDetailsObject.matriculationNo = data.matriculationNumber;
        if (newUser == "true") {
            this.state.newUser = true;
        } else {
            this.state.newUser = false;
        }
    }

    render() {
        return (<React.Fragment>
            {/* <HeaderComponent /> */}
            <div className="container">
                <div className="row">
                    <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                        <div className="card card-signin my-5">
                            <div className="card-body">
                                <h3 className="card-title text-center">Student Details</h3>
                                <hr className="my-4"></hr>
                                <div className="row">
                                    <div className="col-6">First Name:</div><div className="col-6">{this.state.userDetailsObject.firstName}</div>
                                    <div className="col-6">Last Name:</div><div className="col-6">{this.state.userDetailsObject.lastName}</div>
                                    <div className="col-6">Matriculation Number:</div><div className="col-6">{this.state.userDetailsObject.matriculationNumber}</div>
                                </div>
                                <span>{!this.state.newUser}</span>
                                <hr className="my-4"></hr>
                                <div className="row">
                                    <div className="col-6">
                                        <button className="general-button btn btn-lg btn-primary btn-block text-uppercase" id="btn-disable" type="submit" disabled={!this.state.newUser} onClick={() => this.navigate('new')}>Add new</button>
                                    </div>
                                    <div className="col-6">
                                        <button className="general-button btn btn-lg btn-primary btn-block text-uppercase" id="btn-disable1" type="submit" disabled={this.state.newUser} onClick={() => this.navigate('edit')}>Edit</button>
                                    </div>
                                </div>
                                <div className="row my-4">
                                    <div className="col-12">
                                        <button className="general-button btn btn-lg btn-success btn-block text-uppercase" id="btn-disable2" type="submit" disabled={this.state.newUser} onClick={() => this.navigate('statusCheck')}>Check Status</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
        );
    }
}

export default StudentDetails;