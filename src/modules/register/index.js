import React, { useState, useEffect } from "react";
import { View, Text, ImageBackground, Platform, Animated, Keyboard, Alert, TouchableOpacity } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { connect } from 'react-redux'
import { signin } from './action'
import Input from "../../components/Input";
import Button from "../../components/Button";
import {
  validateExistence, validateEmail, validateLength,
  validateLowerCase, validateUpperCase
} from '../../utils/validation'


const INPUT_CONFIG = [
  {
    name: "fullname",
    // validations: [validateLength()]
  },
  {
    name: "email",
    validations: [validateExistence, validateEmail]
  },
  {
    name: "password",
    validations: [validateExistence, validateLength(6, 15), validateLowerCase, validateUpperCase]
  },
  {
    name: "verifyPassword",
    validations: [validateExistence, validateLength(6, 15), validateLowerCase, validateUpperCase]
  },
]

let obj = {
  fullname: '',
  email: '',
  password: '',
  verifyPassword: ''
}
function Register(props) {
  const [form, setForm] = useState(obj)
  const [error, setError] = useState([])

  let formPosition = new Animated.Value(0);
  let animatedTitleTopMargin = new Animated.Value(20);
  let animatedTitleSize = new Animated.Value(30);

  let keyboardWillShowSub = Keyboard.addListener("keyboardWillShow", keyboardWillShow);
  let keyboardWillHideSub = Keyboard.addListener("keyboardWillHide", keyboardWillHide);
  let keyboardDidShowSub = Keyboard.addListener("keyboardDidShow", keyboardWillShow);
  let keyboardDidHideSub = Keyboard.addListener("keyboardDidHide", keyboardWillHide);
  useEffect(() => {
  }, [])

  useEffect(() => {
    return () => {
      keyboardWillShowSub.remove();
      keyboardWillHideSub.remove();
      keyboardDidShowSub.remove();
      keyboardDidHideSub.remove();
    };
  }, []);

  const keyboardWillShow = event => {
    if (Platform.OS == "android") {
      duration = 100;
    } else {
      duration = event.duration;
    }
    Animated.parallel([
      Animated.timing(this.formPosition, {
        duration: duration,
        toValue: -hp("5.25%")
      }),
      Animated.timing(this.animatedTitleTopMargin, {
        duration: duration,
        toValue: 0
      }),
      Animated.timing(this.animatedTitleSize, {
        duration: duration,
        toValue: 50
      })
    ]).start();
  };

  const keyboardWillHide = event => {
    if (Platform.OS == "android") {
      duration = 100;
    } else {
      duration = event.duration;
    }
    Animated.parallel([
      Animated.timing(this.formPosition, {
        duration: duration,
        toValue: 0
      }),
      Animated.timing(this.animatedTitleTopMargin, {
        duration: duration,
        toValue: 20
      }),
      Animated.timing(this.animatedTitleSize, {
        duration: duration,
        toValue: 70
      })
    ]).start();
  };

  function handleOnChange(id, value) {
    setForm((prevState) => {
      prevState[id] = value
      return ({ ...prevState })
    })
  }
  //submit actions
  const handleClick = () => {
    //validate all input 
    let canSubmit = true, errors = []
    for (const input of INPUT_CONFIG) {
      if (!!!input.validations) continue
      for (const v of input.validations) {
        let checkResult = v.check(form[input.name])
        canSubmit = canSubmit && checkResult
        if (!checkResult) {
          errors.push(v.errMsg)
          /*  setError(prevState => {
             [input.name] = v.errMsg
             return ({ ...prevState })
           }) */
          break
        }
        setError(errors)
      }
    }
    if (!canSubmit) {
      Alert.alert('Error', JSON.stringify(error), [{ text: 'Okay' }]);
      console.log('valid fail');
      return
    }
    props.signin(form.fullname, form.email, form.password, form.verifyPassword).then(res => {
      console.log(res)
      Alert.alert('Success', JSON.stringify(res), [{ text: 'Okay' }]);
      props.navigation.navigate('Login')
    }).catch(error => {
      Alert.alert('Error', JSON.stringify(error), [{ text: 'Okay' }]);
    })
  }





  return (
    <View style={{ flex: 1, backgroundColor: "#F6F6F6" }}>
      <Animated.View style={{
        height: hp("18%"), justifyContent: "center",
        paddingHorizontal: hp("2.5%"), marginTop: animatedTitleTopMargin
      }}>
        <Animated.Text style={{ fontSize: animatedTitleSize, fontWeight: "400", opacity: 1 }}>
          Signup.
          </Animated.Text>
      </Animated.View>
      <Animated.View style={{ flex: 1, paddingHorizontal: hp("2.5%"), marginBottom: Platform.OS == "android" ? hp("10%") : null, marginTop: formPosition }}>
        {/* form */}
        <Input label="Your name" placeholder="Enter your full name" onChangeText={(val) => { handleOnChange('fullname', val) }} editable={true} />
        <Input label="Your email address" placeholder="Email address" onChangeText={(val) => { handleOnChange('email', val) }} editable={true} />
        <Input label="Your password" placeholder="Password" onChangeText={(val) => { handleOnChange('password', val) }} editable={true} />
        <Input label="Confirm your password" placeholder="Confirm password" onChangeText={(val) => { handleOnChange('verifyPassword', val) }} editable={true} />
        <Text style={{ fontWeight: "500", color: "gray" }}>Or easily{" "}
          <Text style={{ color: "#F08C4F" }}>connect with facebook</Text>
        </Text>
        <TouchableOpacity onPress={() => props.navigation.navigate('Login')}>
          <Text style={{ color: "#F08C4F" }}>Do you have an account already?</Text>
        </TouchableOpacity>
      </Animated.View>
      <View style={{ flex: 1, paddingHorizontal: hp("2.5%") }}>
        {/* <ImageBackground source={require("../../assets/login_bg_1.jpg")} style={{ flex: 1, width: null, height: hp("72%") }}> */}
        <View style={{ flex: 1, justifyContent: "flex-end", paddingBottom: hp("5%") }}>
          <Button fullWidth onPress={handleClick} backgroundColor="#F08C4F" text="Complete registration" />
        </View>
        {/*         </ImageBackground> */}
      </View>
    </View>
  );
}





const mapStateToProps = (state) => {
  return {
    signin_loading: state.RegisterReducer.signin_loading,
    signin_error: state.RegisterReducer.error
  }
}
export default connect(mapStateToProps, { signin })(Register);
