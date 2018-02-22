// Import libraries for making a component
import React from 'react';
import { Text, View } from 'react-native';

// Make a component
const Header = (props) => {
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
   position: 'relative'
  },
  textStyle: {
   fontSize: 40
  }
};


// Make the component available to other parts of the app
export { Header };
