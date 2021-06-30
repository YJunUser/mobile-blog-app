import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import { View, Text, ToastAndroid } from 'react-native'
import { Card, ListItem, Button, Input, Switch } from 'react-native-elements'
import TouchableScale from 'react-native-touchable-scale'; // https://github.com/kohver/react-native-touchable-scale
import LinearGradient from 'react-native-linear-gradient'; // Only if no expo
import Clipboard from '@react-native-community/clipboard';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useCreateShares } from '../../utils/shares';
import { fileData } from '../../types/file';
import { getDaysBetween } from '../../utils';
import { getSharerType } from './utils';


Date.prototype.format = function (fmt) {
    const o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours() % 12 == 0 ? 12 : this.getHours() % 12, //小时
        "H+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (const k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

export const SharerModal = ({ selectedFiles }: { selectedFiles: fileData[]; }) => {

    const [code, onChangeCode] = useState<string>('')
    const [isAllowComment, setAllow] = useState<boolean>(true)
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [days, setDays] = useState<number>(0)
    const [date, setDate] = useState(null)


    const { mutateAsync, isLoading } = useCreateShares()

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        setDate(date)
        const countDays = getDaysBetween(new Date(), date)
        setDays(parseInt(countDays.toFixed(0)))
        hideDatePicker();
    };

    const handleClipboard = async () => {
        const file = selectedFiles[0]
        console.log(file.id)

        try {
            const res = await mutateAsync({ contentId: file.id, expiredIn: days ? days : null, isAllowComment: isAllowComment, password: code, shareType: getSharerType(file.type) })
            const { url } = res
            Clipboard.setString(url)
            ToastAndroid.showWithGravity('已复制到剪切板', ToastAndroid.SHORT, ToastAndroid.CENTER)
        } catch (error) {
            ToastAndroid.showWithGravity(error, ToastAndroid.SHORT, ToastAndroid.CENTER)
        }
    }


    return (
        <View style={{ width: '100%' }}>
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
                locale='zh-Hans'
            />

            <Card.Title><Text style={{ fontSize: 20 }}>分享</Text></Card.Title>
            <Input
                placeholder='自定义提取码(4~6个字符)'
                leftIcon={{ type: 'ant-design', name: 'lock', size: 16 }}
                clearButtonMode="while-editing"
                style={{ fontSize: 16 }}
                onChangeText={onChangeCode}
                value={code}
            />
            <ListItem
                Component={TouchableScale}
                linearGradientProps={{
                    colors: ['#f0f8ff', '#f5f5dc'],
                    start: { x: 1, y: 0 },
                    end: { x: 0.2, y: 0 },
                }}
                ViewComponent={LinearGradient} // Only if no expo
                onPress={() => { showDatePicker() }}
            >
                <ListItem.Content >
                    <Text>自定义到期日: {date ? JSON.stringify(date.format('yyyy-MM-dd')) : null}</Text>
                </ListItem.Content>
                <ListItem.Chevron color="#000000" />
            </ListItem>


            <ListItem
                Component={TouchableScale}
                linearGradientProps={{
                    colors: ['#ffebcd', '#fff8dc'],
                    start: { x: 1, y: 0 },
                    end: { x: 0.2, y: 0 },
                }}
                ViewComponent={LinearGradient} // Only if no expo
                containerStyle={{ marginTop: 10 }}
            >
                <ListItem.Content
                >
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                        <Text>是否允许评论: </Text>
                        <Switch value={isAllowComment} color="skyblue" onValueChange={setAllow} />
                    </View>
                </ListItem.Content>
            </ListItem>

            <View style={{ marginTop: 10 }}>
                <Button
                    icon={
                        <Icon
                            name="paperclip"
                            size={15}
                            color="white"

                        />
                    }
                    title={isLoading ? '稍等...' : "复制链接"}
                    onPress={() => handleClipboard()}
                />
            </View>


        </View>
    )
}