import React from 'react'
import { Navigate, Route } from 'react-router-dom'

const PrivateRoute = ({ component: Component, ...rest }) => {

  // Add your own authentication on the below line.
  const user = sessionStorage.getItem('user');

  return (
    <Route
      {...rest}
      render={props =>
        {return user ? (
          <Component {...props} />
        ) : (
          <Navigate to={{ pathname: '/login', state: { from: props.location } }} />
        )
        }
      }
    />
  )
}

export default PrivateRoute