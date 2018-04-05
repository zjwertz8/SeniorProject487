import React from 'react';
import { View, Text } from 'react-native';
import firebase from 'firebase';
import { Button, Card, CardSection, SignUpHeader } from './common';

class FamilyMemberPersonalPage extends React.Component {
	static navigationOptions = {
		header: null
	}
    
   constructor(props) {
   	super(props);
   	console.log(props.navigation.state.params.famMem);
   	this.state = {
   		user: firebase.auth().currentUser,
   		famMem: props.navigation.state.params.famMem,
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
			<SignUpHeader marginLeft={10} fontSize={30} buttonText="Back" headerText= {this.state.famMem + "'s Personal Page"} navigation={this.props.navigation} />
			<Card>

			<CardSection>
			<Text style={{fontSize: 24}}>Welcome { this.state.famMem } Family</Text>
			</CardSection>

			<CardSection>
			<Text>Table for Medications</Text>
			</CardSection>

			<CardSection>
			<Text>Table for Appointments</Text>
			</CardSection>

			</Card>
			</View>
			);
	}
}

export default FamilyMemberPersonalPage;
