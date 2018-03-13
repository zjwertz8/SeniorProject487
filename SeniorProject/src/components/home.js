import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Button, Card, CardSection, Input, SignUpHeader } from './common';

class Home extends React.Component {
	static navigationOptions = {
		header: null
	}

	render() {
		return (
			<View>
			<SignUpHeader headerText="Home" />
			<Card>

			<CardSection>
			<Input
			value={this.state.emailText}
			onChangeText={emailText => this.setState({ emailText })}
			label={'Email: '}
			placeholder={'Address@gmail.com'}
			/>
			</CardSection>

			</Card>
			</View>
			);
	}
}

export default Home;
