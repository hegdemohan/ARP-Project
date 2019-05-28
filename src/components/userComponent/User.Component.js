import React, { Component } from 'react';

class UserComponent extends Component {
    // data = {};
    subjectsLocal = [];
    constructor(props) {
        super(props)
        this.state = {
            data: {}
        }
        this.init = this.init.bind(this);
    }
    componentDidMount() {
        this.init();
    }
    init() {
        this.setState({ data: JSON.parse(localStorage.getItem("UserDetail")) });
        console.log(this.state.data);
        // this.state.data.subjects.map((subject) => {
        //     this.subjectsLocal.push(subject);
        //     // if(subject.isSelected){
        //     //     this.selectRowProp.selected.push(subject.subjectID);
        //     // }
        // });
    }
    render() {

        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                        <div className="card card-signin my-5">
                            <div className="card-body">
                                <h3 className="card-title text-center">Student Details</h3>
                                <hr className="my-4"></hr>
                                <div className="row">
                                    <div className="col-6">First Name:</div><div className="col-6">{this.state.data.firstName}</div>
                                    <div className="col-6">Last Name:</div><div className="col-6">{this.state.data.lastName}</div>
                                    <div className="col-6">Matriculation Number:</div><div className="col-6">{this.state.data.id}</div>
                                    <div className="col-6">Requested Subjects:</div><div className="col-6">{this.subjectsLocal}</div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default UserComponent;