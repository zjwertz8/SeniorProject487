// Import libraries for making a component
import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Button } from './index';

// Make a component
const SignUpHeader = (props) => {
	const { textStyle, viewStyle } = styles;
	return (
		<View style={viewStyle}>
           <Text style={textStyle}>{props.headerText}</Text>
		</View>
		);
};

const styles = {
  viewStyle: {
   backgroundColor: '#FF91B2',
   justifyContent: 'center',
   alignItems: 'center',
   height: 60,
   elevation: 8,
  },
  textStyle: {
   fontSize: 40
  }
};


// Make the component available to other parts of the app
export { SignUpHeader };
//<TouchableOpacity onPress={() => this.props.navigation.goBack()} />
