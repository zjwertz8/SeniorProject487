import React, { Component } from 'react';
import { View, Text, Picker } from 'react-native';
import firebase from 'firebase';
import { Button, Card, CardSection, Input, SignUpHeader } from './common';

class AddFamilyMemberForm extends React.Component {
	static navigationOptions = {
		header: null
	}
    state = { Name: '', Age: '', error: '', Dropdown: 0, Stores: '', DropdownError: '' };

	onButtonPress() {
		const { Name, Age, error, Dropdown } = this.state;
		this.setState({ error: '' });
		const current = firebase.auth().currentUser;
        if(Dropdown === 0)
        {
        	this.setState({ DropdownError: 'Select a Family Role'});
        	return;
        }
        else 
        {
		firebase.database().ref('users/' + current.uid + '/familyMembers/' + Name).set({
			Age: Age,
			Dropdown: Dropdown,
		});
	}
	}

	render() {
		const current = firebase.auth().currentUser;
		return (
			<View>
			<SignUpHeader marginLeft={0} fontSize={40} headerText="Add Family" buttonText="Back" navigation={this.props.navigation} />
			<Card>

			<CardSection>
			<Input
			value={this.state.Name}
			onChangeText={Name => this.setState({ Name })}
			label={'Name: '}
			placeholder={'Jane'}
			/>
			</CardSection>
          
            <CardSection>
			<Input
			value={this.state.Age}
			onChangeText={Age => this.setState({ Age })}
			label={'Age: '}
			placeholder={'15'}
			/>
			</CardSection>
			
            <Picker style={[styles.picker, this.state.DropdownError == 'Select a Family Role' && styles.pickerError]} selectedValue={this.state.Dropdown} onValueChange={(itemValue) => this.setState({ Dropdown: itemValue})}>
            <Picker.Item label="Please Select a Value" value="0" />
            <Picker.Item label="Daughter" value="Daughter" />
            <Picker.Item label="Wife" value="Wife" />
            </Picker>

            <CardSection>
            <Text style={styles.errorTextStyle}> { this.state.DropdownError }</Text>
            </CardSection>

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
	picker: {
		alignSelf: 'stretch',
		height: 50,
		borderColor: '#ddd',
		borderBottomWidth: 1,
		backgroundColor: 'white',
	},
	pickerError: {
		alignSelf: 'stretch',
		height: 50,
		borderColor: '#ddd',
		borderBottomWidth: 1,
		backgroundColor: 'pink',
	},
	pickerItem: {
		height: 44,
		color: 'red'
	},
};

export default AddFamilyMemberForm;
// firebase.database()
// 	.ref('users')
// 	.child(current.uid)
// 	.once('value')
// 	.then(function(snapshot) {
// 				const currentUser = snapshot.val();
// 				console.log(currentUser);
// 			});