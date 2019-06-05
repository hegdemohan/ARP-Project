import React, { Component } from "react";
import "./Request.Component.css";
import axios from "axios";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import { Route } from "react-router-dom";
import Modal from 'react-awesome-modal';


class RequestComponent extends Component {
  studentSub = {};
  constructor(props) {
    super(props);
    this.state = {
      studentObj: "",
      visible: false
    };
    this.openModal = this.openModal.bind(this);
    this.submitModal = this.submitModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.editSubs = this.editSubs.bind(this);

  }

  componentDidMount() {
    // this.setState({availableSubjects : '[subjects:{"abhs","askjdhasjkdhk","askjdhdkashdasudiad"}]'});
    //Send the document API
    axios
      // .get("https://ddcc4a11-1496-4530-832a-8bd1f818ad9d.mock.pstmn.io/getData")
      .get("https://d1c21ad1.ngrok.io/api/getStudentRequestData?type=all")
      .then(res => {
        this.setState({
          studentObj: [...this.state.studentObj, ...res.data]
        });
        // console.log(this.state.studentObj)
      });
  }

  colFormatter = (cell, row) => {
    // const href = row.id;
    // console.log(row);
    return (
      <Route render={({ history }) => (
        <a href="#" style={{ cursor: 'pointer' }}
          onClick={(e) => {
            // stop default behavior a href
            e.preventDefault();
            // set state selected product id
            // this.setState({ studentSub: row });
            this.studentSub = row;
            console.log(this.studentSub);
            localStorage.setItem("UserDetail", JSON.stringify(row));
            // go to the detail product page
            history.push("/StudentRequest/")
          }}>
          >>>
            </a>

      )}
      />
    )
  }
  openModal() {
    this.setState({
      visible: true
    });
  }

  submitModal(e) {
    e.preventDefault();
    axios
      .post(
        "https://d1c21ad1.ngrok.io/api/Subject/addSubject", {
          subjectID: 0,
          subjectMappingID: 0,
          module: e.target.elements.module.value,
          subjectName: e.target.elements.subName.value,
          isSelected: true
        })
      .then((response) => {
        console.log("Success adding");
        // this.setState({ Subs: resp.data });
      });
    this.setState({
      visible: false
    });
  }
  closeModal() {
    this.setState({
      visible: false
    });
  }
  editSubs() {
    this.props.history.push('/editSubjects/');
  }


  render() {
    return (
      <div className="container" >
        <div className="mx-auto">
          <div className="card row my-5">
            <div className="card-body">
              <div className="row r1">
                <button className="btn btn-primary sub" onClick={this.openModal}>Add Subject</button>
                <button className="btn btn-secondary sub" onClick={this.editSubs}>Edit Subject</button>
              </div>
              <Modal visible={this.state.visible} width="650" height="400" effect="fadeInUp" onClickAway={() => this.closeModal()}>
                <div className="container c1">
                  <div className="row">
                    <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                      <h5 className="text-center">Subject Details</h5>
                      <hr className="my-4" />
                      <p >Please enter all the fields</p>
                      {/* <h5 className="card-title text-center">Sign In</h5> */}
                      <form className="form-signin" onSubmit={this.submitModal}>
                        <div className="form-label-group">
                          <input
                            type="subjectModule"
                            id="subjectModule"
                            name="module"
                            className="form-control text-center"
                            // placeholder="subjectModule address"
                            // onChange={this.onChange}
                            required
                          />
                          <label htmlFor="subjectModule">Subject Module</label>
                        </div>
                        <div className="form-label-group">
                          <input
                            type="subjectName"
                            id="subjectName"
                            name="subName"
                            className="form-control text-center"
                            // placeholder="Mobile subjectName"
                            // onChange={this.onChange}
                            required
                          />
                          <label htmlFor="subjectName">Subject Name</label>
                        </div>
                        <button
                          className="btn btn-lg btn-primary btn-block text-uppercase"
                          type="submit"
                        >
                          SUBMIT
                      </button>
                      </form>
                    </div>
                  </div>
                </div>
              </Modal>
              <div className="container req">

                <h2>Pending Requests:</h2>

                <PendingRequestComponent data={this.state.studentObj} colFormatter={this.colFormatter} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
function PendingRequestComponent(props) {
  return (
    <div>
      <BootstrapTable className="table table-striped" data={props.data}>
        <TableHeaderColumn isKey dataField="matriculationNumber" dataAlign="center">Matriculation Number</TableHeaderColumn>
        <TableHeaderColumn dataField="firstName" filter={{ type: 'TextFilter', delay: 1000 }} dataAlign="center">FirstName</TableHeaderColumn>
        <TableHeaderColumn dataField="lastName" filter={{ type: 'TextFilter', delay: 1000 }} dataAlign="center">LastName</TableHeaderColumn>
        <TableHeaderColumn width={'180'} dataField='id' dataFormat={props.colFormatter} dataAlign="center">Link</TableHeaderColumn>
      </BootstrapTable>
    </div>
  );
}

export default RequestComponent;
