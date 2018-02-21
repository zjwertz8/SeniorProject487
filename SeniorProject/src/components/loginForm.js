import React, { Component } from 'react';
import { Text, View, TextInput } from 'react-native';
import Button from './button';
import Card from './card';
import CardSection from './cardSection';

class LoginForm extends Component {
	render() {
		return (
			<Card>
			<Text> jey </Text>
			<CardSection />
			<Text> ley </Text>
			<CardSection>
			<Text>hey</Text>
			</CardSection>
			<Button>
			Log in
			</Button>
			<CardSection />

			</Card>
			);
	}
}

export default LoginForm;
