import { StyleSheet } from "react-native";
import { color } from "../../../utils";
import { getStatusBarHeight, scale, verticalScale, moderateScale } from "../../../utils/ScalingUtils";

const homeStyles = StyleSheet.create({
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
  txtHeader: {
    color: color.black,
    fontSize: moderateScale(18),
    fontWeight: '700',
    marginLeft: scale(12)
  },
  txtTitle: {
    fontSize: moderateScale(18),
    fontWeight: '700',
  },
  content: {
    flex: 1,
    paddingHorizontal: scale(22)
  },
  titleView: {
    justifyContent: 'space-between',
    paddingTop: verticalScale(18),
    paddingBottom: verticalScale(8)
  },
  btnImg: {
    height: verticalScale(114),
    width: scale(159),
    borderRadius: 8
  },
  myTouchable: {
    backgroundColor: color.white,
    marginBottom: scale(14),
    marginRight: scale(13),
    borderRadius: 8
  },
  myShadow: {
    shadowColor: color.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  btnSelect: {
    padding: scale(10)
  },
  btnNext: {
    paddingHorizontal: scale(12),
    paddingVertical: verticalScale(6)
  }
})

export default homeStyles;