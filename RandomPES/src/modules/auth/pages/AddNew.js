import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, Image, TextInput, UIManager, LayoutAnimation, ScrollView } from 'react-native';
import { color } from "../../../utils";
import { Screen } from "../../../constants";
import { addNewStyles as styles } from "../styles";
import { IconBack, IconAddImg, ImageDefault, IconDel } from "../../../assets/svg/ic_svg";
import ImagePicker from 'react-native-image-crop-picker';
import { scale } from '../../../utils/ScalingUtils';
import { useSelector, useDispatch } from 'react-redux';
import { actionAddNew } from "../actions";

const AddNew = ({ navigation, route }) => {
  const dispatch = useDispatch()
  const [name, setName] = useState('')
  const [group, setGroup] = useState(0)
  const [dataImg, setDataImg] = useState({})
  const [visible, setVisible] = useState(false)
  const authReducer = useSelector(state => state.authReducer)
  const { list_data } = authReducer || []

  useEffect(() => {
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }, [])

  const selectImg = () => {
    ImagePicker.openPicker({
      height: scale(500),
      width: scale(550),
      cropping: true,
      cropperCircleOverlay: true,
      mediaType: 'photo',
      showCropGuidelines: false
    }).then(image => {
      setDataImg(image)
    }
    );
  }

  const onAddNew = () => {
    const { params } = route || {}
    let data = {
      type: list_data[group].id,
      name: name,
      logo: dataImg?.path || Image.resolveAssetSource(require('../../../assets/img/imgDefault.png')).uri,
      id: `${list_data[group].id}_team_${list_data[group].list_team.length + Math.random()*3}`
    }

    params?.addNew(data)
    navigation.goBack()

    // dispatch(actionAddNew(data))
  }

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={[styles.header, styles.myRow]}>
        <View style={styles.myRow}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <IconBack />
          </TouchableOpacity>
          <Text style={styles.txtHeader}>Thêm mới</Text>
        </View>
        <TouchableOpacity onPress={onAddNew} disabled={name === ''}>
          <Text style={[styles.txtHeader, { color: name === '' ? color.dark_grey : color.violet }]}>Thêm mới</Text>
        </TouchableOpacity>
      </View>

      {/* CONTENT */}
      <View style={styles.content}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.txtTitle}>Tên đội bóng</Text>
          <TextInput
            value={name}
            onChangeText={(val) => setName(val)}
            placeholder='SHB Đà Nẵng'
            style={styles.txtInput}
            maxLength={25}
          />
          <Text style={styles.txtTitle}>Giải đấu</Text>
          <TouchableOpacity style={[styles.txtInput, styles.myRow]} onPress={() => {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
            setVisible(!visible)
          }}>
            <Image
              source={{ uri: list_data[group].img }}
              style={styles.iconLeft}
            />
            <Text style={styles.txtGroup}>{list_data[group].name.toUpperCase()}</Text>
          </TouchableOpacity>
          {
            visible && (
              <View style={styles.viewDropdown}>
                {
                  list_data.map((item, index) => {
                    return (
                      <TouchableOpacity
                        key={`${index}_list`}
                        onPress={() => {
                          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                          setGroup(index)
                          setVisible(false)
                        }}
                        style={[
                          styles.myRow,
                          styles.btnItem(group === index ? color.light_violet : color.grey)
                        ]}>
                        <Image
                          source={{ uri: list_data[index].img }}
                          style={styles.iconLeft}
                        />
                        <Text style={styles.txtGroup}>{list_data[index].name.toUpperCase()}</Text>
                      </TouchableOpacity>
                    )
                  })
                }
              </View>
            )
          }
          <Text style={styles.txtTitle}>Logo đội bóng</Text>
          <View style={styles.imgView}>
            {
              dataImg?.path ? (
                <>
                  <Image
                    source={{ uri: dataImg?.path }}
                    style={styles.imgAvt}
                  />
                  <TouchableOpacity style={styles.btnRemove} onPress={() => setDataImg({})}>
                    <IconDel />
                  </TouchableOpacity>
                </>
              ) : (
                <ImageDefault />
              )
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
