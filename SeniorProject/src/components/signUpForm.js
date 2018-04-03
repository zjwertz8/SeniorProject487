import React, { Component } from 'react';
import { View, Text } from 'react-native';
import firebase from 'firebase';
import { Button, Card, CardSection, Input, SignUpHeader } from './common';

class SignUpForm extends React.Component {
	static navigationOptions = {
		header: null
	}
    state = { emailText: '', passText: '', error: '', familyName: '' };

	onButtonPress() {
		const { emailText, passText, familyName } = this.state;
		this.setState({ error: '' });

		console.log(familyName.length);
		console.log('split');
		console.log(passText.length);

		firebase.auth().createUserWithEmailAndPassword(emailText, passText)
		.then((user) => {
			firebase.database().ref('users/' + user.uid).set({
				familyName: familyName,
			});
			this.props.navigation.navigate('Home');
		})
		.catch((error) => {
        if (passText.length < 6) {
          this.setState({ error: 'Password Must Be At Least 6 Characters' });
          console.log(error);
        }
		else if (familyName.length < 1) {
			this.setState({ error: 'Family Name is Required.' });
			console.log(error);
		}
        else if (error.code === 'auth/email-already-in-use') {
            this.setState({ error: 'Email Already in Use.' });
            console.log(familyName.length);
            console.log(error);
        }
        else {
            this.setState({ error: 'Sign Up Failed' });
            
        }
	});
	}

	render() {
		return (
			<View>
			<SignUpHeader marginLeft={0} fontSize={40} headerText="Sign Up" buttonText="Back" navigation={this.props.navigation} />
			<Card>

			<CardSection>
			<Input
			value={this.state.emailText}
			onChangeText={emailText => this.setState({ emailText: emailText })}
			label={'Email: '}
			placeholder={'Address@gmail.com'}
			/>
			</CardSection>
          
            <CardSection>
			<Input
			value={this.state.passText}
			onChangeText={passText => this.setState({ passText })}
			label={'Password: '}
			placeholder={'Six Characters Minimum'}
			secureTextEntry
			/>
			</CardSection>

            <CardSection>
			<Input
			value={this.state.familyName}
			onChangeText={familyName => this.setState({ familyName })}
			label={'Family Name: '}
			placeholder={'Johnson'}
			/>
			</CardSection>

            <Text style={styles.errorTextStyle}>
            { this.state.error }
            </Text>

			<CardSection>
			<Button 
                    buttonText="Submit" 
                    onPress={() => { 
                                    this.onButtonPress();
                                   }}
			/>
			</CardSection>

			</Card>
			</View>
			);
	}
}

const styles = {
	errorTextStyle: {
		fontSize: 20,
		alignSelf: 'center',
		color: 'red'
	}
};

export default SignUpForm;

//onChangeText for inputs, takes one argument, ES6 syntax shortens setState call
