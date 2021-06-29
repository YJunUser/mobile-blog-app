import React, { useEffect, useRef, useState } from "react"
import { Alert, FlatList, Text, ToastAndroid, View } from "react-native"
import { ListItem, Button, Overlay, Card } from "react-native-elements"
import { useDeleteShares, useShares } from "../../utils/shares"
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useQueryClient } from "react-query";
import { getShares } from "../../api/sharer";
import Clipboard from '@react-native-community/clipboard';
type sharesItem = {
    code: string; //分享码
    expiredAt: string;
    filename: string;
    id: number;
    isAllowComment: boolean;
    isPublic: boolean;
    password: string;
    shareType: 'article' | 'file' | 'folder';
    url: string;
}

function getIconType(shareType: 'article' | 'file' | 'folder'): { color: string; name: string; } {
    switch (shareType) {
        case 'article': {
            return {
                name: 'article',
                color: '#00bfff'
            }
        }
        case 'file': {
            return {
                name: 'file-copy',
                color: '#7cfc00'
            }
        }
        case 'folder': {
            return {
                name: 'folder',
                color: '#ff4500'
            }
        }
    }
}
const SharerScreen = () => {
    const queryClient = useQueryClient()

    const [refresh, setRefresh] = useState<boolean>(false)
    const [current, setCurrent] = useState<number>(2)
    const [isBottom, setBottom] = useState<boolean>(false)
    const { data: shares, isLoading } = useShares({ current: 1 })
    const { mutateAsync, isLoading: deleteLoading } = useDeleteShares()
    const [records, setRecords] = useState<sharesItem[]>(null)
    const [isVisible, setVisible] = useState<boolean>(false)
    const [isCopyLoaing, setCopyLoading] = useState<boolean>(false)

    const toggleOverlay = () => {
        setVisible(!isVisible);
    };

    useEffect(() => {
        setRecords(shares?.records)
    }, [shares])
    // console.log(records)

    const refreshControl = () => {
        setRefresh(true)
        queryClient.invalidateQueries('sharers')
        setTimeout(() => {
            setRefresh(false)
        }, 1000);
    }

    const loadMore = async () => {
        const res = await getShares({ current: current })
        if (res.data.data.records.length > 0) {
            const newRecords = [...records, ...res.data.data.records]
            setRecords([...newRecords])
            setCurrent(current + 1)
        } else {
            setBottom(true)
        }
    }

    const handleClipboard = async (file: sharesItem) => {
        try {
            setCopyLoading(true)
            const url = file.url
            Clipboard.setString(url)
            ToastAndroid.showWithGravity('已复制到剪切板', ToastAndroid.SHORT, ToastAndroid.CENTER)
            setCopyLoading(false)
        } catch (error) {
            ToastAndroid.showWithGravity(error, ToastAndroid.SHORT, ToastAndroid.CENTER)
        }
    }

    const handleDeleteShares = (id: number) => {
        try {
            Alert.alert('确认删除吗', '删除后不可恢复',
                [
                    {
                        text: "取消",
                    },
                    {
                        text: "确认", onPress: async () => {
                            await mutateAsync(id)
                            ToastAndroid.showWithGravity('删除成功', ToastAndroid.LONG, ToastAndroid.CENTER)
                        }
                    },
                ]
            );

        } catch (error) {
            ToastAndroid.showWithGravity(error, ToastAndroid.SHORT, ToastAndroid.CENTER)
        }
    }

    const renderItem = ({ item }: { item: sharesItem }) => {
        console.log(item)
        const { name, color } = getIconType(item.shareType)
        return (

            <>
                <ListItem.Swipeable

                    leftContent={
                        <Button
                            title="详细信息"
                            icon={{ name: 'info', color: 'white' }}
                            buttonStyle={{ minHeight: '100%' }}
                            onPress={() => setVisible(true)}
                        />

                    }
                    rightContent={
                        <Button
                            title="取消分享"
                            icon={{ name: 'delete', color: 'white' }}
                            buttonStyle={{ minHeight: '100%', backgroundColor: 'red' }}
                            onPress={() => handleDeleteShares(item.id)}
                        />
                    }
                >
                    <Icon name={name} color={color} size={20} />
                    <ListItem.Content>
                        <ListItem.Title>{item.filename}</ListItem.Title>
                        <ListItem.Subtitle>{item.expiredAt}</ListItem.Subtitle>
                    </ListItem.Content>
                    <ListItem.Chevron onPress={() => toggleOverlay()} />
                </ListItem.Swipeable>
                {/**overlay 显示具体信息 */}
                <Overlay isVisible={isVisible} overlayStyle={{ padding: 30, width: '100%', height: '70%', position: 'absolute', bottom: 0 }} onBackdropPress={toggleOverlay}>
                    <View style={{ width: '100%' }}>

                        <Card.Title><Text style={{ fontSize: 20 }}>{item.filename}</Text></Card.Title>
                        <ListItem >
                            <ListItem.Content>
                                <ListItem.Title>到期时间</ListItem.Title>
                                <ListItem.Subtitle>{item.expiredAt}</ListItem.Subtitle>
                            </ListItem.Content>
                        </ListItem>

                        <ListItem >
                            <ListItem.Content>
                                <ListItem.Title>提取码</ListItem.Title>
                                <ListItem.Subtitle>{item.password}</ListItem.Subtitle>
                            </ListItem.Content>
                        </ListItem>

                        <ListItem >
                            <ListItem.Content>
                                <ListItem.Title>是否允许评论</ListItem.Title>
                                <ListItem.Subtitle>{item.isAllowComment ? '是' : '否'}</ListItem.Subtitle>
                            </ListItem.Content>
                        </ListItem>

                        <View style={{ marginTop: 10 }}>
                            <Button
                                icon={
                                    <Icon
                                        name="attach-file"
                                        size={15}
                                        color="white"

                                    />
                                }
                                title={isCopyLoaing ? '稍等...' : "复制链接"}
                                onPress={() => handleClipboard(item)}
                            />
                        </View>
                    </View>
                </Overlay>
            </>
        )
    }
    return (
        <>
            <FlatList
                // 源数据
                data={records}
                // 根据数据渲染的每一行UI
                renderItem={renderItem}
                // 下拉刷新
                refreshing={isLoading || refresh || deleteLoading}
                onRefresh={() => {
                    refreshControl()
                }}
                //设置下拉加载更多的指示器的位置
                progressViewOffset={50}
                // 每一行的key
                keyExtractor={(item) => item.url}
                // 组件为空时渲染
                ListEmptyComponent={
                    <Text style={{ textAlign: "center", marginBottom: 10 }}>暂无数据</Text>}
                // 底部组件
                ListFooterComponent={
                    isBottom && <Text style={{ textAlign: "center", marginBottom: 10 }}>已经到底了</Text>}
                // 上拉加载更多数据
                onEndReachedThreshold={.3}
                onEndReached={() => {
                    loadMore()
                }}>
            </FlatList>
        </>
    )

}

export default SharerScreen