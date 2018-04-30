import React, { Component } from 'react';
import { BackHandler } from 'react-native';
import { StackNavigator } from 'react-navigation';
import firebase from 'firebase';
import moment from 'moment';
import SignUpForm from './src/components/signUpForm';
import LoginForm from './src/components/loginForm';
import Home from './src/components/home';
import FamilyMembers from './src/components/familyMembers';
import AddFamilyMemberForm from './src/components/addFamilyMember';
import FamilyMemberPersonalPage from './src/components/familyMemberPersonalPage';
import AddMedicationForm from './src/components/addMedication';
import AddMedicationTwoForm from './src/components/addMedicationTwo';
import { pushNotifications } from './src/components/common';

const RootStack = StackNavigator(
{
  Login: { screen: LoginForm },
  Signup: { screen: SignUpForm },
  Home: { screen: Home },
  FamilyMembers: { screen: FamilyMembers },
  AddFamilyMember: { screen: AddFamilyMemberForm },
  FamilyMemberPersonalPage: { screen: FamilyMemberPersonalPage },
  AddMedication: { screen: AddMedicationForm },
  AddMedicationTwo: { screen: AddMedicationTwoForm },
},
  { initialRouteName: 'Login' },
);

pushNotifications.configure();

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

