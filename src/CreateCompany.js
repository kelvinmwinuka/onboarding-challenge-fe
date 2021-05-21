import React, { useState } from 'react'
import { 
  Alert,
  Form,
  Button
} from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import { createCompany } from './request-helpers/companies'

const CreateCompany = () => {

  const [errors, setErrors] = useState([])

  let history = useHistory()

  const handleSubmit = async event => {
    event.preventDefault()

    const data = new FormData(event.target)
    
    const name = data.get("name") || null
    const description = data.get("description") || null

    const response = await createCompany({name, description})

    if (response.ok) history.push("/projects")

    if (response.status === 422) {
      const responseErrors = (await response.json()).errors
      setErrors(responseErrors.map(error => error.details))
    } else {
      setErrors(["There was a problem with the request, please try again later."])
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      {errors.map( (error, index) => (
        <Alert key={index} variant={"danger"}> {error} </Alert>
      ))}
      <Form.Group>
        <Form.Label>Company Name</Form.Label>
        <Form.Control 
          name="name" 
          type="text" 
          placeholder="Enter company name">  
        </Form.Control>
      </Form.Group>
      <Form.Group>
        <Form.Label>Description</Form.Label>
        <Form.Control 
          name="description" 
          type="description" 
          placeholder="Enter company description">
        </Form.Control>
      </Form.Group>
      <Button variant="primary" type="submit">
        Create
      </Button>
    </Form>
  )
}

export default CreateCompany