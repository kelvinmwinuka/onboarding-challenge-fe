import React, { useState, useEffect } from 'react'
import {
  Alert,
  Form,
  Button
} from 'react-bootstrap'
import { useHistory, useParams } from 'react-router-dom'
import { getProject, convertProject } from './request-helpers/projects'

const UpdateId = ({
  cookies,
  companies
}) => {

  let history = useHistory()
  const { id } = useParams()

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

    const response = await convertProject({
      id: project.data.id,
      params: {
        id: data.get("id") || null,
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
      console.log(responseErrors)
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
            <Form.Label>Old ID</Form.Label>
            <Form.Control
              name="id"
              type="text"
              value={project.data.id}
              disabled>
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>New ID</Form.Label>
            <Form.Control
              name="id"
              type="text"
              placeholder="ID">
            </Form.Control>
          </Form.Group>
          <Button variant={"primary"} type={"submit"}>Submit</Button>
        </Form>
      }
    </div>
  )
}

export default UpdateId