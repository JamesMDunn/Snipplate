import React, {useEffect } from 'react';

import Navbar from '../components/Navbar.jsx'
import history from '../history.jsx'
import { TechHeader } from './styles.js'

const Dashboard = (props) => {
 const handleSnippet = () => {
  history.push('/snippet')
 }
 useEffect(() => {

 }, [])

 const handleTechClick = (e) => {
  let chosenSnippet = e.target.getAttribute("data-id");
  props.getCurrentSnippet(chosenSnippet)
  history.push(`/snippet/${chosenSnippet}`)
 }

  return (
  <>
    <Navbar handleLogout={props.handleLogout} authed={props.authed} />
      <div style={{display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
      <h1>Dashboard</h1>
      <div style={styles.techDiv}>
      {props.snippets.map( (ele, index) =>
        <TechHeader onClick={handleTechClick} data-id={index} key={index}>{ele.tech}</TechHeader>
      )}
      </div>
      <div style={{display: 'flex', justifyContent:'center'}}>
      <button onClick={handleSnippet} style={styles.button}>Add Snippet</button>
      </div>
    </div>

  </>
  )
};

const styles = {
  button: {
    backgroundColor: '#4CAF50',
    border: 'none',
    color: 'white',
    padding: '15px 32px',
    textAlign: 'center',
    textDecoration: 'none',
    display: 'inlineBlock',
    fontSize: '14px',
    marginTop: '10px',
    borderRadius: '20px'
  },
  techDiv: {
    display: 'flex',
    justifyContent: 'space-evenly',
    width: '80%',
    flexWrap: 'wrap'
  }
}

export default Dashboard