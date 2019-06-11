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
  studentDataUrl = "https://dee35bf9.ngrok.io/api/getStudentData/";
  newUserDiv;
  loader;
  // updatedSubjects = [];
  constructor(props) {
    super(props);
    this.state = {
      file: "",
      fileName: "",
      items: "",
      data: "",
      apikey: "88731e0e5888957",
      base64: "",
      errorFileSize:"",
      uploadedTranscript:false
    };
    this.init = this.init.bind(this);
    this.onFileChange = this.onFileChange.bind(this);
    this.upload = this.upload.bind(this);
    this.submit = this.submit.bind(this);
    this.editSubjects = this.editSubjects.bind(this);
    this.onSelectAllRows = this.onSelectAllRows.bind(this);
    this.renderTable = this.renderTable.bind(this);
    this.getSubjects = this.getSubjects.bind(this);
    this.pdfDownload = this.pdfDownload.bind(this);

  }

  componentDidMount() {
    if(sessionStorage.getItem("userLoggedin")){
      this.init();
    }else{
      this.props.history.push("/signin/");
    }
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

  // bgColorRows(row, isSelect) {
  //   for (let i = 0; i < this.state.data.length; i++) {
  //     if (this.state.data[i].subjectID === row.subjectID) {
  //       if ((row.isSelected) && (row.isRejectedByAdmin)) {
  //         return '#C0C0C0';
  //       }
  //       else {
  //         return null;
  //       }
  //       // this.state.data[i].isSelected = isSelected;
  //     }
  //   }
  // }

  init() {
    this.selectRowProp = {
      mode: 'checkbox',
      selected: [],
      onSelect: this.editSubjects,
      onSelectAll: this.onSelectAllRows,
      unselectable: []
      // bgColor: this.bgColorRows
    };
    this.loader = document.getElementById("loader");
    if (sessionStorage.getItem("newUser") == "false") {
      this.setState({uploadedTranscript:true});
      var studentData = JSON.parse(sessionStorage.getItem("StudentData"));
      this.setState({ data: studentData.subjects });

      studentData.subjects.map((subject) => {
        // this.updatedSubjects.push(subject);
        if (subject.isSelected) {
          this.selectRowProp.selected.push(subject.module);
        }
      });
      studentData.subjects.map((subject) => {
        if ((subject.isSelected)) {
          this.selectRowProp.unselectable.push(subject.module);
        }
      });
    }
  }

  onFileChange(e, file) {
    this.setState({errorFileSize: ""})
    var selectedFile = file || e.target.files[0];
    var fileReader = new FileReader();
    if(selectedFile){
      if(selectedFile.size < 1000000){
        const that = this;
        // var base64;
        fileReader.onload = function (fileLoadedEvent) {
          that.setState({ base64: fileLoadedEvent.target.result })
          // Print data in console
          console.log(that.state.base64);
        };
        fileReader.readAsDataURL(selectedFile);
        this.setState({ fileName: e.target.files[0].name });
      }else{
        this.setState({errorFileSize: "Maximum file size allowed is 1MB. Please reduce the file size and try again."})
      }
    }
  }

  submit() {
    this.loader.className = "fullScreen";
    this.loader.firstChild.style.display = "inline-block";
    var selectedAtLeastOne = false;
    this.state.data.map((subject) => {
      if (subject.isSelected) {
        selectedAtLeastOne = true;
      }
    });

    if (selectedAtLeastOne) {
      var studentData = JSON.parse(sessionStorage.getItem('StudentData'));
      var data = {
        "firstName": studentData.firstName,
        "lastName": studentData.lastName,
        "matriculationNumber": studentData.matriculationNumber,
        "studentID": studentData.studentID,
        "subjects": this.state.data,
        "isUpdate": sessionStorage.getItem("newUser") == "true" ? false : true,
        "transcript": {
          "fileData": this.state.base64,
          "fileName": this.state.fileName
        }
      }
      axios
        .post(
          "https://dee35bf9.ngrok.io/api/saveStudentData", data
        )
        .then(res => {

          sessionStorage.setItem("newUser", "false");
          axios
            .get(
              // "http://192.168.0.102:4005/api/getStudentData/" + res.data.studentID
              this.studentDataUrl + studentData.studentID
            )
            .then(resp => {
              this.loader.className = "";
              this.loader.firstChild.style.display = "none";
              sessionStorage.setItem("StudentData", JSON.stringify(resp.data));
              if (resp.data.subjects.length == 0) {
                sessionStorage.setItem("newUser", "true");
              } else {
                sessionStorage.setItem("newUser", "false");
              }
              this.props.history.push("/studentDetails/");
            });

        });
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
    if (this.state.base64) {
      this.setState({uploadedTranscript: true});
      this.setState({errorFileSize: ""});
      this.loader.className = "fullScreen";
      this.loader.firstChild.style.display = "inline-block";
      // console.log(this.state.base64);
      var formData = new FormData();
      formData.set('base64Image', this.state.base64)
      axios
        .post(
          "https://api.ocr.space/parse/image", formData, { headers: { "apikey": this.state.apikey, "Content-Type": 'form-data' } }
        )
        .then(res => {
          console.log(res.data);
          axios
            .post(
              "http://b758b130.ngrok.io/api/v1/extractDataFromOcr", res.data
            )
            .then(resp => {
              this.getSubjects();
            })
        })
    }
    else {
    }
  }

  pdfDownload() {
    var selectedAtLeastOne = false;
    this.state.data.map((subject) => {
      if (subject.isSelected) {
        selectedAtLeastOne = true;
      }
    });

    if (selectedAtLeastOne) {
      this.renderTable(this.state.data); //function to add the table with selected subjects for downloading
      var doc = new jsPDF()
      doc.fromHTML(document.getElementsByClassName('pdfPrint')[0], 15, 15)
      doc.save('Selected_Subjects.pdf')
    } else {
      alert("Select at least one subject!");
    }
  }

  getSubjects() {
    axios
      .get(
        "https://dee35bf9.ngrok.io/api/Subject/getSubjects"
        // this.studentRequestData
      )
      .then(res => {
        this.loader.className = "";
        this.loader.firstChild.style.display = "none";
        // this.props.history.push("/requests/");

        this.setState({ data: res.data });
        res.data.map((subject) => {
          // this.updatedSubjects.push(subject);
          if (subject.isSelected) {
            this.selectRowProp.selected.push(subject.module);
          }
        });
      });
  }

  render() {

    return (
      <div>
        <div id="loader">
          <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </div>
        <div className="container">
          <div className="mx-auto">
            <div className="card row my-5">
              <div className="card-body">
                <div className="container">
                  <IsNewUSer onFileChange={this.onFileChange} errorFileSize={this.state.errorFileSize} fileName={this.state.fileName} upload={this.upload} />
                  <hr className="my-4" />
                  <div>
                    <BootstrapTable version='4' selectRow={this.selectRowProp} className="table table-striped" data={this.state.data}>
                      <TableHeaderColumn isKey dataField="module" dataAlign="center">Subject ID</TableHeaderColumn>
                      <TableHeaderColumn dataField="subjectName" dataAlign="center">Subject Name</TableHeaderColumn>
                      {/* <TableHeaderColumn dataField="status" dataFormat={this.colFormatter} dataAlign="center">Admin Status</TableHeaderColumn> */}
                    </BootstrapTable>
                    <hr className="my-4" />
                    <div className="row">
                      <div className="col-6">
                        <button className="btn btn-lg btn-primary btn-block text-uppercase" type="submit" disabled={!this.state.uploadedTranscript} onClick={this.submit}>Submit</button>
                      </div>
                      <div className="col-6">
                        <button className="btn btn-lg btn-secondary btn-block text-uppercase" type="submit" disabled={!this.state.uploadedTranscript} onClick={this.pdfDownload}>Download PDF</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="pdfPrint">
          </div>
        </div>
      </div>
    );
  }
}

function PdfContent(props) {
  var subjectsSelected = [];
  var studentData = JSON.parse(sessionStorage.getItem('StudentData'));
  if (props.data != "") {
    props.data.map((subject) => {
      if (subject.isSelected) {
        subjectsSelected.push(
          <tr>
            <th scope="row">{subject.module}</th>
            <td>{subject.subjectName}</td>
          </tr>
        )
      }
    });
  }
  return (
    <div>
      <div>First Name : {studentData.firstName}</div>
      <div>Last Name : {studentData.lastName}</div>
      <div>Matriculation Number : {studentData.matriculationNumber}</div>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Module</th>
            <th scope="col">Subject Name</th>
          </tr>
        </thead>
        <tbody>
          {subjectsSelected}
        </tbody>
      </table>
    </div>
  );
}

function IsNewUSer(props) {
  if (sessionStorage.getItem("newUser") == "true") {
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
        <div className="errormsgs">{props.errorFileSize}</div>
        <button className="btn btn-lg btn-primary my-4" type="submit" onClick={props.upload}>Upload</button>
      </div>
    );
  } else {
    return <div />;
  }
}

export default DashboardComponent;
