import React, { Component } from 'react'
import './Registration.Component.css'

class Registration extends Component {
    constructor(props){
        super(props)
        this.state = {}
        this.register = this.register.bind(this);
    }
    register(){
        window.location.href = "/dashboard/";
    }
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                        <div className="card card-signin my-5">
                            <div className="card-body">
                                <h5 className="card-title text-center">Registration Form</h5>
                                <form className="form-signin">
                                <div className="form-label-group">
                                        <input type="text" id="firstName" className="form-control text-center" placeholder="First Name" onChange={this.onChange} required />
                                        <label htmlFor="firstName">First Name</label>
                                    </div>
                                    <div className="form-label-group">
                                        <input type="text" id="lastName" className="form-control text-center" placeholder="Last Name" onChange={this.onChange} required />
                                        <label htmlFor="lastName">Last Name</label>
                                    </div>
                                    <div className="form-label-group">
                                        <input type="number" id="matriculationNo" className="form-control text-center" placeholder="Matriculation Number" onChange={this.onChange} required />
                                        <label htmlFor="matriculationNo">Matriculation Number</label>
                                    </div>
                                    <div className="form-label-group">
                                        <input type="email" id="email" className="form-control text-center" placeholder="Email address" onChange={this.onChange} required />
                                        <label htmlFor="email">Email address</label>
                                    </div>
                                    <div className="form-label-group">
                                        <input type="password" id="passWord" className="form-control text-center" placeholder="Password" onChange={this.onChange} required />
                                        <label htmlFor="passWord">Password</label>
                                    </div>
                                    <div className="form-label-group">
                                        <input type="password" id="confirmPassWord" className="form-control text-center" placeholder="Confirm Password" onChange={this.onChange} required />
                                        <label htmlFor="passWord">Confirm Password</label>
                                    </div>
                                    <button className="btn btn-lg btn-primary btn-block text-uppercase" type="submit" onClick={this.register}>Register</button>
                                    <hr className="my-4" />
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Registration;