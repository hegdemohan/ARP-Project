import React, { Component } from "react";
import "./Dashboard.Component.css";
import axios from "axios";

class DashboardComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: "",
      fileName: "",
      availableSubjects: "",
      items: ""
    };
    this.onFileChange = this.onFileChange.bind(this);
    this.upload = this.upload.bind(this);
  }

  onFileChange(e, file) {
    var file = file || e.target.files[0];
    this.setState({ fileName: e.target.files[0].name });
  }

  upload() {
    // this.setState({availableSubjects : '[subjects:{"abhs","askjdhasjkdhk","askjdhdkashdasudiad"}]'});
    //Send the document API
    axios
      .get(
        "https://70a0e7ff-13e6-44fd-9d63-349e40cb7d00.mock.pstmn.io/api/getData"
      )
      .then(res => {
        // this.setState({ availableSubjects: res.data});
        this.setState({
          availableSubjects: res.data.subjects.map(subject => (
            <li className="card" key={subject.name}>
              {subject.name}
            </li>
          ))
        });
      });
  }

  render() {
    return (
      <div className="container">
        <div className="mx-auto">
          <div className="card row my-5">
            <div className="card-body">
              <div className="container">
                <h4>Upload Transcript in PDF format</h4>
                <div className="input-group">
                  <span className="input-group-btn">
                    <span className="btn btn-primary btn-file">
                      Browse&hellip;{" "}
                      <input
                        type="file"
                        accept="application/pdf"
                        onChange={this.onFileChange}
                        single="true"
                      />
                    </span>
                  </span>
                  <input
                    type="text"
                    value={this.state.fileName}
                    className="form-control"
                    readOnly
                  />
                </div>
                <button
                  className="btn btn-lg btn-primary my-4"
                  type="submit"
                  onClick={this.upload}
                >
                  Upload
                </button>
                <hr className="my-4" />
                <ul>
                  {/* {this.state.availableSubjects.map((subjects,index)=>{
                                        return <h1>{subjects.name}</h1>
                                    })} */}
                  {this.state.availableSubjects}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DashboardComponent;
