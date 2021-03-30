import React, { useState, useEffect } from 'react';
import { Text, View, FlatList, TouchableOpacity, Image, TextInput } from 'react-native';
import { color } from "../../../utils";
import { Screen } from "../../../constants";
import { listTeamStyles as styles } from "../styles";
import { IconHeader, IconDelete, IconSearch } from "../../../assets/svg/ic_svg";
import { scale, verticalScale, moderateScale } from '../../../utils/ScalingUtils';

const ListTeam = ({ navigation, route }) => {
  const { params } = route || {}
  const { data } = params || []
  const [txtSearch, setTxtSearch] = useState('')

  const onChangeText = val => setTxtSearch(val)

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.myRow}>
          <IconHeader />
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
    </View>
  )
};

export default ListTeam;
