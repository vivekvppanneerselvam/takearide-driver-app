import React, { useState, useEffect } from 'react';

import {
  StyleSheet, Text, View, TextInput, Button,
  TouchableHighlight, TouchableOpacity, Image, Alert, Animated
} from 'react-native';
import styled from 'styled-components';
import { Actions } from 'react-native-router-flux';
import Icon from "react-native-vector-icons/FontAwesome";
import FontAwesome, { SolidIcons, RegularIcons, BrandIcons } from 'react-native-fontawesome';
import { LoginManager, AccessToken } from 'react-native-fbsdk'
import { GoogleSignin, statusCodes } from '@react-native-community/google-signin';
import { AuthContext } from '../../helpers/index'
import { postToken } from './action'
import { connect } from 'react-redux';

const ButtonIcon = styled(Icon).attrs(({ iconName }) => ({
  name: iconName,
  size: 24,
}))`  
  padding:10px;
  color:white;
  margin-left: ${({ iconName }) => (iconName === 'facebook' ? 100 : 100)}px;
`;
const SocialButtonsContainer = styled(View)`  
  justify-content: flex-end;
`;
const DefaultText = styled(Text)`
  font-family: CircularStd-Black;
  margin-right: 100px;
`;
const SocialButtonWrapper = styled(View)`
  width: 100%;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;  
`;

const ContentContainer = styled(View)`
  width: 100%;  
  justify-content: center;
  align-items: center;  
  background-color: ${({ color }) => color};
  border-radius: 4px;
`;


