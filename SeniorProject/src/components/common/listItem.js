import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Button } from './index';

class ListItem extends Component {
  render() {
    return (
      <View style={styles.listItem}>
        <Button buttonText={this.props.item.name}></Button>
      </View>
    );
  }
}

const styles = {
  listItem: {
    borderBottomColor: '#eee',
    borderColor: 'gray',
    flexDirection:'row',
    alignItems:'center',
    borderWidth: 1,
    padding: 5
  },
}

export { ListItem };

        //need to add props of respective person to onButtonPress so it
        //redirects to personal page for that person
        