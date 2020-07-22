import * as React from 'react';
import { Text } from 'react-native';

export function SText(props) {
  return <Text {...props} style={[props.style, { fontFamily: 'poppins', }]} />;
}
