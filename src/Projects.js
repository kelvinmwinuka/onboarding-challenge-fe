import React, { useState, useEffect } from 'react'
import {
  Alert,
  Button,
  Card,
  ButtonGroup,
  ToggleButton
} from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import { listAllProjects, listMyProjects } from './request-helpers/projects'

const Projects = ({
  cookies,
  projects,
  setProjects
}) => {
  
  let history = useHistory()

  const [mode, setMode] = useState("all")

  useEffect(() => {
    const updateMode = async () => {
      if (mode === "all") {
        setProjects(await listAllProjects())
      } else if (mode === "mine") {
        setProjects(await listMyProjects(cookies.user.id))
      }
    }
    updateMode()
  }, [mode])

  const onToggleMode = event => {
    setMode(event.target.value)
  }

  return (
    <div>
      <ButtonGroup style={{"marginBottom": "10px"}} toggle>
        <ToggleButton 
          type={"radio"}
          name={"mode"}
          value={"all"}
          onChange={onToggleMode}>
          All Projects
        </ToggleButton>
        <ToggleButton 
          type={"radio"}
          name={"mode"}
          value={"mine"}
          onChange={onToggleMode}>
          My Projects
        </ToggleButton>
      </ButtonGroup>
      {
        projects.length <= 0 &&
        <Alert variant="warning">
          <p>There are currently no projects</p>
          <Button variant={"success"} onClick={() => {
            history.push("/create-project")
          }}>Create a project</Button>
        </Alert>
      }
      {projects.map((project, index) => (
        <div key={index}>
        <Card style={{"padding": "10px", "marginBottom": "5px"}}>
          <Card.Body>
            <Card.Title>
              {project.data.id} : {project.data.attributes.title}
            </Card.Title>
            <Card.Text>
              {project.data.attributes.description}
            </Card.Text>
          </Card.Body>
          <Button style={{"width": "10%"}} onClick={() => {
            history.push(`/project/${project.data.id}`)
          }}>View</Button>
        </Card>
        </div>
      ))}
    </div>
  )
}

export default Projects