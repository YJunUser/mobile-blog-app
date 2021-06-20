import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  modal: {
    position: 'absolute',
    bottom: 10,
    backgroundColor: 'white',
    padding: 20,
    width: '100%'
  },
  closeBtn: {
    position: 'absolute',
    right: 10,
    top: 10
  },
  title: {
    textAlign: 'center',
    fontWeight: 'bold'
  },
  modalContent: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    alignItems: 'center',
    alignContent: 'center'
  },
  modalItem: { justifyContent: 'center', alignItems: 'center', width: '33%', marginTop: 30 }
})