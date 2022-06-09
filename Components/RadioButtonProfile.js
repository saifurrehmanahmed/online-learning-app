import { View, Text, Image, TouchableOpacity, RadioButtin } from "react-native";
import React from "react";
import { COLORS, FONTS, icons, SIZES } from "../constants";
import Animated from "react-native-reanimated";
import { CheckBox } from "react-native-web";
import { connect } from "react-redux";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
const RadioButtonProfile = ({ icon, label, isSelected, onPress,appTheme }) => {
  // const radioAnimated = React.useRef(new Animated.Value(0)).current;
  // const circleAnimated = radioAnimated.interpolate({
  //   inputRange: [0, 17],
  //   outputRange: [COLORS.gray40, COLORS.primary],
  // });

  // const lineColorAnimated = radioAnimated.interpolate({
  //   inputRange: [0, 17],
  //   outputRange: [COLORS.additionalColor4, COLORS.additionalColor13],
  // });

  // React.useEffect(() => {
  //   if (isSelected) {
  //     Animated.timing(radioAnimated, {
  //       toValue: 17,
  //       duration: 300,
  //       useNaiveDriver: false,
  //     }).start();
  //   } else {
  //     Animated.timing(radioAnimated, {
  //       toValue: 0,
  //       duration: 300,
  //       useNaiveDriver: false,
  //     }).start();
  //   }
  // }, [isSelected]);
  return (
    <View style={{ flexDirection: "row", alignItems: "center", height: hp('10%') }}>
      <View
        style={{
          width: wp('10%'),
          height: hp('10%'),
          alignItems: "center",
          justifyContent: "center",
          borderRadius: wp('5%'),
          borderColor: COLORS.additionalColor11,
        }}
      >
        <Image
          source={icon}
          resizeMode="contain"
          style={{ width: wp('7%'), height: hp('5%'), tintColor: COLORS.primary }}
        />
      </View>

      <View style={{ flex: 1, marginLeft: SIZES.radius }}>
        <Text style={{ ...FONTS.h3, fontWeight: "bold" , color: appTheme?.textColor }}>{label}</Text>
      </View>
      <TouchableOpacity
        style={{
          width: hp('6%'),
          height: wp('5%'),
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={onPress}
      >
        <Animated.View
          style={{
            width: wp('10%'),
            height: hp('1%'),
            borderRadius: wp('5%'),
            backgroundColor: COLORS.primary,
          }}
        />
        <Animated.View
          style={{
            position: "absolute",
            left: 0,
            width: wp('6%'),
            height: hp('3%'),
            borderRadius: hp('3%'),
            borderWidth: hp('0.5%'),
            borderColor: COLORS.primary3,
            backgroundColor: COLORS.white,
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

function mapStateToProps(state) {
  return {
    appTheme: state.appTheme,
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(RadioButtonProfile);
