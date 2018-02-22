import React from 'react';
import { View } from 'react-native';

const Card = (props) => {
	return (
		<View>
          <View style={styles.containerStyle}>{ props.children }</View>
          </View>
		);
};


const styles = {
	containerStyle: {
      borderWidth: 2,
      borderRadius: 2,
      borderColor: '#ddd',
      borderBottomWidth: 0,
      elevation: 2,
      marginLeft: 5,
      marginRight: 5
	}
};

export { Card };
