import React, { Component } from "react";
import { KeyboardAvoidingView, TouchableOpacity, Image, TextInput, StyleSheet, Text, View } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      loading: false
    };
  }

  async onLoginPress() {
    this.setState({ loading: true });
    const { email, password } = this.state;
    await AsyncStorage.setItem("email", email);
    await AsyncStorage.setItem("password", password);
    this.setState({ loading: false });
    this.props.navigation.navigate("Boiler");
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image style={styles.logo} source={require("./securechat_logo.png")} />
          <Text style={styles.subtext}>SecureChatApp</Text>
        </View>
        <KeyboardAvoidingView style={styles.keyboard}>
          <TextInput
            placeholder="Username"
            placeholderTextColor="rgba(255,255,255,0.7)"
            returnKeyType="next"
            onSubmitEditing={() => this.passwordInput.focus()}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            value={this.state.email}
            onChangeText={email => this.setState({ email })}
          />
          <TextInput
            placeholder="Password"
            placeholderTextColor="rgba(255,255,255,0.7)"
            secureTextEntry
            returnKeyType="go"
            ref={input => (this.passwordInput = input)}
            value={this.state.password}
            onChangeText={password => this.setState({ password })}
          />
          <TouchableOpacity style={styles.buttonContainer} onPress={this.onLoginPress.bind(this)}>
            <LinearGradient colors={['#2980b9', '#2980b9']} style={styles.button}>
              <Text style={styles.buttonText}>Login</Text>
            </LinearGradient>
          </TouchableOpacity>
        </KeyboardAvoidingView>
        <TouchableOpacity onPress={() => this.props.navigation.navigate("Register")}> 
          <Text style={styles.linkText}>Don't have an account? Register</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.props.navigation.navigate("ForgetPassword")}> 
          <Text style={styles.linkText}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#16a085",
    justifyContent: "center",
    padding: 20,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  logo: {
    width: 100,
    height: 100,
  },
  subtext: {
    color: "#fff",
    fontSize: 20,
    marginTop: 10,
  },
  keyboard: {
    marginBottom: 20,
  },
  buttonContainer: {
    borderRadius: 5,
    overflow: 'hidden',
    marginTop: 10,
  },
  button: {
    paddingVertical: 15,
  },
  buttonText: {
    textAlign: "center",
    color: "#FFF",
    fontWeight: "700",
  },
  linkText: {
    color: "#fff",
    textAlign: "center",
    marginTop: 10,
  }
});
