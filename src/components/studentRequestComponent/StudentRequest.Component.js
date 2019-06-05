import React, { Component } from 'react';
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import './StudentRequest.Component.css';
import axios from 'axios';

class StudentRequest extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: ""
            // selected: []
        }
        this.init = this.init.bind(this);
    }
    componentDidMount() {
        this.init();
    }

    init() {
        this.selectRowProp = {
            mode: 'checkbox',
            selected: [],
            // onSelect: this.handleRowSelect
            // selected: false
            // unelectable: ["row1"]
        };
        var StudentData = JSON.parse(localStorage.getItem("UserDetail"));
        console.log(StudentData);
        this.setState({ data: StudentData });
        // console.log(this.state.data.subjects.subjectID);


        // console.log(this.state.data);
        // console.log(this.state.data);
        StudentData.subjects.map((subject) => {
            // this.updatedSubjects.push(subject);
            if (subject.isSelected) {
                this.selectRowProp.selected.push(subject.module);
                // console.log(this.selectRowProp.selected)
            }
            // this.setState({ selected: this.selectRowProp.selected })

        });


        // this.state.data.subjects.map((subject) => {
        //     this.subjectsLocal.push(subject);
        //     // if(subject.isSelected){
        //     //     this.selectRowProp.selected.push(subject.subjectID);
        //     // }
        // });
    }

    approve() {
        // this.state.data.map((subject) => {
        //     if (subject.isSelected) {
        //       selectedAtLeastOne = true;
        //     }
        //   });
        // var postData=
        // {
        //     "firstName": this.state.data.firstName,
        //         "lastName": this.state.data.lastName,
        //             "matriculationNumber": this.state.data.matriculationNumber,
        //                 "studentID": this.state.data.studentID,
        //     // this.state.data.subjects.map((subject) => {
        //                     "subjects": [
        //                         {

        //                             "subjectID": subject.subjectID,
        //                             "subjectMappingID": subject.subjectMappingID,
        //                             "subjectName": subject.subjectName,
        //                             "module": subject.module,
        //                             "isSelected": true,
        //                             "isRejectedByAdmin": true
        //                         }
        //                     ],
        //                         "transcript": {
        //         "fileData": "string",
        //             "fileName": "string"
        //     },
        //     "isUpdate": true,
        //         "isLearningAgreementApproved": true
        // // });
        // }
        // var data = {
        //     "firstName": studentData.firstName,
        //     "lastName": studentData.lastName,
        //     "matriculationNumber": studentData.matriculationNumber,
        //     "studentID": studentData.studentID,
        //     "subjects": this.state.data,
        //     "transcript": {
        //         "fileData": this.state.base64,
        //         "fileName": this.state.fileName
        //     },
        //     "isUpdate": false
        // }
        // axios
        //     .post(
        //         "https://d1c21ad1.ngrok.io/api/approveLearningAgreement", data
        //     )
        //     .then(res => {
        //         console.log(res.data);
        //     });
    }
    render() {

        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                        <div className="card card-student my-5">
                            <div className="card-body">
                                <h3 className="card-title text-center">Student Details</h3>
                                <hr className="my-6"></hr>
                                <div className="row">
                                    <div className="col-6">First Name:</div><div className="col-6">{this.state.data.firstName}</div>
                                    <div className="col-6">Last Name:</div><div className="col-6">{this.state.data.lastName}</div>
                                    <div className="col-6">Matriculation Number:</div><div className="col-6">{this.state.data.matriculationNumber}</div>
                                    <h2 className="col-12 my-3">Requested Subjects:</h2>
                                    <BootstrapTable version='4' selectRow={this.selectRowProp} className="table table-striped" data={this.state.data.subjects}>
                                        <TableHeaderColumn isKey dataField="module" dataAlign="center">Subject ID</TableHeaderColumn>
                                        <TableHeaderColumn dataField="subjectName" dataAlign="center">Subject Name</TableHeaderColumn>
                                    </BootstrapTable>
                                    <button className="btn btn-primary my-3 button" onClick={this.approve}>Approve</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default StudentRequest;