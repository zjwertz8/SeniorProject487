import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import Header from './components/header';
import Card from './components/card';
import Button from './components/button';

class App extends Component {
  componentWillMount() {
    firebase.initalizeApp({
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
			<Card>
<Header headerText="Loginn" />
<Button />
</Card>

			);
	}
}

export default App;
