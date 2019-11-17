import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";


const DecisionRoute = ({component: Component, authed, handleLogout, snippets, getCurrentSnippet, currentSnippet, ...rest}) => {

  return (
<Route
      {...rest}
      render={(props) => authed === true
        ? <Component snippets={snippets}  getCurrentSnippet={getCurrentSnippet} currentSnippet={currentSnippet} handleLogout={handleLogout} authed={authed} {...props}/>
        : <Redirect to='/' />}
    />
  )
}

export default DecisionRoute
