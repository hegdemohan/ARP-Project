import React, { Component } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import SignInComponent from "./components/signInComponent/SignIn.Component";
import DashboardComponent from "./components/dashboardComponent/Dashboard.Component";
import StudentDetails from "./components/studentDetailsComponent/StudentDetails.Component";
import RequestComponent from "./components/requestComponent/Request.Component";
import Registration from "./components/registrationComponent/Registration.Component";
import StudentRequest from "./components/studentRequestComponent/StudentRequest.Component";
import EditSubject from "./components/editSubjectComponent/EditSubject.Component";
import CheckStatus from "./components/checkStatusComponent/CheckStatus.Component"
import ApprovedComponent from "./components/approvedComponent/Approved.Component";

class Router extends Component {
  state = {};
  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Redirect exact from="/" to="/signin/" />
            <Route exact path="/signin/" component={SignInComponent} />
            <Route path="/studentDetails/" component={StudentDetails} />
            <Route path="/dashboard/" component={DashboardComponent} />
            <Route path="/registration/" component={Registration} />
            <Route path="/requests/" component={RequestComponent} />
            <Route path={"/studentRequest/"} component={StudentRequest} />
            <Route path={"/editSubjects/"} component={EditSubject} />
            <Route path={"/checkStatus/"} component={CheckStatus} />
            <Route path={"/approved/"} component={ApprovedComponent} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default Router;
