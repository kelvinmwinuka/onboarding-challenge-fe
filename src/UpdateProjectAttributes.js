import React, { useState, useEffect } from 'react'
import {
  Alert,
  Form,
  Button
} from 'react-bootstrap'
import {
  useHistory,
  useParams
} from 'react-router-dom'
import { getProject, updateProject } from './request-helpers/projects'

const UpdateProjectAttributes = ({
  cookies,
  companies
}) => {

  let history = useHistory()
  let { id } = useParams()

  const [project, setProject] = useState({})
  const [errors, setErrors] = useState([])

  useEffect(() => {
    const retrieveProject = async () => {
      setProject(await getProject(id))
    }
    retrieveProject()
  }, [])

  const handleSubmit = async event => {
    event.preventDefault()

    const data = new FormData(event.target)
    const company = companies.filter(company => (
      company.id === project.data.relationships.company.data.id
    ))[0]
    
    const response = await updateProject({
      id: project.data.id,
      params: {
        title: data.get("title") || null,
        description: data.get("description") || null,
        sop_url: data.get("sop_url") || null,
        working_url: data.get("working_url") || null,
        status: data.get("status") || null,
        priority: data.get("priority") || null,
        start_date: data.get("start_date") || null,
        end_date: data.get("end_date") || null,
      },
      company: company,
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
    <div>
      {
        Object.keys(project).length <= 0 &&
        <Alert variant={"danger"}>Project not found</Alert>
      }
      {
        Object.keys(project).length > 0 &&
        <Form onSubmit={handleSubmit}>
          {errors.map((error, index) => (<Alert key={index} variant={"danger"}>{error}</Alert>))}
          <Form.Group>
            <Form.Label>Title</Form.Label>
            <Form.Control
              name="title"
              type="text"
              placeholder="Title"
              defaultValue={project.data.attributes.title}>
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control
              name="description"
              type="text"
              placeholder="Description"
              defaultValue={project.data.attributes.description}>
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>SOP URL</Form.Label>
            <Form.Control
              name="sop_url"
              type="text"
              placeholder="SOP URL"
              defaultValue={project.data.attributes.sop_url}>
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Working URL</Form.Label>
            <Form.Control
              name="working_url"
              type="text"
              placeholder="Working URL"
              defaultValue={project.data.attributes.working_url}>
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Status</Form.Label>
            <Form.Control name="status" as="select">
              {['New', 'In Progess', 'On Hold', 'Cancelled'].map((status, index) => (
                <option
                  key={index}
                  value={status}
                  selected={() => {
                    return status === project.data.attributes.status
                  }}>
                  {status}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Priority</Form.Label>
            <Form.Control name="priority" as="select">
              {['High', 'Medium', 'Low'].map((priority, index) => (
                <option
                  key={index}
                  value={priority}
                  selected={() => {
                    return priority === project.data.attributes.priority
                  }}>
                  {priority}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Start Date</Form.Label>
            <Form.Control
              name="start_date"
              type="date"
              defaultValue={project.data.attributes.start_date}>
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>End Date</Form.Label>
            <Form.Control
              name="end_date"
              type="date"
              defaultValue={project.data.attributes.end_date}>
            </Form.Control>
          </Form.Group>
          <Button variant={"primary"} type={"submit"}>Update</Button>
        </Form>
      }
    </div>
  )
}

export default UpdateProjectAttributes