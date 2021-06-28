
import React from 'react';
import { Image } from 'react-native-elements';
export const GetIcon = ({type} : {type: string}): JSX.Element => {
    switch (type) {
        case 'doc':
            return (<Image source={require('../../assets/image/word.png')} style={{ width: 60, height: 60 }}></Image>)
        case 'excel':
            return (<Image source={require('../../assets/image/excel.png')} style={{ width: 60, height: 60 }}></Image>)
        case 'md':
            return (<Image source={require('../../assets/image/md.png')} style={{ width: 60, height: 60 }}></Image>)
        case 'pdf':
            return (<Image source={require('../../assets/image/word.png')} style={{ width: 60, height: 60 }}></Image>)
        case 'sound':
            return (<Image source={require('../../assets/image/sound.png')} style={{ width: 60, height: 60 }}></Image>)
        case 'txt':
            return (<Image source={require('../../assets/image/txt.png')} style={{ width: 60, height: 60 }}></Image>)
        case 'zip':
            return (<Image source={require('../../assets/image/zip.png')} style={{ width: 60, height: 60 }}></Image>)
        case 'unknown':
            return (<Image source={require('../../assets/image/unknwon.png')} style={{ width: 60, height: 60 }}></Image>)
        case 'execute':
            return (<Image source={require('../../assets/image/exe.png')} style={{ width: 60, height: 60 }}></Image>)
        case 'ppt':
            return (<Image source={require('../../assets/image/ppt.png')} style={{ width: 60, height: 60 }}></Image>)
        case 'image':
            return (<Image source={require('../../assets/image/images.png')} style={{ width: 60, height: 60 }}></Image>)
        // case 'png':
        //     return()
        default:
            return (<Image source={require('../../assets/image/Folder.png')} style={{ width: 60, height: 60 }}></Image>)
    }
}
