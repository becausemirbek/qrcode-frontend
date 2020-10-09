import React from 'react'
import { Alert } from 'reactstrap'

function SuccessAlert(props) {
  setTimeout(()=> {
    props.history.push('/')
  },3000)
  return (
    <div className="d-flex align-items-center" style={{height: '100vh'}}>
      <Alert color="success w-100 text-center">
        Ответ записан, Спасибо!
      </Alert>
    </div>
  )
}

export default SuccessAlert
