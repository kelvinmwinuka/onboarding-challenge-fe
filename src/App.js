
import React, { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom'
import { useCookies } from 'react-cookie'
import { listAllCompanies } from './request-helpers/companies'
import { listAllProjects } from './request-helpers/projects'
import './App.css'

import Wrapper from './AppWrapper'
import Navigation from './Nav'
import Login from './Login'
import Profile from './Profile'
import Projects from './Projects'
import CreateCompany from './CreateCompany'
import CreateProject from './CreateProject'
import Project from './Project'
import UpdateProjectAttributes from './UpdateProjectAttributes'
import UpdateId from './UpdateId'

const App = () => {

  const [manager, setManager] = useState({})
  const [companies, setCompanies] = useState([])
  const [projects, setProjects] = useState([])
  const [cookies, setCookie, removeCookie] = useCookies(["user"])

  const logout = () => {
    setManager({})
    removeCookie("user", { path: "/" })
  }

  useEffect(() => {
    let fetchData = async () => {
      setCompanies(await listAllCompanies())
      setProjects(await listAllProjects())
    }
    fetchData()
  }, [])

  return (
    <div className="App">
      <Router>
        <Wrapper
          manager={manager}
          setManager={setManager}
          cookies={cookies}
        >
          <Navigation
            manager={manager}
            logout={logout}
          />
          <div className="content">
            <Switch>
              <Route path="/login">
                <Login
                  manager={manager}
                  setManager={setManager}
                  cookies={cookies}
                  setCookie={setCookie}
                />
              </Route>
              <Route path={"/profile"}>
                <Profile 
                  cookies={cookies}
                />
              </Route>
              <Route path={"/projects"}>
                <Projects
                  cookies={cookies}
                  projects={projects}
                  setProjects={setProjects}
                />
              </Route>
              <Route path={"/project/:id"}>
                <Project />
              </Route>
              <Route path={"/create-company"}>
                <CreateCompany />
              </Route>
              <Route path={"/create-project"}>
                <CreateProject
                  cookies={cookies}
                  companies={companies}
                />
              </Route>
              <Route path={"/update-attributes/:id"}>
                <UpdateProjectAttributes
                  cookies={cookies}
                  companies={companies}
                />
              </Route>
              <Route path={"/update-id/:id"}>
                <UpdateId
                  cookies={cookies}
                  companies={companies}
                />
              </Route>
            </Switch>
          </div>
        </Wrapper>
      </Router>
    </div>
  );
}

export default App;
