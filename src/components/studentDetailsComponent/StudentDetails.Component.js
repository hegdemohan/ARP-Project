import React, { Component } from 'react';
import './StudentDetails.Component.css';
import axios from 'axios'

class StudentDetails extends Component {
    temp;
    subjects;
    constructor(props) {
        super(props)
        this.state = {
            subjectsObject: '',
            userDetailsObject: {}

        }
        this.init = this.init.bind(this);
        this.navigate = this.navigate.bind(this);
    }

    componentDidMount() {
        this.init();
    }

    navigate(buttonClicked) {
        if (buttonClicked == "new") {
            localStorage.setItem("newUser", "true");
            this.props.history.push("/dashboard/");
        } else {
            localStorage.setItem("newUser", "false");
            this.props.history.push("/dashboard/");
        }

    }

    init() {
        // this.temp = { "firstName": "Mohan", "lastName": "Hegde", "matriculationNo": "1212", "subjects": [] }
        var data = JSON.parse(localStorage.getItem("StudentData"));
        console.log(data.firstName);
        this.setState({ subjectsObject: this.subjects });
        this.state.userDetailsObject.firstName = data.firstName;
        this.state.userDetailsObject.lastName = data.lastName;
        this.state.userDetailsObject.matriculationNo = data.matriculationNumber;
        if (data.subjects.length == 0) {
            this.state.userDetailsObject.newUser = true;
        } else {
            this.state.userDetailsObject.newUser = false;
        }

        // axios.get("https://0ab80a65-1441-4447-b497-11020f9f0b0e.mock.pstmn.io/getStudentDetails").then(res => {
        //     // this.setState({ availableSubjects: res.data});
        //     this.userDetailsObject.firstName = res.data.firstName;
        //     this.userDetailsObject.lastName = res.data.lastName;
        //     this.userDetailsObject.matriculationNo = res.data.matriculationNo;
        //     this.setState({ subjectsObject: res.data.subjects });
        //     if (this.state.subjectsObject.length == 0) {
        //         this.userDetailsObject.newUser = true;
        //     } else {
        //         this.userDetailsObject.newUser = false;
        //     }
        // });
    }

    render() {
        return (
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
                                    <div className="col-6">Matriculation Number:</div><div className="col-6">{this.state.userDetailsObject.matriculationNo}</div>
                                </div>
                                <hr className="my-4"></hr>
                                <div className="row">
                                    <div className="col-6">
                                        <button className="general-button btn btn-lg btn-primary btn-block text-uppercase" type="submit" disabled={!this.state.userDetailsObject.newUser} onClick={() => this.navigate('new')}>Add new</button>
                                    </div>
                                    <div className="col-6">
                                        <button className="general-button btn btn-lg btn-primary btn-block text-uppercase" type="submit" disabled={this.state.userDetailsObject.newUser} onClick={() => this.navigate('edit')}>Edit</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default StudentDetails;