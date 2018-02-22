import React, { Component } from 'react';
import { View } from 'react-native';
import { Header } from './components/common';
import firebase from 'firebase';
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
