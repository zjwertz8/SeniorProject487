import React, { Component } from 'react';
import { View, Text, Picker } from 'react-native';
import firebase from 'firebase';
import { Button, Card, CardSection, Input, SignUpHeader } from './common';

class AddMedicationForm extends React.Component {
	static navigationOptions = {
		header: null
	}

    constructor(props)
    {
    	super(props);
    	console.log(props);
    	this.state = {
    		FamMemName: props.navigation.state.params.famMember,
    		MedName: '',
    		error: '',
    		Quantity: 0,
    	}
    	console.log(this.state.FamMemName);
    }
	onButtonPress() {
		const { FamMemName, MedName, error, Quantity } = this.state;
		this.setState({ error: '' });
		const current = firebase.auth().currentUser;
		console.log(Quantity);
        
        if(MedName.length === 0)
        {
        	this.setState({ error: 'Please Enter Medicine Name'});
        	return;
        }
        else if (Quantity.length === 0)
        {
        	this.setState({ error: 'Please Enter Quantity'});
        	return;
        }
        else if (Number.isInteger(Quantity) == false)
        {
        	console.log(Quantity);
        	this.setState({ error: 'Please Provide Valid Quantity'});
        	return;
        }
        else
        {
        	firebase.database().ref('users/' + current.uid + '/medications/' + FamMemName).set({
        		MedName: MedName,
        		Quantity: Quantity,
        	});
        	console.log('set');
        }

        
	}

	render() {
		const current = firebase.auth().currentUser;
		return (
			<View>
			<SignUpHeader marginLeft={0} fontSize={30} headerText="Add Medication" buttonText="Back" navigation={this.props.navigation} />
			<Card>

			<CardSection>
			<Input
			value={this.state.FamMemName}
			label={'Name: '}
			editable={false}
			/>
			</CardSection>

			<CardSection>
			<Input
			value={this.state.MedName}
			onChangeText={MedName => this.setState({ MedName })}
			label={'Medication Name: '}
			placeholder={'Blood Pressure Pill'}
			keyboardType={'default'}
			/>
			</CardSection>
          
            <CardSection>
			<Input
			value={this.state.Quantity}
			label={'Quantity: '}
			placeholder={'30'}
			keyboardType={'numeric'}
			/>
			</CardSection>

            <Text style={styles.errorTextStyle}> { this.state.error }</Text>

			<CardSection>
			<Button 
                    buttonText="Next" 
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

export default AddMedicationForm;
