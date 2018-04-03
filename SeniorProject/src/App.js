import React, { Component } from 'react';
import { BackHandler } from 'react-native';
import { StackNavigator } from 'react-navigation';
import firebase from 'firebase';
import SignUpForm from './components/signUpForm';
import LoginForm from './components/loginForm';
import Home from './components/home';
import FamilyMembers from './components/familyMembers';
import AddFamilyMemberForm from './components/addFamilyMember';

const RootStack = StackNavigator(
{
  Login: { screen: LoginForm },
  Signup: { screen: SignUpForm },
  Home: { screen: Home },
  FamilyMembers: { screen: FamilyMembers },
  AddFamilyMember: { screen: AddFamilyMemberForm }, 
},
  { initialRouteName: 'Login' },
);

export default class App extends React.Component {

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

  componentDidMount() {
     BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }
  
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  handleBackButton() {
    return true;
  }
	render() {
    return <RootStack />;
	}
}
