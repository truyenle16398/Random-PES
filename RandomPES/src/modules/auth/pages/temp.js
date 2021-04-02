import React from 'react';
import {
  StyleSheet,
  View,
  Text as RNText,
  Dimensions,
  Animated,
  TouchableOpacity,
  Pressable,
  Image as RNImg
} from 'react-native';
import * as d3Shape from 'd3-shape';
import color from 'randomcolor';
import { color as appColor } from "../../../utils";
import { snap } from '@popmotion/popcorn';
import { Path, G, Svg, Image } from "react-native-svg";
import { moderateScale, scale, verticalScale } from "../../../utils/ScalingUtils";
const { width, height } = Dimensions.get('screen');

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

class Temp extends React.Component {
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
      _wheelPaths: []
    }
  }
  _angle = new Animated.Value(0);
  angle = 0;
  oneTurn = 360;


  componentDidMount() {
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

  _onPan = () => {
    let a = -(Math.random() * this.state.numItem / 2)
    Animated.decay(this._angle, {
      velocity: a,
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
        this.setState({
          enabled: true,
          finished: true,
          winner: this.state._wheelPaths[winnerIndex].value
        });
      });
    });
  };

  _renderKnob = () => {
    const knobSize = 30;
    const YOLO = Animated.modulo(
      Animated.divide(
        Animated.modulo(Animated.subtract(this._angle, this.state.angleOffset), this.oneTurn),
        new Animated.Value(this.state.angleItem)
      ),
      1
    );

    return (
      <Animated.View
        style={{
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
        }}
      >
        <Svg
          width={knobSize}
          height={(knobSize * 100) / 57}
          viewBox={`0 0 57 100`}
          style={{ transform: [{ translateY: 8 }] }}
        >
          <Path
            d="M28.034,0C12.552,0,0,12.552,0,28.034S28.034,100,28.034,100s28.034-56.483,28.034-71.966S43.517,0,28.034,0z   M28.034,40.477c-6.871,0-12.442-5.572-12.442-12.442c0-6.872,5.571-12.442,12.442-12.442c6.872,0,12.442,5.57,12.442,12.442  C40.477,34.905,34.906,40.477,28.034,40.477z"
            fill={appColor.violet}
          />
        </Svg>
      </Animated.View>
    );
  };

  onRemove = () => {
    const { winner, data } = this.state
    if (data?.length > 1) {
      this.setData(data.filter(item => item.id !== winner.id))
    }
    this.setState({ finished: false })
  }

  _renderWinner = () => {
    const { winner } = this.state
    return (
      <View style={{ position: 'absolute' }}>
        <Pressable
          style={styles.modalView}
          onPress={() => this.setState({ finished: false })}
        >
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
        </Pressable>
      </View>
    );
  };

  _renderSvgWheel = () => {
    return (
      <View style={styles.container}>
        {this._renderKnob()}
        <Animated.View
          style={{
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
          }}
        >
          <Svg
            width={width * 0.95}
            height={width * 0.95}
            viewBox={`0 0 ${width} ${width}`}
            style={{ transform: [{ rotate: `-${this.state.angleOffset}deg` }] }}
          >
            <G y={width / 2} x={width / 2}>
              {this.state._wheelPaths.map((arc, i) => {
                const [x, y] = arc.centroid;
                const href = arc.value.logo;
                const hw = this.state.angleItem * (scale(10) / scale(6)) > 199 ? scale(150) : this.state.angleItem * (scale(10) / scale(6))
                let xy = hw / 2 < 75 ? scale(75) : hw / 2
                return (
                  <G key={`arc-${i}`}>
                    <Path d={arc.path} fill={arc.color} />
                    <G
                      rotation={(i * this.oneTurn) / this.state.numItem + this.state.angleOffset}
                      origin={`${x}, ${y}`}
                    >
                      <Image
                        href={href}
                        x={x - hw / 2}
                        y={y - xy}
                        height={hw}
                        width={hw}
                      />
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

  render() {
    const { enabled, finished } = this.state
    return (
      <View style={styles.container}>
        <TouchableOpacity style={{ width: width * 0.95, height: width * 0.95 }} onPress={this._onPan} disabled={!enabled}>
          {this._renderSvgWheel()}
        </TouchableOpacity>
        {finished && enabled && this._renderWinner()}
      </View>
    );
  }


}

export default Temp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative'
  },
  winnerText: {
    fontSize: 32,
    fontFamily: 'Menlo',
    position: 'absolute',
    bottom: 10
  },
  modalView: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    height: height,
    width: width,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalContent: {
    backgroundColor: appColor.white,
    width: width * 0.8,
    borderRadius: scale(8),
    paddingVertical: verticalScale(22),
    alignItems: 'center'
  },
  txtTitle: {
    fontSize: moderateScale(16),
    color: appColor.dark_grey,
    fontWeight: '700'
  },
  txtTeam: {
    fontSize: moderateScale(20),
    color: appColor.violet,
    fontWeight: '700'
  },
  imgWin: {
    height: scale(170),
    width: scale(170),
    marginTop: verticalScale(32),
    marginBottom: verticalScale(12)
  },
  bottomView: {
    paddingHorizontal: scale(22),
    paddingTop: verticalScale(12),
    width: '100%',
    alignItems: 'flex-end'
  },
  btnBottom: {
    borderRadius: verticalScale(20),
    height: verticalScale(40),
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: appColor.red,
    borderWidth: 1,
    width: scale(120)
  },
  txtBtn: {
    fontWeight: '600',
    color: appColor.red,
    fontSize: moderateScale(18),
    marginLeft: scale(10)
  }

});

