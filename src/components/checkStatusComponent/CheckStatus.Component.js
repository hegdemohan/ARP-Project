import React, { Component } from "react";
import "./CheckStatus.Component.css";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import ReactDOM from 'react-dom';
import jsPDF from "jspdf";
import createReactClass from "create-react-class";

class CheckStatusComponent extends Component {
  newUserDiv;
  studentData;
  // updatedSubjects = [];
  constructor(props) {
    super(props);
    this.state = {
      data: "",
      apikey: "88731e0e5888957",
    };
    this.init = this.init.bind(this);
    this.pdfDownload = this.pdfDownload.bind(this);


  }

  componentDidMount() {
    if (sessionStorage.getItem("userLoggedin")) {
      this.init();
    } else {
      this.props.history.push("/signin/");
    }
  }
  renderTable(data) {
    var Table = createReactClass({
      render: function () {
        return (
          <PdfContent data={data} />
        );
      }
    });

    ReactDOM.render(
      <Table />,
      document.getElementsByClassName("pdfPrint")[0]
    );
  }

  init() {
    var selectedSubjects = [];
    this.studentData = JSON.parse(sessionStorage.getItem("userData"));
    this.studentData.subjects.map(function (subject) {
      if (subject.isSelected) {
        selectedSubjects.push(subject);
      }
    });
    this.setState({ data: selectedSubjects });
  }

  pdfDownload() {
    console.log(this.studentData);
    this.renderTable(this.studentData);
    var doc = new jsPDF()
    doc.fromHTML(document.getElementsByClassName('pdfPrint')[0], 15, 15)
    doc.save('Learning Agreement.pdf')
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
                <button className="btn btn-info text-uppercase my-1 PDFbtn" type="submit" onClick={this.pdfDownload}>Download as PDF</button>
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

function PdfContent(props) {
  var subjectsSelected = [];
  var subjectsValidated;
  var studentData = JSON.parse(sessionStorage.getItem('userData'));
  if (props.data.isLearningAgreementApproved) {
    props.data.subjects.map((sub) => {
      if ((sub.isSelected) && (sub.isRejectedByAdmin) && (sub.isDecided)) {
        subjectsValidated = "REJECTED";
        subjectsSelected.push(
          <tr>
            <th scope="row">{sub.module}</th>
            <td>{sub.subjectName}</td>
            <td>{subjectsValidated}</td>
          </tr>
        )
      }
      else if ((sub.isSelected) && !(sub.isRejectedByAdmin) && (sub.isDecided)) {
        subjectsValidated = "APPROVED";
        subjectsSelected.push(
          <tr>
            <th scope="row">{sub.module}</th>
            <td>{sub.subjectName}</td>
            <td>{subjectsValidated}</td>
          </tr>
        )
      }
      else if ((sub.isSelected) && !(sub.isDecided)) {
        subjectsValidated = "PENDING";
        subjectsSelected.push(
          <tr>
            <th scope="row">{sub.module}</th>
            <td>{sub.subjectName}</td>
            <td>{subjectsValidated}</td>
          </tr>
        )
      }
    });
  }
  else if (!(this.studentData.isLearningAgreementApproved)) {
    props.data.subjects.map((sub) => {
      if ((sub.isSelected) && (sub.isRejectedByAdmin) && (sub.isDecided)) {
        subjectsValidated = "REJECTED";
        subjectsSelected.push(
          <tr>
            <th scope="row">{sub.module}</th>
            <td>{sub.subjectName}</td>
            <td>{subjectsValidated}</td>
          </tr>
        )
      }
      else if ((sub.isSelected) && !(sub.isRejectedByAdmin) && (sub.isDecided)) {
        subjectsValidated = "APPROVED";
        subjectsSelected.push(
          <tr>
            <th scope="row">{sub.module}</th>
            <td>{sub.subjectName}</td>
            <td>{subjectsValidated}</td>
          </tr>
        )
      }
      else if ((sub.isSelected) && !(sub.isDecided)) {
        subjectsValidated = "PENDING";
        subjectsSelected.push(
          <tr>
            <th scope="row">{sub.module}</th>
            <td>{sub.subjectName}</td>
            <td>{subjectsValidated}</td>
          </tr>
        )
      }
    });

  }
  return (
    <React.Fragment>
      <div><b>First Name: </b>{studentData.firstName}</div>
      <div><b>Last Name: </b>{studentData.lastName}</div>
      <div><b>Matriculation Number: </b>{studentData.matriculationNumber}</div>
      <div>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Module</th>
              <th scope="col">Subject Name</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {subjectsSelected}
          </tbody>
        </table>
      </div>
    </React.Fragment>
  );
}

export default CheckStatusComponent;
