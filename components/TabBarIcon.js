import { Ionicons, Feather } from '@expo/vector-icons';
import * as React from 'react';

import Colors from '../constants/Colors';

export default function TabBarIcon(props) {
  return (
    <Feather
      name={props.name}
      size={24}
      color={props.color}
    />
  );
}
