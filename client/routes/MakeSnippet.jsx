import React, {useState, useEffect} from 'react';
import Navbar from '../components/Navbar.jsx'
import Highlight from 'react-highlight'
import Editor from 'react-simple-code-editor';
import {Controlled as CodeMirror} from 'react-codemirror2'
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/xml/xml';
import 'codemirror/mode/javascript/javascript';
import axios from 'axios'
import history from '../history.jsx'




const MakeSnippet = (props) => {
  const [codeValue, setCodeValue] = useState("")
  const [tech, setTech] = useState("")
  const [description, setDescription] = useState("");
  const [snippetNames, setSnippetNames] = useState([]);
  const [typeOfSnippet, setTypeOfSnippet] = useState("update");
  const [whichToUpdate, setWhichToUpdate] = useState("");

  useEffect(() => {
    if(props.snippets.length) {
      props.snippets.forEach(ele => {
        console.log(ele.tech)
        setSnippetNames(prevState => [...prevState, ele.tech])
      })
      setWhichToUpdate(props.snippets[0].tech)
    }

  }, [])

  const handleTypeOfSnippet = (e) => {
    setTypeOfSnippet(e.target.value)
  }
  const handleWhichToUpdate = (e) => {
    setWhichToUpdate(e.target.value)
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    if(typeOfSnippet === "new"){
      let snipplates = [{codeValue, description}]
      let snippets = [{tech, snipplates}]
      axios.post('/api/snippet', {
        snippets
      }).then(res => {
        if(res.status === 200){
         props.getUserData()
        }
      }).then(() =>  history.push('/'))
    }

    if(typeOfSnippet === "update"){
      let snipplates = [{codeValue, description}]
      let snippets = [{tech, snipplates}]
      console.log(snippets)
      axios.put('/api/snippet', {
        snippets, whichToUpdate
      }).then(res => {
        if(res.status === 200){
          props.getUserData()
          history.push('/')
        }
      })


    }

  }

  return (
  <>
    <Navbar handleLogout={props.handleLogout} authed={props.authed} />
    <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}}>
    <h1>Create a Snipplate</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <label>Update a Snipplate or Add New?</label>
        <select onChange={handleTypeOfSnippet}>
          <option value="update" name="update" selected>Update</option>
          <option value="new" name="new">New</option>
        </select>
{ typeOfSnippet === "new" ?
      <div>
       <label for="tech">Language of snippet: </label>
       <input value={tech} onChange={(e) => setTech(e.target.value)} name="tech" type="text"/>
      </div>
    :
      <div>
        <label>Select Which you want to update: </label>
        <select onChange={handleWhichToUpdate}>
          {snippetNames.map(ele =>
            <option value={ele}>{ele}</option>
          )}
        </select>
      </div>
}

        <label>Code Here:</label>
        <CodeMirror
            value={codeValue}
            options={{
              mode: 'javascript',
              lineNumbers: true,
              theme: "material"
            }}
            onBeforeChange={(editor, data, value) => {
              setCodeValue({value});
            }}
            onChange={(editor, data, value) => {
              setCodeValue(value)
            }}
          />
          <label for="description">Brief Description</label>
          <input value={description} onChange={(e) => setDescription(e.target.value)} name="description" type="text"/>
          <input style={styles.button} type="submit"></input>
      </form>
    </div>
  </>
  )
};
const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '25%',
    minWidth: '400px'
  },
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
}


export default MakeSnippet;