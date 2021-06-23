import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  content: {
    height: '100%',
    backgroundColor: '#ffffff'
  },
  button: {
    position: 'absolute',
    bottom: 30,
    right: 30,
  },
  folderModal: {
    position: 'absolute',
    top: 10,
    backgroundColor: 'white',
    padding: 20,
    width: '100%',
    height: '100%'
  },
  folderModalContent: {
    alignItems: 'center',
    marginTop: 90,
    width: '100%',
  },
  folderName: { height: 40, backgroundColor: '#dcdcdc', borderRadius: 9, width: '100%', textAlign: 'center', }
})