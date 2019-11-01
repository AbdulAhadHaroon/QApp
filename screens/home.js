import * as React from 'react';
import { Text, View, StyleSheet , Button , Alert , Image , TouchableOpacity , ImageBackground} from 'react-native';
import { Constants  } from 'expo';
import { connect } from 'react-redux';
import {UserDetail} from '../store/action/action';

class Home extends React.Component {

 
  render() {
    return (
     <ImageBackground style={{height:'100%' , width:'100%'  , backgroundColor:'rgb(73,215,141)' }} > 
      <View>

       <TouchableOpacity style={styles.TouchButton} onPress={()=>this.props.navigation.navigate('companyHome')}>
         <Text style={styles.TouchText} >Are you a company?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.TouchButton} onPress={()=>this.props.navigation.navigate('userHome')}>        
        <Text style={styles.TouchText} >Are you finding / waiting for tokens ? </Text>
      </TouchableOpacity>

      </View>
    </ImageBackground>
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

 /* TouchButton:{
    marginTop:10 , 
    alignItems:'center',  
    backgroundColor:'rgb(73,215,141)' ,  
    borderRadius:15 , 
    height:60 ,
    marginLeft:'15%' , 
    marginRight:'15%' 
  },*/

  TouchButton:{
    marginTop:10 ,
    alignItems:'center', 
    backgroundColor:'rgb(41,190,113)',  
    borderColor:'black' , 
    height:60 , 
    marginLeft:'10%' , 
    marginRight:'10%' , 
    top:'5%',
    borderRadius:10,
    borderWidth: 2,
  } , 
  TouchText:{
    color:'white' ,
    fontSize: 15 , 
    fontWeight: 'bold' ,  
    top:15
  },
})

export default connect(mapStateToProp, mapDispatchToProp)(Home);


