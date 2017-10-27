import React, { Component }  from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import 'react-tabs/style/react-tabs.css';
import './TaskContainer.css'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import TaskGroup from '../TaskGroup';
import {fetchTasksIfNeeded, invalidateTab, selectTab} from "../../actions/index";
import StatusIndicator from "../StatusIndicator/StatusIndicator";

class TaskContainer extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleRefreshClick = this.handleRefreshClick.bind(this);
    }

    componentDidMount() {
        const { dispatch, selectedTabIndex } = this.props;
        dispatch(fetchTasksIfNeeded(selectedTabIndex))
    }

    componentDidUpdate(prevProps) {
        if (this.props.selectedTabIndex !== prevProps.selectedTab) {
            const { dispatch, selectedTabIndex } = this.props;
            dispatch(fetchTasksIfNeeded(selectedTabIndex))
        }
    }

    handleChange(selectedTabIndex) {
       //more logic can go here to handle tab changes if needed
    }

    handleRefreshClick(e) {
        e.preventDefault();
        const { dispatch, selectedTabIndex } = this.props;
        dispatch(invalidateTab(selectedTabIndex));
        dispatch(fetchTasksIfNeeded(selectedTabIndex))
    }
    render() {
        const { selectedTabIndex, isFetching, lastUpdated, tasks } = this.props;
        return (
            <div className="row">
                <div className="col-lg-12">
                    {isFetching && tasks.length === 0 && <h2>Loading...</h2>}
                    {!isFetching && tasks.length === 0 && <h2>Empty.</h2>}
                    <Tabs selectedIndex={selectedTabIndex} onSelect={this.handleChange}>
                        <TabList>
                            <Tab>
                                <div className="tab_stripe all_tab"/>
                                <div>
                                    All
                                </div>
                            </Tab>
                            <Tab>
                                <div className="tab_stripe notstarted_tab"/>
                                <div>
                                    Not Started <StatusIndicator status={0}/>
                                </div>
                            </Tab>
                            <Tab>
                                <div className="tab_stripe inprogress_tab"/>
                                <div>
                                    In Progress <StatusIndicator status={1}/>
                                </div>
                            </Tab>
                            <Tab>
                                <div className="tab_stripe completed_tab"/>
                                <div>
                                    Completed <StatusIndicator status={2}/>
                                </div>
                            </Tab>
                        </TabList>

                        <TabPanel>
                            <TaskGroup tasks={tasks}/>
                        </TabPanel>
                        <TabPanel>
                            <TaskGroup tasks={tasks.filter(task => task.status === 0)}/>
                        </TabPanel>
                        <TabPanel>
                            <TaskGroup tasks={tasks.filter(task => task.status === 1)}/>
                        </TabPanel>
                        <TabPanel>
                            <TaskGroup tasks={tasks.filter(task => task.status === 2)}/>
                        </TabPanel>
                    </Tabs>
                </div>
            </div>
        )
    }
}

TaskContainer.propTypes = {
    selectedTabIndex: PropTypes.number.isRequired,
    tasks: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    lastUpdated: PropTypes.number,
    dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    const { tasksForTab, selectedTabIndex } = state;
    const {
        isFetching,
        lastUpdated,
        items: tasks
    } = tasksForTab[selectedTabIndex] || {
        isFetching: true,
        items: [],
        selectedTabIndex: 0
    };

    return {
        selectedTabIndex,
        tasks,
        isFetching,
        lastUpdated
    }
}

export default connect(mapStateToProps)(TaskContainer)
