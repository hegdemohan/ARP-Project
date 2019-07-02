import React, { Component } from 'react';
import axios from "axios";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import { Route } from "react-router-dom";
import './EditSubject.Component.css';
import Modal from 'react-awesome-modal';
import { ToastsContainer, ToastsStore, ToastsContainerPosition } from 'react-toasts';


class EditSubject extends Component {
    editSubs = {};
    deleteSubs = {};
    constructor(props) {
        super(props);
        this.state = {
            Subs: [],
            visible: false,
            delVisible: false,
            errorData: ""

        };

        this.editFormatter = this.editFormatter.bind(this);
        this.openModal = this.openModal.bind(this);
        this.submitModal = this.submitModal.bind(this);
        this.closeSubModal = this.closeSubModal.bind(this);
        this.closeSubModal1 = this.closeSubModal1.bind(this);
        this.closeDelModal = this.closeDelModal.bind(this);
        this.closeDelModal1 = this.closeDelModal1.bind(this);
        this.submitDelModal = this.submitDelModal.bind(this);
    }

    componentDidMount() {
        if (sessionStorage.getItem("userLoggedin")) {
            var loader = document.getElementById("loader");
            loader.className = "fullScreen";
            loader.firstChild.style.display = "inline-block";
            axios
                .get(
                    "http://b5560796.ngrok.io/api/Subject/getSubjects"

                )
                .then(resp => {
                    loader.className = "";
                    loader.firstChild.style.display = "none";
                    this.setState({ Subs: resp.data });
                })
                .catch(error => {
                    ToastsStore.info("Please check your Internet Connection!");
                    loader.className = "";
                    loader.firstChild.style.display = "none";
                });

        } else {
            this.props.history.push("/signin/");
        }

    }

    openModal() {
        this.setState({
            visible: true
        });
    }

    submitModal(e) {
        e.preventDefault();
        var loader = document.getElementById("loader");
        loader.className = "fullScreen";
        loader.firstChild.style.display = "inline-block";
        axios
            .post(
                "http://b5560796.ngrok.io/api/Subject/addSubject", {
                    subjectID: 0,
                    subjectMappingID: 0,
                    module: e.target.elements.module.value,
                    subjectName: e.target.elements.subName.value,
                    isSelected: true
                })
            .then((response) => {
                axios
                    .get(
                        "http://b5560796.ngrok.io/api/Subject/getSubjects"

                    )
                    .then(resp => {
                        loader.className = "";
                        loader.firstChild.style.display = "none";
                        this.setState({ Subs: resp.data });

                    })
                    .catch(error => {
                        ToastsStore.info("Please check your Internet Connection!");
                        loader.className = "";
                        loader.firstChild.style.display = "none";
                    });
                this.setState({
                    visible: false
                });
                document.getElementById("modal-forms").reset();
                ToastsStore.success("Added!");
                this.setState({ errorData: "" });
            })
            .catch(error => {
                if (error.response.status === 409) {
                    loader.className = "";
                    loader.firstChild.style.display = "none";
                    this.setState({ errorData: "Subject Module or Subject Name already exists" });
                }
                else {
                    ToastsStore.info("Please check your Internet Connection!");
                    loader.className = "";
                    loader.firstChild.style.display = "none";
                }
            });

    }

    closeSubModal1(e) {
        e.preventDefault();
        this.setState({
            visible: false
        });
    }
    closeSubModal() {
        this.setState({
            visible: false
        });
    }

    submitDelModal(e) {
        e.preventDefault();
        var loader = document.getElementById("loader");
        loader.className = "fullScreen";
        loader.firstChild.style.display = "inline-block";
        axios
            .put(
                "http://b5560796.ngrok.io/api/Subject/updateSubject", {
                    subjectID: this.deleteSubs.subjectID,
                    subjectName: this.deleteSubs.subjectName,
                    module: this.deleteSubs.module,
                    isSelected: false
                })
            .then((response) => {
                axios
                    .get(
                        "http://b5560796.ngrok.io/api/Subject/getSubjects"

                    )
                    .then(resp => {
                        ToastsStore.success("Deleted!");
                        loader.className = "";
                        loader.firstChild.style.display = "none";
                        this.setState({ Subs: resp.data });
                    })
                    .catch(error => {
                        ToastsStore.info("Please check your Internet Connection!");
                        loader.className = "";
                        loader.firstChild.style.display = "none";
                    });

            })
            .catch(error => {
                ToastsStore.info("Please check your Internet Connection!");
                loader.className = "";
                loader.firstChild.style.display = "none";
            });
        this.setState({
            delVisible: false
        });
    }

    closeDelModal() {
        this.setState({
            delVisible: false
        });
    }
    closeDelModal1(e) {
        e.preventDefault();
        this.setState({
            delVisible: false
        });
    }

