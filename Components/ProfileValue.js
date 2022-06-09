import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { COLORS, FONTS, SIZES, icons } from "../constants";
import { connect } from "react-redux";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'


const ProfileValue = ({ appTheme, icon, label, value, onPress }) => {
  return (
    <TouchableOpacity
      style={{ flexDirection: "row", height: hp("11%"), alignItems: "center" }}
      onPress={onPress}
    >
      <View
        style={{
          height: hp("4%"),
          width: wp("10%"),
          alignItems: "center",
          justifyContent: "center",
          borderRadius: wp('5%'),
          backgroundColor: appTheme?.backgroundColor3,
          flexDirection: "row",
        }}
      >
        <Image
          source={icon}
          resizeMode="contain"
          style={{ width: wp('7%'), height: hp('10%'), tintColor: COLORS.primary }}
        />
      </View>

      <View style={{ flex: 1, marginLeft: SIZES.radius }}>
        {label && <Text style={{ color: COLORS.gray30 }}>{label}</Text>}
        <Text
          style={{
            ...FONTS.h3,
            fontWeight: "bold",
            color: appTheme?.textColor,
          }}
        >
          {value}
        </Text>
      </View>

      <Image
        source={icons.right_arrow}
        style={{ height: hp('2%'), width: wp('2%'), tintColor: appTheme?.textColor }}
      />
    </TouchableOpacity>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileValue);
