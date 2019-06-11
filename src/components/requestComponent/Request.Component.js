import React, { Component } from "react";
import "./Request.Component.css";
import axios from "axios";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import { Route } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css";

class RequestComponent extends Component {
  studentSub = {};
  constructor(props) {
    super(props);
    this.state = {
      allStudentObj: "",
      pendStudentObj: "",
      apprStudentObj: "",
      tabIndex: 1
    };

    this.manageSubs = this.manageSubs.bind(this);

  }

  componentDidMount() {
    // this.setState({availableSubjects : '[subjects:{"abhs","askjdhasjkdhk","askjdhdkashdasudiad"}]'});
    //Send the document API
    axios
      // .get("https://ddcc4a11-1496-4530-832a-8bd1f818ad9d.mock.pstmn.io/getData")
      .get("https://dee35bf9.ngrok.io/api/getStudentRequestData?type=all")
      .then(res => {
        this.setState({
          allStudentObj: [...this.state.allStudentObj, ...res.data]
        });
        // console.log(this.state.studentObj)
      });
    axios
      // .get("https://ddcc4a11-1496-4530-832a-8bd1f818ad9d.mock.pstmn.io/getData")
      .get("https://dee35bf9.ngrok.io/api/getStudentRequestData?type=pending")
      .then(res => {
        this.setState({
          pendStudentObj: [...this.state.pendStudentObj, ...res.data]
        });
        // console.log(this.state.studentObj)
      });
    axios
      // .get("https://ddcc4a11-1496-4530-832a-8bd1f818ad9d.mock.pstmn.io/getData")
      .get("https://dee35bf9.ngrok.io/api/getStudentRequestData?type=approved")
      .then(res => {
        this.setState({
          apprStudentObj: [...this.state.apprStudentObj, ...res.data]
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
            var loader = document.getElementById("loader");
            loader.className = "fullScreen";
            loader.firstChild.style.display = "inline-block";
            // stop default behavior a href
            e.preventDefault();
            // set state selected product id
            // this.setState({ studentSub: row });
            this.studentSub = row;
            console.log(this.studentSub);
            localStorage.setItem("UserDetail", JSON.stringify(row));
            // go to the detail product page
            axios
              .get(
                "https://dee35bf9.ngrok.io/api/getStudentData/" + row.studentID

              )
              .then(resp => {
                loader.className = "";
                loader.firstChild.style.display = "none";
                console.log("Success request");
                localStorage.setItem("StudentRequestData", JSON.stringify(resp.data));
                history.push("/StudentRequest/")

              });
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
                      <ApprovedComponent data={this.state.apprStudentObj} />
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
        <TableHeaderColumn isKey dataField="matriculationNumber" dataAlign="center">Matriculation Number</TableHeaderColumn>
        <TableHeaderColumn dataField="firstName" filter={{ type: 'TextFilter', delay: 1000 }} dataAlign="center">FirstName</TableHeaderColumn>
        <TableHeaderColumn dataField="lastName" filter={{ type: 'TextFilter', delay: 1000 }} dataAlign="center">LastName</TableHeaderColumn>
        <TableHeaderColumn width={'180'} dataField='id' dataFormat={props.colFormatter} dataAlign="center">Link</TableHeaderColumn>
      </BootstrapTable>
    </div>
  );
}
function AllComponent(props) {
  return (
    <div>
      <BootstrapTable className="table table-striped" data={props.data}>
        <TableHeaderColumn isKey dataField="matriculationNumber" dataAlign="center">Matriculation Number</TableHeaderColumn>
        <TableHeaderColumn dataField="firstName" filter={{ type: 'TextFilter', delay: 1000 }} dataAlign="center">FirstName</TableHeaderColumn>
        <TableHeaderColumn dataField="lastName" filter={{ type: 'TextFilter', delay: 1000 }} dataAlign="center">LastName</TableHeaderColumn>
        {/* <TableHeaderColumn width={'180'} dataField='id' dataFormat={props.colFormatter} dataAlign="center">Link</TableHeaderColumn> */}
      </BootstrapTable>
    </div>
  );
}

function ApprovedComponent(props) {
  return (
    <div>
      <BootstrapTable className="table table-striped" data={props.data}>
        <TableHeaderColumn isKey dataField="matriculationNumber" dataAlign="center">Matriculation Number</TableHeaderColumn>
        <TableHeaderColumn dataField="firstName" filter={{ type: 'TextFilter', delay: 1000 }} dataAlign="center">FirstName</TableHeaderColumn>
        <TableHeaderColumn dataField="lastName" filter={{ type: 'TextFilter', delay: 1000 }} dataAlign="center">LastName</TableHeaderColumn>
        {/* <TableHeaderColumn width={'180'} dataField='id' dataFormat={props.colFormatter} dataAlign="center">Link</TableHeaderColumn> */}
      </BootstrapTable>
    </div>
  );
}

export default RequestComponent;
