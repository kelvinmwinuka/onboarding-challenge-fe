import { API_ENDPOINT } from '../constants'

export const listAllProjects = async () => {
  const response = await fetch(`${API_ENDPOINT}/api/v1/projects`)
  if (!response.ok) return []
  return (await response.json())
}

export const listMyProjects = async profile_id => {
  const response = await fetch(`${API_ENDPOINT}/api/v1/projects/profile-id/${profile_id}`)
  if (!response.ok) return []
  return (await response.json())
}

export const getProject = async id => {
  const response = await fetch(`${API_ENDPOINT}/api/v1/projects/${id}`)
  if (!response.ok) return {}
  return (await response.json())
}

export const createProject = async ({params, company, manager}) => {
  const response = await fetch(
    `${API_ENDPOINT}/api/v1/projects`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        data: {
          id: params.id,
          type: "projects",
          attributes: {
            id: params.id,
            title: params.title,
            description: params.description,
            sop_url: params.sop_url,
            working_url: params.working_url,
            status: params.status,
            priority: params.priority,
            start_date: params.start_date,
            end_date: params.end_date,
          },
          relationships: {
            company: {
              data: {
                id: company.id,
                type: company.custom_type
              }
            },
            'project-manager': {
              data: {
                id: manager.id,
                type: manager.custom_type
              }
            }
          }
        }
      })
    }
  )
  return response
}

export const updateProject = async ({id, params, company, manager}) => {
  console.log(params)
  const response = await fetch(
    `${API_ENDPOINT}/api/v1/projects/${id}`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        data: {
          attributes: {
            title: params.title,
            description: params.description,
            sop_url: params.sop_url,
            working_url: params.working_url,
            status: params.status,
            priority: params.priority,
            start_date: params.start_date,
            end_date: params.end_date,
          },
          relationships: {
            company: {
              data: {
                id: company.id,
                type: company.custom_type
              }
            },
            "project-manager": {
              data: {
                id: manager.id,
                type: manager.custom_type
              }
            }
          }
        }
      })
    }
  )
  return response
}

export const convertProject = async ({id, params, company, manager}) => {
  const response = await fetch(
    `${API_ENDPOINT}/api/v1/projects/${id}/convert`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        data: {
          attributes: {
            'converted-id': params.id,
          },
          relationships: {
            company: {
              data: {
                id: company.id,
                type: company.custom_type
              }
            },
            "project-manager": {
              data: {
                id: manager.id,
                type: manager.custom_type
              }
            }
          }
        }
      })
    }
  )
  return response
}

export const deleteProject = async id => {
  const response = await fetch(`${API_ENDPOINT}/api/v1/projects/${id}`,{
    method: 'DELETE'
  })
  return response
}