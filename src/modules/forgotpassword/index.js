import React, { useState, useEffect } from 'react'
import { View, Text, TextInput, TouchableOpacity, Image, ImageBackground, Platform, Animated, Keyboard, Alert, StyleSheet } from "react-native";
import { validateExistence, validateEmail } from '../../utils/validation'
import { checkResetToken, resetPassword, forgotpassword } from './action'
import { connect } from 'react-redux'
import Icon from "react-native-vector-icons/FontAwesome";

const INPUT_CONFIG = [
    {
        name: "email",
        validations: [validateExistence, validateEmail]
    }
]

function ForgotPassword(props) {
    const [form, setForm] = useState({ email: '' })
    const [checkToken, setCheckToken] = useState(false)
    const [resetFlg, setResetFlg] = useState(false)
    const [reset, setReset] = useState({ otp: '', password: '', confirmpassword: '' })
    function handleOnChange(id, value) {
        setForm((prevState) => {
            prevState[id] = value
            return ({ ...prevState })
        })
    }

    function handleOnChangeReset(id, value) {
        setReset((prevState) => {
            prevState[id] = value
            return ({ ...prevState })
        })
    }
    useEffect(() => {
        console.log("props.token", props.token)
        if (props.token) {

        }
    }, [props.token])

    useEffect(() => {
        if (!props.reset_password_loading) {
            if (!props.reset_password.toJS().error) {
                Alert.alert('Success', props.reset_password.toJS().data, [{ text: 'Okay' }]);
            } else {
                Alert.alert('Error', props.reset_password.toJS().data, [{ text: 'Okay' }]);
            }
        }
    }, [props.reset_password_loading])

    const onClickListener = (viewId) => {
        if (viewId === 'submit') {
            props.forgotpassword(form).then(res => {
                setResetFlg(true)
                Alert.alert('Success', res, [{ text: 'Okay' }]);
            }).catch(error => {
                Alert.alert('Error', error, [{ text: 'Okay' }]);
            })
        } else if (viewId === 'register') {
            props.navigation.navigate("Register");
        } else if (viewId === 'reset') {
            let obj = {
                email: form.email,
                otp: reset.otp,
                password: reset.password
            }
            props.resetPassword(obj)
        } else {
            props.navigation.navigate("Login");
        }
    }
    return (
        <View style={styles.container}>
            {!resetFlg && <View>
                <Image style={styles.bgImage} source={{ uri: "https://lorempixel.com/900/1400/nightlife/2/" }} />
                <View style={styles.inputContainer}>
                    <TextInput style={styles.inputs}
                        placeholder="Email"
                        keyboardType="email-address"
                        underlineColorAndroid='transparent'
                        onChangeText={(val) => handleOnChange('email', val)} />
                    <View style={{ paddingHorizontal: 10 }}>
                    <Icon name="envelope" style={styles.inputIcon} />
                        {/* <MaterialIcons name="email" size={24} color="black" /> */}
                        </View>
                </View>
                <TouchableOpacity style={[styles.buttonContainer, styles.loginButton]} onPress={() => onClickListener('submit')}>
                    <Text style={styles.loginText}>Submit</Text>
                </TouchableOpacity>
                <View style={{ flexDirection: 'row', paddingBottom: 10 }}>
                    <TouchableOpacity onPress={() => onClickListener('login')}>
                        <Text style={styles.btnText}>Login</Text>
                    </TouchableOpacity>
                    <Text style={{ paddingHorizontal: 25 }}>|</Text>
                    <TouchableOpacity onPress={() => onClickListener('register')}>
                        <Text style={styles.btnText}>Register</Text>
                    </TouchableOpacity>
                </View>
            </View>}
            <View>
                <View style={{ flexDirection: 'row', paddingVertical: 10 }}>
                    <Text >Mail Id: {form.email}</Text>
                </View>
                <View style={{ flexDirection: 'row', paddingBottom: 10 }}>
                    <Text style={{ paddingVertical: 10 }}>Enter OTP :</Text>
                    <TextInput style={{ height: 45, width: 100, marginLeft: 16, borderColor: 'gray', borderWidth: 1 }}
                        placeholder="OTP"
                        underlineColorAndroid='transparent'
                        onChangeText={(val) => handleOnChangeReset('otp', val)} />
                </View>
                <View style={styles.inputContainer}>
                    <TextInput style={styles.inputs}
                        placeholder="Enter new password"
                        secureTextEntry={true}
                        underlineColorAndroid='transparent'
                        onChangeText={(val) => handleOnChangeReset('password', val)} />

                    <View style={{ paddingHorizontal: 10 }}>
                        <Icon name="key" style={styles.inputIcon} />
                        {/* <FontAwesome5 name="key" size={24} color="black" /> */}
                    </View>
                </View>
                <View style={styles.inputContainer}>
                    <TextInput style={styles.inputs}
                        placeholder="Confirm new password"
                        secureTextEntry={true}
                        underlineColorAndroid='transparent'
                        onChangeText={(val) => handleOnChangeReset('confirmpassword', val)} />
                    <View style={{ paddingHorizontal: 10 }}>
                        <Icon name="key" style={styles.inputIcon} />
                        {/* <FontAwesome5 name="key" size={24} color="black" /> */}
                    </View>
                </View>
                <TouchableOpacity style={[styles.buttonContainer, styles.loginButton]} onPress={() => onClickListener('reset')}>
                    <View><Text style={styles.loginText}>Reset</Text></View>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const mapStateToProps = (state) => {
    return {
        forgotpwd_loading: state.ForgetPasswordReducer.forgotpwd_loading,
        forgotpwd_error: state.ForgetPasswordReducer.error,
        reset_password_loading: state.ForgetPasswordReducer.getIn(['reset_password', 'loading'], true),
        reset_password: state.ForgetPasswordReducer.getIn(['reset_password'], Map)
    }
}

export default connect(mapStateToProps, { forgotpassword, resetPassword })(ForgotPassword)


const resizeMode = 'center';

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
        width: 300,
        height: 45,
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: "#808080",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
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
        marginRight: 15,
        justifyContent: 'center'
    },
    buttonContainer: {
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        width: 300,
        borderRadius: 30,
        backgroundColor: 'transparent'
    },
    btnForgotPassword: {
        height: 15,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        marginBottom: 10,
        width: 300,
        backgroundColor: 'transparent'
    },
    loginButton: {
        backgroundColor: "#00b5ec",

        shadowColor: "#808080",
        shadowOffset: {
            width: 0,
            height: 9,
        },
        shadowOpacity: 0.50,
        shadowRadius: 12.35,

        elevation: 19,
    },
    loginText: {
        color: 'white',
    },
    bgImage: {
        flex: 1,
        position: 'absolute',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
    },
    btnText: {
        color: "white",
        fontWeight: 'bold'
    }
});

