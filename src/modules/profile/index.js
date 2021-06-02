import React, { Component } from 'react'
import { StyleSheet, View, Text, SafeAreaView, Image } from 'react-native'
import { facebookService } from '../services/facebookservice'
/* import { Avatar } from 'react-native-elements' */

export default class Profile extends Component {
    constructor(props) {
        super(props)
        this.logout = this.logout.bind(this)
        this.state = {
            profile: null
        }
    }

    componentDidMount() {
        this.loadData()
    }

    async loadData() {
        const profile = await facebookService.fetchProfile();
        this.setState({
            profile: profile
        })
    }

    render() {
        const styles = StyleSheet.create({
            container: {
                backgroundColor: '#F5FCFF',
                padding: 10
            },
            point: {
                paddingTop: 30
            }
        })
        return (

            <View style={styles.container}>
                <ProfileView profile={this.state.profile !== undefined ? this.state.profile : null} />
            </View>

        )
    }

    logout() {
        this.props.navigation.navigate('LoginNavigator')
    }
}

class ProfileView extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        const profile = this.props.profile
        if (profile == null) {
            return <View />
        }

        const styles = StyleSheet.create({
            container: {
                flexDirection: 'row'
            },
            left: {
                paddingRight: 10
            },
            avatar: {

            },
            text: {
                fontSize: 20
            },
            right: {
                flexDirection: 'column',
                justifyContent: 'space-around'
            },
            avatar: {
                width: 130,
                height: 130,
                borderRadius: 63,
                borderWidth: 4,
                borderColor: "white",
                marginBottom: 10,
            }
        })

        return (
            <View style={styles.container}>
                <View style={styles.left}>
                    <Image style={styles.avatar}
                        source={{ uri: profile.avatar }} />
                </View>
                <View style={styles.right}>
                    <Text style={styles.text}>{profile.name}</Text>
                    {facebookService.makeLogoutButton(() => {
                        this.logout()
                    })}
                </View>
            </View>
        )
    }
}