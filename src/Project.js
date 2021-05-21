import React, { useState, useEffect } from 'react'
import {
  Alert,
  Button,
  Table,
  Modal
} from 'react-bootstrap'
import {
  useHistory,
  useParams
} from 'react-router-dom'
import { getProject, deleteProject } from './request-helpers/projects'

const Project = () => {

  let history = useHistory()
  let { id } = useParams()

  const [project, setProject] = useState({})
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  useEffect(() => {
    const retrieveProject = async () => {
      setProject(await getProject(id))
    }
    retrieveProject()
  }, [])

  const handleCloseDeleteModal = () => setShowDeleteModal(false)
  const handleShowDeleteModal = () => setShowDeleteModal(true)

  return (
    <div>
      <Modal
        show={showDeleteModal}
        onHide={() => handleCloseDeleteModal()}  
      >
      <Modal.Body>Are you sure you want to delete this project?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDeleteModal}>
            Close
          </Button>
          <Button variant="danger" onClick={() => {
            deleteProject(project.data.id)
            handleCloseDeleteModal()
            history.push("/projects")
          }}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      {
        Object.keys(project).length <= 0 &&
        <Alert variant={"danger"}>Project does not exist</Alert>
      }
      {
        Object.keys(project).length > 0 &&
        <div>
          <Table triped bordered hover size="sm">
            <tr>
              <th style={{"width": "10%"}}>Id</th>
              <td>{project.data.id}</td>
            </tr>
            <tr>
              <th>Title</th>
              <td>{project.data.attributes.title}</td>
            </tr>
            <tr>
              <th>Description</th>
              <td>{project.data.attributes.description}</td>
            </tr>
            <tr>
              <th>SOP URL</th>
              <td>{project.data.attributes.sop_url}</td>
            </tr>
            <tr>
              <th>Working URL</th>
              <td>{project.data.attributes.working_url}</td>
            </tr>
            <tr>
              <th>Status</th>
              <td>{project.data.attributes.status}</td>
            </tr>
            <tr>
              <th>Priority</th>
              <td>{project.data.attributes.priority}</td>
            </tr>
            <tr>
              <th>Start date</th>
              <td>{project.data.attributes.start_date}</td>
            </tr>
            <tr>
              <th>End date</th>
              <td>{project.data.attributes.end_date}</td>
            </tr>
          </Table>
          <div>
            <Button variant={"primary"} onClick={() => {
              history.push(`/update-attributes/${id}`)
            }}>Update Attributes</Button>{' '}
            <Button variant={"success"} onClick={() => {
              history.push(`/update-id/${id}`)
            }}>Update Id</Button>{' '}
            <Button variant={"danger"} onClick={() => {
              handleShowDeleteModal()
            }}>Delete</Button>{' '}
          </div>
        </div>
      }
    </div>
  )
}

export default Project