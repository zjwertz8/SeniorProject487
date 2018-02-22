import React, { Component } from 'react';
import { Button, Card, CardSection, Input } from './common';

class LoginForm extends Component {
    state = { emailText: '', passText: '' };

	render() {
		return (
			<Card>

			<CardSection>
			<Input
			value={this.state.emailText}
			onChangeText={emailText => this.setState({ emailText })}
			label={'Username: '}
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

			<CardSection>
			<Button />
			</CardSection>

			</Card>
			);
	}
}

export default LoginForm;
