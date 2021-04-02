import React, { useState, useEffect } from 'react';
import { Text, View, FlatList, TouchableOpacity, Image, TextInput, Animated, ToastAndroid } from 'react-native';
import { color } from "../../../utils";
import { Screen } from "../../../constants";
import { listTeamStyles as styles } from "../styles";
import { IconBack, IconDelete, IconSearch, IconTrash, BgEmpty } from "../../../assets/svg/ic_svg";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { scale } from '../../../utils/ScalingUtils';

const RightActions = ({ progress, dragX, bgColor, handleOnPress }) => {
  const scale = dragX.interpolate({
    inputRange: [-100, 0],
    outputRange: [1, 0],
    extrapolate: 'clamp'
  })
  return (
    <TouchableOpacity
      style={styles.bgBtnDel(bgColor)}
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

const ListTeam = ({ navigation, route }) => {
  const { params } = route || {}
  const { data } = params || []
  const [txtSearch, setTxtSearch] = useState('')
  const [dataConst, setDataConst] = useState(data)
  const [listTeam, setListTeam] = useState(dataConst)

  const onChangeText = val => setTxtSearch(val)

  useEffect(() => {
    setListTeam(dataConst?.filter((i) =>
      i?.name?.toLowerCase()?.includes(txtSearch?.toLowerCase())
    ));
  }, [txtSearch])

  const addNew = (newTeam) => {
    setDataConst([...dataConst, newTeam])
    setListTeam([...listTeam, newTeam])
  }

  let row = []
  let prevOpenedRow = null

  const onDellete = (item, index) => {
    setDataConst(dataConst.filter(i => i.id !== item.id))
    setListTeam(listTeam.filter(i => i.id !== item.id))
    closeRow(index)
  }

  const closeRow = (index) => {
    if (prevOpenedRow && prevOpenedRow !== row[index]) {
      prevOpenedRow?.close();
    }
    prevOpenedRow = row[index];
  }

  const renderItem = ({ item, index }) => {
    return (
      <Swipeable
        ref={ref => row[index] = ref}
        useNativeAnimations={true}
        onSwipeableWillOpen={() => closeRow(index)}
        renderRightActions={(progress, dragX) =>
          <RightActions
            progress={progress}
            dragX={dragX}
            bgColor={index % 2 === 0 ? color.white : color.grey}
            handleOnPress={() => onDellete(item)}
          />
        }
      >
        <TouchableOpacity
          style={[styles.myTouchable, { backgroundColor: index % 2 === 0 ? color.grey : color.white }]}
        >
          <Image
            source={{ uri: item?.logo }}
            style={styles.img}
            resizeMode='contain'
          />
          <Text style={styles.txtName}>{item?.name?.toUpperCase()}</Text>
        </TouchableOpacity>
      </Swipeable>
    )
  }

  const emptyComponent = () => {
    return (
      <View style={styles.emptyComponent}>
        <View style={styles.marHor22}>
          <View style={[styles.myRow, styles.jutifyBet]}>
            <BgEmpty />
            <Image source={require('../../../assets/img/ball.png')} style={styles.imgBall} />
            <BgEmpty />
          </View>
          {txtSearch !== '' && <Text style={styles.txtEmpty}>Không có kết quả cho "{txtSearch}"</Text>}
        </View>
      </View>
    )
  }

  const onAddNew = () => {
    navigation.navigate(Screen.ADD_NEW_SCREEN, { addNew })
  }

  const goToRandom = () => {
    if (dataConst && dataConst?.length > 1) {
      navigation.navigate(Screen.WHEEL_SCREEN, { data: dataConst })
    } else {
      ToastAndroid.show('Chọn ít nhất 2 đội bóng', ToastAndroid.LONG)
    }
  }

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.myRow}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <IconBack />
          </TouchableOpacity>
          <View style={styles.txtInputView}>
            <TextInput
              style={styles.textInput}
              onChangeText={onChangeText}
              placeholder={'Tìm kiếm'}
              placeholderTextColor={color.dark_grey}
              value={txtSearch}
            />
            {
              txtSearch === '' ? <IconSearch /> : (
                <TouchableOpacity onPress={() => setTxtSearch('')}>
                  <IconDelete />
                </TouchableOpacity>
              )
            }
          </View>
        </View>
      </View>
      <View style={styles.flex1}>
        <FlatList
          data={listTeam}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          keyExtractor={(contact, index) => String(index)}
          ListEmptyComponent={emptyComponent}
          contentContainerStyle={styles.containerStyles}
        />
        <View style={[styles.myRow, styles.viewBottom]}>
          <TouchableOpacity style={[styles.btnBottom, { borderWidth: 1 }]} onPress={onAddNew}>
            <Text style={[styles.txtBtn, { color: color.violet }]}>+ Thêm đội khác</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.btnBottom, { backgroundColor: color.violet }]} onPress={goToRandom}>
            <Text style={[styles.txtBtn, { color: color.white }]}>Bắt đầu</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
};

export default ListTeam;
