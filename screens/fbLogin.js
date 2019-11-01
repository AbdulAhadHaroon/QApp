import * as React from 'react';
import { Text, View, StyleSheet , Button , Alert ,TouchableOpacity ,  ToastAndroid , ImageBackground , Image , ScrollView , TextInput} from 'react-native';
import { Constants  } from 'expo';
import { connect } from 'react-redux';
import {UserDetail} from '../store/action/action';
import database from '../config/firebase'
import {SmsAndroid} from 'react-native-sms-android'
import firebase from '../config/firebase'

class App extends React.Component {

constructor(){
    super();

    this.state = {
        authUserInfo:null ,
        spno:null , 
        semail:null
    }
}


Done(){
    const { authUserInfo , spno , semail } = this.state;
    
    if(spno.length==11){
     ToastAndroid.show('Ph no must contain 11 digits',ToastAndroid.SHORT);
    }else{

    var skey =  firebase.database().ref().child(`Users/${authUserInfo.id}/`)
              const send = {
                name : authUserInfo.name ,
                id : authUserInfo.id ,
                image : authUserInfo.picture.data.url,
                phno : spno ,
                email : semail
              }
              skey.set(send);

            this.props.getUserinfo(send);
            this.props.navigation.navigate('Home');
        }
    }


 async logIn() {
        try {
          const {
            type,
            token,
            expires,
            permissions,
            declinedPermissions,
          } = await Expo.Facebook.logInWithReadPermissionsAsync('370652423741785', {
            permissions: ['public_profile'],
          });
          if (type === 'success') {
            const response = await fetch(`https://graph.facebook.com/me?fields=id,name,email,birthday,picture.type(large)&access_token=${token}`);
            const userInfo = await response.json();

         firebase.database().ref().child(`Users/${userInfo.id}/phno`).once("value")
        .then(snapshot => {
          if(snapshot.exists()){
            firebase.database().ref(`Users/${userInfo.id}`).on('value', (snapshot2) => {
              
                var finfo = {
                    name : userInfo.name ,
                    image : userInfo.picture.data.url ,
                    id : userInfo.id,
                    phno : snapshot2.val().phno ,
                    email : snapshot2.val().email
                  } 
              
              this.props.getUserinfo(finfo);
              this.props.navigation.navigate('Home');
              ToastAndroid.show('Logged in Sucessfully',ToastAndroid.SHORT);
           
            })      
        } 
         else{
            this.setState({authUserInfo:userInfo}) 
         }
        })        
    } 
     else {
        ToastAndroid.show('Oops ! some thing went wrong while login with facebook ',ToastAndroid.SHORT);
        }
        } catch ({ message }) {
            ToastAndroid.show(`Facebook Login Error: ${message}`,ToastAndroid.SHORT);
        }
      }


  render() {
      const {authUserInfo , spno , semail }=this.state;
      const {navigate} = this.props.navigation;

    return (
<View>
       {authUserInfo==null && 
        <View>
            <ImageBackground source={require('../assets/Q1.png')} style={{height:'100%' , width:'100%' }} >
               <View> 
                    <TouchableOpacity 
                    style={styles.TouchFB}
                    onPress={this.logIn=this.logIn.bind(this)}
                    >
                        <Text
                        style={{color:'white',top:15 ,fontSize: 20 , fontWeight: 'bold'}}
                        >Login With Facebook</Text>
                    </TouchableOpacity>
               </View>
         </ImageBackground>
        </View> }
        
        {authUserInfo!=null && 
        <View >
         <ImageBackground style={{height:'100%' , width:'100%'  , backgroundColor:'rgb(73,215,141)' }} >
            <Text style={styles.UserText} > {`Hello : ${authUserInfo.name} `} </Text> 
            
            <View style={styles.FBimage}>
            <Image source={{ uri : authUserInfo.picture.data.url }} style={{width:100 , height:100 , borderRadius:100 , alignSelf:'center' , top:7 }} />      
            </View>
            
            <TextInput  style={styles.TextInput} placeholder="Enter Phone no" onChangeText={(pno) => this.setState({spno:pno})} />
            <TextInput  style={styles.TextInput} placeholder="Enter Your Email Address" onChangeText={(email) => this.setState({semail:email})} />


            <TouchableOpacity 
                style={styles.TouchButton}
               onPress={this.Done=this.Done.bind(this)}
            >
                <Text
                style={styles.TextButton}
                >Submit</Text>
            
            </TouchableOpacity>
      </ImageBackground>
        </View>    
    }
</View>
    
    );
  }
}

function mapStateToProp(state) {
    return ({
         uid: state.root.userid
    })
  }
  function mapDispatchToProp(dispatch) {
    return ({
         getUserinfo : (info)=>{ dispatch(UserDetail(info))}
    })
  }

  const styles = StyleSheet.create({
    TouchFB:{
        top:'700%' ,
        alignItems:'center', 
        backgroundColor:'rgb(0,132,255)' ,  
        borderColor:'black' ,
        borderWidth: 1, 
        height:60 ,
        marginLeft:'15%' , 
        marginRight:'15%' 
    },  
    TouchButton: {
        marginTop:10 ,
        alignItems:'center', 
        backgroundColor:'rgb(73,215,141)',  
        borderColor:'black' , 
        height:60 , 
        marginLeft:'15%' , 
        marginRight:'15%' , 
        top:'5%',
        borderRadius:10,
        borderWidth: 1,
    },
    TextInput: {
        height: 50 ,
        backgroundColor:'white' ,
        color:'black', 
        borderColor:'black' , 
        borderRadius:10  ,
        margin:10 ,
        top:'5%' , 
        paddingLeft:'5%'
    },
    TextButton:{
        color:'white' ,
        fontSize: 20 , 
        fontWeight: 'bold' , 
        top:15,

    },
    UserText:{
        color:'white', 
        margin:10 , 
        fontSize: 20 , 
        alignSelf:'center',  
        top:'5%'
    },
    FBimage:{
        borderRadius:100 ,  
        alignSelf:'center' ,
        margin:5, 
        width:120 , 
        height:120 , 
        top:'5%' ,  
        borderWidth:2 ,
        borderColor:'black',
        backgroundColor:'white'
        
        
    }
  });
  
  export default connect(mapStateToProp, mapDispatchToProp)(App);
