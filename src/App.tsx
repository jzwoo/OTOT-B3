import React, {FC} from 'react';
import './App.css';
import {Tabs} from 'antd';
import B2Page from './pages/B2Page';
import B4Page from './pages/B4Page';

const App: FC = () => (
  <div className="App">
    <Tabs defaultActiveKey="1">
      <Tabs.TabPane tab="OTOT-B2.2" key="1">
        <B2Page/>
      </Tabs.TabPane>
      <Tabs.TabPane tab="OTOT-B4" key="2">
        <B4Page />
      </Tabs.TabPane>
    </Tabs>
  </div>
);

export default App;
