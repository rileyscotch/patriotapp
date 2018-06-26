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
    email: '',
    password: '',
    user: {}
  }
  onChangeText(key, value) {
    this.setState({
      [key]: value
    })
  }
  signIn(){
    const { email, password } = this.state
    Auth.signIn(email, password)
    .then(user => {
        this.setState({ user })
        console.log('CRUSHING IT!')
        this.screenProps.authenticate(true)
    })
    .catch(err => console.log('Error: ', err))
  }
  confirmSignIn() {
    Auth.confirmSignIn(this.state.user, this.state.confirmationCode) 
    .then(() => { 
        console.log('ALL SIGNED IN!')
        
    })
    .catch(err => console.log('Error: ', err)) 
    }
  render() {
    return (
      <View style={styles.container}>
        <TextInput 
          onChangeText={value => this.onChangeText('email', value)}
          style={styles.input}
          placeholder='Email' 
        />
        <TextInput 
          onChangeText={value => this.onChangeText('password', value)}
          style={styles.input}
          secureTextEntry={true}
          placeholder='Password' 
        />
        <Button title='Sign In' onPress={this.signIn.bind(this)}/>
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
