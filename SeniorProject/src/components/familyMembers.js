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
    
    profilesSize(profiles) {
    	if(profiles.length === 1)
    	{
           return profiles.length + ' Current Family Member';
        }
        else
        {
        	return profiles.length + ' Current Family Members';
        }
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
			
			if(profiles.length === 0)
			{
				this.setState({
				dataSource: this.state.dataSource.cloneWithRows(profiles), emptyRows: 'No Current Family Members'
			});
			}
			else {
			this.setState({
				dataSource: this.state.dataSource.cloneWithRows(profiles), emptyRows: this.profilesSize(profiles)
			});
		}
		});
	}

	componentDidMount() {
		this.listenForProfiles(this.dataRef);
	}

	onPress = (item) => {
		let famMem = item._key;
		this.props.navigation.navigate('FamilyMemberPersonalPage', { famMem });
	}

	_renderItem(item) {
		return (
			<ListItem 
			 onPress={() => this.onPress(item)} item={item._key} />
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
			 renderRow={this._renderItem.bind(this) } />
			</CardSection>

			<CardSection 
			style={{ backgroundColor: 'pink'}} 
			>
			<Text style={[styles.textStyle, this.state.emptyRows == 'No Current Family Members' && styles.errorTextStyle]}>{this.state.emptyRows}</Text>
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

const styles ={
	errorTextStyle: {
		fontSize: 20,
		alignSelf: 'center',
		color: 'red'
	},
	textStyle: {
		fontSize: 20,
		alignSelf: 'center',
	}
}

export default FamilyMembers;
