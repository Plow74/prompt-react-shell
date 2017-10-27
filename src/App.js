import React, {Component} from 'react';
import TaskContainer from './components/TaskContainer';
import {Nav, NavItem} from 'react-bootstrap'
import 'react-tabs/style/react-tabs.css';
import './App.css';

class AsyncApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeKey: 1
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(selectedKey, event) {
        this.setState({activeKey: selectedKey});
    }

    render(){
        return(
            <div className="container-fluid">
                <Nav bsStyle="tabs" className="banner" activeKey={this.state.activeKey} onSelect={this.handleChange}>
                    <NavItem eventKey={1}>CENSUS</NavItem>
                    <NavItem eventKey={2}>PATIENT</NavItem>
                    <NavItem eventKey={3}>TASK</NavItem>
                </Nav>
                <div className="col-lg-3">
                    {this.state.activeKey === 3 ? <TaskContainer /> : null}

                </div>
                <div className="col-lg-9">
                    <div className="jumbotron">
                        More awesome stuff goes here!
                    </div>
                </div>
            </div>
        )
    }
}

export default AsyncApp