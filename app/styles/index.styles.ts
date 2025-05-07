import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    width: '100%',
    height: '100%',
    backgroundColor: '#f5f5f5',
  },
  input: {
    borderWidth: 1,
    padding: 15,
    marginVertical: 10,
    width: '100%',
    fontSize: 18,
    borderRadius: 8,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    flexWrap: 'wrap',
  },
  result: {
    fontSize: 24,
    textAlign: 'center',
    marginTop: 20,
    fontWeight: 'bold',
  },
});
