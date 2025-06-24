import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flexGrow: 1,                
    padding: 20,
    backgroundColor: '#f5f5f5',
    justifyContent: 'flex-start',  
    alignItems: 'stretch',        
    width: '100%',                
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#222',
  },
  text: {
    fontSize: 18,
    marginVertical: 10,
    textAlign: 'center',
    color: '#333',
  },
});
