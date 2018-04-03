import React from 'react';
import { Text, View, TextInput } from 'react-native';

const Input = ({ label, value, onChangeText, placeholder, secureTextEntry }) => {
  const { inputStyle, labelStyle, containerStyle } = styles;
    return (
        <View style={containerStyle}>
        <Text style={labelStyle}>{label}</Text>
        <TextInput
          secureTextEntry={secureTextEntry}
          value={value}
          onChangeText={onChangeText}
          style={inputStyle}
          placeholder={placeholder}
          autoCorrect={false}
        />
        </View>
        );
};


const styles = {
	inputStyle: {
		color: '#000',
		fontSize: 18,
    lineHeight: 20,
    borderColor: 'gray',
    borderWidth: 1,
    flex: 2
	},
	labelStyle: {
    fontSize: 18,
    flex: 1,
    color: '#000',
  },
	containerStyle: {
    height: 40,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  }
};


export { Input };
