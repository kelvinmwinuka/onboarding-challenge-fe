import { useHistory } from 'react-router-dom'

const Wrapper = props => {
  
  let history = useHistory()

  if (!props.cookies.user) history.push("/login")

  return (
    <div>{ props.children }</div>
  )
}

export default Wrapper