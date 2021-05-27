import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, Image, TextInput, UIManager, LayoutAnimation, ScrollView } from 'react-native';
import { color } from "../../../utils";
import { Screen, DATA } from "../../../constants";
import { addNewStyles as styles } from "../styles";
import { IconBack, IconAddImg, ImageDefault, IconDel } from "../../../assets/svg/ic_svg";
import ImagePicker from 'react-native-image-crop-picker';
import { scale } from '../../../utils/ScalingUtils';

const galleryConfig = {
  height: scale(500),
  width: scale(550),
  cropping: true,
  cropperCircleOverlay: true,
  mediaType: 'photo',
  showCropGuidelines: false
}

const AddNew = ({ navigation, route }) => {
  const [name, setName] = useState('')
  const [group, setGroup] = useState(0)
  const [dataImg, setDataImg] = useState({})
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }, [])

  const goBack = () => navigation.goBack()
  const onChangeText = val => setName(val)
  const removeImg = () => setDataImg({})

  const selectImg = () => {
    ImagePicker
      .openPicker(galleryConfig)
      .then(image => setDataImg(image));
  }

  const onAddNew = () => {
    const { params } = route || {}
    let data = {
      type: DATA[group].id,
      name: name,
      logo: dataImg?.path || Image.resolveAssetSource(require('../../../assets/img/imgDefault.png')).uri,
      id: `${DATA[group].id}_team_${DATA[group].list_team.length + Math.random() * 3}`
    }

    params?.addNew(data)
    goBack()
  }

  const openDropdown = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setVisible(!visible)
  }

  const onPressItem = (index) => () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setGroup(index)
    setVisible(false)
  }

  const renderItem = (index) => {
    const bgColor = (group === index) ? color.light_violet : color.grey
    return (
      <TouchableOpacity
        key={`${index}_list`}
        onPress={onPressItem(index)}
        style={[styles.myRow, styles.btnItem(bgColor)]}
      >
        <Image source={{ uri: DATA[index].img }} style={styles.iconLeft} />
        <Text style={styles.txtGroup}>{DATA[index].name.toUpperCase()}</Text>
      </TouchableOpacity>
    )
  }


  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={[styles.header, styles.myRow]}>
        <View style={styles.myRow}>
          <TouchableOpacity onPress={goBack} style={styles.myRow}>
            <IconBack />
            <Text style={styles.txtHeader}>Quay lại</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={onAddNew} disabled={!name}>
          <Text style={[styles.txtHeader, { color: name ? color.violet : color.dark_grey }]}>Thêm mới</Text>
        </TouchableOpacity>
      </View>

      {/* CONTENT */}
      <View style={styles.content}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* CLUB NAME */}
          <Text style={styles.txtTitle}>Tên đội bóng</Text>
          <TextInput
            value={name}
            maxLength={25}
            style={styles.txtInput}
            placeholder='SHB Đà Nẵng'
            onChangeText={onChangeText}
          />
          {/* LEAGUE */}
          <Text style={styles.txtTitle}>Giải đấu</Text>
          <TouchableOpacity style={[styles.txtInput, styles.myRow]} onPress={openDropdown}>
            <Image source={{ uri: DATA[group].img }} style={styles.iconLeft} />
            <Text style={styles.txtGroup}>{DATA[group].name.toUpperCase()}</Text>
          </TouchableOpacity>
          {visible && <View style={styles.viewDropdown}>{DATA.map((e, i) => renderItem(i))}</View>}
          {/* LOGO */}
          <Text style={styles.txtTitle}>Logo đội bóng</Text>
          <View style={styles.imgView}>
            {
              dataImg?.path
                ? <>
                  <Image source={{ uri: dataImg?.path }} style={styles.imgAvt} />
                  <TouchableOpacity style={styles.btnRemove} onPress={removeImg}>
                    <IconDel />
                  </TouchableOpacity>
                </>
                : <ImageDefault />
            }
          </View>
          <TouchableOpacity style={styles.btnAddImg} onPress={selectImg}>
            <IconAddImg />
            <Text style={styles.txtBtn}>Chọn hình</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  )
};

export default AddNew;