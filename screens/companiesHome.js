import * as React from 'react';
import { Text, View, StyleSheet , Button , Alert , Image , TouchableOpacity , ImageBackground , ActivityIndicator} from 'react-native';
import { Constants  } from 'expo';
import { connect } from 'react-redux';
import {UserDetail} from '../store/action/action';
import firebase from '../config/firebase'

//import { combineReducers } from '../../../AppData/Local/Microsoft/TypeScript/2.6/node_modules/redux';

class companiesHome extends React.Component {

constructor(){
    super();

    this.state = {
        companies:null ,
        Loader:true , 
    }
}

componentDidMount(){
  this.Retreive()
}

Retreive(){
    firebase.database().ref('companies/'+ this.props.uid).on('value', (snapshot) => {
        this.setState({companies : snapshot.val()})        
      });
}

AddCompany(){
   Alert.alert(
        'Add New Clinic',
        'Do you Want to Add new Clinic',
        [
          {text: 'Yes', onPress: ()=>this.props.navigation.navigate('addComp'), style: 'cancel'},
          {text: 'No', onPress: () => console.log('no')},
        ],
        { cancelable: false }
      )
}

  render() {
      const {companies , Loader } = this.state;
    return ( 
  <ImageBackground style={{height:'100%' , width:'100%'  , backgroundColor:'rgb(73,215,141)' }} >    
      <View>
       <TouchableOpacity style={{ marginTop:4 , height:50 , marginRight:'5%' }} onPress={this.AddCompany=this.AddCompany.bind(this)}>
         <Image style={{alignSelf:'flex-end' , width:40 , height:40 }} source={require('../assets/Add.jpg')} ></Image>
       </TouchableOpacity>

        <View>
        {companies!=null &&
        companies.map(val , index => {
            return(
                <View>
                    <Text> asad </Text>
                    <Text> { val.name } </Text>
                </View>
            )
        })    
        }
        
        {
            Loader && <ActivityIndicator size="large" color="white" />
        }
        
        </View>
      </View> 
  </ImageBackground >  
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

export default connect(mapStateToProp, mapDispatchToProp)(companiesHome);


