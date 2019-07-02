import React, { Component } from "react";
import "./Approved.Component.css";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";

class ApprovedComponent extends Component {
    newUserDiv;
    studentData;
    // updatedSubjects = [];
    constructor(props) {
        super(props);
        this.state = {
            data: ""

        };
        this.init = this.init.bind(this);

    }

    componentDidMount() {
        if (sessionStorage.getItem("userLoggedin")) {
            this.init();
        } else {
            this.props.history.push("/signin/");
        }
    }

    init() {
        var selectedSubjects = [];
        this.studentData = JSON.parse(sessionStorage.getItem("approvedData"));
        this.studentData.subjects.map(function (subject) {
            if (subject.isSelected) {
                selectedSubjects.push(subject);
            }
        });
        this.setState({ data: selectedSubjects });
    }

    colFormatter = (cell, row) => {
        this.adminStatus = row;
        if (this.studentData.isLearningAgreementApproved) {
            if ((this.adminStatus.isSelected) && (this.adminStatus.isRejectedByAdmin) && (this.adminStatus.isDecided)) {
                return (
                    <div className="reject">
                        REJECTED
        </div>
                )
            }
            else if ((this.adminStatus.isSelected) && !(this.adminStatus.isRejectedByAdmin) && (this.adminStatus.isDecided)) {
                return (
                    <div className="approve">
                        APPROVED
        </div>
                )
            }
            else if ((this.adminStatus.isSelected) && !(this.adminStatus.isDecided)) {
                return (
                    <div className="pending">
                        PENDING
        </div>
                )
            }
        }
        else if (!(this.studentData.isLearningAgreementApproved)) {
            if ((this.adminStatus.isSelected) && (this.adminStatus.isRejectedByAdmin) && (this.adminStatus.isDecided)) {
                return (
                    <div className="reject">
                        REJECTED
        </div>
                )
            }
            else if ((this.adminStatus.isSelected) && !(this.adminStatus.isRejectedByAdmin) && (this.adminStatus.isDecided)) {
                return (
                    <div className="approve">
                        APPROVED
        </div>
                )
            }
            else if ((this.adminStatus.isSelected) && !(this.adminStatus.isDecided)) {
                return (
                    <div className="pending">
                        PENDING
        </div>
                )
            }
        }

    }
    render() {

        return (
            <div className="container">
                <div className="mx-auto">
                    <div className="card row my-5">
                        <div className="card-body">
                            <div className="container">
                                <hr className="my-4" />
                                <div>
                                    <BootstrapTable version='4' className="table table-striped" data={this.state.data}>
                                        <TableHeaderColumn isKey dataField="module" dataAlign="center">Subject ID</TableHeaderColumn>
                                        <TableHeaderColumn dataField="subjectName" width={'50%'} filter={{ type: 'TextFilter', delay: 1000 }} dataAlign="center">Subject Name</TableHeaderColumn>
                                        <TableHeaderColumn dataField="status" dataFormat={this.colFormatter} dataAlign="center">Status</TableHeaderColumn>
                                    </BootstrapTable>
                                    <hr className="my-4" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="pdfPrint hidden">
                </div>
            </div>
        );
    }
}
export default ApprovedComponent;
