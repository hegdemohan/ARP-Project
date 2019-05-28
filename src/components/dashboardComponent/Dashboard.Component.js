import React, { Component } from "react";
import "./Dashboard.Component.css";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import axios from "axios";
import ReactDOM from 'react-dom';
import jsPDF from "jspdf"
import createReactClass from "create-react-class"

class DashboardComponent extends Component {
  afterSelction = {}
  selectRowProp = {}
  newUserDiv;
  // updatedSubjects = [];
  constructor(props) {
    super(props);
    this.state = {
      file: "",
      fileName: "",
      items: "",
      data: "",
      apikey: "88731e0e5888957",
      base64: ""
    };
    this.init = this.init.bind(this);
    this.onFileChange = this.onFileChange.bind(this);
    this.upload = this.upload.bind(this);
    this.submit = this.submit.bind(this);
    this.editSubjects = this.editSubjects.bind(this);
    this.onSelectAllRows = this.onSelectAllRows.bind(this);
    this.renderTable = this.renderTable.bind(this)
  }

  componentDidMount() {
    this.init();
  }

  onSelectAllRows(isSelect, rows) {
    for (let i = 0; i < this.state.data.length; i++) {
      this.state.data[i].isSelected = isSelect;
    }
  }

  editSubjects(row, isSelected, e) {
    for (let i = 0; i < this.state.data.length; i++) {
      if (this.state.data[i].subjectID === row.subjectID) {
        this.state.data[i].isSelected = isSelected;
      }
    }
  }

  init() {
    this.selectRowProp = {
      mode: 'checkbox',
      selected: [],
      onSelect: this.editSubjects,
      onSelectAll: this.onSelectAllRows
    };

    if (localStorage.getItem("newUser") == "false") {
    }
  }

  onFileChange(e, file) {
    var selectedFile = file || e.target.files[0];
    var fileReader = new FileReader();
    const that = this;
    // var base64;
    fileReader.onload = function (fileLoadedEvent) {
      that.setState({ base64: fileLoadedEvent.target.result })
      // Print data in console
      console.log(that.state.base64);
    };
    fileReader.readAsDataURL(selectedFile);
    this.setState({ fileName: e.target.files[0].name });
  }

  submit() {
    this.renderTable(this.state.data); //function to add the table with selected subjects for downloading

    var selectedAtLeastOne = false;
    this.state.data.map((subject) => {
      if (subject.isSelected) {
        selectedAtLeastOne = true;
      }
    });

    if (selectedAtLeastOne) {
      var doc = new jsPDF()
      doc.fromHTML(document.getElementsByClassName('pdfPrint')[0], 15, 15)
      doc.save('Selected_Subjects.pdf')
    } else {
      alert("Select at least one subject!");
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

  upload() {
    // console.log(this.state.base64);
    var formData = new FormData();
    formData.set('base64Image', this.state.base64)
    axios
      .post(
        "https://api.ocr.space/parse/image", formData, { headers: { "apikey": this.state.apikey, "Content-Type": 'form-data' } }
      )
      .then(res => {
        console.log(res.data);
      })

    axios
      .get(
        "https://1478231e.ngrok.io/api/Subject/getSubjects"
        // this.studentRequestData
      )
      .then(res => {
        console.log("Success");
        // this.props.history.push("/requests/");



        this.setState({ data: res.data });
        res.data.map((subject) => {
          // this.updatedSubjects.push(subject);
          if (subject.isSelected) {
            this.selectRowProp.selected.push(subject.subjectID);
          }
        });
      });
    //Send the document to API
  }

  render() {

    return (
      <div className="container">
        <div className="mx-auto">
          <div className="card row my-5">
            <div className="card-body">
              <div className="container">
                <IsNewUSer onFileChange={this.onFileChange} fileName={this.state.fileName} upload={this.upload} />
                <hr className="my-4" />
                <div>
                  <BootstrapTable version='4' selectRow={this.selectRowProp} className="table table-striped" data={this.state.data}>
                    <TableHeaderColumn isKey dataField="module" dataAlign="center">Subject ID</TableHeaderColumn>
                    <TableHeaderColumn dataField="subjectName" dataAlign="center">Subject Name</TableHeaderColumn>
                  </BootstrapTable>
                  <hr className="my-4" />
                  <button className="btn btn-lg btn-primary btn-block text-uppercase" type="submit" onClick={this.submit}>Submit</button>
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
  if (props.data != "") {
    props.data.map((subject) => {
      if (subject.isSelected) {
        subjectsSelected.push(subject);
      }
    });
  }
  return (
    <BootstrapTable version='4' className="table table-striped" data={subjectsSelected}>
      <TableHeaderColumn isKey dataField="subjectID" dataAlign="center">Subject ID</TableHeaderColumn>
      <TableHeaderColumn dataField="subjectName" dataAlign="center">Subject Name</TableHeaderColumn>
    </BootstrapTable>
  );
}

function IsNewUSer(props) {
  if (localStorage.getItem("newUser") == "true") {
    return (
      <div>
        <h4>Upload Transcript in PDF format</h4>
        <div className="input-group">
          <span className="input-group-btn">
            <span className="btn btn-primary btn-file">Browse&hellip;{" "}<input type="file" accept="application/pdf" onChange={props.onFileChange} single="true" />
            </span>
          </span>
          <input type="text" value={props.fileName} className="form-control" readOnly />
        </div>
        <button className="btn btn-lg btn-primary my-4" type="submit" onClick={props.upload}>Upload</button>
      </div>
    );
  } else {
    return <div />;
  }
}

export default DashboardComponent;