    editFormatter(cell, row) {
        return (
            <Route render={({ history }) => (
                <div>
                    <a href="#" style={{ cursor: 'pointer' }} className="link-lay"
                        onClick={(e) => {
                            // stop default behavior a href
                            e.preventDefault();
                            this.setState({
                                delVisible: true
                            });
                            this.deleteSubs = row;

                        }}>
                        <i className="fa fa-trash-o"></i>
                    </a>
                </ div>

            )}
            />
        );
    }



    cellEditProp = {
        mode: 'dbclick',
        blurToSave: true,
        afterSaveCell: (row, cellName, cellValue) => {
            this.editSubs = row;
            axios
                .put(
                    "http://b5560796.ngrok.io/api/Subject/updateSubject", {
                        subjectID: this.editSubs.subjectID,
                        subjectMappingID: 0,
                        subjectName: this.editSubs.subjectName,
                        module: this.editSubs.module,
                        isSelected: true
                    })
                .then((response) => {
                    axios
                        .get(
                            "http://b5560796.ngrok.io/api/Subject/getSubjects"

                        )
                        .then(resp => {
                            ToastsStore.success("Updated!");
                            this.setState({ Subs: resp.data });
                        })
                        .catch(error => {
                            ToastsStore.info("Please check your Internet Connection!");
                        });
                })
                .catch(error => {
                    ToastsStore.info("Please check your Internet Connection!");
                });
        }
    };
    render() {

        return (
            <div>
                <ToastsContainer position={ToastsContainerPosition.BOTTOM_CENTER} store={ToastsStore} />
                <div id="loader">
                    <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                </div>
                <div className="container">
                    <div className="mx-auto">
                        <div className="card row my-5">
                            <a href="#" onClick={this.openModal} className="fa-icons-lay">
                                <i className="fa fa-plus"> ADD SUBJECT</i>
                            </a>
                            <div className="card-body">
                                <i className="text-infos">Please double click on the required field to edit</i>
                                <BootstrapTable className="table table-striped" data={this.state.Subs} cellEdit={this.cellEditProp}>
                                    <TableHeaderColumn isKey width={'10%'} dataField="subjectID" dataAlign="center">ID</TableHeaderColumn>
                                    <TableHeaderColumn dataField="module" filter={{ type: 'TextFilter', delay: 1000 }} dataAlign="center">Module</TableHeaderColumn>
                                    <TableHeaderColumn dataField="subjectName" width={'50%'} filter={{ type: 'TextFilter', delay: 1000 }} dataAlign="center">Subject Name</TableHeaderColumn>
                                    <TableHeaderColumn width={'15%'} dataField='edit' dataFormat={this.editFormatter} editable={false} dataAlign="center">Delete</TableHeaderColumn>
                                </BootstrapTable>
                            </div>
                        </div>
                        <Modal visible={this.state.delVisible} width="600" height="300" effect="fadeInUp" onClickAway={() => this.closeDelModal()}>
                            <div className="container c1">
                                <div className="row">
                                    <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                                        <h5 className="text-center">CONFIRMATION</h5>
                                        <hr className="my-4" />
                                        <p>Are you sure want to delete this Subject?</p>
                                        <form className="form-signin">
                                            <button className="btn btn-lg btn-primary my-2 delBtn btn-block text-uppercase" onClick={this.submitDelModal}>Delete</button>
                                            <button className="btn btn-lg btn-secondary btn-block text-uppercase" onClick={this.closeDelModal1}>Cancel</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </Modal>
                        <Modal visible={this.state.visible} width="650" height="500" effect="fadeInUp" onClickAway={() => this.closeSubModal()}>
                            <div className="container c1">
                                <div className="row">
                                    <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                                        <h5 className="text-center">Subject Details</h5>
                                        <hr className="my-4" />
                                        <p className="text-infos">Please enter all the fields</p>
                                        <form className="form-signin" id="modal-forms" onSubmit={this.submitModal}>
                                            <div className="form-label-group">
                                                <input
                                                    type="subjectModule"
                                                    id="subjectModule"
                                                    name="module"
                                                    className="form-control text-center"
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
                                                    required
                                                />
                                                <label htmlFor="subjectName">Subject Name</label>
                                            </div>
                                            <div className="errormsg my-3">
                                                {this.state.errorData}
                                            </div>
                                            <button
                                                className="btn btn-lg btn-primary btn-block text-uppercase"
                                                type="submit">
                                                SUBMIT
                      </button>
                                            <button
                                                className="btn btn-lg btn-secondary btn-block text-uppercase" onClick={this.closeSubModal1}
                                            >
                                                CANCEL
                      </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </Modal>
                    </div>
                </div>
            </div>

        );
    }
}

export default EditSubject;