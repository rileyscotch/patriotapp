import React from 'react';
import { StyleSheet, 
         Text, 
         View, 
         TouchableOpacity, 
         AsyncStorage,
         TextInput,
         Button } from 'react-native';

import { Auth } from 'aws-amplify';

export default class App extends React.Component {
  state = {
    username: '',
    password: '',
    confirmationCode: '',
    user: {}
  }
  onChangeText(key, value) {
    this.setState({
      [key]: value
    })
  }
  signIn(){
    const { username, password } = this.state
    Auth.signIn(username, password)
    .then(user => {
        this.setState({ user })
        console.log('CRUSHING IT!')
    })
    .catch(err => console.log('Error: ', err))
  }

  confirmSignIn() {
    Auth.confirmSignIn(this.state.user, this.state.confirmationCode) 
    .then(() => {
        console.log('ALL SIGNED IN!')
        this.props.screenProps.authenticate(true)

    .catch(err => console.log('Error: ', err))
        
    })
}
  render() {
    return (
      <View style={styles.container}>
        <TextInput 
          onChangeText={value => this.onChangeText('username', value)}
          style={styles.input}
          placeholder='Username' 
        />
        
        <Button title='Sign In' onPress={this.signIn.bind(this)}/>
        <TextInput 
          onChangeText={value => this.onChangeText('confirmationCode', value)}
          style={styles.input}
          placeholder='Confirmation Code' 
        />  
        <Button title='Confirm Sign In' onPress={this.confirmSignIn.bind(this)}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    height: 50,
    borderBottomWidth: 2,
    borderBottomColor: '#2e598f',
    margin: 10
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    justifyContent: 'center'
  }
});
