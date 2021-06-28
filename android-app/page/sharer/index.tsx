import React from "react"
import { FlatList, View } from "react-native"
import { ListItem, Icon, Button } from "react-native-elements"
import { useShares } from "../../utils/shares"


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

const SharerScreen = () => {


    const { data: shares } = useShares({ current: 1 })
    const records = shares?.records

    const renderItem = ({ item }: { item: sharesItem }) => {
        console.log(item)
        return (
            <ListItem.Swipeable
                leftContent={
                    <Button
                        title="Info"
                        icon={{ name: 'info', color: 'white' }}
                        buttonStyle={{ minHeight: '100%' }}
                    />
                }
                rightContent={
                    <Button
                        title="Delete"
                        icon={{ name: 'delete', color: 'white' }}
                        buttonStyle={{ minHeight: '100%', backgroundColor: 'red' }}
                    />
                }
            >
                <Icon name="My Icon" />
                <ListItem.Content>
                    <ListItem.Title>Hello Swiper</ListItem.Title>
                </ListItem.Content>
                <ListItem.Chevron />
            </ListItem.Swipeable>
        )
    }
    return (
        <FlatList
            data={records}
            renderItem={renderItem}>

        </FlatList>
    )

}

export default SharerScreen