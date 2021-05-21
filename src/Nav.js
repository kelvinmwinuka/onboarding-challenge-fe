
import React from 'react'
import { Navbar, Nav, Form, Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import { useCookies } from 'react-cookie'

const Navigation = ({
  manager,
  logout
}) => {

  const [cookies, setCookie] = useCookies(["user"])

  let history = useHistory()

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/profile">React-Bootstrap</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/projects">Projects</Nav.Link>
        </Nav>
        <Form inline>
          {
            cookies.user &&
            <div>
              <Button variant={"outline-primary"} onClick={() => {
                history.push("/create-company")
              }}>
                Create company
              </Button>{' '}
              <Button variant={"outline-success"} onClick={() => {
                history.push("/create-project")
              }}>
                Create project
              </Button>{' '}
              <Button variant={"outline-danger"} onClick={() => {
                logout()
                history.push("/login")
              }}>Logout</Button>
            </div>
          }
        </Form>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Navigation