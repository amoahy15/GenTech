import React from 'react'
import UpdatePassword from '../API/UpdatePassword'
import UpdateUsername from '../API/UpdateUserName'

const AdvancedSettings = () => {
  return (
    <div>
        <UpdatePassword/>
        <UpdateUsername/>
    </div>
  )
}

export default AdvancedSettings
