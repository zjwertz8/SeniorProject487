import React, { Component } from 'react';
import { View, Text, Picker, TouchableOpacity } from 'react-native';
import { DatePickerDialog } from 'react-native-datepicker-dialog';
import firebase from 'firebase';
import moment from 'moment';
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
    		dateText: '',
    		datePick: null,
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
        else
        {
        	console.log('set');
        } 
	}

	onDatePress = () => {
		let datePick = this.state.datePick;

		if(!datePick || datePick == null)
		{
			datePick = new Date();
			this.setState({
				datePick: datePick
			});
		}


		this.refs.dateDialog.open({
			date: datePick,
			maxDate: new Date(2020, 4, 30),
			minDate: new Date()
		});
	}

	onDatePicked = (date) => {
		this.setState({
			datePick: date,
			dateText: moment(date).format('DD-MMM-YYYY')
		});
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

            <Text style={styles.errorTextStyle}> { this.state.error }</Text>

			<CardSection>
			<Button 
                    buttonText="Next" 
                    onPress={() => { 
                                    this.onButtonPress();
                                   }}
			/>
			</CardSection>

            <View style={styles.dateContainer}>
            <View>
            <Text>Dates n junk</Text>
            <TouchableOpacity onPress={this.onDatePress.bind(this)} >
            <View style={styles.datePickerBox}>
              <Text style={styles.datePickerText}>{this.state.dateText}</Text>
            </View>
            </TouchableOpacity>
            </View>

            <DatePickerDialog ref="dateDialog" onDatePicked={this.onDatePicked.bind(this)} />
			</View>
			
			

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
	datePickerBox: {
		marginTop: 9,
    	borderColor: '#FF91B2',
    	borderWidth: 2,
    	padding: 0,
    	borderTopLeftRadius: 4,
    	borderTopRightRadius: 4,
    	borderBottomLeftRadius: 4,
    	borderBottomRightRadius: 4,
    	height: 38,
    	justifyContent:'center'
	},
	datePickerText: {
		fontSize: 14,
    	marginLeft: 5,
    	borderWidth: 0,
    	color: 'pink'
	},
	dateContainer: {
    padding: 10,
    backgroundColor: '#FFFFFF'
  },
};

export default AddMedicationForm;
