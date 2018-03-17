import React, { Component } from 'react';
import { View, Text } from 'react-native';
import firebase from 'firebase';
import { Button, Card, CardSection, Input, SignUpHeader } from './common';

class SignUpForm extends React.Component {
	static navigationOptions = {
		header: null
	}
    state = { emailText: '', passText: '', error: '' };

	onButtonPress() {
		const { emailText, passText } = this.state;
		this.setState({ error: '' });
        console.log(this.state.emailText);
		firebase.auth().createUserWithEmailAndPassword(emailText, passText)
		.catch((error) => {
			console.log(error);
        if (passText.length < 6) {
          this.setState({ error: 'Password Must Be At Least 6 Characters' });
        }
        else {
          this.setState({ error: 'Sign up Failed' });
        }
	});
	}

	render() {
		return (
			<View>
			<SignUpHeader headerText="Sign Up" navigation={this.props.navigation} />
			<Card>

			<CardSection>
			<Input
			value={this.state.emailText}
			onChangeText={emailText => this.setState({ emailText })}
			label={'Email: '}
			placeholder={'Address@gmail.com'}
			/>
			</CardSection>
          
            <CardSection>
			<Input
			value={this.state.passText}
			onChangeText={passText => this.setState({ passText })}
			label={'Password: '}
			placeholder={'Password'}
			secureTextEntry
			/>
			</CardSection>
            <Text>
            { this.state.error }
            </Text>

			<CardSection>
			<Button 
                    buttonText="Submit" 
                    onPress={() => { 
                                    this.onButtonPress(); 
                                    console.log(this.state);
                                   }}
			/>
			</CardSection>

			</Card>
			</View>
			);
	}
}

export default SignUpForm;

// <CardSection>
			// <Input
			// value={this.state.firstName}
			// onChangeText={firstName => this.setState({ firstName })}
			// label={'First Name: '}
			// placeholder={'John'}
			// />
			// </CardSection>

			// <CardSection>
			// <Input
			// value={this.state.lastName}
			// onChangeText={lastName => this.setState({ lastName })}
			// label={'Last Name: '}
			// placeholder={'Smith'}
			// />
			// </CardSection>

			// .then(this.props.navigation.navigate('Login'));
