
import React, { useState } from "react"
import { useEffect } from "react";
import { View, StyleSheet } from "react-native"
import { Text, Input, Button } from "react-native-elements"
import Icon from 'react-native-vector-icons/AntDesign';
import { getEmailCode } from "../../api/auth";
import { useAuth } from "../../context/auth-context";
import { UserRegister } from "../../types/auth";
import { useCountDown } from "../../utils";

const RegisterScreen = () => {
  const [username, onChangeUsername] = useState<string>('')
  const [email, onChangeEmail] = useState<string>('')
  const [password, onChangePassword] = useState<string>('')
  const [confirmPassword, onChangeConfirm] = useState<string>('')
  const [identifyCode, onChangeCode] = useState<string>('')
  const [isValid, setValid] = useState<boolean>(false)
  const [error, setError] = useState<string>('')
  const { count, onGetCaptcha, clear } = useCountDown()
  const [isLoading, setLoading] = useState<boolean>(false)
  const { register } = useAuth()

  useEffect(() => {
    if (password.length >= 6 && password === confirmPassword) {
      setValid(true)
    } else {
      setValid(false)
    }
  }, [username, password, confirmPassword])

  useEffect(() => {
    return () => {
      clear()
    }
  }, [])

  const handleSubmit = async (values: UserRegister) => {
    setLoading(true)
    try {
      await register(values)
    } catch (error) {
      setError(error)
    }
    setLoading(false)
    setError(null)
  }

  const handleIdentifyingCode = async () => {
    onGetCaptcha()
    try {
      await getEmailCode(email)
    } catch (error) {
      setError(error)
    }
  }

  return <View style={styles.container}>
    <View style={styles.main}>
      {
        error ? <Text h4 style={{color: 'red'}}>{error}</Text> : null
      }
      <Text h4 style={{ marginBottom: 10 }}>新用户注册</Text>
      <Input
        placeholder='请输入昵称'
        leftIcon={{ type: 'ant-design', name: 'user' }}
        clearButtonMode="while-editing"
        onChangeText={onChangeUsername}
        value={username}
      />
      <Input
        placeholder='请输入邮箱'
        leftIcon={{ type: 'ant-design', name: 'mail' }}
        clearButtonMode="while-editing"
        onChangeText={onChangeEmail}
        value={email}
      />
      <Input
        placeholder='请输入验证码'
        clearButtonMode="while-editing"
        rightIcon={<Text style={{ color: '#6495ed' }} onPress={handleIdentifyingCode}>{count ? count : '获取验证码'}</Text>}
        onChangeText={onChangeCode}
        value={identifyCode}
      />
      <Input
        labelStyle={{ marginTop: 10 }}
        placeholder='请输入密码'
        leftIcon={{ type: 'ant-design', name: 'lock' }}
        clearButtonMode="while-editing"
        secureTextEntry={true}
        onChangeText={onChangePassword}
        value={password}
      />
      <Input
        labelStyle={{ marginTop: 10 }}
        placeholder='再次确认密码'
        leftIcon={{ type: 'ant-design', name: 'lock' }}
        clearButtonMode="while-editing"
        secureTextEntry={true}
        errorMessage={password !== confirmPassword ? '两次密码输入不一致' : ''}
        onChangeText={onChangeConfirm}
        value={confirmPassword}
      />
      <Button
        type='clear'
        disabled={!isValid}
        loading={isLoading}
        icon={
          <Icon
            name="rightcircle"
            size={50}
            color={isValid ? 'skyblue' : 'gray'}
          />
        }
        onPress={() => handleSubmit({ nickname: username, password, email, signUpCode: identifyCode })}
      />
    </View>

  </View>
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: 'white'
  },
  main: {
    padding: 20,
    alignItems: 'center'
  }
}
)

export default RegisterScreen