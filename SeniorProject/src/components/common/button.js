import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const Button = () => {
	const { buttonStyle, textStyle } = styles;

	return (
     <TouchableOpacity style={buttonStyle}>
      <Text style={textStyle}>Click Me!!!</Text>
     </TouchableOpacity>
		);
};

const styles = {
	textStyle: {
      alignSelf: 'center',
      color: '#37474F',
      fontSize: 16,
      fontWeight: '600',
      paddingTop: 10,
      paddingBottom: 10
	},
	buttonStyle: {
      flex: 1,
      alignSelf: 'stretch',
      backgroundColor: '#fff',
      borderRadius: 5,
      borderWidth: 2,
      borderColor: '#FF91B2',
      marginLeft: 5,
      marginRight: 5,
      marginTop: 7,
      marginBottom: 3
	}
};


export { Button };
