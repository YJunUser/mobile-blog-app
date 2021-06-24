import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { fileData } from '../../types/file';
import TouchableScale from 'react-native-touchable-scale'; // https://github.com/kohver/react-native-touchable-scale
import { GetIcon } from './file-icon';

interface FileItemProps {
    file: fileData
}
type FileType = 'doc' | 'excel' | 'execute' | 'md' | 'pdf' | 'ppt' | 'sound' | 'txt' | 'unknown' | 'zip'

interface IconProps {
    name: string;
    color: string;
}


export const FileItem = (props: FileItemProps) => {
    const { file } = props

    return (
        <View style={styles.container}>
            <TouchableScale
                style={styles.fileItem} >
                <GetIcon type={file.type}></GetIcon>
                <Text>{file.name}</Text>
            </TouchableScale>
        </View >
    )
}


const styles = StyleSheet.create({
    container: {
        width: '33%', maxWidth: '33%'
    },
    fileItem: {
        padding: 0, margin: 0, justifyContent: 'center', alignItems: 'center'
    }
})
