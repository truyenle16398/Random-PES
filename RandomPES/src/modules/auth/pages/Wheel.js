import React from 'react';
import {
  View,
  Text as RNText,
  Dimensions,
  Animated,
  TouchableOpacity,
  Pressable,
  Image as RNImg,
  UIManager,
  LayoutAnimation,
  FlatList,
  ToastAndroid
} from 'react-native';
import * as d3Shape from 'd3-shape';
import color from 'randomcolor';
import { color as appColor } from "../../../utils";
import { snap } from '@popmotion/popcorn';
import { Path, G, Svg, Image } from "react-native-svg";
import { scale, verticalScale } from "../../../utils/ScalingUtils";
import { wheelStyles as styles } from "../styles";
import { IconBack, IconSound, IconNoSound, IconHistory } from "../../../assets/svg/ic_svg";
import { navigationRef } from "../../../constants/nav.constants";
import Sound from "react-native-sound";
const { width } = Dimensions.get('screen');

const makeWheel = (arr) => {//generator data wheel
  const arcs = d3Shape.pie().value(1)(arr)
  const colors = color({
    luminosity: 'dark',
    count: arr?.length
  });

  return arcs.map((arc, index) => {
    const instance = d3Shape
      .arc()
      .padAngle(0.01)
      .outerRadius(width / 2)
      .innerRadius(20);

    return {
      path: instance(arc),
      color: colors[index],
      value: arc.data, //[200, 2200]
      centroid: instance.centroid(arc)
    };
  });
};

