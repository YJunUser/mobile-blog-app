import ImagePicker from 'react-native-image-crop-picker';

export const useCamera = () => {
  const openCamera = async () => {
    const images = await ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    })
    console.log(images)
    return images
  }

  return openCamera
}

export const useImagePicker = () => {
  const openImagePicker = async () => {
    const uploadresult = await ImagePicker.openPicker({
      width: 300, //设定上传图片的宽度
      height: 400, //设定上传图片的高度
      cropperChooseText: '确定',
      cropperCancelText: '取消',
      multiple: false,           //可多选
      cropping: false,          //不可剪切
      //  includeBase64: true,
      compressImageQuality: 0.2,   //照片压缩比例：0.2
    });
    console.log('hhh')
    console.log(uploadresult)
    return uploadresult
  }
  return openImagePicker
}