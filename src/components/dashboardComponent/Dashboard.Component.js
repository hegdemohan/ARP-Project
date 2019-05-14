import React, { Component } from "react";
import "./Dashboard.Component.css";
import axios from "axios";

class DashboardComponent extends Component {
  newUserDiv;
  temp;
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
  }

  componentDidMount() {
    this.init();
  }

  init() {
    if (localStorage.getItem("newUser") == "false") {
      // this.setState({availableSubjects : '[subjects:{"abhs","askjdhasjkdhk","askjdhdkashdasudiad"}]'});
      this.temp = {
        subjects: [
          {
            subjectId: 1,
            name: "ABC"
          },
          {
            subjectId: 2,
            name: "HGFD"
          }
        ]
      };
      this.setState({
        availableSubjects: this.temp.subjects.map(subject => (
          <li className="card" key={subject.name}>
            {subject.name}
          </li>
        ))
      });
    }
  }

  onFileChange(e, file) {
    var selectedFile = file || e.target.files[0];
    var fileReader = new FileReader();
    var base64;
    fileReader.onload = function(fileLoadedEvent) {
      base64 = fileLoadedEvent.target.result;
      // Print data in console
      console.log(base64);
    };
    fileReader.readAsDataURL(selectedFile);
    this.setState({ fileName: e.target.files[0].name });
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
                <ul>{this.state.availableSubjects}</ul>
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
            <span className="btn btn-primary btn-file">
              Browse&hellip;{" "}
              <input
                type="file"
                accept="application/pdf"
                onChange={props.onFileChange}
                single="true"
              />
            </span>
          </span>
          <input
            type="text"
            value={props.fileName}
            className="form-control"
            readOnly
          />
        </div>
        <button
          className="btn btn-lg btn-primary my-4"
          type="submit"
          onClick={props.upload}
        >
          Upload
        </button>
      </div>
    );
  } else {
    return <div />;
  }
}

export default DashboardComponent;
