import React, { Component } from 'react';
import './Dashboard.Component.css'
import axios from 'axios'

class DashboardComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            file: '',
            fileName: '',
            availableSubjects: '',
            items:''
        }
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
        axios.get("https://a8727e03-e1c5-4544-a9de-c5159c1ae5a5.mock.pstmn.io/availableSubjects").then(res => {
            this.setState({ availableSubjects: res.data });
            console.log(this.state.availableSubjects);
        });
//          this.setState({items: this.state.availableSubjects.map((subjects) => <li>{subjects}</li>)
// });
const subjects = ["asdasdasd","asdasdasd","asdasdasdasd"];
this.setState({items : subjects.map((subject) =>
<li key={subject}>{subject}</li>)})
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
                                            Browse&hellip; <input type="file" accept="application/pdf" onChange={this.onFileChange} single="true" />
                                        </span>
                                    </span>
                                    <input type="text" value={this.state.fileName} className="form-control" readOnly />
                                </div>
                                <button className="btn btn-lg btn-primary my-4" type="submit" onClick={this.upload}>Upload</button>
                                <hr className="my-4" />
                                <ul>
                                    {this.state.items}
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