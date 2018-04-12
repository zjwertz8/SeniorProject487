import React, { Component } from 'react';
import { View, Text, Picker, TouchableOpacity, Animated } from 'react-native';
import firebase from 'firebase';
import moment from 'moment';
import RadioForm from 'react-native-simple-radio-button';
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
    		Quantity: '',
    		Value: -1,
    		radio_props: [
          {label: 'No', value: 0},
          {label: 'Yes', value: 1}
    	],
    	}

    }
	onButtonPress() {
		const { FamMemName, MedName, error, Quantity, Value } = this.state;
		this.setState({ error: '' });
		const current = firebase.auth().currentUser;
        
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
        else if (Quantity <= 0)
        {
        	this.setState({ error: 'Please Provide Valid Quantity'});
        	return;
        }
        else if(isNaN(Quantity) || Quantity.includes('.'))
        {
        	this.setState({ error: 'Please Provide Integer Value'});
        	return;
        }
        else if(Value === -1)
        {
        	this.setState({ error: 'Please Select Yes or No'});
        	return;
        } 
        else
        {
        	this.props.navigation.navigate('AddMedicationTwo', { FamMemName, MedName, Quantity, Value });
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
			onChangeText={Quantity => this.setState({ Quantity })}
			label={'Quantity: '}
			placeholder={'30'}
			keyboardType={'numeric'}
			/>
			</CardSection>

			<CardSection>
			<Text style={styles.radioTextStyle}> Daily Medication? </Text>
			<RadioForm
			  radio_props={this.state.radio_props}
			  initial={this.state.Value}
			  formHorizontal={true}
			  radioStyle={styles.radioStyle}
			  labelStyle={{fontSize: 18}}
			  buttonColor={'#FFC0CB'}
			  selectedButtonColor={'#FF6699'}
			  onPress={(value) => this.setState({Value: value}) }
			  />
			</CardSection>

			<Text style={styles.errorTextStyle}> 
            { this.state.error }
            </Text>

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
		color: 'red',
	},
	radioStyle: {
		marginLeft: 10,
		marginRight: 10,
		marginTop: 5,
	},
	radioTextStyle: {
		fontSize: 18,
		color: 'black',
		position: 'relative',
		left: -11,
	}
};

export default AddMedicationForm;
