import React from 'react';
import {
  StyleSheet,
  View,
  Text as RNText,
  Dimensions,
  Animated,
  TouchableOpacity
} from 'react-native';
import * as d3Shape from 'd3-shape';
import { PanGestureHandler, State } from "react-native-gesture-handler";
import color from 'randomcolor';
import { snap } from '@popmotion/popcorn';
import { Path, G, TSpan, Text, Svg, Image } from "react-native-svg";
const { width } = Dimensions.get('screen');
import Sound from "react-native-sound";

const numberOfSegments = 30//number item
const wheelSize = width * 0.95;//size of circle
const oneTurn = 360;//369 độ
const angleBySegment = oneTurn / numberOfSegments;// độ của 1 item
const fontSize = 2.5 * angleBySegment;
const angleOffset = angleBySegment / 2;
const knobFill = color({ hue: 'purple' });//màu

const makeWheel = () => {//generator data wheel
  const data = Array.from({ length: numberOfSegments }).fill(1);
  const arcs = d3Shape.pie()(data);
  const colors = color({
    luminosity: 'dark',
    count: numberOfSegments
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
      value: 'https://firebasestorage.googleapis.com/v0/b/randompes-32f21.appspot.com/o/image%2012.png?alt=media&token=71740680-12ca-4ff7-b79f-76e3ba0d1a8c', //[200, 2200]
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
      winner: null
    }
  }
  _wheelPaths = makeWheel();
  _angle = new Animated.Value(0);
  angle = 0;
  // temp = new Sound('', '', (err) => {
  //   if (err) {
  //   }

  // })

  componentDidMount() {
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

  _getWinnerIndex = () => {
    const deg = Math.abs(Math.round(this.angle % oneTurn));
    return Math.floor(deg / angleBySegment);
  };

  _onPan = () => {
    // if (nativeEvent.state === State.END) {
    // const { velocityY } = nativeEvent;
    console.log(fontSize);

    Animated.decay(this._angle, {
      velocity: -Math.random() * 3,
      deceleration: 0.999,
      useNativeDriver: true
    }).start(() => {
      this._angle.setValue(this.angle % oneTurn);
      const snapTo = snap(oneTurn / numberOfSegments);
      Animated.timing(this._angle, {
        toValue: snapTo(this.angle),
        duration: 300,
        useNativeDriver: true
      }).start(() => {
        const winnerIndex = this._getWinnerIndex();
        this.setState({
          enabled: true,
          finished: true,
          winner: this._wheelPaths[winnerIndex].value
        });
      });
      // do something here;
    });
    // }
  };

  _renderKnob = () => {
    const knobSize = 30;
    const YOLO = Animated.modulo(
      Animated.divide(
        Animated.modulo(Animated.subtract(this._angle, angleOffset), oneTurn),
        new Animated.Value(angleBySegment)
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
            fill={knobFill}
          />
        </Svg>
      </Animated.View>
    );
  };

  _renderWinner = () => {
    return (
      <RNText style={styles.winnerText}>Winner is: {this.state.winner}</RNText>
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
                  inputRange: [-oneTurn, 0, oneTurn],
                  outputRange: [`-${oneTurn}deg`, `0deg`, `${oneTurn}deg`]
                })
              }
            ]
          }}
        >
          <Svg
            width={wheelSize}
            height={wheelSize}
            viewBox={`0 0 ${width} ${width}`}
            style={{ transform: [{ rotate: `-${angleOffset}deg` }] }}
          >
            <G y={width / 2} x={width / 2}>
              {this._wheelPaths.map((arc, i) => {
                const [x, y] = arc.centroid;
                const number = i === 0 ? 'https://firebasestorage.googleapis.com/v0/b/randompes-32f21.appspot.com/o/image%2014.png?alt=media' : arc.value.toString();

                return (
                  <G key={`arc-${i}`}>
                    <Path d={arc.path} fill={arc.color} />
                    <G
                      rotation={(i * oneTurn) / numberOfSegments + angleOffset}
                      origin={`${x}, ${y}`}
                    >
                      <Image
                        href={number}
                        x={x - fontSize / 2}
                        y={y - 70}
                        height={fontSize}
                        width={fontSize}
                      />
                      {/* <Text
                        x={x}
                        y={y - 70}
                        fill="white"
                        textAnchor="middle"
                        fontSize={fontSize}
                      >
                        {Array.from({ length: number.length }).map((_, j) => {
                          return (
                            <TSpan
                              x={x}
                              dy={fontSize}
                              key={`arc-${i}-slice-${j}`}
                            >
                              {number.charAt(j)}
                            </TSpan>
                          );
                        })}
                      </Text> */}
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
    return (
      <PanGestureHandler
      // onHandlerStateChange={this._onPan}
      // enabled={this.state.enabled}
      >
        <View style={styles.container}>
          <TouchableOpacity onPress={this._onPan} disabled={!this.state.enabled}>
            {this._renderSvgWheel()}
          </TouchableOpacity>
          {this.state.finished && this.state.enabled && this._renderWinner()}
        </View>
      </PanGestureHandler>
    );
  }


}

export default Temp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'center'
  },
  winnerText: {
    fontSize: 32,
    fontFamily: 'Menlo',
    position: 'absolute',
    bottom: 10
  }
});

