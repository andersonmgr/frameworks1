import { StyleSheet, Dimensions } from 'react-native';
const { width } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    width: width * 0.9,
  },
  label: {
    fontSize: 18,
    marginTop: 20,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginTop: 5,
    width: '100%',
  },
});
