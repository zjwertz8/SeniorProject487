import React from 'react';
import { View, Text, ListView, ScrollView } from 'react-native';
import firebase from 'firebase';
import moment from 'moment';
import { Button, Card, CardSection, HomeHeader, ListItem } from './common';

class Home extends React.Component {
	static navigationOptions = {
		header: null
	}
    
   constructor(props) {
   	super(props);
   	uid = firebase.auth().currentUser.uid;
   	this.dataRef = firebase.database().ref('/users/' + uid + '/AllMedications/');
   	this.state = {
   		famName: '',
   		dataSource: new ListView.DataSource({
   			rowHasChanged: (row1, row2) => row1 !== row2,
   		}),
   		emptyRows: '',
   	};
   }

   listenForProfiles(dataRef) {
		dataRef.on('value', (snap) => {
			var profiles = [];
			snap.forEach((child) => {
				profiles.push({
					_key: child.key,
					famMemName: child.val().FamMemName,
					date: child.val().Date,
					medName: child.val().MedName,
					quantity: child.val().Quantity,
					time: child.val().Time,
				});
				profiles.sort(function(a,b)
				{
					return new Date(a.date + ' ' + a.time) - new Date(b.date + ' ' + b.time);
				});


		        			
			});
			this.setState({
				dataSource: this.state.dataSource.cloneWithRows(profiles.slice(0,5))
			});
		});

	}

	componentDidMount(){
		this.listenForProfiles(this.dataRef);
		var ref = firebase.database().ref('users/' + uid);
		ref.child('familyName').once('value', function(snap) {} )
		.then(result => {
			this.setState({famName: result.val()});
		})
	}

	_renderItem(item) {
		var shortDate = moment(item.date).format("MMM-DD")
		return (
			<ListItem 
			 onPress={() => this.onPress(item)} item={item.famMemName + " " + item.medName + " " + shortDate + " " + item.time} />
			);
	}
	
	render() {
		return (
		    <ScrollView>
			<View>
			<HomeHeader marginLeft={0} fontSize={40} headerText="Home" buttonText="Logout" />
			<Card>

			<CardSection>
			<Text style={{fontSize: 24}}>Welcome { this.state.famName } Family</Text>
			</CardSection>

			<CardSection>
			<Text>Upcoming Medications</Text>
			</CardSection>
            
            
			<CardSection>
			<ListView
			enableEmptySections={true}
			dataSource={this.state.dataSource}
			renderRow={this._renderItem.bind(this)}
			renderSectionHeader={this.renderSectionHeader}
			/>
			</CardSection>
			
			

			<CardSection>
			<Button 
			buttonText="Family Members"
			onPress={() => this.props.navigation.navigate('FamilyMembers')} 
			/>
			</CardSection>

			</Card>
			</View>
			</ScrollView>
			
			);
	}
}

export default Home;
