import React, { Component } from 'react';
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import './StudentRequest.Component.css';
import axios from 'axios';

class StudentRequest extends Component {
    StudentData;
    transcriptData;
    dataSubs;
    selectedSubjects = [];
    constructor(props) {
        super(props)
        this.state = {
            data: "",
            base64: "",
            fileName: ""
        }
        this.init = this.init.bind(this);
        this.approve = this.approve.bind(this);
        this.handleRowSelect = this.handleRowSelect.bind(this);


    }
    componentDidMount() {
        this.selectRowProp = {
            mode: 'checkbox',
            selected: [],
            onSelect: this.handleRowSelect
            // selected: false
            // unelectable: ["row1"]
        };
        this.transcriptData = JSON.parse(localStorage.getItem("StudentRequestData"));
        this.StudentData = JSON.parse(localStorage.getItem("UserDetail"));
        console.log(this.StudentData);
        this.setState({ data: this.StudentData });
        this.dataSubs = this.StudentData.subjects;
        // this.setState({ dataSubs: this.StudentData.subjects });
        this.init();
    }

    init() {
        this.StudentData.subjects.map((subject) => {
            // this.updatedSubjects.push(subject);
            if (subject.isSelected) {
                this.selectRowProp.selected.push(subject.module);
                this.selectedSubjects.push(subject);

            }
        });
    }

    handleRowSelect(row, isSelected, e) {
        for (let i = 0; i < this.dataSubs.length; i++) {
            if (this.dataSubs[i].subjectID === row.subjectID) {
                this.dataSubs[i].isSelected = isSelected;
                console.log(this.dataSubs[i]);
            }
        }
        this.dataSubs.map((subject) => {
            if (subject.subjectID === row.subjectID) {
                if (!(subject.isSelected)) {
                    subject.isSelected = true;
                    subject.isRejectedByAdmin = true;
                    console.log(subject, "false");
                }
                else {
                    subject.isSelected = true;
                    subject.isRejectedByAdmin = false;
                    console.log(subject, "true");
                }
            }
        });
        console.log(this.dataSubs);

    }

    approve() {
        var loader = document.getElementById("loader");
        loader.className = "fullScreen";
        loader.firstChild.style.display = "inline-block";
        var postData =
        {
            "firstName": this.state.data.firstName,
            "lastName": this.state.data.lastName,
            "matriculationNumber": this.state.data.matriculationNumber,
            "studentID": this.state.data.studentID,
            "subjects": this.dataSubs,
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
                "fileData": this.transcriptData.transcript.base64,
                "fileName": this.transcriptData.transcript.fileName
            },
            "isUpdate": true,
            "isLearningAgreementApproved": true
        }
        axios
            .post(
                "https://396603ad.ngrok.io/api/approveLearningAgreement", postData
            )
            .then(res => {
                loader.className = "";
                loader.firstChild.style.display = "none";
                this.props.history.push("/requests/");
            });
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
                            <div className="card card-student my-5">
                                <div className="card-body">
                                    <h3 className="card-title text-center">Student Details</h3>
                                    <hr className="my-6"></hr>
                                    <div className="row">
                                        <div className="col-6">First Name:</div><div className="col-6">{this.state.data.firstName}</div>
                                        <div className="col-6">Last Name:</div><div className="col-6">{this.state.data.lastName}</div>
                                        <div className="col-6">Matriculation Number:</div><div className="col-6">{this.state.data.matriculationNumber}</div>
                                        <h2 className="col-12 my-3">Requested Subjects:</h2>
                                        <BootstrapTable version='4' selectRow={this.selectRowProp} className="table table-striped" data={this.selectedSubjects}>
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
            </div>
        );
    }
}

export default StudentRequest;