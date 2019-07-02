import React, { Component } from 'react';
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import './StudentRequest.Component.css';
import axios from 'axios';
import { ToastsContainer, ToastsStore, ToastsContainerPosition } from 'react-toasts';

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
                onSelect: this.handleRowSelect,
                unselectable: []

            };
            this.Data = JSON.parse(sessionStorage.getItem("StudentRequestData"));
            this.transcriptData = JSON.parse(this.Data.transcript.ocrJson);
            this.StudentData = JSON.parse(sessionStorage.getItem("UserDetail"));
            this.setState({ data: this.StudentData });
            this.dataSubs = this.StudentData.subjects;
            this.init();
        } else {
            this.props.history.push("/signin/");
        }
    }

    init() {
        this.StudentData.subjects.map((subject) => {
            if (subject.isSelected) {
                this.selectRowProp.selected.push(subject.module);
                this.selectedSubjects.push(subject);

            }
            if (subject.isSelected && subject.isRejectedByAdmin && subject.isDecided) {
                this.selectRowProp.unselectable.push(subject.module);
            }
            if (subject.isSelected && subject.isDecided) {
                this.selectRowProp.unselectable.push(subject.module);
            }
        });
    }

    handleRowSelect(row, isSelected, e) {
        for (let i = 0; i < this.dataSubs.length; i++) {
            if (this.dataSubs[i].subjectID === row.subjectID) {
                this.dataSubs[i].isSelected = isSelected;
            }
        }
        this.dataSubs.map((subject) => {
            if (subject.subjectID === row.subjectID) {
                if (!(subject.isSelected)) {
                    subject.isSelected = true;
                    subject.isRejectedByAdmin = true;
                }
                else {
                    subject.isSelected = true;
                    subject.isRejectedByAdmin = false;
                }
            }
        });

    }
    transcript() {
        this.dataa = this.Data.transcript.fileData;
        var link = document.createElement('a');
        document.body.appendChild(link);
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
                "http://b5560796.ngrok.io/api/approveLearningAgreement", postData
            )
            .then(res => {
                ToastsStore.success("Approved!");
                loader.className = "";
                loader.firstChild.style.display = "none";
                window.setTimeout(function () {
                    window.location.href = "/requests/";
                }, 1000);
            })
            .catch(error => {
                ToastsStore.info("Please check your Internet Connection!");
                loader.className = "";
                loader.firstChild.style.display = "none";
            });
    }
    render() {

        return (
            <div>
                <ToastsContainer position={ToastsContainerPosition.BOTTOM_CENTER} store={ToastsStore} />
                <div id="loader">
                    <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-12 mx-auto">
                            <div className="card my-5">
                                <div className="card-body">
                                    <h3 className="card-title text-center"><b>Student Details</b></h3>
                                    <hr className="my-6"></hr>
                                    <button className="btn btn-info my-3 trans_btn" onClick={this.transcript}>Download Transcript</button>
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
                                                <TableHeaderColumn width={"60%"} dataField="subjectName" dataAlign="center">Subject Name</TableHeaderColumn>
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