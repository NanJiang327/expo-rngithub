import React, { useState, useCallback } from 'react';
import { StyleSheet, Pressable } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { shadeColor } from '../action/utils';

const CheckBox = ({ disabled = false, value, index, onToggle, theme }) => {
  const [checked, setChecked] = useState(value);

  const onValueChange = useCallback(() => {
    setChecked(!checked);
    onToggle(!checked, index);
  }, [onToggle, checked, index]);

  return (
    <Pressable
      style={[
        styles.checkboxBase,
        { borderColor: shadeColor(theme, 20) },
        checked && { backgroundColor: theme, borderColor: theme },
      ]}
      onPress={onValueChange}
    >
      {checked && (
        <MaterialCommunityIcons name="check-bold" size={20} color="white" />
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  checkboxBase: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderWidth: 2,
    backgroundColor: 'transparent',
  },
});

export default CheckBox;
