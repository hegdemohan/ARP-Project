import React, { Component } from 'react';
import axios from "axios";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import { Route } from "react-router-dom";
import './EditSubject.Component.css';


class EditSubject extends Component {
    editSubs = {}
    constructor(props) {
        super(props);
        this.state = {
            Subs: []
        };

        this.editFormatter = this.editFormatter.bind(this);
    }


    componentDidMount() {
        axios
            .get(
                "https://d1c21ad1.ngrok.io/api/Subject/getSubjects"

            )
            .then(resp => {
                // console.log("Success");
                this.setState({ Subs: resp.data });
            });

    }
    test() {
        alert("asd");
    }

    editFormatter(cell, row) {
        return (
            <Route render={({ history }) => (
                <div>
                    <a href="#" style={{ cursor: 'pointer' }} className="link-lay"
                        onClick={(e) => {
                            // stop default behavior a href
                            e.preventDefault();
                            // set state selected product id
                            // this.setState({ studentSub: row });
                            this.editSubs = row;
                            console.log(this.editSubs);
                            axios
                                .put(
                                    "https://d1c21ad1.ngrok.io/api/Subject/updateSubject", {
                                        subjectID: this.editSubs.subjectID,
                                        subjectName: this.editSubs.subjectName,
                                        module: this.editSubs.module,
                                        isSelected: false
                                    })
                                .then((response) => {
                                    axios
                                        .get(
                                            "https://d1c21ad1.ngrok.io/api/Subject/getSubjects"

                                        )
                                        .then(resp => {
                                            console.log("deleted");
                                            // console.log("Success");
                                            this.setState({ Subs: resp.data });
                                        });

                                });

                        }}>
                        Delete
                    </a>
                    <a href="#" style={{ cursor: 'pointer' }} className="link-lay1"
                        onClick={(e) => {
                            e.preventDefault();
                            this.editSubs = row;
                            console.log(this.editSubs);
                            console.log(this.editSubs.subjectName);
                            console.log(this.editSubs.module);

                            axios
                                .put(
                                    "https://d1c21ad1.ngrok.io/api/Subject/updateSubject", {
                                        subjectID: this.editSubs.subjectID,
                                        subjectMappingID: 0,
                                        subjectName: this.editSubs.subjectName,
                                        module: this.editSubs.module,
                                        isSelected: true
                                    })
                                .then((response) => {
                                    axios
                                        .get(
                                            "https://d1c21ad1.ngrok.io/api/Subject/getSubjects"

                                        )
                                        .then(resp => {
                                            console.log("updated");
                                            // console.log("Success");
                                            this.setState({ Subs: resp.data });
                                        });
                                });

                            // localStorage.setItem("UserDetail", JSON.stringify(row));
                            // go to the detail product page
                            // history.push("/StudentRequest/")
                        }}>
                        Edit
                    </a>
                </div>

            )}
            />
        );
    }



    cellEditProp = {
        mode: 'dbclick',
        blurToSave: true,
        afterSaveCell(row, cellName, cellValue) {
            alert();
        }
        // afterSaveCell: onAfterSaveCell
        // beforeSaveCell(oldValue, newValue, row, column, done) {
        //     setTimeout(() => {
        //         if (alert('Do you want to accept this change?')) {
        //             return true;
        //         } else {
        //             return false; // reject the changes
        //         }
        //     }, 0);
        //     return { async: true };
        // }
    };
    render() {

        return (
            <div className="container">
                <div className="mx-auto">
                    <div className="card row my-5">
                        <div className="card-body">
                            <BootstrapTable className="table table-striped" data={this.state.Subs} cellEdit={this.cellEditProp}>
                                <TableHeaderColumn isKey dataField="subjectID" dataAlign="center">Subject ID</TableHeaderColumn>
                                <TableHeaderColumn dataField="module" filter={{ type: 'TextFilter', delay: 1000 }} dataAlign="center">Module</TableHeaderColumn>
                                <TableHeaderColumn dataField="subjectName" filter={{ type: 'TextFilter', delay: 1000 }} dataAlign="center">Subject Name</TableHeaderColumn>
                                <TableHeaderColumn dataField='edit' dataFormat={this.editFormatter} dataAlign="center">Edit</TableHeaderColumn>
                                {/* <TableHeaderColumn width={'180'} dataField='id' dataFormat={props.colFormatter} dataAlign="center">Link</TableHeaderColumn> */}
                            </BootstrapTable>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default EditSubject;