import React, {FC} from 'react';
import './App.css';
import {Tabs} from 'antd';
import B2Page from './pages/B2Page';

const App: FC = () => (
  <div className="App">
    <Tabs defaultActiveKey="1">
      <Tabs.TabPane tab="OTOT-B2.2" key="1">
        <B2Page/>
      </Tabs.TabPane>
      <Tabs.TabPane tab="OTOT-B4" key="2">
        Content of Tab Pane 2
      </Tabs.TabPane>
    </Tabs>
  </div>
);

export default App;
