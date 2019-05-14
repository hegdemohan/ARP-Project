import React, { Component } from "react";
import "./Request.Component.css";
import axios from "axios";
// import PendingRequest from './components/pendingRequestComponent'
import PendingRequestComponent from "../pendingRequestComponent/PendingRequest.Component";

class RequestComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      studentObj: ""
    };
    // this.pendingRequest = this.pendingRequest.bind(this);
    // this.pendingRequest();
  }

  componentWillMount() {
    // this.setState({availableSubjects : '[subjects:{"abhs","askjdhasjkdhk","askjdhdkashdasudiad"}]'});
    //Send the document API
    axios
      .get("https://ddcc4a11-1496-4530-832a-8bd1f818ad9d.mock.pstmn.io/getData")
      .then(res => {
        this.setState({
          studentObj: [...this.state.studentObj, ...res.data]
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
                <h2>Pending Requests:</h2>
                <PendingRequestComponent data={this.state.studentObj} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default RequestComponent;
