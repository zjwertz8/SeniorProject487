import React, { Component } from 'react';
import { View, Text, Picker, TouchableOpacity } from 'react-native';
import { DatePickerDialog } from 'react-native-datepicker-dialog';
import { TimePicker, WheelPicker } from 'react-native-wheel-picker-android';
import firebase from 'firebase';
import moment from 'moment';
import { Button, Card, CardSection, Input, SignUpHeader } from './common';

class AddMedicationTwoForm extends React.Component {
	static navigationOptions = {
		header: null
	}

    constructor(props)
    {
    	super(props);
    	this.state = {
    		FamMemName: props.navigation.state.params.FamMemName,
    		MedName: props.navigation.state.params.MedName,
    		error: '',
    		Quantity: props.navigation.state.params.Quantity,
    		Value: props.navigation.state.params.Value,
    		dateText: 'Click To Select a Date',
    		datePick: null,
    		timeText: 'Click To Select Time',
    		timePick: 'Please Select a Time',
    	}
    }
        

	onButtonPress() {
		const { FamMemName, MedName, error, dateText, datePick, Quantity, timePick } = this.state;
		const current = firebase.auth().currentUser;
		this.setState({ error: '' });
        

		 if(dateText === 'Click To Select a Date')
        {
        	this.setState({ error: 'Please Select a Date'});
        	return;
        }
        else if(timePick === 'Please Select a Time')
        {
        	this.setState({ error: 'Please Select a Time'});
        	return;
        }
       else
       {
       	this.setState({ Quantity: this.state.Quantity - 1});
    	firebase.database().ref('users/' + current.uid + '/Medications/' + FamMemName).push({
			MedName: MedName,
			Quantity: Quantity,
			Date: dateText,
			Time: timePick,
		});
        	firebase.database().ref('users/' + current.uid + '/AllMedications/').push({
			Name: FamMemName,
			MedName: MedName,
			Quantity: Quantity,
			Date: dateText,
			Time: timePick,
		});

        if(this.state.Quantity - 1 === 0)
        {
        	this.props.navigation.navigate('Home');
        	return;
        }
         this.setState({ dateText: 'Click To Select a Date'});
         this.setState({ timePick: 'Please Select a Time'});
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
		console.log(date);
		this.setState({
			datePick: date,
			dateText: moment(date).format('YYYY-MMM-DD')
		});
	}

	onTimeSelected = (time) => {
		this.setState({ 
			timeText: time,
			timePick: moment(time).format('LT'),
		})
	} 


	render() {

        const minutesArray = ['00', '05', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55'];
        
        const now = new Date();

		const valueOfNo = <View><SignUpHeader marginLeft={20} fontSize={30} headerText="Add Date and Time" buttonText="Back" navigation={this.props.navigation} />
			<Card>

			<CardSection>
			<Text style={styles.textStyle}>Quantity Left: {this.state.Quantity }</Text>
			</CardSection>

			<View style={styles.dateContainer}>
              <View>
                   <TouchableOpacity onPress={this.onDatePress.bind(this)} >
                      <View style={styles.datePickerBox}>
                         <Text style={styles.datePickerText}>{this.state.dateText}</Text>
                      </View>
                   </TouchableOpacity>
               </View>
            <DatePickerDialog ref="dateDialog" onDatePicked={this.onDatePicked.bind(this)} />
			</View>

			
			<CardSection>
			<Text style={{fontSize: 18, color: 'black'}}>Select a Time</Text>
			<TimePicker
			   minutes={minutesArray}
			   onTimeSelected={this.onTimeSelected.bind(this)}
			   initDate={now.toISOString()}
			 />

			 </CardSection>
			
			
          
             <CardSection>
             <Text>
             Selected Time: {this.state.timePick}
             </Text>
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
			</View>;






	    const valueOfYes = <View><SignUpHeader marginLeft={20} fontSize={30} headerText="Add Date and Time" buttonText="Back" navigation={this.props.navigation} />
			<Card>

			<CardSection>
			<Text style={styles.textStyle}>YESQuantity Left: {this.state.Quantity }</Text>
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
			</View>;




		let display;
		if(this.state.Value === 0)
		{
			display = valueOfNo;
		}
		else
		{
			display = valueOfYes;
		}


		return (
			<View>
			{display}
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
    	justifyContent:'center',
	},
	datePickerText: {
		fontSize: 18,
    	marginLeft: 5,
    	borderWidth: 0,
    	alignSelf: 'center',
    	color: 'black',
    	fontWeight: '500',
	},
	dateContainer: {
    padding: 10,
    backgroundColor: '#FFFFFF',
  },
    dateText: {
    	fontSize: 18,
    	color: 'black',
    },
};

export default AddMedicationTwoForm;


