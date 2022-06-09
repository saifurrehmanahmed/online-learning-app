import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { COLORS } from "../constants";
import { widthPercentageToDP as wp , heightPercentageToDP as hp } from 'react-native-responsive-screen'

export default function Icons({ containerStyle, icon, iconStyle, onPress }) {
  return (
    <TouchableOpacity style={{ ...containerStyle }} onPress={onPress}>
      <Image
        source={icon}
        resizeMode="contain"
        style={{ width: wp("8%"), height: hp('5%'), tintColor: COLORS.black, ...iconStyle }}
      />
    </TouchableOpacity>
  );
}
