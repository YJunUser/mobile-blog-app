import React from 'react';
import { Text, View } from 'react-native';
import { Button, Card, Icon } from 'react-native-elements';
import { goWeb } from '../../utils/goWeb';
import { PricingCard } from 'react-native-elements';

export const AboutScreen = () => {


  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
      <Card containerStyle={{ height: '100%' }}>
        <Card.Title style={{ fontSize: 25 }}>全新博客系统</Card.Title>
        <Card.Title>by: 蒋金杭,姚伯骏,何俊辉,申霄剑</Card.Title>
        <Card.Divider />
        <Card.Image source={require('../../assets/image/back.jpg')}>
        </Card.Image>
        <Card.Divider />
        <Text style={{ marginBottom: 10, fontSize: 16 }}>
          你想要的是不是一款速度快、不打扰、够安全、易于分享的网盘？这些需求都会被满足，但这样还不够，我们要让你的每一次使用都充满惊喜和愉悦。
        </Text>

        <PricingCard
          containerStyle={{ borderWidth: 0, shadowColor: '#ffffff' }}
          color="#4f9deb"
          title="完全免费开源"
          price="$0"
          info={['上传下载不限速', '收藏和分享好东西', '你的隐私绝对安全']}
          button={{ title: '查看更多', icon: 'flight-takeoff', onPress: () => goWeb('http://sharer.violetfreesia.com:666/') }}
        />
      </Card>
    </View>
  );
};
