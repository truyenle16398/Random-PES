import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  ToastAndroid,
  Platform,
  Alert,
} from 'react-native';
import { color } from "../../../utils";
import { Screen } from "../../../constants";
import { IconHeader, IconSelectBox, IconTick } from "../../../assets/svg/ic_svg";
import { homeStyles as styles } from "../styles";
import { useSelector } from 'react-redux';
import SplashScreen from 'react-native-splash-screen'
import Sound from "react-native-sound";

const SelectBox = ({ isCheck }) => {
  return (
    <>
      {
        isCheck ? <IconSelectBox /> : <View style={styles.box} />
      }
    </>
  )
}

const IconCheck = () => {
  return (
    <View style={[styles.iconTick, styles.myShadow]}>
      <IconTick />
    </View>
  )
}

const Home = ({ navigation }) => {
  const authReducer = useSelector(state => state.authReducer)
  const { list_data } = authReducer || []
  const [data, setData] = useState(list_data)
  const [allClub, setAllClub] = useState(false)
  const [allNational, setAllNational] = useState(false)

  useEffect(() => {
    SplashScreen.hide();
  }, [])


  useEffect(() => {
    list_data && setData(list_data)
  }, [list_data])


  useEffect(() => {
    let isAllClub = true;
    let isAllNational = true
    data.map((item, index) => {
      if (!item.select) {
        if (item.type === 'CLUB') {
          isAllClub = false
        } else {
          isAllNational = false
        }
      }
    })
    setAllNational(isAllNational)
    setAllClub(isAllClub)
  }, [data])

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
        {
          item?.select && (
            <IconCheck />
          )
        }
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
    if (data.length > 0) {
      navigation.navigate(Screen.LIST_TEAM_SCREEN, { data: arr })
    } else {
      if (Platform.OS === 'ios') {
        Alert.alert('Chưa chọn đội nào', 'Chọn ít nhất 1 giải đấu');
      } else {
        ToastAndroid.show('Chưa chọn đội nào', ToastAndroid.SHORT)
      }
    }
  }

  return (
    <View style={styles.container}>

      {/* HEADER */}
      <View style={[styles.header, styles.myRow]}>
        <View style={styles.myRow}>
          <IconHeader />
          <Text style={styles.txtHeader}>Chọn giải đấu</Text>
        </View>
        <TouchableOpacity onPress={onPressNext}>
          <Text style={[styles.txtHeader, { color: color.violet }]}>Tiếp theo</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <FlatList
          data={data.filter(item => item.type === 'CLUB')}
          keyExtractor={(contact, index) => String(index)}
          renderItem={renderTouchable}
          numColumns={2}
          ListHeaderComponent={() => {
            return (
              <View style={[styles.myRow, styles.titleView]}>
                <Text style={styles.txtTitle}>Giải đấu</Text>
                <TouchableOpacity onPress={onSelectAllClub}>
                  <SelectBox isCheck={allClub} />
                </TouchableOpacity>
              </View>
            )
          }}
          ListFooterComponent={() => {
            return (
              <>
                <View style={[styles.myRow, styles.titleView]}>
                  <Text style={styles.txtTitle}>Giải đấu</Text>
                  <TouchableOpacity onPress={onSelectAllClubNational}>
                    <SelectBox isCheck={allNational} />
                  </TouchableOpacity>
                </View>
                <FlatList
                  data={data.filter(item => item.type === 'NATIONAL')}
                  keyExtractor={(contact, index) => String(index)}
                  renderItem={renderTouchable}
                  numColumns={2}
                />
              </>
            )
          }}
        />
      </View>
    </View>
  )
};

export default Home;
