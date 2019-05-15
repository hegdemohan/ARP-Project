import React, { Component } from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "./PendingRequest.Component.css";
import { Route, Link } from "react-router-dom";
import UserComponent from "../userComponent/User.Component";

class PendingRequestComponent extends Component {
    studentSub = {};
    constructor(props) {
        super(props);
        this.state = {

        };

    }

    colFormatter = (cell, row) => {
        // const href = row.id;
        // console.log(row);
        return (
            // console.log(row);
            // < Link to={"/users/"} render={(props) => <UserComponent {...props} />}> open</Link >
            // <Route
            //     path={"/users" + row.id}
            // render={(props) => <UserComponent {...props} />}
            // />
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
                        history.push("/users/")
                    }}>
                    >>>
                </a>

            )}
            />
        )
    }
    render() {
        // var selectRowProp = {
        //     mode: "checkbox",
        //     clickToSelect: true,
        //     selected: this.state.selected  //give a default selected row.
        // };
        // const options = {
        //     onRowClick: function (row, rowIndex, columnIndex, event) {
        //         this.setState({ redirect: true })
        //     }
        // }

        // // redirect only if the state is true
        // if (this.state.redirect) {
        //     return (
        //         <Redirect to="/users/1" />
        //     )
        // }

        // console.log(this.props.data);

        return (
            <div>
                <BootstrapTable className="table table-striped" data={this.props.data}>
                    <TableHeaderColumn isKey dataField="id" dataAlign="center">Matriculation Number</TableHeaderColumn>
                    <TableHeaderColumn dataField="firstName" dataAlign="center">FirstName</TableHeaderColumn>
                    <TableHeaderColumn dataField="lastName" dataAlign="center">LastName</TableHeaderColumn>
                    <TableHeaderColumn width={'180'} dataField='id' dataFormat={this.colFormatter} dataAlign="center">Link</TableHeaderColumn>
                </BootstrapTable>
                {/* <UserComponent data={this.studentSub} /> */}
            </div>
        );
    }
}

export default PendingRequestComponent;
