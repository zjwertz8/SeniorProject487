import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import Header from './components/header';
import Card from './components/card';
import Button from './components/button';
import LoginForm from './components/loginForm';

class App extends Component {
  componentWillMount() {
    firebase.initializeApp({
    apiKey: 'AIzaSyDn3aQFUCfuI5NvbHX4qCq01G-4XEVm9YU',
    authDomain: 'seniorprojectfirebase.firebaseapp.com',
    databaseURL: 'https://seniorprojectfirebase.firebaseio.com',
    projectId: 'seniorprojectfirebase',
    storageBucket: 'seniorprojectfirebase.appspot.com',
    messagingSenderId: '513438490490'
  });
  }

	render() {
		return (
			<View>
<Header headerText="Login" />
<LoginForm />
</View>

			);
	}
}

export default App;
