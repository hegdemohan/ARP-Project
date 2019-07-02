import React, { Component } from "react";
import "./Request.Component.css";
import axios from "axios";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import { Route } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css";
import { ToastsContainer, ToastsStore, ToastsContainerPosition } from 'react-toasts';


class RequestComponent extends Component {
  studentSub = {};
  constructor(props) {
    super(props);
    this.state = {
      allStudentObj: "",
      pendStudentObj: "",
      apprStudentObj: "",
      tabIndex: 0
    };

    this.manageSubs = this.manageSubs.bind(this);

  }

  componentDidMount() {
    // if (sessionStorage.getItem("userLoggedin")) {
    var loader = document.getElementById("loader");
    loader.className = "fullScreen";
    loader.firstChild.style.display = "inline-block";
    axios
      .get("http://b5560796.ngrok.io/api/getStudentRequestData?type=all")
      .then(res => {
        this.setState({
          allStudentObj: [...this.state.allStudentObj, ...res.data]
        });
        loader.className = "";
        loader.firstChild.style.display = "none";
      })
      .catch(error => {
        ToastsStore.info("Please check your Internet Connection!");
        loader.className = "";
        loader.firstChild.style.display = "none";
      });
    axios
      .get("http://b5560796.ngrok.io/api/getStudentRequestData?type=pending")
      .then(res => {
        this.setState({
          pendStudentObj: [...this.state.pendStudentObj, ...res.data]
        });
      });
    axios
      .get("http://b5560796.ngrok.io/api/getStudentRequestData?type=approved")
      .then(res => {
        this.setState({
          apprStudentObj: [...this.state.apprStudentObj, ...res.data]
        });
      });
    // } else {
    //   this.props.history.push("/signin/");
    // }
  }

  colFormatter = (cell, row) => {
    return (
      <Route render={({ history }) => (
        <a href="#" style={{ cursor: 'pointer' }}
          onClick={(e) => {
            var loader = document.getElementById("loader");
            loader.className = "fullScreen";
            loader.firstChild.style.display = "inline-block";
            e.preventDefault();
            this.studentSub = row;
            sessionStorage.setItem("UserDetail", JSON.stringify(row));
            axios
              .get(
                "http://b5560796.ngrok.io/api/getStudentData/" + row.studentID

              )
              .then(resp => {
                loader.className = "";
                loader.firstChild.style.display = "none";
                sessionStorage.setItem("StudentRequestData", JSON.stringify(resp.data));
                history.push("/studentRequest/");

              })
              .catch(error => {
                ToastsStore.info("Please try again!");
                loader.className = "";
                loader.firstChild.style.display = "none";
              });
          }}>
          <i className="fa fa-angle-double-right"></i>
        </a>

      )}
      />
    )
  }
  approveColFormatter = (cell, row) => {
    return (
      <Route render={({ history }) => (
        <a href="#" style={{ cursor: 'pointer' }}
          onClick={(e) => {
            var loader = document.getElementById("loader");
            loader.className = "fullScreen";
            loader.firstChild.style.display = "inline-block";
            e.preventDefault();
            this.studentSub = row;
            sessionStorage.setItem("approvedData", JSON.stringify(row));
            history.push("/approved/");
          }}>
          <i className="fa fa-angle-double-right"></i>
        </a>

      )}
      />
    )
  }

  manageSubs() {
    this.props.history.push('/editSubjects/');
  }


  render() {
    return (
      <div>
        <div id="loader">
          <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </div>
        <div className="container" >
          <div className="mx-auto">
            <div className="card row my-5">
              <div className="card-body">
                <div className="row r1">
                  <button className="btn btn-primary sub" onClick={this.manageSubs}>Manage Subjects</button>
                </div>
                <Tabs className="allTabs" selectedIndex={this.state.tabIndex} onSelect={tabIndex => this.setState({ tabIndex })}>
                  <TabList>
                    <Tab >ALL</Tab>
                    <Tab>PENDING</Tab>
                    <Tab>APPROVED</Tab>
                  </TabList>

                  <TabPanel>
                    <div className="container req">
                      <AllComponent data={this.state.allStudentObj} />
                    </div>
                  </TabPanel>
                  <TabPanel>
                    <div className="container req">
                      <PendingRequestComponent data={this.state.pendStudentObj} colFormatter={this.colFormatter} />
                    </div>
                  </TabPanel>
                  <TabPanel>
                    <div className="container req">
                      <ApprovedComponent data={this.state.apprStudentObj} colFormatter={this.approveColFormatter} />
                    </div>
                  </TabPanel>
                </Tabs>

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
        <TableHeaderColumn isKey dataField="matriculationNumber" filter={{ type: 'TextFilter', delay: 1000 }} dataAlign="center">Matriculation Number</TableHeaderColumn>
        <TableHeaderColumn dataField="firstName" dataAlign="center">FirstName</TableHeaderColumn>
        <TableHeaderColumn dataField="lastName" dataAlign="center">LastName</TableHeaderColumn>
        <TableHeaderColumn width={'120'} dataField='id' dataFormat={props.colFormatter} dataAlign="center">Link</TableHeaderColumn>
      </BootstrapTable>
    </div>
  );
}
function AllComponent(props) {
  return (
    <div>
      <BootstrapTable className="table table-striped" data={props.data}>
        <TableHeaderColumn isKey dataField="matriculationNumber" filter={{ type: 'TextFilter', delay: 1000 }} dataAlign="center">Matriculation Number</TableHeaderColumn>
        <TableHeaderColumn dataField="firstName" dataAlign="center">FirstName</TableHeaderColumn>
        <TableHeaderColumn dataField="lastName" dataAlign="center">LastName</TableHeaderColumn>
        {/* <TableHeaderColumn width={'180'} dataField='id' dataFormat={props.colFormatter} dataAlign="center">Link</TableHeaderColumn> */}
      </BootstrapTable>
    </div>
  );
}

function ApprovedComponent(props) {
  return (
    <div>
      <BootstrapTable className="table table-striped" data={props.data}>
        <TableHeaderColumn isKey dataField="matriculationNumber" filter={{ type: 'TextFilter', delay: 1000 }} dataAlign="center">Matriculation Number</TableHeaderColumn>
        <TableHeaderColumn dataField="firstName" dataAlign="center">FirstName</TableHeaderColumn>
        <TableHeaderColumn dataField="lastName" dataAlign="center">LastName</TableHeaderColumn>
        <TableHeaderColumn width={'120'} dataField='id' dataFormat={props.colFormatter} dataAlign="center">Link</TableHeaderColumn>
      </BootstrapTable>
    </div>
  );
}

export default RequestComponent;
