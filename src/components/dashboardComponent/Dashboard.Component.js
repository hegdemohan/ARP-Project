import React, { Component } from "react";
import "./Dashboard.Component.css";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import axios from "axios";
import ReactDOM from 'react-dom';
import jsPDF from "jspdf";
import createReactClass from "create-react-class";
import Modal from 'react-awesome-modal';
import { ToastsContainer, ToastsStore, ToastsContainerPosition } from 'react-toasts';


class DashboardComponent extends Component {
  afterSelction = {}
  selectRowProp = {}
  studentDataUrl = "http://b5560796.ngrok.io/api/getStudentData/";
  newUserDiv;
  loader;
  temp = [];
  constructor(props) {
    super(props);
    this.state = {
      file: "",
      fileName: "",
      items: "",
      data: "",
      apikey: "88731e0e5888957",
      base64: "",
      JsonData: "",
      errorFileSize: "",
      errorFile: "",
      uploadedTranscript: false,
      visible: false,
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
    this.closeSubModal = this.closeSubModal.bind(this);
    this.closeSubModal1 = this.closeSubModal1.bind(this);


  }

  componentDidMount() {
    if (sessionStorage.getItem("userLoggedin")) {
      this.init();
    } else {
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


  init() {
    this.selectRowProp = {
      mode: 'checkbox',
      selected: [],
      onSelect: this.editSubjects,
      onSelectAll: this.onSelectAllRows,
      unselectable: []
    };
    this.loader = document.getElementById("loader");
    if (sessionStorage.getItem("newUser") === "false") {
      document.getElementById("hiddenSub").style.display = "block";
      this.setState({ uploadedTranscript: true });
      var studentData = JSON.parse(sessionStorage.getItem("userData"));
      this.setState({ data: studentData.subjects });

      studentData.subjects.map((subject) => {
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
    this.setState({ errorFileSize: "" })
    var selectedFile = file || e.target.files[0];
    var fileReader = new FileReader();
    if (selectedFile) {
      if (selectedFile.size < 1000000) {
        const that = this;
        fileReader.onload = function (fileLoadedEvent) {
          that.setState({ base64: fileLoadedEvent.target.result })
        };
        fileReader.readAsDataURL(selectedFile);
        this.setState({ fileName: e.target.files[0].name });
      } else {
        this.setState({ errorFileSize: "Maximum file size allowed is 1MB. Please reduce the file size and try again." })
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
      var studentData = JSON.parse(sessionStorage.getItem('userData'));
      var data = {
        "firstName": studentData.firstName,
        "lastName": studentData.lastName,
        "matriculationNumber": studentData.matriculationNumber,
        "studentID": studentData.studentID,
        "subjects": this.state.data,
        "isUpdate": sessionStorage.getItem("newUser") === "true" ? false : true,
        "transcript": {
          "fileData": this.state.base64,
          "fileName": this.state.fileName,
          "ocrJson": this.state.JsonData
        }
      }
      axios
        .post(
          "http://b5560796.ngrok.io/api/saveStudentData", data
        )
        .then(res => {

          sessionStorage.setItem("newUser", "false");
          axios
            .get(
              this.studentDataUrl + studentData.studentID
            )
            .then(resp => {
              ToastsStore.success("Request Submitted Successfully");
              this.loader.className = "";
              this.loader.firstChild.style.display = "none";
              sessionStorage.setItem("userData", JSON.stringify(resp.data));
              if (resp.data.subjects.length === 0) {
                sessionStorage.setItem("newUser", "true");
              } else {
                sessionStorage.setItem("newUser", "false");
              }
              window.setTimeout(function () {
                window.location.href = '/studentDetails/';
              }, 1000);
            })
            .catch(error => {
              ToastsStore.info("Please try again!");
              this.loader.className = "";
              this.loader.firstChild.style.display = "none";
            });
        })
        .catch(error => {
          ToastsStore.info("Please try again!");
          this.loader.className = "";
          this.loader.firstChild.style.display = "none";
        });
    }
    else {
      this.loader.className = "";
      this.loader.firstChild.style.display = "none";
      this.setState({ visible: true })
    }
  }
  closeSubModal() {
    this.setState({
      visible: false
    });
  }
  closeSubModal1(e) {
    e.preventDefault();
    this.setState({
      visible: false
    });
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
      this.setState({ uploadedTranscript: true });
      this.setState({ errorFileSize: "" });
      this.loader.className = "fullScreen";
      this.loader.firstChild.style.display = "inline-block";
      var formData = new FormData();
      formData.set('base64Image', this.state.base64)
      sessionStorage.setItem("base64", this.state.base64);
      axios
        .post(
          "https://api.ocr.space/parse/image", formData, { headers: { "apikey": this.state.apikey, "Content-Type": 'form-data' } }
        )
        .then(res => {
          axios
            .post(
              "http://13e27bff.ngrok.io/api/v1/extractDataFromOcr", res.data
            )
            .then(resp => {
              for (var i = 0; i < resp.data.result.length; i++) {
                this.temp.push({ "subjectName": resp.data.result[i] });
              }
              this.setState({ JsonData: JSON.stringify(this.temp) });
              ToastsStore.info("Transcript Uploaded!");
              this.getSubjects();
            })
            .catch(error => {
              ToastsStore.info("Please try again!");
              this.loader.className = "";
              this.loader.firstChild.style.display = "none";
            });
        })
        .catch(error => {
          ToastsStore.info("Server is down. Please try again!");
          this.loader.className = "";
          this.loader.firstChild.style.display = "none";
        });
    }
    else {
      ToastsStore.warning("Please upload a PDF");
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
      this.renderTable(this.state.data);
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
        "http://b5560796.ngrok.io/api/Subject/getSubjects"
      )
      .then(res => {
        document.getElementById("hiddenSub").style.display = "block";
        this.loader.className = "";
        this.loader.firstChild.style.display = "none";
        this.setState({ data: res.data });
        res.data.map((subject) => {
          if (subject.isSelected) {
            this.selectRowProp.selected.push(subject.module);
          }
        });
      })
      .catch(error => {
        ToastsStore.info("Please check your Internet Connection!");
        this.loader.className = "";
        this.loader.firstChild.style.display = "none";
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
          <div className="mx-auto">
            <div className="card row my-5">
              <div className="card-body">
                <div className="container">
                  <IsNewUSer onFileChange={this.onFileChange} errorFileSize={this.state.errorFileSize} fileName={this.state.fileName} upload={this.upload} />
                  <div id="hiddenSub">
                    <h3>Available Subjects</h3>
                    <hr className="my-4" />
                    <div>
                      <i className="text-infos"><b>Note:</b> Please choose atleast one subject</i>
                      <BootstrapTable version='4' selectRow={this.selectRowProp} className="table table-striped" data={this.state.data}>
                        <TableHeaderColumn isKey dataField="module" dataAlign="center">Subject ID</TableHeaderColumn>
                        <TableHeaderColumn dataField="subjectName" width={'50%'} filter={{ type: 'TextFilter', delay: 1000 }} dataAlign="center">Subject Name</TableHeaderColumn>
                        {/* <TableHeaderColumn dataField="status" dataFormat={this.colFormatter} dataAlign="center">Admin Status</TableHeaderColumn> */}
                      </BootstrapTable>
                      <hr className="my-4" />
                      <div className="row">
                        <div className="col-6">
                          <button className="btn btn-lg btn-primary btn-block text-uppercase" type="submit" disabled={!this.state.uploadedTranscript} onClick={this.submit}>Submit</button>
                        </div>
                        <div className="col-6">
                          <button className="btn btn-lg btn-info btn-block text-uppercase" type="submit" disabled={!this.state.uploadedTranscript} onClick={this.pdfDownload}>Download as PDF</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Modal visible={this.state.visible} width="600" height="300" effect="fadeInUp" onClickAway={() => this.closeSubModal()}>
            <div className="container c1">
              <div className="row">
                <div className="mx-auto">
                  <h5 className="text-center">ALERT!!</h5>
                  <hr className="my-4" />
                  <p>Please select atleast one Subject</p>
                  <form className="form-signin">
                    <button className="btn btn-lg btn-secondary btn-block text-uppercase" onClick={this.closeSubModal1}>OK</button>
                  </form>
                </div>
              </div>
            </div>
          </Modal>
          <div className="pdfPrint hidden">
          </div>
        </div>
      </div>
    );
  }
}

function PdfContent(props) {
  var subjectsSelected = [];
  var studentData = JSON.parse(sessionStorage.getItem('userData'));
  if (props.data !== "") {
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
  if (sessionStorage.getItem("newUser") === "true") {
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
