import React from 'react';
import { View } from 'react-native';

const CardSection = (props) => {
	return (
            <View>
      <View style={[styles.containerStyle, props.style]}>{ props.children }</View>
      </View>
		);
};


const styles = {
	containerStyle: {
      borderBottomWidth: 1,
      padding: 5,
      backgroundColor: '#fff',
      justifyContent: 'center',
      flexDirection: 'row',
      borderColor: '#ddd',
      position: 'relative',
      alignItems: 'center',
	}
};

export { CardSection };
