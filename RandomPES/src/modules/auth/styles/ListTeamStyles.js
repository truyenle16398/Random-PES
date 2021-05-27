import { StyleSheet } from "react-native";
import { color } from "../../../utils";
import { getStatusBarHeight, scale, verticalScale, moderateScale } from "../../../utils/ScalingUtils";


const listTeamStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white
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
  myRow: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  textInput: {
    marginLeft: scale(8),
    flex: 1,
    fontSize: moderateScale(16),
    lineHeight: moderateScale(20),
    color: color.black,
  },
  txtInputView: {
    backgroundColor: color.grey,
    height: verticalScale(50),
    borderRadius: verticalScale(25),
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    paddingHorizontal: scale(18),
  },
  myTouchable: (index) => ({
    height: verticalScale(68),
    paddingHorizontal: scale(22),
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: index % 2 === 0 ? color.grey : color.white
  }),
  img: {
    height: scale(55),
    width: scale(55)
  },
  txtName: {
    fontSize: moderateScale(18),
    fontWeight: '600',
    marginLeft: scale(20)
  },
  btnBottom: {
    height: verticalScale(50),
    flex: 1,
    borderRadius: verticalScale(25),
    borderColor: color.violet,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: scale(8)
  },
  viewBottom: {
    marginVertical: verticalScale(12),
    justifyContent: 'space-between',
    paddingHorizontal: scale(14)
  },
  txtBtn: {
    fontWeight: '700',
    fontSize: moderateScale(16)
  },
  txtEmpty: {
    marginVertical: verticalScale(12),
    fontWeight: '700',
    color: color.dark_grey,
    textAlign: 'center'
  },
  emptyComponent: {
    flex: 1,
    justifyContent: 'center'
  },
  marHor22: {
    paddingHorizontal: scale(22)
  },
  jutifyBet: {
    justifyContent: 'space-between'
  },
  imgBall: {
    height: verticalScale(137),
    width: verticalScale(137)
  },
  flex1: {
    flex: 1
  },
  containerStyles: {
    flexGrow: 1
  },
  pading12: {
    padding: scale(12)
  }
})

export default listTeamStyles;