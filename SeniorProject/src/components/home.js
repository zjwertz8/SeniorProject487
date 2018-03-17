import React, { Component } from 'react';
import { View, Text } from 'react-native';
import firebase from 'firebase';
import { Button, Card, CardSection, Input, Header } from './common';

class Home extends React.Component {
	static navigationOptions = {
		header: null
	}

	componentWillMount() {
		const current = firebase.auth().currentUser;
		console.log(current.email);
		console.log(current);
	}
	
	render() {
		return (
			<View>
			<Header headerText="Home" />
			<Card>

			<CardSection>
			<Text>Yarg</Text>
			</CardSection>

			</Card>
			</View>
			);
	}
}

export default Home;
