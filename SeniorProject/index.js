
//Import a library to help create a component
import React from 'react';
import { AppRegistry, View } from 'react-native';
import Header from './src/components/header';
import Card from './src/components/card';
import Button from './src/components/button';


//Create a component
const App = () => (
	<View>
   <Header headerText={'Login'} />
   <Button />
   </View>
  );

//Render it to the device
AppRegistry.registerComponent('SeniorProject', () => App);
