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
				}),
			emptyRows: '',
			};
		
	}

	listenForProfiles(dataRef) {
		dataRef.on('value', (snap) => {
			var profiles = [];
			snap.forEach((child) => {
				profiles.push({
					name: child.val().forename,
					_key: child.key
				});

		        var temp = child.val();
				
			});
			console.log(profiles.length);
			if(profiles.length === 0)
			{
				this.setState({
				dataSource: this.state.dataSource.cloneWithRows(profiles), emptyRows: 'No Current Family Members'
			});
			}
			else {
			this.setState({
				dataSource: this.state.dataSource.cloneWithRows(profiles)
			});
		}
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

			<CardSection 
			style={{ backgroundColor: 'pink'}} 
			>
			<Text>{this.state.emptyRows}</Text>
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
