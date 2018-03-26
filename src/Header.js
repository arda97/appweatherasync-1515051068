import React from 'react';
import { Text, View } from 'react-native';

const Header = (props) => {
  return (
    <View style={styles.contHeader}>
      <Text style={styles.textHeader}>
        {props.judul}
      </Text>
    </View>
  );
};

const styles = {
  contHeader: {
    backgroundColor: '#03A9F4',
    justifyContent: 'flex-start',
    padding: 10,
    height: 50
  },

  textHeader: {
    color: '#ffffff',
    fontSize: 20
  }
};

export default Header;
