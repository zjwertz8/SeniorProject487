import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Button } from './index';

class ListItem extends Component {
  render() {
    return (
      <View style={styles.listItem}>
        <Button buttonText={this.props.item} onPress={this.props.onPress}></Button>
      </View>
    );
  }
}

const styles = {
  listItem: {
    borderBottomColor: '#eee',
    borderColor: 'pink',
    flexDirection:'row',
    alignItems:'center',
    borderWidth: 2,
    padding: 5
  },
}

export { ListItem };
