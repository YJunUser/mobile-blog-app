import React from 'react';
import { Text, View } from 'react-native';
import { Button, Card, Icon } from 'react-native-elements';
import { goWeb } from '../../utils/goWeb';


export const AboutScreen = () => {


  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
      <Card>
        <Card.Title style={{ fontSize: 25 }}>全新博客系统</Card.Title>
        <Card.Title>by: 蒋金杭,姚伯骏,何俊辉,申霄剑</Card.Title>
        <Card.Divider />
        <Card.Image source={require('../../assets/image/back.jpg')}>
        </Card.Image>
        <Text style={{ marginBottom: 10 }}>
          你想要的是不是一款速度快、不打扰、够安全、易于分享的网盘？这些需求都会被满足，但这样还不够，我们要让你的每一次使用都充满惊喜和愉悦。
        </Text>
        <Button
          onPress={goWeb}
          icon={<Icon name='code' color='#ffffff' />}
          buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
          title='查看更多' />
      </Card>
    </View>
  );
};
