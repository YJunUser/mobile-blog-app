
import React, { useState } from "react"
import { useEffect } from "react";
import { View, StyleSheet } from "react-native"
import { Text, Input, Button } from "react-native-elements"
import Icon from 'react-native-vector-icons/AntDesign';
import { checkEmail } from "../../utils";

export const RegisterScreen = () => {
  const [username, onChangeUsername] = useState<string>('')
  const [password, onChangePassword] = useState<string>('')
  const [confirmPassword, onChangeConfirm] = useState<string>('')
  const [isValid, setValid] = useState<boolean>(false)

  useEffect(() => {
    if (checkEmail(username) && password.length >= 6 && password === confirmPassword) {
      setValid(true)
    } else {
      setValid(false)
    }
  }, [username, password, confirmPassword])

  const handleSubmit = (values: { username: string, password: string }) => {
    // do register here
  }

  return <View style={styles.container}>
    <View style={styles.main}>
      <Text h4 style={{ marginBottom: 10 }}>新用户注册</Text>
      <Input
        placeholder='请输入用户名'
        leftIcon={{ type: 'ant-design', name: 'mail' }}
        clearButtonMode="while-editing"
        onChangeText={onChangeUsername}
        value={username}
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
        icon={
          <Icon
            name="rightcircle"
            size={50}
            color={isValid ? 'skyblue' : 'gray'}
          />
        }
        onPress={() => handleSubmit({ username, password })}
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
    padding: 50,
    alignItems: 'center'
  }
}
)