/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
const colors = [
  '#782AEB',
  '#38ACDD',
  '#57B495',
  '#FF6259',
  '#FFD61E',
  '#82CAB2',
  '#B58DF1',
  '#E9DBFF',
  '#D7F0FA',
  '#D3F5E4',
  '#FFDCDB',
  '#FFF9DB',
  '#DFF2EC',
  '#F5EEFF',
];

const PRIMARY_COLOR = '#001A72';
const ACCENT_COLOR = '#782AEB';
const BACKGROUND_COLOR = '#F8F9FF';
const BORDER_COLOR = '#C1C6E5';
const BACKDROP_COLOR = 'rgba(2, 2, 2, 0.3)';
const gap = 10;

type Props = {
  onPick: (color: string) => void;
};
function AccentPicker({onPick}: Props) {
  return (
    <>
      <Text style={styles.label}>Choose accent</Text>
      <View style={styles.container}>
        {colors.map(color => (
          <TouchableOpacity
            key={color}
            style={[styles.swatch, {backgroundColor: color}]}
            onPress={() => onPick(color)}
          />
        ))}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: gap,
    flex: 1,
    height: 60 / 2,
  },
  label: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: PRIMARY_COLOR,
  },
  swatch: {
    height: (520 - 10 * gap) / 7,
    aspectRatio: 1,
    borderRadius: 4,
  },
});

export default AccentPicker;
