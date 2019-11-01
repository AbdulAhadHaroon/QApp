import * as React from 'react';
import { Text, View, StyleSheet , Button , Alert , Image , TouchableOpacity} from 'react-native';
import { Constants  } from 'expo';
import { connect } from 'react-redux';
import {UserDetail} from '../store/action/action';

class userHome extends React.Component {

  show(){

  }

  render() {
    return (
      <View>
      </View>
    );
  }
}

function mapStateToProp(state) {
  return ({
       name : state.root.name,
       uid : state.root.userid,
       image : state.root.image,
       email : state.root.email,
       phno : state.root.phno
      })
}
function mapDispatchToProp(dispatch) {
  return ({})
}

const styles = StyleSheet.create({

  TouchButton:{
    marginTop:10 , 
    alignItems:'center',  
    backgroundColor:'rgb(73,215,141)' ,  
    borderRadius:15 , 
    height:60 ,
    marginLeft:'15%' , 
    marginRight:'15%' 
  },

  TouchText:{
    color:'white' ,
    fontSize: 15 , 
    fontWeight: 'bold' ,  
    top:15
  },
})

export default connect(mapStateToProp, mapDispatchToProp)(userHome);


