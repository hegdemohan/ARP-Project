import React, { Component } from 'react';
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import './StudentRequest.Component.css';
import axios from 'axios';

class StudentRequest extends Component {
    StudentData;
    constructor(props) {
        super(props)
        this.state = {
            data: "",
            dataSubs: "",
            base64: "",
            fileName: ""
        }
        this.init = this.init.bind(this);
        this.approve = this.approve.bind(this);
        this.handleRowSelect = this.handleRowSelect.bind(this);


    }
    componentDidMount() {
        this.init();
    }

    init() {
        this.selectRowProp = {
            mode: 'checkbox',
            selected: [],
            onSelect: this.handleRowSelect
            // selected: false
            // unelectable: ["row1"]
        };
        this.StudentData = JSON.parse(localStorage.getItem("UserDetail"));
        console.log(this.StudentData);
        this.setState({ data: this.StudentData });
        this.setState({ dataSubs: this.StudentData.subjects });
        this.StudentData.subjects.map((subject) => {
            // this.updatedSubjects.push(subject);
            if (subject.isSelected) {
                this.selectRowProp.selected.push(subject.module);
            }
        });
    }

    handleRowSelect(row, isSelected, e) {
        for (let i = 0; i < this.state.dataSubs.length; i++) {
            if (this.state.dataSubs[i].subjectID === row.subjectID) {
                this.state.dataSubs[i].isSelected = isSelected;
            }
        }
        this.state.dataSubs.map((subject) => {
            if (!(subject.isSelected)) {
                subject.isSelected = true;
                subject.isRejectedByAdmin = true;
            }
            else {
                subject.isSelected = true;
                subject.isRejectedByAdmin = false;
            }
        });
        console.log(this.state.dataSubs);
    }

    approve() {
        var postData =
        {
            "firstName": this.state.data.firstName,
            "lastName": this.state.data.lastName,
            "matriculationNumber": this.state.data.matriculationNumber,
            "studentID": this.state.data.studentID,
            "subjects": this.state.dataSubs,
            // [
            //     {

            //         "subjectID": subject.subjectID,
            //         "subjectMappingID": subject.subjectMappingID,
            //         "subjectName": subject.subjectName,
            //         "module": subject.module,
            //         "isSelected": true,
            //         "isRejectedByAdmin": true
            //     }
            // ],
            "transcript": {
                "fileData": this.state.base64,
                "fileName": this.state.fileName
            },
            "isUpdate": true,
            "isLearningAgreementApproved": true
        }
        axios
            .post(
                "https://99a1aa37.ngrok.io/api/approveLearningAgreement", postData
            )
            .then(res => {
                console.log("Approved");
                console.log(res.data);
            });
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