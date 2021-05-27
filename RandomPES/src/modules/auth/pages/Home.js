import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  ToastAndroid,
  Platform,
  Alert
} from 'react-native';
import { color } from "../../../utils";
import { Screen, DATA } from "../../../constants";
import { IconHeader } from "../../../assets/svg/ic_svg";
import { homeStyles as styles } from "../styles";
import SplashScreen from 'react-native-splash-screen'
import { IconCheck, SelectBox } from "../components";

const Home = ({ navigation }) => {
  const [data, setData] = useState(DATA)
  const [allClub, setAllClub] = useState(false)
  const [allNational, setAllNational] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 1000);
  }, [])

  useEffect(() => {
    let isAllClub = true, isAllNational = true
    data.map((item) => {
      if (!item.select) {
        item.type === 'CLUB'
          ? isAllClub = false
          : isAllNational = false
      }
    })
    setAllNational(isAllNational)
    setAllClub(isAllClub)
  }, [data])

  const keyExtractor = (contact, index) => String(index)

  const onPressTouchable = (e) => {
    setData((prev) => {
      let temp = prev.map((item) => {
        if (e.id === item.id) {
          return { ...item, select: !item.select }
        }
        return item
      })
      return temp
    })
  }

  const renderTouchable = ({ item }) => {
    return (
      <TouchableOpacity activeOpacity={0.7} style={[styles.myTouchable, styles.myShadow]} onPress={() => onPressTouchable(item)}>
        <Image source={{ uri: item?.img }} style={styles.btnImg} />
        {item?.select && <IconCheck />}
      </TouchableOpacity>
    )
  }

  const onSetData = (param) => {
    setData((prev) => {
      let temp = prev.map((item) => {
        if (item.type === param) {
          return { ...item, select: param === 'CLUB' ? !allClub : !allNational }
        }
        return item
      })
      return temp
    })
  }

  const onSelectAllClub = () => {
    setAllClub(!allClub)
    onSetData('CLUB')
  }

  const onSelectAllClubNational = () => {
    setAllNational(!allNational)
    onSetData('NATIONAL')
  }

  const onPressNext = () => {
    let arr = []
    data.filter(item => item.select).map((i) => arr = [...arr, ...i.list_team])
    if (arr.length > 0) {
      navigation.navigate(Screen.LIST_TEAM_SCREEN, { data: arr })
    } else {
      if (Platform.OS === 'ios') {
        Alert.alert('Chưa chọn đội nào', 'Chọn ít nhất 1 giải đấu');
      } else {
        ToastAndroid.show('Chưa chọn đội nào', ToastAndroid.SHORT)
      }
    }
  }

  const headerComponent = () => {
    return (
      <View style={[styles.myRow, styles.titleView]}>
        <Text style={styles.txtTitle}>Giải đấu</Text>
        <TouchableOpacity onPress={onSelectAllClub} style={styles.btnSelect}>
          <SelectBox isCheck={allClub} />
        </TouchableOpacity>
      </View>
    )
  }

  const footerComponent = () => {
    return (
      <View>
        <View style={[styles.myRow, styles.titleView]}>
          <Text style={styles.txtTitle}>Giải đấu</Text>
          <TouchableOpacity onPress={onSelectAllClubNational} style={styles.btnSelect}>
            <SelectBox isCheck={allNational} />
          </TouchableOpacity>
        </View>
        <FlatList
          numColumns={2}
          keyExtractor={keyExtractor}
          renderItem={renderTouchable}
          data={data.filter(e => e.type === 'NATIONAL')}
        />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={[styles.header, styles.myRow]}>
        <View style={styles.myRow}>
          <IconHeader />
          <Text style={styles.txtHeader}>Chọn giải đấu</Text>
        </View>
        <TouchableOpacity onPress={onPressNext} style={styles.btnNext}>
          <Text style={[styles.txtHeader, { color: color.violet }]}>Tiếp theo</Text>
        </TouchableOpacity>
      </View>
      {/* CONTENT */}
      <View style={styles.content}>
        <FlatList
          numColumns={2}
          keyExtractor={keyExtractor}
          renderItem={renderTouchable}
          ListHeaderComponent={headerComponent}
          ListFooterComponent={footerComponent}
          data={data.filter(e => e.type === 'CLUB')}
        />
      </View>
    </View>
  )
};

export default Home;
