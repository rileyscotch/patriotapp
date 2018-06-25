import React from 'react';
import { StyleSheet, 
         Text, 
         View, 
         TouchableOpacity, 
         AsyncStorage,
         TextInput,
         Button } from 'react-native';

export default class App extends React.Component {
  state = {
    username: '',
    password: '',
    phone_number: '',
    email: '',
    confirmationCode: ''
  }
  onChangeText(key, value) {
    this.setState({
      [key]: value
    })
  }
  signUp(){
    Auth.signUp({
      username: this.state.username,
      password: this.state.password,
      attributes: {
        email: this.state.email,
        phone_number: this.state.phone_number
      }
    })
    .then(() => console.log('Great Success!'))
    .catch(err => console.log('Error: ', err))
  }

  confirmSignUp() {
    Auth.confirmSignUp(this.state.username, this.state.confirmationCode) 
    .then(() => console.log('Great Success!'))
    .catch(err => console.log('Error: ', err))
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput 
          onChangeText={value => this.onChangeText('username', value)}
          style={styles.input}
          placeholder='Username' 
        />
        <TextInput 
          onChangeText={value => this.onChangeText('password', value)}
          style={styles.input}
          secureTextEntry={true}
          placeholder='Password' 
        /> 
        <TextInput 
          onChangeText={value => this.onChangeText('phone_number', value)}
          style={styles.input}
          placeholder='Phone Number' 
        /> 
        <TextInput 
          onChangeText={value => this.onChangeText('email', value)}
          style={styles.input}
          placeholder='Email' 
        />
        <Button title='Sign Up' onPress={this.signUp.bind(this)}/>
        <TextInput 
          onChangeText={value => this.onChangeText('confirmationCode', value)}
          style={styles.input}
          placeholder='Confirmation Code' 
        />  
        <Button title='Confirm Sign Up' onPress={this.confirmSignUp.bind(this)}/>
      </View>
    );
  }

  // <TouchableOpacity onPress={this.saveData}>
  //         <Text>Save Preferences</Text>
  //       </TouchableOpacity>

  //       <TouchableOpacity onPress={this.displayData}>
  //         <Text>Who am I?</Text>
  //       </TouchableOpacity>

  saveData(){
    let obj = {
      name: 'Jeff Sessions', 
      occupation: 'Keebler Elf',
      address: 'The Big Keebler Tree'
  }
    AsyncStorage.setItem('user', JSON.stringify(obj))
    alert('Good Job')
  }

  displayData = async () => {
    try {
        let user = await AsyncStorage.getItem('user')
        let parsedObj = JSON.parse(user)
        alert(parsedObj.name)
    }

    catch(error) {
      alert(error)

    }
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
    justifyContent: 'center',
  },
});
