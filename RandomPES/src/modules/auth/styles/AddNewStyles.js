import { StyleSheet } from "react-native";
import { color } from "../../../utils";
import { getStatusBarHeight, scale, verticalScale, moderateScale } from "../../../utils/ScalingUtils";

const addNewStyles = StyleSheet.create({
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
  txtHeader: {
    color: color.black,
    fontSize: moderateScale(18),
    fontWeight: '700',
    marginLeft: scale(12)
  },
  myRow: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  content: {
    flex: 1,
    paddingHorizontal: scale(22)
  },
  txtTitle: {
    fontSize: moderateScale(14),
    color: color.dark_grey,
    fontWeight: '700',
    marginTop: verticalScale(22),
    marginBottom: verticalScale(8)
  },
  txtInput: {
    backgroundColor: color.grey,
    height: verticalScale(50),
    borderRadius: verticalScale(25),
    paddingHorizontal: scale(22),
    fontSize: moderateScale(16)
  },
  iconLeft: {
    height: verticalScale(30),
    width: scale(42),
    borderRadius: 8
  },
  txtGroup: {
    marginHorizontal: scale(12),
    fontSize: moderateScale(16),
    fontWeight: '600'
  },
  imgView: {
    height: scale(331),
    width: scale(331),
    borderRadius: 8,
    backgroundColor: color.light_violet,
    marginBottom: verticalScale(27),
    justifyContent: 'center',
    alignItems: 'center'
  },
  btnAddImg: {
    borderWidth: 1,
    borderColor: color.violet,
    height: verticalScale(30),
    borderRadius: verticalScale(15),
    alignItems: 'center',
    flexDirection: 'row',
    width: scale(120),
    justifyContent: 'center',
    alignSelf: 'center'
  },
  txtBtn: {
    color: color.violet,
    fontSize: moderateScale(14),
    marginLeft: scale(8)
  },
  viewDropdown: {
    backgroundColor: color.grey,
    borderRadius: scale(10),
    marginTop: 8
  },
  btnItem: (cls) => ({
    backgroundColor: cls,
    paddingVertical: verticalScale(8),
    paddingHorizontal: scale(22),
    borderRadius: scale(10)
  }),
  imgAvt: {
    height: scale(331),
    width: scale(331),
    borderRadius: 8
  },
  btnRemove: {
    backgroundColor: color.white,
    height: scale(30),
    width: scale(30),
    borderRadius: scale(15),
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: color.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    position: 'absolute',
    bottom: verticalScale(14)
  }
})

export default addNewStyles;