import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { StyleSheet, Text, View, Image, } from 'react-native'
import BackgroundLogin from '../components/backgroundLogin'
import { logUser, getUserGoogle, getUser } from "../../redux/actions/user";

const LoginPage = ({ logUser, navigation, getUserGoogle }) => {
    const [Username, setUsername] = useState("")
    const [Password, setPassword] = useState("")
    const [error, setError] = useState({})

    function clearError(name) {
        if (error.target == name || error.target == "all") setError({})
    }

    const onChangeUser = (e) => { setUsername(e); clearError("email") }
    const onChangePassword = (e) => { setPassword(e); clearError("pass") }

    const Onsubmit = function () {
        logUser(Username, Password)
            .then(err => {
                if (err) return setError(err.target ? err : {});
                navigation.navigate('Home')
            })
    }

    const OnsubmitGoogle = function () {
        getUserGoogle()
            .then(err => {
                if (err) return setError(err.target ? err : {});
                navigation.navigate('Home')
            })
    }

    return (
        <BackgroundLogin
            Username={Username}
            Password={Password}
            onChangePassword={onChangePassword}
            onChangeUser={onChangeUser}
            Onsubmit={Onsubmit}
            error={error}
            OnsubmitGoogle={OnsubmitGoogle}
        >
        </BackgroundLogin>
    )
}

const mapStateToProps = (state, ownProps) => {
    console.log(state);
    return {}
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    logUser: (...params) => dispatch(logUser(...params)),
    getUserGoogle: () => dispatch(getUserGoogle())
})



export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)




