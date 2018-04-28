import React, { Component } from 'react';
import { BackHandler } from 'react-native';
import { StackNavigator } from 'react-navigation';
import firebase from 'firebase';
import moment from 'moment';
import SignUpForm from './components/signUpForm';
import LoginForm from './components/loginForm';
import Home from './components/home';
import FamilyMembers from './components/familyMembers';
import AddFamilyMemberForm from './components/addFamilyMember';
import FamilyMemberPersonalPage from './components/familyMemberPersonalPage';
import AddMedicationForm from './components/addMedication';
import AddMedicationTwoForm from './components/addMedicationTwo';

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

  alertMedication() {
      
      var datetime = new Date();
      var newdatetime = moment(date).format("YYY-MMM-DD LT");

  }


	render() {
   var date = new Date();
   var newDate = moment(date).format("YYYY-MMM-DD LT");
   alert(newDate);
   alert(date);
    return <RootStack />;
	}
}
