import React, { useState } from 'react'
import {
  Alert,
  Form,
  Button
} from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import { login } from './request-helpers/managers'

const Login = ({
  manager,
  setManager,
  setCookie,
  cookies
}) => {

  const [errors, setErrors] = useState([])

  let history = useHistory()

  if (cookies.user) history.push("/profile")

  const handleSubmit = async event => {
    event.preventDefault()
    setErrors([])
    
    const data = new FormData(event.target)
    
    const name = data.get("name") || null
    const email = data.get("email") || null

    const response = await login({ name, email })
    
    if (response.ok) {
      const data = (await response.json()).data
      setManager(data)
      setCookie('user', data, { path: '/' })
      return
    }
    if (response.status === 422) {
      const responseErrors = (await response.json()).errors
      setErrors(responseErrors.map(error => error.details ))
    } else {
      setErrors([
        "There was a problem with the request. Please try again later."
      ])
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      {errors.map( (error, index) => (
        <Alert key={index} variant={"danger"}> {error} </Alert>
      ))}
      <Form.Group>
        <Form.Label>Name</Form.Label>
        <Form.Control name="name" type="text" placeholder="Enter name"></Form.Control>
      </Form.Group>
      <Form.Group>
        <Form.Label>Email</Form.Label>
        <Form.Control name="email" type="email" placeholder="Enter email"></Form.Control>
      </Form.Group>
      <Button variant="primary" type="submit">
        Login
      </Button>
    </Form>
  )
}

export default Login