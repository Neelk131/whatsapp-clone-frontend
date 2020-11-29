import React, { useState } from 'react';
import './App.css';
import Sidebar from './Components/Sidebar';
import Chat from './Components/Chat'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";


function App() {

  const [userId, setUserId] = useState(9999999991)
  const [chatData, setChatData] = useState([])

  return (
    <div className="app">


      <div className="app_body">

        <Router>
          <Switch>
          
            <Route path="/app">
            <Sidebar setChatData={setChatData} />
              <Chat chatData={chatData} setChatData={setChatData} userId={userId} />

            </Route>
            <Route path="/">
            {/* <Chat chatData={chatData} setChatData={setChatData} userId={userId} /> */}

            </Route>

          </Switch>
        </Router>
      </div>

    </div>
  );
}

export default App;
