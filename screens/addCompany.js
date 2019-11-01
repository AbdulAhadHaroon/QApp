import * as React from 'react';
import { Text, View, StyleSheet , Button , Alert , Image , TouchableOpacity ,ImageBackground , TextInput , ScrollView ,  ToastAndroid } from 'react-native';
import { ImagePicker , Permissions , Camera , Location } from 'expo';
import { connect } from 'react-redux';
import {UserDetail} from '../store/action/action';

class addCompany extends React.Component {

  constructor(){
    super();

    this.state = {
      image: null ,
      location: null,
      hasCameraPermission:null ,
      hasLocationPermission: null,
    }
}

componentDidMount(){
 // this.getPermit();
}

pickImage = async () => {

  let result = await ImagePicker.launchImageLibraryAsync({
    allowsEditing: true,
    aspect: [8, 12],
  });
  if (!result.cancelled) {
    this.setState({ image: result.uri });
  }
}

 getPermit= async ()=> {
  const {hasCameraPermission , location }=this.state;

  // const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL , Permissions.LOCATION);
  // this.setState({ hasCameraPermission: status === 'granted' });
  // ToastAndroid.show('Permission '+status,ToastAndroid.SHORT);

  const { status } = await Permissions.askAsync(Permissions.LOCATION);
  if (status === 'granted') {
    return Location.getCurrentPositionAsync({enableHighAccuracy: true});
  } else {
    throw new Error('Location permission not granted');
    console.log('not given')
  }

  // // const { status2 } = await Permissions.askAsync(Permissions.LOCATION);
  // // if (status2 !== 'granted') {
  // //        ToastAndroid.show('Permission '+status2,ToastAndroid.SHORT);
  // //        console.log('asad' , location); 
  // //       }
  //       const mylocation = await Location.getCurrentPositionAsync({});
  //       this.setState({ location:mylocation });
  //       ToastAndroid.show('Permission '+status2,ToastAndroid.SHORT);
  //       console.log('aaa' , location);
}

  render() {
    let { image } = this.state;
    return (
      <ScrollView>
      <ImageBackground style={{height:'100%' , width:'100%'  , backgroundColor:'rgb(73,215,141)' }} > 
        <View>
           <Text style={styles.Text}>Company Name</Text> 
           <TextInput  style={styles.TextInput} placeholder="Enter Company Name" onChangeText={(pno) => this.setState({spno:pno})} />

           <Text style={styles.Text}>Since</Text>
           <TextInput  style={styles.TextInput} placeholder="How many years before you start" onChangeText={(email) => this.setState({semail:email})} />

           <Text style={styles.Text}>Certificates</Text>
           
           <TouchableOpacity  style={styles.Button} onPress={this.getPermit} >
              <Text style={{color:'white',top:15 ,fontSize: 20 , fontWeight: 'bold'}} >Provide Permissions</Text>
            </TouchableOpacity>
           
           
            <TouchableOpacity  style={styles.Button} onPress={this.pickImage} >
              <Text style={{color:'white',top:15 ,fontSize: 20 , fontWeight: 'bold'}} >Select Image</Text>
            </TouchableOpacity>

           {image &&
            <Image source={{ uri: image }} style={{ width: 200, height: 200 , top:'5%' ,margin:10 ,  alignSelf:'center' }} />}
          
           <Text style={styles.Text}>Timing</Text>
           <TextInput  style={styles.TextInput } placeholder="Enter Timing" onChangeText={(email) => this.setState({semail:email})} />

           <TouchableOpacity  style={styles.ButtonLast} onPress={()=>this.props.navigation.navigate('compLocation')} >
              <Text style={{color:'white',top:15 ,fontSize: 20 , fontWeight: 'bold'}} >Next</Text>
            </TouchableOpacity>

       </View>
      </ImageBackground>
      </ScrollView>
    )
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
  TextInput: {
    height: 50 ,
    backgroundColor:'white' ,
    color:'black', 
    borderColor:'black' , 
    borderRadius:10  ,
    margin:10 , 
    paddingLeft:'5%' ,
    top:'5%'
},
Text:{
  top:'5%',
  paddingLeft:'5%' ,
  fontSize: 20 , 
  fontWeight: 'bold' ,
  color:'white' 
},
Button:{
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
}, 
ButtonLast:{
  marginTop:10 ,
  alignItems:'center', 
  backgroundColor:'rgb(41,190,113)',  
  borderColor:'black' , 
  height:60 , 
  marginLeft:'10%' , 
  marginRight:'10%' ,
  marginBottom:'20%' , 
  top:'5%',
  borderRadius:10,
  borderWidth: 2,
} 
})

export default connect(mapStateToProp, mapDispatchToProp)(addCompany);


