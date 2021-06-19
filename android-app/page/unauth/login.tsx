import { useNavigation } from "@react-navigation/native";
import React from "react"
import { useEffect } from "react";
import { useState } from "react";
import { View, Pressable } from "react-native"
import { Text, Input, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/AntDesign';
import { useAuth } from "../../context/auth-context";
import { checkEmail } from "../../utils";
import { styles } from "./styles";

const LoginScreen = () => {
  const [username, onChangeUsername] = useState<string>('')
  const [password, onChangePassword] = useState<string>('')
  const [isValid, setValid] = useState<boolean>(false)
  const [isLoading, setLoading] = useState<boolean>(false)

  const navigation = useNavigation()
  const { login } = useAuth()

  useEffect(() => {
    if (checkEmail(username) && password.length >= 6) {
      setValid(true)
    } else {
      setValid(false)
    }
    return () => {
      setLoading(false)
    }
  }, [username, password])

  const handleSubmit = async (values: {
    username: string,
    password: string
  }) => {
    // do login here
    setLoading(true)
    await login(values);
  }

  return <View style={styles.container}>
    <Text h3 style={{ marginTop: 50 }}>ConfigureSystem</Text>
    <Text style={styles.brief}>管理你的所有事</Text>
    <Input
      placeholder='邮箱'
      // label='用户名'
      leftIcon={{ type: 'ant-design', name: 'mail' }}
      clearButtonMode="while-editing"
      onChangeText={onChangeUsername}
      value={username}
    />
    <Input
      // label='密码'
      placeholder='请输入密码'
      leftIcon={{ type: 'ant-design', name: 'lock' }}
      clearButtonMode="while-editing"
      secureTextEntry={true}
      onChangeText={onChangePassword}
      value={password}
    />
    <View style={styles.buttonGroup}>
      <Pressable onPress={() => { navigation.navigate('RegisterScreen') }}>
        <Text>忘记密码</Text>
      </Pressable>
      <Pressable onPress={() => { navigation.navigate('RegisterScreen') }}>
        <Text>新用户注册</Text>
      </Pressable>
    </View>
    <Button
      type='clear'
      disabled={!isValid}
      icon={
        <Icon
          name="rightcircle"
          size={50}
          color={isValid ? 'skyblue' : 'gray'}
        />
      }
      onPress={() => handleSubmit({ username, password })}
      loading={isLoading}
    />
  </View >
}


export default LoginScreen