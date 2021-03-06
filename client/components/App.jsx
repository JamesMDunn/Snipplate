import React from 'react';
import {
  Switch,
  Route,
  Link,
  Redirect,
  useHistory
} from "react-router-dom";
import axios from 'axios'
import DecisionRoute from './DecisionRoute.jsx'
import Signup from '../routes/Signup.jsx'
import Dashboard from '../routes/Dashboard.jsx'
import Login from '../routes/Login.jsx'
import MakeSnippet from '../routes/MakeSnippet.jsx'
import SnippetView from '../routes/SnippetView.jsx'
import history from '../history.jsx';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authed: false,
      username: null,
      snippets: [],
      currentSnippet: null
    }
    this.handleAuth = this.handleAuth.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
    this.getCurrentSnippet = this.getCurrentSnippet.bind(this)
    this.getUser = this.getUser.bind(this)
    this.getUserData = this.getUserData.bind(this)
  }


  componentDidMount(){
    this.getUser();

  }

  getUser(){
    axios.get('/api/')
    .then(res => {
      console.log(res)
      console.log('testing res.data', res.data.user)
      if(res.data.user){
        this.setState({
          authed: true
        }, )
      }
    }).then(() => this.getUserData())
  }

  getUserData(){
    axios.get('/api/user')
    .then(res => {
      this.setState({snippets: res.data.snippets})
    })
  }


  handleAuth(){
    this.setState({
      authed: !this.state.authed
    })
  }

  handleLogout(){
      fetch('/api/logout',
      {
        method: 'post'
      }).then(res => {
        return this.setState({authed: false})
      }).then(res => {
        history.push("/login")

      })

  }


  getCurrentSnippet(id) {
    this.setState({
      currentSnippet: this.state.snippets[id]
    })
  }



  render(){
    return(

        <Switch>
           {this.state.authed === false ? <Redirect exact from='/' to='/login' /> : <Redirect exact from='/login' to='/' />}
          <Route
          exact path='/signup'
          render={(props) => (<Signup {...props } handleAuth={this.handleAuth} authed={this.state.authed} /> )}
          />
          <Route
          exact path='/login'
          render={(props) => (<Login {...props } getUser={this.getUser} handleAuth={this.handleAuth} authed={this.state.authed} /> )}
          />
          <DecisionRoute path='/' snippets={this.state.snippets} exact={true}
          authed={this.state.authed} getCurrentSnippet={this.getCurrentSnippet}
          currentSnippet={this.state.currentSnippet} handleLogout={this.handleLogout}  getUserData={this.getUserData} component={Dashboard}/>

          <DecisionRoute path='/snippet' getUserData={this.getUserData} snippets={this.state.snippets} exact={true}
          authed={this.state.authed} handleLogout={this.handleLogout} component={MakeSnippet}/>

          <DecisionRoute path='/snippet/:id' snippets={this.state.snippets}
          authed={this.state.authed} getUserData={this.getUserData} handleLogout={this.handleLogout} getCurrentSnippet={this.getCurrentSnippet} currentSnippet={this.state.currentSnippet} component={SnippetView}/>
        {this.state.authed === false ? <Redirect exact from='*' to='/login' /> : <Redirect exact from='/login' to='/' />}
        </Switch>
    )
  }
}

export default App;
