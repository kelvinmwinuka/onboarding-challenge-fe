import { API_ENDPOINT } from '../constants'

export const listAllCompanies = async () => {
  const response = await fetch(`${API_ENDPOINT}/api/v1/companies`)
  if (!response.ok) return []
  return (await response.json()).data
}

export const createCompany = async params => {
  const response = await fetch(
    `${API_ENDPOINT}/api/v1/companies`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        data: {
          attributes: {
            name: params.name, 
            description: params.description 
          }
        }
      })
    }
  )
  return response
}