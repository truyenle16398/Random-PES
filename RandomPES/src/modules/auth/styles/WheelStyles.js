import { StyleSheet, Dimensions } from "react-native";
import { scale, verticalScale, moderateScale, getStatusBarHeight } from "../../../utils/ScalingUtils";
import { color } from "../../../utils";
const { width, height } = Dimensions.get('screen');

const wheelStyles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: color.white
  },
  winnerText: {
    fontSize: 32,
    fontFamily: 'Menlo',
    position: 'absolute',
    bottom: 10
  },
  content: {
    flex: 1,
    alignItems: 'center'
  },
  modalView: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    height: height,
    width: width,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalContent: {
    backgroundColor: color.grey,
    width: width * 0.8,
    borderRadius: scale(8),
    paddingVertical: verticalScale(22),
    alignItems: 'center',
    position: 'absolute',
    alignSelf: 'center'
  },
  txtTitle: {
    fontSize: moderateScale(16),
    color: color.dark_grey,
    fontWeight: '700'
  },
  txtTeam: {
    fontSize: moderateScale(20),
    color: color.violet,
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
    alignItems: 'center'
  },
  btnBottom: {
    borderRadius: verticalScale(20),
    height: verticalScale(40),
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: color.red,
    borderWidth: 1,
    width: scale(120)
  },
  txtBtn: {
    fontWeight: '600',
    color: color.red,
    fontSize: moderateScale(18),
    marginLeft: scale(10)
  },
  btnWheel: {
    width: width * 0.95,
    height: width + verticalScale(60),
    borderRadius: verticalScale(60),
    marginTop: verticalScale(100),
  },
  myRow: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  header: {
    backgroundColor: color.white,
    marginTop: getStatusBarHeight(true),
    paddingHorizontal: scale(22),
    paddingVertical: verticalScale(16),
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: color.light_violet
  },
  txtHeader: {
    color: color.black,
    fontSize: moderateScale(18),
    fontWeight: '700',
    marginLeft: scale(12)
  },
  btnSound: {
    padding: scale(8),
    alignSelf: 'flex-end'
  },
  modalWrapper: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center'
  },
  imgHistory: {
    height: scale(40),
    width: scale(40),
    marginHorizontal: scale(10)
  },
  txtHint: {
    fontSize: 18,
    marginTop: verticalScale(12),
    fontWeight: 'bold',
    color: 'silver'
  },
  btnBack: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  listHistoryContainer: {
    width: width
  },
  listHistoryStyle: {
    height: verticalScale(170)
  },
  itemHis: (index) => ({
    backgroundColor: index % 2 === 0 ? color.white : color.grey,
    paddingVertical: verticalScale(5)
  }),
  knob: {
    alignItems: 'center'
  }
});

export default wheelStyles;
