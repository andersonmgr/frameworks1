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
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#222',
  },
  input: {
    height: 50,
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 15,
    fontSize: 18,
    color: '#000',
  },
  operationsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  updateButton: {
    width: 40,
    height: 40,
    backgroundColor: '#007bff',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  updateButtonText: {
    color: '#fff',
    fontSize: 20,
  },
  operationText: {
    marginBottom: 6,
    fontSize: 16,
    color: '#333',
  },
  emptyText: {
    fontStyle: 'italic',
    color: '#888',
    marginTop: 8,
    fontSize: 16,
  },
  buttonContainer: {
    marginTop: 20,
  },
  logoutButton: {
    marginTop: 10,
  },
});
