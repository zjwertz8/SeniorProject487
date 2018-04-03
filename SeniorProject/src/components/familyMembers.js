import React, { Component } from 'react';
import { View, Text, ListView } from 'react-native';
import firebase from 'firebase';
import { Button, Card, CardSection, Input, SignUpHeader, ListItem } from './common';

class FamilyMembers extends React.Component {
	static navigationOptions = {
		header: null
	}

	constructor(props) {
		super(props);
		const dataSource = new ListView.DataSource({
			rowHasChanged: (row1, row2) => row1 !== row2,
		});
		uid = firebase.auth().currentUser.uid;
		firebase.database().ref('users')
               .child(uid)
               .child('familyMembers')
               .once('value')
               .then(function(snapshot) {
                const currentFamilyMember = snapshot.val();
                const firstName = Object.keys(currentFamilyMember)[0];
                const baileyAge = currentFamilyMember.Bailey.Age;
                console.log(firstName);
                console.log(baileyAge);
               });
		currentEmail = firebase.auth().currentUser.email;
		this.state = {
			dataSource: dataSource.cloneWithRows([
				{ name: currentEmail }, { name: 'eat' }, { name: 'code'}])
		};

	}

	_renderItem(item) {
		return (
			<ListItem item={item} />
			);
	}

	
	render() {
		return (
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

	// componentWillMount() {
	// 	const { familyName } = this.state;
	// 	const current = firebase.auth().currentUser;
	// 	console.log(current.email);
	// 	console.log(current);

	// 	if (firebase.auth().currentUser) {
	// 		const uid = firebase.auth().currentUser.uid;
	// 		if (uid) {
 //               firebase.database().ref('users')
 //               .child(uid)
 //               .once('value')
 //               .then(function(snapshot) {
 //                const currentFamily = snapshot.val();
 //                console.log(currentFamily.familyName);
 //               });             
	// 		}
	// 	}
	// }
