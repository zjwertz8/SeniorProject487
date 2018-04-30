import React from 'react';
import { View, Text, ListView } from 'react-native';
import firebase from 'firebase';
import moment from 'moment';
import { Button, Card, CardSection, SignUpHeader, ListItem } from './common';

class FamilyMemberPersonalPage extends React.Component {
	static navigationOptions = {
		header: null
	}
    
   constructor(props) {
   	super(props);
   	console.log(props);
   	uid = firebase.auth().currentUser.uid;
   	
   	this.state = {
   		user: firebase.auth().currentUser,
   		famMem: props.navigation.state.params.famMem,
   		dataSource: new ListView.DataSource({
   			rowHasChanged: (row1, row2) => row1 !== row2,
   		}),
   	};
   	this.dataRef = firebase.database().ref('/users/' + uid + '/Medications/' + this.state.famMem);
   }

   onPress() {
      const famMember = this.state.famMem;
      this.props.navigation.navigate('AddMedication', { famMember });
   }

	componentDidMount(){
		this.listenForProfiles(this.dataRef);
		var ref = firebase.database().ref('users/' + this.state.user.uid);
		ref.child('familyName').once('value', function(snap) {} )
		.then(result => {
			this.setState({famName: result.val()});
		})
	}

	listenForProfiles(dataRef) {
		dataRef.on('value', (snap) => {
			var profiles = [];
			snap.forEach((child) => {
				profiles.push({
					_key: child.key,
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


	_renderItem(item) {
		var shortDate = moment(item.date).format("MMM-DD")
		return (
			<ListItem 
			 onPress={() => this.onPress(item)} item={"Med:" + item.medName + "   Date: " + shortDate + " " + item.time} />
			);
	}
	
	render() {
		return (
			<View>
			<SignUpHeader marginLeft={10} fontSize={30} buttonText="Back" headerText= {this.state.famMem + "'s Page"} navigation={this.props.navigation} />
			<Card>

			<CardSection>
			<Text style={{fontSize: 24}}>Welcome { this.state.famMem } Family</Text>
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
	        buttonText="Add Medication" 
            onPress={() => this.onPress()}
            />
			</CardSection>

			</Card>
			</View>
			);
	}
}

export default FamilyMemberPersonalPage;
