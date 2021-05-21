import React, { useState } from 'react'
import {
  Alert,
  Form,
  Button
} from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import { createProject } from './request-helpers/projects'

const CreateProject = ({
  cookies,
  companies
}) => {
  
  let history = useHistory()

  const [errors, setErrors] = useState([])
  const [selectedCompany, setSelectedCompany] = useState({})

  const onSelectCompany = event => {
    setSelectedCompany(companies.filter(company => (
      company.id === event.target.value
    ))[0])
  }

  const handleSubmit = async event => {
    event.preventDefault()
    var data = new FormData(event.target)

    const response = await createProject({
      params: {
        id: data.get("id") || null,
        title: data.get("title") || null,
        description: data.get("description") || null,
        sop_url: data.get("sop_url") || null,
        working_url: data.get("working_url") || null,
        status: data.get("status") || null,
        priority: data.get("priority") || null,
        start_date: data.get("start_date") || null,
        end_date: data.get("end_date") || null,
      },
      company: selectedCompany,
      manager: cookies.user
    })

    const responseJson = await response.json()

    if (response.ok) {
      history.push(`/project/${responseJson.data.id}`)
    }

    if (response.status === 422) {
      const responseErrors = responseJson.errors
      setErrors(responseErrors.map(error => (error.details)))
    } else {
      setErrors(["There was an error with the request. Please try again later."])
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      { errors.map((error, index) => (<Alert key={index} variant={"danger"}>{error}</Alert>))}
      <Form.Group>
        <Form.Label>Company</Form.Label>
        <Form.Control name="company" as="select" onChange={onSelectCompany}>
          {companies.map((company, index) => (
            <option
              key={index}
              value={company.id}
              selected={index <= 0}>
              {company.name}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
      <Form.Group>
        <Form.Label>ID</Form.Label>
        <Form.Control name="id" type="text" placeholder="ID"></Form.Control>
      </Form.Group>
      <Form.Group>
        <Form.Label>Title</Form.Label>
        <Form.Control name="title" type="text" placeholder="Title"></Form.Control>
      </Form.Group>
      <Form.Group>
        <Form.Label>Description</Form.Label>
        <Form.Control name="description" type="text" placeholder="Description"></Form.Control>
      </Form.Group>
      <Form.Group>
        <Form.Label>SOP URL</Form.Label>
        <Form.Control name="sop_url" type="text" placeholder="SOP URL"></Form.Control>
      </Form.Group>
      <Form.Group>
        <Form.Label>Working URL</Form.Label>
        <Form.Control name="working_url" type="text" placeholder="Working URL"></Form.Control>
      </Form.Group>
      <Form.Group>
        <Form.Label>Status</Form.Label>
        <Form.Control name="status" as="select" defaultValue={"New"}>
          {['New', 'In Progess', 'On Hold', 'Cancelled'].map((status, index) => (
            <option
              key={index}
              value={status}>
              {status}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
      <Form.Group>
        <Form.Label>Priority</Form.Label>
        <Form.Control name="priority" as="select" defaultValue={"High"}>
          {['High', 'Medium', 'Low'].map((priority, index) => (
            <option 
              key={index} 
              value={priority}>
              {priority}
            </option>
          ))}
          
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </Form.Control>
      </Form.Group>
      <Form.Group>
        <Form.Label>Start Date</Form.Label>
        <Form.Control name="start_date" type="date"></Form.Control>
      </Form.Group>
      <Form.Group>
        <Form.Label>End Date</Form.Label>
        <Form.Control name="end_date" type="date"></Form.Control>
      </Form.Group>
      <Button variant={"primary"} type={"submit"}>Submit</Button>
    </Form>
  )
}

export default CreateProject