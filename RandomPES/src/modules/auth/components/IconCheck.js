import React from 'react';
import { View, StyleSheet } from 'react-native';
import { scale } from "../../../utils/ScalingUtils";
import { color } from "../../../utils";
import { IconTick } from "../../../assets/svg/ic_svg";

const IconCheck = () => {
  return (
    <View style={[styles.iconTick, styles.myShadow]}>
      <IconTick />
    </View>
  )
}
const styles = StyleSheet.create({
  myShadow: {
    shadowColor: color.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  iconTick: {
    backgroundColor: color.white,
    height: scale(25),
    width: scale(25),
    borderRadius: scale(13),
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 8,
    right: 8,
  },
});
export default IconCheck;