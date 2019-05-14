import React, { Component } from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "./PendingRequest.Component.css";
import { Link } from "react-router-dom";

class PendingRequestComponent extends Component {
  constructor(props) {
    super(props);
  }
  colFormatter = (cell, row) => {
    return <Link to="/some/route">{cell}</Link>;
  };
  render() {
    console.log(this.props.data);

    return (
      <div>
        <BootstrapTable className="table table-striped" data={this.props.data}>
          <TableHeaderColumn isKey dataField="id">
            Matriculation Number
          </TableHeaderColumn>
          <TableHeaderColumn dataField="firstName">FirstName</TableHeaderColumn>
          <TableHeaderColumn dataField="lastName">LastName</TableHeaderColumn>
          <TableHeaderColumn dataFormat={this.colFormatter} dataField="link">
            Link
          </TableHeaderColumn>
        </BootstrapTable>
      </div>
    );
  }
}

export default PendingRequestComponent;
