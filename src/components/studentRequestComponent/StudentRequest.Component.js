import React, { Component } from 'react';
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import './StudentRequest.Component.css';
import axios from 'axios';
import Base64 from 'Base64';
import base64 from 'base64topdf';

class StudentRequest extends Component {
    StudentData;
    transcriptData = [];
    subData = [];
    dataSubs;
    Data;
    dataa;
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
        this.transcript = this.transcript.bind(this);

    }
    componentDidMount() {
        if (sessionStorage.getItem("userLoggedin")) {
            this.selectRowProp = {
                mode: 'checkbox',
                selected: [],
                onSelect: this.handleRowSelect
            };
            this.Data = JSON.parse(sessionStorage.getItem("StudentRequestData"));
            this.transcriptData = JSON.parse(this.Data.transcript.ocrJson);
            console.log((this.transcriptData));
            this.StudentData = JSON.parse(sessionStorage.getItem("UserDetail"));
            // console.log(this.StudentData);
            this.setState({ data: this.StudentData });
            this.dataSubs = this.StudentData.subjects;
            // this.setState({ dataSubs: this.StudentData.subjects });
            this.init();
        } else {
            this.props.history.push("/signin/");
        }
    }

    init() {
        this.StudentData.subjects.map((subject) => {
            // this.updatedSubjects.push(subject);
            if (subject.isSelected) {
                this.selectRowProp.selected.push(subject.module);
                this.selectedSubjects.push(subject);

            }
        });
        // console.log(this.selectedSubjects);
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
    transcript() {
        this.dataa = this.Data.transcript.fileData;
        var link = document.createElement('a');
        document.body.appendChild(link); //required in FF, optional for Chrome
        link.href = this.dataa;
        link.download = this.Data.firstName + "_Transcript.pdf";
        link.click();
        link.remove();
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
            "transcript": {
                "fileData": this.Data.transcript.base64,
                "fileName": this.Data.transcript.fileName,
                "ocrJson": this.Data.transcript.ocrJson
            },
            "isUpdate": true,
            "isLearningAgreementApproved": true
        }
        axios
            .post(
                "https://dee35bf9.ngrok.io/api/approveLearningAgreement", postData
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
                        <div className="col-12 mx-auto">
                            <div className="card my-5">
                                <div className="card-body">
                                    <h2 className="card-title text-center">Student Details</h2>
                                    <hr className="my-6"></hr>
                                    <button className="btn btn-primary my-3 trans_btn" onClick={this.transcript}>Download Transcript</button>
                                    <div className="input_data">
                                        <div><b>First Name: </b>{this.state.data.firstName}</div>
                                        <div><b>Last Name: </b>{this.state.data.lastName}</div>
                                        <div><b>Matriculation Number: </b>{this.state.data.matriculationNumber}</div>
                                    </div>
                                    <div className="row">
                                        <div className="col-6">
                                            <h4 className="col-12 my-3">Requested Subjects</h4>
                                            <BootstrapTable version='4' selectRow={this.selectRowProp} className="table table-striped" data={this.selectedSubjects}>
                                                <TableHeaderColumn isKey dataField="module" dataAlign="center">Subject ID</TableHeaderColumn>
                                                <TableHeaderColumn dataField="subjectName" dataAlign="center">Subject Name</TableHeaderColumn>
                                            </BootstrapTable>
                                        </div>
                                        <div className="col-6">
                                            <h4 className="col-12 my-3"> Subjects in the Transcript</h4>
                                            <BootstrapTable version='4' className="table table-striped" data={this.transcriptData}>
                                                <TableHeaderColumn isKey dataField="subjectName" dataAlign="center">Subjects</TableHeaderColumn>
                                            </BootstrapTable>
                                        </div>
                                    </div>
                                    <button className="btn btn-primary my-3" onClick={this.approve}>Approve</button>
                                    {/* </div> */}
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