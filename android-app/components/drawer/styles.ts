import { StyleSheet } from 'react-native'


export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    color: '#ffffff'
  },
  navigationContainer: {
    backgroundColor: '#000000',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 70
  },
  scan: { color: 'white', fontSize: 12, marginRight: 8 },
  button: {
    alignItems: "center",
    justifyContent: 'center',
    backgroundColor: "#a9a9a9",
    height: 30,
    paddingLeft: 8,
    paddingRight: 8,
    borderRadius: 6
  },
  main: {
    marginLeft: 15
  },
  paragraph: {
    fontSize: 18,
    color: '#ffffff',
    fontWeight: 'bold',
    marginBottom: 30
  },
});