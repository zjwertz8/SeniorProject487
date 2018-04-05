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
   	this.state = {
   		user: firebase.auth().currentUser,
   		famName: ''
   	};
   }

	componentDidMount(){
		var ref = firebase.database().ref('users/' + this.state.user.uid);
		ref.child('familyName').once('value', function(snap) {} )
		.then(result => {
			this.setState({famName: result.val()});
		})
	}
	
	render() {
		return (
			<View>
			<Header headerText="Home" />
			<Card>

			<CardSection>
			<Text style={{fontSize: 24}}>Welcome { this.state.famName } Family</Text>
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
