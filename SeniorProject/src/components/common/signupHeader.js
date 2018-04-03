// Import libraries for making a component
import React from 'react';
import { Text, View, TouchableOpacity, Button } from 'react-native';

// Make a component
const SignUpHeader = (props) => {
	const { viewStyle, buttonStyle, backTextStyle } = styles;
	return (
		<View style={viewStyle}>
           <TouchableOpacity style={buttonStyle} onPress={() => props.navigation.goBack()} >
           <Text style={backTextStyle}>{props.buttonText}</Text>
           </TouchableOpacity>
           <Text style={{ fontSize: props.fontSize, marginLeft: props.marginLeft }}>{props.headerText}</Text>
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
   flexDirection: 'row',
  },
  buttonTextStyle: {
      color: '#37474F',
      fontSize: 16,
      fontWeight: '600',
      paddingTop: 10,
      paddingBottom: 10
  },
  buttonStyle: {
    height: 40,
    width: 50,
      backgroundColor: '#fff',
      borderRadius: 5,
      borderWidth: 2,
      borderColor: 'white',
      marginLeft: 5,
      marginRight: 5,
      marginTop: 10,
      marginBottom: 0,
      position: 'absolute',
      top: 0,
      left: 0,
  },
  backTextStyle: {
      alignSelf: 'center',
      color: '#37474F',
      fontSize: 16,
      fontWeight: '600',
      paddingTop: 8,
      paddingBottom: 10
  }
};


// Make the component available to other parts of the app
export { SignUpHeader };
//<TouchableOpacity onPress={() => this.props.navigation.goBack()} />
//<Text style={textStyle}>{props.headerText}</Text>
