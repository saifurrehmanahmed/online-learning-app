import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { COLORS, SIZES, icons, FONTS } from "../constants";
import IconsLabel from "./IconsLabel";
import { widthPercentageToDP as wp , heightPercentageToDP as hp } from 'react-native-responsive-screen'

export default function VerticalCourseCard({ containerStyle, courses }) {
  return (
    <TouchableOpacity style={{ width: wp("77%"), ...containerStyle }}>
      <Image
        source={courses.thumbnail}
        resizeMode="cover"
        style={{
          width: wp("77%"),
          height: hp("20%"),
          marginBottom: SIZES.radius,
          borderRadius: SIZES.radius,
        }}
      />
      <View style={{ flexDirection: "row" }}>
        <View
          style={{
            width: wp("12%"),
            height: hp("6%"),
            alignItems: "center",
            justifyContent: "center",
            borderRadius: wp('6%'),
            backgroundColor: COLORS.primary,
          }}
        >
          <Image
            source={icons.play}
            resizeMode="contain"
            style={{ width: wp("7%"), height: hp("2%") }}
          />
        </View>
        <View style={{ flexShrink: 1, paddingHorizontal: SIZES.radius }}>
          <Text style={{ flex: 1, ...FONTS.h3, fontSize: wp('5%') }}>
            {courses.title}
          </Text>
          <IconsLabel icon={icons.time} label={courses.duration} containerStyle={{marginTop:SIZES.base}} />
        </View>
      </View>
    </TouchableOpacity>
  );
}
