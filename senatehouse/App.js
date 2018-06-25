import React from 'react';
import { StyleSheet, 
         Text, 
         View, 
         TouchableOpacity, 
         AsyncStorage,
         TextInput,
         Button } from 'react-native';

import Amplify, { Auth } from 'aws-amplify'
import AWSConfig from './aws-exports'
Amplify.configure(AWSConfig)

import Tabs from './Tabs'

export default class App extends React.Component {
  state = {
    isAuthenticated: false
  }
  authenticate(isAuthenticated) {
    this.setState({ isAuthenticated })
  }
  render() {
    if(this.state.isAuthenticated) {
      console.log('Auth: ', Auth)
      return(
        <View>
          <Text>We Cool</Text>
        </View>
      )
    }
    return (
      <View style={styles.container}>
        <Tabs 
        screenProps={{
          authenticate: this.authenticate.bind(this)
        }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0c2141',
    justifyContent: 'center',
  },
});
