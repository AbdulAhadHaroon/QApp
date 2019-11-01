import * as React from 'react';
import { Text, View, StyleSheet , Button , TouchableOpacity ,ImageBackground , TextInput , ScrollView ,  ToastAndroid } from 'react-native';
import { ImagePicker , Permissions , Camera , Location } from 'expo';
import { connect } from 'react-redux';
import {UserDetail} from '../store/action/action';

class compLocation extends React.Component {

  constructor(){
    super();

    this.state = {
      address:'liyari' ,
      searchLocation : {} ,
      search : false
    }
}


SearchPlace(){
  
  var  c_id = 'U3JL4NIVAGCPRYDHBBQEI151422OGMTYQXPCXRMVLIN5N2HG';
  var  c_sec = 'V4HQM20AGRHPLF32J5HYI0EQ2XE0D3YJP2YIQF0D3RHC4XF4';
  var add = this.state.address;

  fetch(`https://api.foursquare.com/v2/venues/explore?client_id=${c_id}&client_secret=${c_sec}&v=20180323&limit=10&near=Karachi,%20PK&query=${this.state.address}`)
  .then(res=>{ return res.json() })
  .then(myJson => {
    console.log('asasasasas');
    ToastAndroid.show('chala' , ToastAndroid.SHORT);
    var a = JSON.stringify(myJson);
    console.log(a.response);
    //this.setState({searchLocation:data , search:true})
  })
    .catch(function(error) {
      ToastAndroid.show(''+error,ToastAndroid.SHORT);
        console.log(error);
    });
}

  render() {
    let { search , searchLocation , address } = this.state;
    return (
      <ScrollView>
      <ImageBackground style={{height:'100%' , width:'100%'  , backgroundColor:'rgb(73,215,141)' }} > 
        <View>
           <Text style={styles.Text}>Search Location</Text> 
           <TextInput  style={styles.TextInput} placeholder="Enter Your Location" onChangeText={(add) => this.setState({address:add})} />

           <TouchableOpacity  style={styles.Button} onPress={this.SearchPlace = this.SearchPlace.bind(this)} >
              <Text style={{color:'white',top:15 ,fontSize: 20 , fontWeight: 'bold'}} >Search</Text>
            </TouchableOpacity>

            <View>
                {/* {
                    search && 
                    searchLocation.map(val , ind => {
                        return(
                          console.log(val)
                            // <View>
                            //     <Text>{val.location.address}</Text>
                                
                            // </View>
                        )
                    })
                } */}
            </View>

           
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
       phno : state.root.phno ,
       Comapny : state.root.companyInfo
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

export default connect(mapStateToProp, mapDispatchToProp)(compLocation);


