import React, { useState, useEffect } from 'react';
import { Text, View, FlatList, TouchableOpacity, Image, TextInput, ToastAndroid } from 'react-native';
import { color } from "../../../utils";
import { Screen } from "../../../constants";
import { listTeamStyles as styles } from "../styles";
import { IconBack, IconDelete, IconSearch, BgEmpty } from "../../../assets/svg/ic_svg";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { RightActions } from "../components";

const ListTeam = ({ navigation, route }) => {
  const { params } = route || {}
  const { data } = params || []
  const [txtSearch, setTxtSearch] = useState('')
  const [dataConst, setDataConst] = useState(data)
  const [listTeam, setListTeam] = useState(dataConst)
  let row = []
  let prevOpenedRow = null

  const onChangeText = val => setTxtSearch(val)
  const keyExtractor = (contact, index) => String(index)
  const goBack = () => navigation.goBack()

  useEffect(() => {
    setListTeam(dataConst?.filter(e => e?.name?.toLowerCase()?.includes(txtSearch?.toLowerCase())));
  }, [txtSearch])

  const addNew = (newTeam) => {
    setDataConst([newTeam, ...dataConst])
    setListTeam([newTeam, ...listTeam])
  }

  const onDelete = (item, index) => () => {
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
            index={index}
            dragX={dragX}
            progress={progress}
            handleOnPress={onDelete(item)}
          />
        }
      >
        <TouchableOpacity style={styles.myTouchable(index)} >
          <Image source={{ uri: item?.logo }} style={styles.img} resizeMode='contain' />
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
      navigation.navigate(Screen.WHEEL_SCREEN, { data: dataConst.sort(() => Math.random() - 0.5) })
    } else {
      ToastAndroid.show('Chọn ít nhất 2 đội bóng', ToastAndroid.LONG)
    }
  }

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.myRow}>
          <TouchableOpacity onPress={goBack} style={styles.pading12}><IconBack /></TouchableOpacity>
          <View style={styles.txtInputView}>
            <TextInput
              maxLength={30}
              value={txtSearch}
              placeholder={'Tìm kiếm'}
              style={styles.textInput}
              onChangeText={onChangeText}
              placeholderTextColor={color.dark_grey}
            />
            {
              !txtSearch
                ? <IconSearch />
                : <TouchableOpacity style={styles.pading12} onPress={() => onChangeText('')}><IconDelete /></TouchableOpacity>
            }
          </View>
        </View>
      </View>
      {/* CONTENT */}
      <View style={styles.flex1}>
        {/* LIST CLUB */}
        <FlatList
          data={listTeam}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          ListEmptyComponent={emptyComponent}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.containerStyles}
        />
        {/* BOTTOM */}
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
