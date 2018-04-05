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

		   if(emailText.length === 0) {
		   	this.setState({ error: 'Please Provide Email Address'});
		   	return;
		   }
		   else if (passText.length < 6) {
		   	this.setState({ error: 'Password Must Be 6 Characters'});
		   	return;
		   }
			else if(familyName.length === 0) {
              this.setState({ error: 'Please Provide Family Name'});
              return;
          }

		firebase.auth().createUserWithEmailAndPassword(emailText, passText)
		.then((user) => {
              
            firebase.database().ref('users/' + user.uid).set({
				familyName: familyName,
			});
			this.props.navigation.navigate('Home');
		})
		.catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
            this.setState({ error: 'Email Already in Use' });
        }
        else {
            this.setState({ error: 'Sign Up Failed' });
            console.log(error);
            
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
			keyboardType={'default'}
			/>
			</CardSection>
          
            <CardSection>
			<Input
			value={this.state.passText}
			onChangeText={passText => this.setState({ passText })}
			label={'Password: '}
			placeholder={'Six Characters Minimum'}
			secureTextEntry
			keyboardType={'default'}
			/>
			</CardSection>

            <CardSection>
			<Input
			value={this.state.familyName}
			onChangeText={familyName => this.setState({ familyName })}
			label={'Family Name: '}
			placeholder={'Johnson'}
			keyboardType={'default'}
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
	},
	inputContainerStyle: {
    height: 40,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  inputContainerErrorStyle: {
    height: 40,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'pink'
  }
};

export default SignUpForm;

//onChangeText for inputs, takes one argument, ES6 syntax shortens setState call
