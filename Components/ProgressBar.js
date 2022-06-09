import { View, Text } from "react-native";
import React from "react";
import { COLORS } from "../constants";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'

export default function ProgressBar({ containerStyle, progress }) {
  return (
    <View
      style={{
        width: wp("55%"),
        height: hp('2%'),
        borderRadius: wp("18%"),
        backgroundColor: COLORS.white,
        ...containerStyle,
      }}
    >
      <View
        style={{
          position: "absolute",
          left: 0,
          height: hp("2%"),
          width: progress,
          borderRadius: wp("18%"),
          backgroundColor: COLORS.primary,
        }}
      ></View>
    </View>
  );
}
