import React, { Component } from "react";
import "./Dashboard.Component.css";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import axios from "axios";

class DashboardComponent extends Component {
  temp;
  afterSelction = {}
  selectRowProp = {}
  newUserDiv;
  subjectsLocal=[];
  constructor(props) {
    super(props);
    this.state = {
      file: "",
      fileName: "",
      availableSubjects: "",
      items: ""
    };
    this.init = this.init.bind(this);
    this.onFileChange = this.onFileChange.bind(this);
    this.upload = this.upload.bind(this);
    this.submit = this.submit.bind(this);
    this.editSubjects = this.editSubjects.bind(this);
  }

  componentDidMount() {
    this.init();
  }

  editSubjects(row, isSelected, e){
    for(let i = 0; i < this.temp.subjects.length; i++){
      if(this.temp.subjects[i].subjectID === row.subjectID){
        this.temp.subjects[i].isSelected = isSelected;
      }
    }
  }

  init() {
    this.selectRowProp = {
      mode: 'checkbox',
      selected: [],
      onSelect: this.editSubjects
    };

    if (localStorage.getItem("newUser") == "false") {
      this.temp = {
        "firstName": "Mohan",
        "lastName": "Hegde",
        "matriculationNo": "1212",
        "subjects": [
          {
            "subjectID": "CL_001",
            "subjectName": "Supply Chain Management",
            "isSelected": false
          },
          {
            "subjectID": "CL_002",
            "subjectName": "Supply Chain Management",
            "isSelected": true
          },
          {
            "subjectID": "CL_003",
            "subjectName": "Ambient Intelligence System",
            "isSelected": true
          },
          {
            "subjectID": "CL_004",
            "subjectName": "Advanced Modelling and Simulation",
            "isSelected": false
          }, {
            "subjectID": "CL_005",
            "subjectName": "Supply Chain Management",
            "isSelected": false
          },
          {
            "subjectID": "CL_006",
            "subjectName": "Supply Chain Management",
            "isSelected": true
          },
          {
            "subjectID": "CL_007",
            "subjectName": "Ambient Intelligence System",
            "isSelected": true
          },
          {
            "subjectID": "CL_008",
            "subjectName": "Advanced Modelling and Simulation",
            "isSelected": false
          }, {
            "subjectID": "CL_009",
            "subjectName": "Supply Chain Management",
            "isSelected": false
          },
          {
            "subjectID": "CL_0010",
            "subjectName": "Supply Chain Management",
            "isSelected": true
          },
          {
            "subjectID": "CL_0011",
            "subjectName": "Ambient Intelligence System",
            "isSelected": true
          },
          {
            "subjectID": "CL_0012",
            "subjectName": "Advanced Modelling and Simulation",
            "isSelected": false
          }
        ]
      }
      this.temp.subjects.map((subject) =>{
        this.subjectsLocal.push(subject);
        if(subject.isSelected){
            this.selectRowProp.selected.push(subject.subjectID);
        }
      });
          
      this.setState({ availableSubjects: this.temp.subjects });
    }
  }

  onFileChange(e, file) {
    var selectedFile = file || e.target.files[0];
    var fileReader = new FileReader();
    var base64;
    fileReader.onload = function (fileLoadedEvent) {
      base64 = fileLoadedEvent.target.result;
      // Print data in console
      console.log(base64);
    };
    fileReader.readAsDataURL(selectedFile);
    this.setState({ fileName: e.target.files[0].name });
  }

  submit(){
    console.log(this.temp.subjects);
  }

  upload() {
    //Send the document API
    // axios.get("https://70a0e7ff-13e6-44fd-9d63-349e40cb7d00.mock.pstmn.io/api/getData").then(res => {
    //     // this.setState({ availableSubjects: res.data});
    //     this.setState({
    //         availableSubjects: res.data.subjects.map((subject) =>
    //             <li className="card" key={subject.name}>{subject.name}</li>)
    //     })
    // });
  }

  render() {
    
    return (
      <div className="container">
        <div className="mx-auto">
          <div className="card row my-5">
            <div className="card-body">
              <div className="container">
                <IsNewUSer />
                <hr className="my-4" />
                <div>
                  <BootstrapTable version='4' selectRow={ this.selectRowProp } className="table table-striped" data={this.subjectsLocal}>
                    <TableHeaderColumn isKey dataField="subjectID" dataAlign="center">Subject ID</TableHeaderColumn>
                    <TableHeaderColumn dataField="subjectName" dataAlign="center">Subject Name</TableHeaderColumn>
                  </BootstrapTable>
                  <hr className="my-4"/>
                  <button className="btn btn-lg btn-primary btn-block text-uppercase" type="submit" onClick={this.submit}>Submit</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
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
