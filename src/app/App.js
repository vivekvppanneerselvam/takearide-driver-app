import React, { useState, useEffect } from "react";
import { Actions, Scene } from "react-native-router-flux";
import Login from "../modules/login";
import Register from "../modules/register";
import Menu from "../modules/menu";
import Passengers from "../modules/passengers";
import Profile from "../modules/profile";
import ForgetPassword from '../modules/forgotpassword'
import MapView from '../modules/map'
import {
	NavigationContainer, DefaultTheme as NavigationDefaultTheme,
	DarkTheme as NavigationDarkTheme
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, Button, ActivityIndicator, TouchableOpacity, Image } from "react-native";
import { AsyncStorage } from 'react-native';
import { AuthContext } from '../helpers/index'
import { StackNavigationRef } from './Navigation/StackNavigation';
import { StyleSheet } from 'react-native';
const CustomDefaultTheme = {
	...NavigationDefaultTheme,
	colors: {
		...NavigationDefaultTheme.colors,
		background: '#ffffff',
		text: '#333333'
	}
}
const CustomDarkTheme = {
	...NavigationDarkTheme,
	colors: {
		...NavigationDarkTheme.colors,
		background: '#333333',
		text: '#ffffff'
	}
}
const Stack = createStackNavigator();
function App(props) {
	const [isDarkTheme, setIsDarkTheme] = useState(false);
	const theme = isDarkTheme ? CustomDarkTheme : CustomDefaultTheme;
	const initialLoginState = { isLoading: true, userName: null, userToken: null, };

	const loginReducer = (prevState, action) => {
		switch (action.type) {
			case 'RETRIEVE_TOKEN':
				return { ...prevState, userToken: action.token, isLoading: false, };
			case 'LOGIN':
				return { ...prevState, userName: action.id, userToken: action.token, isLoading: false, };
			case 'LOGOUT':
				return { ...prevState, userName: null, userToken: null, isLoading: false, };
			case 'REGISTER':
				return { ...prevState, userName: action.id, userToken: action.token, isLoading: false, };
		}
	};

	const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState);

	const authContext = React.useMemo(() => ({
		signIn: async (foundUser) => {
			console.log('signIn', foundUser);
			const userToken = foundUser.token
			const userName = foundUser.user_id;
			try {
				await AsyncStorage.setItem('userToken', userToken);
			} catch (e) {
				console.log("error set userToken :: App", e);
			}
			dispatch({ type: 'LOGIN', id: userName, token: userToken });
		},
		signOut: async () => {
			try {
				//await props.cleanUp()
				await AsyncStorage.removeItem('userToken');
			} catch (e) {
				console.log("error remove userToken :: App", e);
			}
			dispatch({ type: 'LOGOUT' });
		},
		signUp: () => {

		},
		toggleTheme: () => {
			setIsDarkTheme(isDarkTheme => !isDarkTheme);
		}
	}), []);

	useEffect(() => {
		setTimeout(async () => {
			let userToken;
			userToken = null;
			try {
				userToken = await AsyncStorage.getItem('userToken');
			} catch (e) {
				console.log("error getting userToken :: App", e);
			}
			dispatch({ type: 'RETRIEVE_TOKEN', token: userToken });
		}, 1000);
	}, []);


	if (loginState.isLoading) {
		return (
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<ActivityIndicator size="large" />
			</View>
		);
	}

	console.log("loginState.userToken", loginState.userToken)

	return (
		<AuthContext.Provider value={authContext} >
			<NavigationContainer ref={StackNavigationRef} styles={styles.container}>
				{/* <StatusBar/> */}
				{loginState.userToken !== null ? (
					<MainStackScreen />
				) : <RootStackScreen />}
			</NavigationContainer>
		</AuthContext.Provider>
	)
}

const RootStackScreen = ({ navigation }) => (
	<Stack.Navigator headerMode='none'>
		<Stack.Screen name="Login" component={Login} />
		<Stack.Screen name="Register" component={Register} />
		<Stack.Screen name="ForgotPassword" component={ForgetPassword} />
	</Stack.Navigator>
);

const MainStackScreen = ({ navigation }) => (
	<Stack.Navigator headerMode='none'>
		<Stack.Screen name="Menu" component={Menu} />
		<Stack.Screen name="Profile" component={Profile} />
		<Stack.Screen name="Register" component={Register} />
		<Stack.Screen name="Passengers" component={Passengers} />
		<Stack.Screen name="MapView" component={MapView} />
	</Stack.Navigator>
);

/* const App = Actions.create(
	<Scene key="root" hideNavBar>
		<Scene key="login" component={Login} title="login" initial />
		<Scene key="register" component={Register} title="register" />
		<Scene key="menu" component={Menu} title="menu" />
		<Scene key="profile" component={Profile} title="profile" />
		<Scene key="passenger" component={Passengers} title="passenger" />
	</Scene>

); */

export default App;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
	},
});