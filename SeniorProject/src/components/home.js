import React from 'react';
import { View, Text } from 'react-native';
import firebase from 'firebase';
import { Button, Card, CardSection, Header } from './common';

class Home extends React.Component {
	static navigationOptions = {
		header: null
	}
    
   constructor(props) {
   	super(props);
   	console.log(props);
   	console.log('split');
   }

	state = { familyName: '' };
	
	render() {
		return (
			<View>
			<Header headerText="Home" />
			<Card>

			<CardSection>
			<Text>yeah</Text>
			</CardSection>

			<CardSection>
			<Text>Table for Medications</Text>
			</CardSection>

			<CardSection>
			<Text>Table for Appointments</Text>
			</CardSection>

			<CardSection>
			<Button 
			buttonText="Family Members"
			onPress={() => this.props.navigation.navigate('FamilyMembers')} 
			/>
			</CardSection>

			</Card>
			</View>
			);
	}
}

export default Home;
