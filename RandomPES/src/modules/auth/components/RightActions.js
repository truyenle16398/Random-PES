import React from 'react';
import { StyleSheet, Animated, TouchableOpacity } from 'react-native';
import { scale } from "../../../utils/ScalingUtils";
import { color } from "../../../utils";
import { IconTrash } from "../../../assets/svg/ic_svg";

const RightActions = ({ progress, dragX, index, handleOnPress }) => {
  const scale = dragX.interpolate({
    inputRange: [-100, 0],
    outputRange: [1, 0],
    extrapolate: 'clamp'
  })

  return (
    <TouchableOpacity
      style={styles.bgBtnDel(index)}
      onPress={() => handleOnPress()}
      activeOpacity={0.7}
    >
      <Animated.View
        style={[styles.rightAction, { transform: [{ scale }] }]}
      >
        <IconTrash />
      </Animated.View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  bgBtnDel: (index) => ({
    flex: .25,
    backgroundColor: index % 2 === 0 ? color.white : color.grey
  }),
  rightAction: {
    flex: 1,
    backgroundColor: color.red,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    margin: scale(8),
  },
});

export default RightActions;