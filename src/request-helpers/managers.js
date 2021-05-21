import { API_ENDPOINT } from '../constants'

export const login  = async params => {
  const response = await fetch(
    `${API_ENDPOINT}/api/v1/manager/login`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        data: {
          attributes: {
            name: params.name, 
            email: params.email 
          }
        }
      })
    }
  )
  return response
}