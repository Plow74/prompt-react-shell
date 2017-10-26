import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import TaskTab from './components/TaskTab';
import 'react-tabs/style/react-tabs.css';

const AsyncApp = () => (
    <div>
        <div className="row">
            <div className="col-lg-4">
                <Tabs>
                    <TabList>
                        <Tab>CENSUS</Tab>
                        <Tab>PATIENT</Tab>
                        <Tab>TASK</Tab>
                    </TabList>
                    <TabPanel>
                        <div>Move Along</div>
                    </TabPanel>
                    <TabPanel>
                        <div>Move Along</div>
                    </TabPanel>
                    <TabPanel>
                        <TaskTab />
                    </TabPanel>
                </Tabs>
            </div>
        </div>
    </div>
);

export default AsyncApp