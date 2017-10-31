import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import 'react-tabs/style/react-tabs.css';
import './TaskContainer.css'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import TaskGroup from '../TaskGroup';
import { fetchTasksIfNeeded, invalidateTab, selectTab } from "../../actions/index";
import StatusIndicator from "../StatusIndicator/StatusIndicator";
import ItemCounter from "../ItemCounter";
import FontAwesome from 'react-fontawesome';

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
        dispatch(fetchTasksIfNeeded(selectedTabIndex))
    }
    render() {
        const { selectedTabIndex, isFetching, lastUpdated, tasks, taskCount } = this.props;
        return (
            <div className="container-fluid">
                {isFetching && tasks.length === 0 && <h2>Loading...</h2>}
                {!isFetching && tasks.length === 0 && <h2>Empty.</h2>}
                {!isFetching && tasks.length > 0 &&
                    <div>
                        <div className="row pull-right">
                            <div className="col-sm-12">
                                <a href="#" title="refresh list" onClick={this.handleRefreshClick}><FontAwesome name="refresh" size='2x'/></a>
                            </div>
                        </div>
                        <Tabs selectedIndex={selectedTabIndex} onSelect={this.handleChange}>
                            <TabList>
                                <Tab>
                                    <div className="tab_stripe all_tab" />
                                    <div>
                                        <ItemCounter counterName="All" count={tasks.length} />
                                </div>
                                </Tab>
                                <Tab>
                                    <div className="tab_stripe notstarted_tab" />
                                    <div>
                                        <ItemCounter counterName="Not Started" count={tasks.filter(task => task.status === 0).length} /> <StatusIndicator status={0} />
                                    </div>
                                </Tab>
                                <Tab>
                                    <div className="tab_stripe inprogress_tab" />
                                    <div>
                                        <ItemCounter counterName="In Progress" count={tasks.filter(task => task.status === 1).length} /> <StatusIndicator status={1} />
                                    </div>
                                </Tab>
                                <Tab>
                                    <div className="tab_stripe completed_tab" />
                                    <div>
                                        <ItemCounter counterName="Completed" count={tasks.filter(task => task.status === 2).length} /> <StatusIndicator status={2} />
                                    </div>
                                </Tab>
                            </TabList>
                            <div className="scrollable">
                                <TabPanel>
                                    <TaskGroup tasks={tasks} />
                                </TabPanel>
                                <TabPanel>
                                    <TaskGroup tasks={tasks.filter(task => task.status === 0)} />
                                </TabPanel>
                                <TabPanel>
                                    <TaskGroup tasks={tasks.filter(task => task.status === 1)} />
                                </TabPanel>
                                <TabPanel>
                                    <TaskGroup tasks={tasks.filter(task => task.status === 2)} />
                                </TabPanel>
                            </div>
                        </Tabs>
                    </div>}

            </div>
        )
    }
}

TaskContainer.propTypes = {
    selectedTabIndex: PropTypes.number.isRequired,
    taskCount: PropTypes.number.isRequired,
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
        items: tasks,
        taskCount: taskCount,
    } = tasksForTab[selectedTabIndex] || {
            isFetching: true,
            items: [],
            selectedTabIndex: 0,
            count: 0
        };

    return {
        selectedTabIndex,
        tasks,
        isFetching,
        lastUpdated,
        taskCount
    }
}

export default connect(mapStateToProps)(TaskContainer)
