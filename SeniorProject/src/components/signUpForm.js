import React, { Component } from 'react';
import { Button, Card, CardSection, Input } from './common';

class SignUpForm extends Component {
    state = { firstName: '', lastName: '', emailText: '', passText: '' };

	render() {
		return (
			<Card>

			<CardSection>
			<Input
			value={this.state.firstName}
			onChangeText={firstName => this.setState({ firstName })}
			label={'First Name: '}
			placeholder={'John'}
			/>
			</CardSection>

			<CardSection>
			<Input
			value={this.state.lastName}
			onChangeText={lastName => this.setState({ lastName })}
			label={'Last Name: '}
			placeholder={'Smith'}
			/>
			</CardSection>

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

export default SignUpForm;
