import React, { Component } from 'react';


class HeaderComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: ''
        }
        this.calledRender = this.calledRender.bind(this);
    }

    calledRender(){
        console.log("calledRender")
    }
    componentDidMount(){
        console.log("componentDidMount");
    }

    componentDidCatch(){
        console.log("componentDidCatch")
    }
    componentDidUpdate(){
        console.log("componentDidUpdate")
    }
    componentWillMount(){
        console.log("componentWillMount")
    }
    
    logOut() {
        sessionStorage.clear();
        window.location.href = '/signin/';
    }

    render() {
        var data = JSON.parse(sessionStorage.getItem("userData"));
        var isAdmin = JSON.parse(sessionStorage.getItem("isAdmin"));

        return (<nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="#">Auto-Learning-Agreement</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse row" id="navbarSupportedContent">
                <div className="col-2 offset-10">
                    <ul className="navbar-nav mr-auto">
                        {(data == null) ? null :
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{isAdmin ? <span><i className="fa fa-user"></i> Admin </span> : <span><i className="fa fa-user"></i> {data.firstName}</span>}</a>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <a className="dropdown-item" href="#" onClick={this.logOut}>Sign out</a>
                                </div>
                            </li>}
                    </ul>
                </div>
            </div>
        </nav>)

    }
}

export default HeaderComponent;