class Wheel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      enabled: true,
      finished: false,
      winner: null,
      data: [],
      numItem: 1,
      angleItem: 1,
      angleOffset: 1,
      _wheelPaths: [],
      isSound: true,
      listHistory: [],
      isShowHistory: false
    }
  }
  _angle = new Animated.Value(0);
  angle = 0;
  oneTurn = 360;
  soundEffect = new Sound('spin.mp3', Sound.MAIN_BUNDLE, (err) => {
    if (err) {
      return;
    }
  })

  goBack = () => navigationRef.current.goBack()

  componentDidMount() {
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
    const { route } = this.props || {}
    const { params } = route || {}
    const { data } = params || []
    if (data && data?.length > 0) {
      this.setData(data)
    }
    this._angle.addListener(event => {
      if (this.state.enabled) {
        this.setState({
          enabled: false,
          finished: false
        });
      }
      this.angle = event.value;
    });
  }

  setData = (params) => {
    this.setState({
      data: params,
      numItem: params?.length,
      angleItem: this.oneTurn / params?.length,
      angleOffset: (this.oneTurn / params?.length) / 2,
      _wheelPaths: makeWheel(params)
    })
  }

  _getWinnerIndex = () => {
    const deg = Math.abs(this.angle % this.oneTurn);
    return Math.round(deg / this.state.angleItem);
  };

  playSoundFinish = () => {
    let sound = new Sound('yay.mp3', Sound.MAIN_BUNDLE, (err) => {
      if (err) {
        return;
      }
      sound.play()
    })
  }

  _onPan = () => {
    this.state.isSound && this.soundEffect.play()
    let a = Math.floor(Math.random() * 10) + 1
    Animated.decay(this._angle, {
      velocity: -a,
      deceleration: 0.999,
      useNativeDriver: true
    }).start(() => {
      this._angle.setValue(this.angle % this.oneTurn);
      const snapTo = snap(this.oneTurn / this.state.numItem);
      Animated.timing(this._angle, {
        toValue: snapTo(this.angle),
        duration: 300,
        useNativeDriver: true
      }).start(() => {
        const winnerIndex = this._getWinnerIndex();
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        this.setState({
          enabled: true,
          finished: true,
          winner: this.state._wheelPaths[winnerIndex].value,
          listHistory: [winnerIndex, ...this.state.listHistory]
        });
      });
      this.state.isSound && this.playSoundFinish()
    });
  };

  renderKnob = () => {
    const { angleOffset, angleItem } = this.state
    const knobSize = 30;
    const YOLO = Animated.modulo(
      Animated.divide(
        Animated.modulo(Animated.subtract(this._angle, angleOffset), this.oneTurn),
        new Animated.Value(angleItem)
      ),
      1
    );
    const style = {
      width: knobSize,
      height: knobSize * 2,
      justifyContent: 'flex-end',
      zIndex: 1,
      transform: [
        {
          rotate: YOLO.interpolate({
            inputRange: [-1, -0.5, -0.0001, 0.0001, 0.5, 1],
            outputRange: ['0deg', '0deg', '-35deg', '35deg', '0deg', '0deg']
          })
        }
      ]
    }
    const knob = 'M28.034,0C12.552,0,0,12.552,0,28.034S28.034,100,28.034,100s28.034-56.483,28.034-71.966S43.517,0,28.034,0z   M28.034,40.477c-6.871,0-12.442-5.572-12.442-12.442c0-6.872,5.571-12.442,12.442-12.442c6.872,0,12.442,5.57,12.442,12.442  C40.477,34.905,34.906,40.477,28.034,40.477z'

    return (
      <View style={styles.knob} >
        <Animated.View style={style} >
          <Svg
            width={knobSize}
            height={(knobSize * 100) / 57}
            viewBox={`0 0 57 100`}
            style={{ transform: [{ translateY: 8 }] }}
          >
            <Path d={knob} fill={appColor.violet} />
          </Svg>
        </Animated.View>
      </View>
    );
  };

  onRemove = () => {
    const { winner, data } = this.state
    if (data?.length > 2) {
      this.setData(data.filter(i => i.id !== winner.id))
    }
    this.setState({ finished: false })
  }

  onCloseWinner = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
    this.setState({ finished: false })
  }

  renderWinner = () => {
    const { winner } = this.state
    return (
      <View style={styles.modalWrapper}>
        <Pressable style={styles.modalView} onPress={this.onCloseWinner} />
        <View style={styles.modalContent}>
          <RNText style={styles.txtTitle}>Đội được chọn: </RNText>
          <RNImg source={{ uri: winner?.logo }} style={styles.imgWin} resizeMode='contain' />
          <RNText style={styles.txtTeam}>{winner?.name?.toUpperCase()}</RNText>
          <View style={styles.bottomView}>
            <TouchableOpacity style={styles.btnBottom} onPress={this.onRemove}>
              <RNText style={styles.txtBtn}>Xóa tên</RNText>
            </TouchableOpacity>
          </View>
        </View>
      </View >
    );
  };

  onCloseHistory = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
    this.setState({ isShowHistory: false })
  }

  keyExtractor = (contact, index) => String(index)
  clearListHistory = () => this.setState({ listHistory: [] })

  renderHistoryItem = ({ item, index }) => {
    const { data } = this.state
    return (
      <View style={[styles.myRow, styles.itemHis(index)]}>
        <RNImg source={{ uri: data[item]?.logo }} resizeMode='contain' style={styles.imgHistory} />
        <RNText>{data[item].name.toUpperCase()}</RNText>
      </View>
    )
  }

  renderHistory = () => {
    const { listHistory } = this.state
    return (
      <View style={styles.modalWrapper}>
        <Pressable style={styles.modalView} onPress={this.onCloseHistory} />
        <View style={styles.modalContent}>
          <RNText style={styles.txtTitle}>Các kết quả: </RNText>
          <FlatList
            data={listHistory}
            style={styles.listHistoryStyle}
            keyExtractor={this.keyExtractor}
            renderItem={this.renderHistoryItem}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listHistoryContainer}
          />
          <View style={styles.bottomView}>
            <TouchableOpacity style={styles.btnBottom} onPress={this.clearListHistory}>
              <RNText style={styles.txtBtn}>Xóa hết</RNText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  _renderSvgWheel = () => {
    const { angleOffset, _wheelPaths, angleItem, numItem } = this.state
    const style = {
      alignItems: 'center',
      justifyContent: 'center',
      transform: [
        {
          rotate: this._angle.interpolate({
            inputRange: [-this.oneTurn, 0, this.oneTurn],
            outputRange: [`-${this.oneTurn}deg`, `0deg`, `${this.oneTurn}deg`]
          })
        }
      ]
    }
    return (
      <View style={styles.container}>
        {this.renderKnob()}
        <Animated.View style={style}>
          <Svg
            width={width * 0.95}
            height={width * 0.95}
            viewBox={`0 0 ${width} ${width}`}
            style={{ transform: [{ rotate: `-${angleOffset}deg` }] }}
          >
            <G y={width / 2} x={width / 2}>
              {_wheelPaths.map((arc, i) => {
                const [x, y] = arc.centroid;
                const href = arc.value.logo;
                const hw = angleItem * (scale(10) / scale(6)) > 199 ? scale(150) : angleItem * (scale(10) / scale(6))
                let xy = hw / 2 < 75 ? scale(75) : hw / 2
                return (
                  <G key={`arc-${i}`}>
                    <Path d={arc.path} fill={arc.color} />
                    <G rotation={(i * this.oneTurn) / numItem + angleOffset} origin={`${x}, ${y}`} >
                      <Image href={href} x={x - hw / 2} y={y - xy} height={hw} width={hw} />
                    </G>
                  </G>
                );
              })}
            </G>
          </Svg>
        </Animated.View>
      </View>
    );
  };

  showHistory = () => {
    const { listHistory } = this.state
    listHistory.length > 0 && this.setState({ isShowHistory: true })
  }

  toggleSound = () => this.setState({ isSound: !isSound })

  render() {
    const { enabled, finished, isSound, isShowHistory } = this.state
    return (
      <View style={styles.container}>
        <View style={[styles.header, styles.myRow]}>
          <View style={styles.myRow}>
            <TouchableOpacity disabled={!enabled} onPress={this.goBack} style={styles.btnBack}>
              <IconBack />
              <RNText style={styles.txtHeader}>Chọn đội</RNText>
            </TouchableOpacity>
          </View>
          <View style={styles.myRow}>
            <TouchableOpacity disabled={!enabled} style={styles.btnSound} onPress={this.toggleSound}>
              {isSound ? <IconSound /> : <IconNoSound />}
            </TouchableOpacity>
            <TouchableOpacity disabled={!enabled} style={styles.btnSound} onPress={this.showHistory}>
              <IconHistory />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.content}>

          <TouchableOpacity style={styles.btnWheel} onPress={this._onPan} disabled={!enabled}>
            {this._renderSvgWheel()}
          </TouchableOpacity>
          {enabled && <RNText style={styles.txtHint}>Chạm vào vòng xoay để bắt đầu random!</RNText>}
        </View>
        {finished && enabled && this.renderWinner()}
        {isShowHistory && this.renderHistory()}
      </View>
    );
  }
}

export default Wheel;

