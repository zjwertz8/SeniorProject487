import React from 'react';
import { View } from 'react-native';

const CardSection = () => {
	return (
      <View style={styles.containerStyle} />
		);
};


const styles = {
	constainerStyle: {
      borderBottomWidth: 1,
      padding: 5,
      backgroundColor: '#fff',
      justifyContent: 'flex-start',
      flexDirection: 'row',
      borderColor: '#ddd',
      position: 'relative'
	}
};

export default CardSection;
