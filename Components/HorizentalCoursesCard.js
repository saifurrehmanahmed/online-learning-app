import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image,
} from "react-native";
import React from "react";
import { SIZES, COLORS, icons, FONTS } from "../constants";
import IconsLabel from "./IconsLabel";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
export default function HorizentalCoursesCard({
  containerStyle,
  course,
  onPress,
}) {
  return (
    <TouchableOpacity style={{ ...containerStyle, flexDirection: "row" }} onPress={onPress}>
      <ImageBackground
        source={course.thumbnail}
        resizeMode="cover"
        style={{ width: wp("36%"), height: hp("18%"), marginBottom: SIZES.radius }}
        imageStyle={{ borderRadius: SIZES.radius }}
      >
        <View
          style={{
            position: "absolute",
            top: hp("2%"),
            right: wp('3%'),
            width: wp('8%'),
            height: hp("4%"),
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: COLORS.white,
            borderRadius: wp('4%'),
          }}
        >
          <Image
            source={icons.favourite}
            resizeMode="contain"
            style={{
              width: wp("6%"),
              height: hp('3'),
              tintColor: course.is_favourite
                ? COLORS.secondary
                : COLORS.additionalColor4,
            }}
          />
        </View>
      </ImageBackground>
      <View style={{ flex: 1, marginLeft: SIZES.base }}>
        <Text style={{ fontSize: wp('5%'), fontWeight: "bold" }}>
          {course.title}
        </Text>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: SIZES.base,
          }}
        >
          <Text style={{ fontSize: wp('3.5%') }}>By {course.instructor}</Text>
          <IconsLabel
            icon={icons.time}
            label={course.duration}
            containerStyle={{ marginLeft: SIZES.base }}
            iconSyle={{
              width: wp('4.5%'),
              height: hp('2.25%'),
            }}
            labelStyle={{
              fontSize: wp('3.5%'),
            }}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: SIZES.base,
          }}
        >
          <Text style={{ fontSize: wp('5%'), color: COLORS.primary }}>
            ${course.price.toFixed(2)}
          </Text>
          <IconsLabel
            icon={icons.star}
            label={course.ratings}
            containerStyle={{ marginLeft: SIZES.base }}
            iconSyle={{ width: wp('5%'), height: hp('2.5%'), tintColor: COLORS.primary2 }}
            labelStyle={{ marginLeft: wp('2.5%'), color: COLORS.black, fontSize: wp('3.5%') }}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}
