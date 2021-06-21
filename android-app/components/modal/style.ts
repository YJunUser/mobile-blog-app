import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  modal: {
    position: 'absolute',
    bottom: 10,
    backgroundColor: 'white',
    padding: 20,
    width: '100%'
  },
  rightCom: {
    position: 'absolute',
    right: 10,
    top: 18
  },
  leftCom: {
    position: 'absolute',
    left: 10,
    top: 18
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
  modalItem: { justifyContent: 'center', alignItems: 'center', width: '33%', marginTop: 30 },
  modalItemTitle: { marginTop: 10, fontSize: 12 }
})