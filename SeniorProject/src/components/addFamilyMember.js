import React, { Component } from 'react';
import { View, Text, Picker, Animated } from 'react-native';
import firebase from 'firebase';
import RadioForm from 'react-native-simple-radio-button';
import { Button, Card, CardSection, Input, SignUpHeader } from './common';

class AddFamilyMemberForm extends React.Component {
	static navigationOptions = {
		header: null
	}
    state = { Name: '', Age: '', error: '', Dropdown: 0};

	onButtonPress() {
		const { Name, Age, error, Dropdown } = this.state;
		this.setState({ error: '' });
		const current = firebase.auth().currentUser;
		console.log(Age);
		console.log(isNaN(Age));

        if(Name.length === 0)
        {
        	this.setState({ error: 'Please Provide Name' });
        	return;
        }
        else if (Age.length === 0)
        {
        	this.setState({ error: 'Please Provide Age' });
        	return;
        }
        else if (Age <= 0)
        {
        	this.setState({ error: 'Please Provide Valid Age' });
        	return;
        }
        else if(isNaN(Age) || Age.includes('.'))
        {
        	this.setState({ error: 'Please Enter Integer Value'});
        	return;
        }
        else if (Dropdown === 0)
        {
        	this.setState({ error: 'Please Select a Family Role'});
        	return;
        }
        else 
        {
		firebase.database().ref('users/' + current.uid + '/familyMembers/' + Name).set({
			Age: Age,
			Dropdown: Dropdown,
		});
		this.props.navigation.navigate('Home');
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
			keyboardType={'default'}
			/>
			</CardSection>
          
            <CardSection>
			<Input
			value={this.state.Age}
			onChangeText={Age => this.setState({ Age })}
			label={'Age: '}
			placeholder={'15'}
			keyboardType={'numeric'}
			/>
			</CardSection>
			
            <Picker style={[styles.picker, this.state.error == 'Please Select a Family Role' && styles.pickerError]} selectedValue={this.state.Dropdown} onValueChange={(itemValue) => this.setState({ Dropdown: itemValue})}>
            <Picker.Item label="Please Select a Value" value={0} />
            <Picker.Item label="Dad" value="Dad" />
            <Picker.Item label="Daughter" value="Daughter" />
            <Picker.Item label="Grandfather" value="Grandfather" />
            <Picker.Item label="Grandmother" value="Grandmother" />
            <Picker.Item label="Husband" value="Husband" />
            <Picker.Item label="Mom" value="Mom" />
            <Picker.Item label="Son" value="Son" />
            <Picker.Item label="Wife" value="Wife" />
            </Picker>

            <RadioForm
              animation={true}
            />

            <Text style={styles.errorTextStyle} > 
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
