import React, { Component } from 'react';
import { View, Text, Picker, TouchableOpacity } from 'react-native';
import { DatePickerDialog } from 'react-native-datepicker-dialog';
import firebase from 'firebase';
import moment from 'moment';
import { Button, Card, CardSection, Input, SignUpHeader, renderIf } from './common';

class AddMedicationTwoForm extends React.Component {
	static navigationOptions = {
		header: null
	}

    constructor(props)
    {
    	super(props);
    	console.log(props);
    	this.state = {
    		FamMemName: props.navigation.state.params.FamMemName,
    		MedName: props.navigation.state.params.MedName,
    		error: '',
    		Quantity: props.navigation.state.params.Quantity,
    		dateText: 'Select a Date',
    		datePick: null,
    	}
    	console.log(this.state.FamMemName);
    	console.log(this.state.MedName);
    	console.log(this.state.Quantity);

    }
	onButtonPress() {
		const { FamMemName, MedName, error, Quantity, dateText, datePick } = this.state;
		this.setState({ error: '' });
		const current = firebase.auth().currentUser;
        
        }

	render() {
		return (
			<View>
			<SignUpHeader marginLeft={20} fontSize={30} headerText="Add Date and Time" buttonText="Back" navigation={this.props.navigation} />
			<Card>

			<CardSection>
			<Text style={styles.textStyle}>Quantity Left: {this.state.Quantity }</Text>
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
	textStyle: {
		fontSize: 20,
		alignSelf: 'center',
	},
};

export default AddMedicationTwoForm;