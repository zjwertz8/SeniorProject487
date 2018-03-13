import React, { Component } from 'react';
import { View, Text } from 'react-native';
import firebase from 'firebase';
import { Button, Card, CardSection, Input, Header } from './common';

class LoginForm extends React.Component {
	static navigationOptions = {
		header: null
	}
    state = { emailText: '', passText: '', error: '' };
    
    onButtonPress() {
        const { emailText, passText } = this.state;
        this.setState({ error: '' }); 

        firebase.auth().signInWithEmailAndPassword(emailText, passText)
        .catch(() => {
        this.setState({ error: 'Login Failed.' });
        });
    }

	render() {
            return (
			<View>
			<Header headerText='Login' />
			<Card>

			<CardSection>
			<Input
			value={this.state.emailText}
			onChangeText={emailText => this.setState({ emailText })}
			label={'Email: '}
			placeholder={'Zjwertz@gmail.com'}
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
            
            <Text style={styles.errorTextStyle}>
            { this.state.error }
            </Text>
 
			<CardSection>
			<Button 
               buttonText="Login"
               onPress={() => { 
                                this.onButtonPress();
                                console.log(this.state); 
                              }}
               // onPress={() => { console.log(this.state); }} 
			/>
			</CardSection>

			<CardSection>
			<Button 
               buttonText="Create An Account"
               onPress={() => this.props.navigation.navigate('Signup')}
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


export default LoginForm;
