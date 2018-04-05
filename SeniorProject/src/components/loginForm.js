import React from 'react';
import { View, Text } from 'react-native';
import firebase from 'firebase';
import { Button, Card, CardSection, Input, Header } from './common';

class LoginForm extends React.Component {
	static navigationOptions = {
		header: null
	}
    state = { emailText: '', passText: '', error: '', firstName: '' };


    onButtonPress() {
        const { emailText, passText } = this.state;
        firebase.auth().signInWithEmailAndPassword(emailText, passText)
        .then(() => {
           this.setState({ error: 'Authorization Granted' });

        	const current = firebase.auth().currentUser;
        	this.props.navigation.navigate('Home', { current });

        })
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
			placeholder={'Email@gmail.com'}
			keyboardType={'default'}
			/>
			</CardSection>
          
            <CardSection>
			<Input
			value={this.state.passText}
			onChangeText={passText => this.setState({ passText })}
			label={'Password: '}
			placeholder={'Password'}
			keyboardType={'default'}
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
