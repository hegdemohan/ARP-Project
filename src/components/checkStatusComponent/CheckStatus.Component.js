import React, { Component } from "react";
import "./CheckStatus.Component.css";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import axios from "axios";
import ReactDOM from 'react-dom';
import jsPDF from "jspdf"
import createReactClass from "create-react-class"
import { NONAME } from "dns";

class CheckStatusComponent extends Component {
  newUserDiv;
  // updatedSubjects = [];
  constructor(props) {
    super(props);
    this.state = {
      data: "",
      apikey: "88731e0e5888957",
    };
    this.init = this.init.bind(this);

  }

  componentDidMount() {
    this.init();
  }

  init() {
    var selectedSubjects = [];
    var studentData = JSON.parse(localStorage.getItem("StudentData"));
      studentData.subjects.map(function(subject){
        if(subject.isSelected){
          selectedSubjects.push(subject);
        }
      });
      this.setState({ data: selectedSubjects });
  }

  colFormatter = (cell, row) => {
    this.adminStatus = row;
    if ((this.adminStatus.isSelected) && (this.adminStatus.isRejectedByAdmin)) {
      console.log("rejected");
      return (
        <div className="reject">
          REJECTED
        </div>
      )
    }
    else if ((this.adminStatus.isSelected) && !(this.adminStatus.isRejectedByAdmin)) {
      console.log("approved");
      return (
        <div className="approve">
          APPROVED
        </div>
      )
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
                    <TableHeaderColumn dataField="subjectName" dataAlign="center">Subject Name</TableHeaderColumn>
                    <TableHeaderColumn dataField="status" dataFormat={this.colFormatter} dataAlign="center">Admin Status</TableHeaderColumn>
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
export default CheckStatusComponent;