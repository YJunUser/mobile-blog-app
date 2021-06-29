import { useNavigation } from "@react-navigation/native";
import React from "react"
import { useEffect } from "react";
import { useState } from "react";
import { View, Pressable } from "react-native"
import { Text, Input, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/AntDesign';
import { useAuth } from "../../context/auth-context";
import { goWeb } from "../../utils/goWeb";
import { styles } from "./styles";

const LoginScreen = () => {
  const [username, onChangeUsername] = useState<string>('')
  const [password, onChangePassword] = useState<string>('')
  const [isValid, setValid] = useState<boolean>(false)
  const [isLoading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')

  const navigation = useNavigation()
  const { login } = useAuth()

  useEffect(() => {
    // 校验格式
    // checkEmail(username) 
    if (password.length >= 6) {
      setValid(true)
    } else {
      setValid(false)
    }
    // 取消按钮的loading
    return () => {
      setLoading(false)
    }
  }, [username, password])

  const handleSubmit = async (values: {
    username: string,
    password: string,
    type: 'username'
  }) => {
    // do login here
    setLoading(true)
    try {
      await login(values);
    } catch (error) {
      setError(error)
    }
    setLoading(false)
    setError(null)
  }

  return <View style={styles.container}>
    <Text h3 style={{ marginTop: 50 }}>ConfigureSystem</Text>
    <Text style={styles.brief}>管理你的所有事</Text>
    <Input
      placeholder='用户名/邮箱'
      leftIcon={{ type: 'ant-design', name: 'mail', size: 20 }}
      clearButtonMode="while-editing"
      onChangeText={onChangeUsername}
      value={username}
    />
    <Input
      placeholder='请输入密码'
      leftIcon={{ type: 'ant-design', name: 'lock', size: 20 }}
      clearButtonMode="while-editing"
      secureTextEntry={true}
      onChangeText={onChangePassword}
      value={password}
      errorMessage={error ? error : ''}
    />
    <View style={styles.buttonGroup}>
      <Pressable onPress={() => { goWeb() }}>
        <Text>关于我们</Text>
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
      onPress={() => handleSubmit({ username, password, type: 'username' })}
      loading={isLoading}
    />
  </View >
}


export default LoginScreen