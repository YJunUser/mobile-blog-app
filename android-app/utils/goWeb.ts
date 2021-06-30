import { Linking, ToastAndroid } from "react-native";


export const goWeb = (url: string) => {
    // const baiduUrl = 'http://www.baidu.com/'
    Linking.canOpenURL(url).then(supported => {
        if (!supported) {
            ToastAndroid.showWithGravity('抱歉,你的手机不支持跳转', ToastAndroid.SHORT, ToastAndroid.CENTER)
        } else {
            return Linking.openURL(url);
        }
    }).catch(err => {
        ToastAndroid.showWithGravity(err, ToastAndroid.SHORT, ToastAndroid.CENTER)
    })
}