import React from 'react';
import { View, StyleSheet } from 'react-native';
import { scale } from "../../../utils/ScalingUtils";
import { color } from "../../../utils";
import { IconSelectBox } from "../../../assets/svg/ic_svg";

const SelectBox = ({ isCheck }) => {
  return isCheck ? <IconSelectBox /> : <View style={styles.box} />
}

const styles = StyleSheet.create({
  box: {
    width: scale(22),
    height: scale(22),
    borderRadius: scale(2),
    borderWidth: scale(2),
    borderColor: color.dark_grey,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SelectBox;