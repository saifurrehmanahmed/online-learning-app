import { View, Text } from "react-native";
import React from "react";
import { COLORS } from "../constants";
import { widthPercentageToDP as wp , heightPercentageToDP as hp } from 'react-native-responsive-screen'
export default function LineDivider({ lineStyle }) {
  return (
    <View
      style={{
        height: hp("0.2%"),
        width: wp("85%"),
        backgroundColor: COLORS.gray20,
        ...lineStyle,
      }}
    ></View>
  );
}