function Login(props) {
  const [state, setState] = useState({ email: '', password: '', })
  const { signIn } = React.useContext(AuthContext);
  const [user, setUser] = useState({ user: null, status: false })

  function handleOnChange(id, value) {
    setState((prevState) => {
      prevState[id] = value
      return ({ ...prevState })
    })
  }
  useEffect(() => {
    console.log("props.token", props.token)
    if (props.token) {
      signIn(props.token)
    }
  }, [props.token])

  const setupGoogleSignin = async () => {
    try {
      //await GoogleSignin.hasPlayServices({ autoResolve: true });
      await GoogleSignin.configure({
        scopes: ['https://www.googleapis.com/auth/drive.readonly'],
        //iosClientId: Constants.GOOGLE_LOGIN_CLIENT_ID_IOS,
        webClientId: '306302754892-jcu9qecunmo2sa61pi3pmeqdmcc45jl8.apps.googleusercontent.com',
        offlineAccess: true
      });
      const user = await GoogleSignin.currentUserAsync();
      console.log("user from google sign in", user);
    } catch (err) {
      console.log("Google signin error", err.code, err.message);
    }
  }

  useEffect(() => {
    //initial configuration
    /*   GoogleSignin.configure({
        //It is mandatory to call this method before attempting to call signIn()
        // scopes: ['https://www.googleapis.com/auth/drive.readonly'],
        // Repleace with your webClientId generated from Firebase console
        webClientId: '306302754892-jcu9qecunmo2sa61pi3pmeqdmcc45jl8.apps.googleusercontent.com',
      }); */
    //Check if user is already signed in
    //this._isSignedIn();
    //this.setupGoogleSignin();
  }, [])



  const onClickListener = (viewId) => {
    if (viewId === 'register') {
      props.navigation.navigate("Register");
      //Actions.register()
    } else if (viewId === 'login') {
      props.postToken(state.email, state.password).then(res => {
        console.log("postToken", res)
        signIn(res.data)
      }).catch(error => {
      })
    } else {
      //Alert.alert("Alert", "Button pressed " + viewId);
      props.navigation.navigate("ForgotPassword");
    }
  }

  const onClickFacebookLogin = () => {
    LoginManager.logInWithPermissions(["public_profile"]).then(
      function (result) {
        if (result.isCancelled) {
          console.log("Login cancelled");
        } else {
          console.log("Login success with permissions: " +
            result.grantedPermissions.toString()
          );
          AccessToken.getCurrentAccessToken().then((data) => {
            callback(data.accessToken)
          }).catch(error => {
            console.log(error)
          })
        }
      }, function (error) {
        console.log("Login fail with error: " + error);
      }
    );
  }

  const _isSignedIn = async () => {
    const isSignedIn = await GoogleSignin.isSignedIn();
    console.log('Please Google Login');
    if (isSignedIn) {
      alert('User is already signed in');
      //Get the User details as user is already signed in
      this._getCurrentUserInfo();
    } else {
      //alert("Please Login");
      console.log('Please Login');
    }
    setUser((prevState) => {
      prevState.user = null
      prevState.status = false
      return ({ ...prevState })
    })

  };
  const _getCurrentUserInfo = async () => {
    try {
      const userInfo = await GoogleSignin.signInSilently();
      console.log('User Info --> ', userInfo);
      setUser((prevState) => {
        prevState.user = userInfo
        prevState.status = true
        return ({ ...prevState })
      })
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_REQUIRED) {
        alert('User has not signed in yet');
        console.log('User has not signed in yet');
      } else {
        alert("Something went wrong. Unable to get user's info");
        console.log("Something went wrong. Unable to get user's info");
      }
    }
  };


  const _signIn = async () => {
    //Prompts a modal to let the user sign in into your application.
    try {
      await GoogleSignin.configure({
        scopes: ['https://www.googleapis.com/auth/drive.readonly'],
        //iosClientId: Constants.GOOGLE_LOGIN_CLIENT_ID_IOS,
        webClientId: '973116196624-l4a72ussc5jv76dokvd018sfa05nj45k.apps.googleusercontent.com',
        offlineAccess: true
      });
      await GoogleSignin.hasPlayServices({
        //Check if device has Google Play Services installed.
        //Always resolves to true on iOS.
        showPlayServicesUpdateDialog: true,
      });
      const userInfo = await GoogleSignin.signIn();
      console.log('User Info --> ', userInfo);
      setUser((prevState) => {
        prevState.user = userInfo
        prevState.status = true
        return ({ ...prevState })
      })
    } catch (error) {
      console.log('Message', error.message);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('User Cancelled the Login Flow');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('Signing In');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('Play Services Not Available or Outdated');
      } else {
        console.log('Some Other Error Happened', error);
      }
    }
  };
  const renderSocialButton = (text, icon, color): Object => {
    return (
      <TouchableOpacity onPress={() => (icon === "facebook") ? onClickFacebookLogin() : _signIn()}>
        <ContentContainer color={color}>
          <SocialButtonWrapper>
            <ButtonIcon iconName={icon} />
            <DefaultText>{text}</DefaultText>
            <View />
          </SocialButtonWrapper>
        </ContentContainer>
      </TouchableOpacity>

    )
  }


  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        {/* <FontAwesome style={styles.inputIcon} icon={SolidIcons.smile} />    */}
        <Icon name="envelope" style={styles.inputIcon} />
        <TextInput style={styles.inputs}
          placeholder="Email"
          keyboardType="email-address"
          underlineColorAndroid='transparent'
          onChangeText={(val) => handleOnChange('email', val)} />
      </View>
      <View style={styles.inputContainer}>
        <Icon name="lock" style={styles.inputIcon} />
        <TextInput style={styles.inputs}
          placeholder="Password"
          secureTextEntry={true}
          underlineColorAndroid='transparent'
          onChangeText={(val) => handleOnChange('password', val)} />
      </View>
      <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={() => onClickListener('login')}>
        <Text style={styles.loginText}>Login</Text>
      </TouchableHighlight>
      <TouchableHighlight style={styles.buttonContainer} onPress={() => onClickListener('restore_password')}>
        <Text>Forgot your password?</Text>
      </TouchableHighlight>
      <TouchableHighlight style={styles.buttonContainer} onPress={() => onClickListener('register')}>
        <Text>Register</Text>
      </TouchableHighlight>
      <SocialButtonsContainer>
        <Animated.View>
          <TouchableOpacity onPress={() => onClickFacebookLogin()}>
            <ContentContainer color={'#3B5998'}>
              <SocialButtonWrapper>
                <ButtonIcon iconName={'facebook'} />
                <DefaultText>{'Login with Facebook'}</DefaultText>
                <View />
              </SocialButtonWrapper>
            </ContentContainer>
          </TouchableOpacity>
          {/* {this.renderSocialButton('Login with Facebook', 'facebook', '#3B5998')} */}

        </Animated.View>
        <Animated.View >
          <TouchableOpacity onPress={() => _signIn()}>
            <ContentContainer color={'#DD4B39'}>
              <SocialButtonWrapper>
                <ButtonIcon iconName={'google-plus'} />
                <DefaultText>{'Login with Google+'}</DefaultText>
                <View />
              </SocialButtonWrapper>
            </ContentContainer>
          </TouchableOpacity>
          {/* {this.renderSocialButton('Login with Google+', 'google-plus', '#DD4B39')} */}

        </Animated.View>
      </SocialButtonsContainer>
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DCDCDC',
  },
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    borderBottomWidth: 1,
    width: 250,
    height: 45,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center'
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: '#FFFFFF',
    flex: 1,
  },
  inputIcon: {
    width: 30,
    height: 30,
    marginLeft: 20,
    marginTop: 10,
    fontSize: 20,
    justifyContent: 'center'
  },
  buttonContainer: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
  },
  loginButton: {
    backgroundColor: "#00b5ec",
  },
  loginText: {
    color: 'white',
  }
});

const mapStateToProps = (state) => {
  return {
    token: state.LoginReducer.user_token
  }
}
export default connect(mapStateToProps, { postToken })(Login)