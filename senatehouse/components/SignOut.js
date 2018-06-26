import React from 'react';
import { StyleSheet, 
         Text, 
         View, 
         TouchableOpacity, 
         AsyncStorage,
         TextInput,
         Button } from 'react-native';

import { Auth } from 'aws-amplify';

Auth.signOut()
    .then(data => console.log(data))
    .catch(err => console.log(err));

