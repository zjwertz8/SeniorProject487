import React, { Component } from 'react';
import { View, Text, ListView, ScrollView } from 'react-native';
import firebase from 'firebase';
import { Button, Card, CardSection, Input, SignUpHeader, ListItem } from './common';

class FamilyMembers extends React.Component {
	static navigationOptions = {
		header: null
	}

	constructor(props) {
		super(props);
 
        uid = firebase.auth().currentUser.uid;
		this.dataRef = firebase.database().ref('/users/' + uid + '/familyMembers');


		this.state = {
			dataSource: new ListView.DataSource({
				rowHasChanged: (row1, row2) => row1 !== row2,
				})
			};
		
	}

	listenForProfiles(dataRef) {
		dataRef.on('value', (snap) => {
			var profiles = [];
			console.log(snap);
			snap.forEach((child) => {
				profiles.push({
					name: child.val().forename,
					_key: child.key
				});

		        var temp = child.val();
				
			});
			console.log(profiles);
			this.setState({
				dataSource: this.state.dataSource.cloneWithRows(profiles)
			});
		});
	}

	componentDidMount() {
		this.listenForProfiles(this.dataRef);
	}

	_renderItem(item) {
		return (
			<ListItem item={item._key} />
			);
	}

	
	render() {
		return (
		    <ScrollView>
			<View>
			<SignUpHeader marginLeft={10} fontSize={30} buttonText="Back" headerText="Family Members" navigation={this.props.navigation} />
			<Card>
 
			<CardSection>
			<ListView 
			 enableEmptySections={true}
			 dataSource={this.state.dataSource}
			 renderRow={this._renderItem.bind(this) }/>
			</CardSection>

			<CardSection>
			<Button 
	        buttonText="Add Family Member" 
            onPress={() => this.props.navigation.navigate('AddFamilyMember')}
            />
			</CardSection>

			</Card>
			</View>
			</ScrollView>
			);
	}
}

export default FamilyMembers;

	// 	firebase.database()
	// .ref('users')
	// .child(user.uid)
	// .once('value')
	// .then(function(snapshot) {
	// 			const currentUser = snapshot.val();
				
	// 			console.log(currentUser.familyName);
	// 		});
     

	// 	firebase.database().ref('users')
 //               .child(uid)
 //               .child('familyMembers')
 //               .once('value')
 //               .then(function(snapshot) {
 //                const currentFamilyMember = snapshot.val();
 //                const firstName = Object.keys(currentFamilyMember)[0];
 //                const baileyAge = currentFamilyMember.Bailey.Age;
 //                console.log(firstName);
 //                console.log(baileyAge);
 //               });
	// }