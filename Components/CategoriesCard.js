import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import React from "react";
import { COLORS, FONTS, SIZES } from "../constants";
import { SharedElement } from "react-navigation-shared-element";
import { widthPercentageToDP as wp , heightPercentageToDP as hp } from 'react-native-responsive-screen'

export default function CategoriesCard({
  sharedElementPrefix,
  category,
  containerStyle,
  onPress,
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ height: hp("20%"), width: wp("50%"), ...containerStyle }}
    >
      <SharedElement
        id={`${sharedElementPrefix}-CategoryCard-Bg-${category?.id}`}
        style={[StyleSheet.absoluteFillObject]}
      >
        <Image
          source={category?.thumbnail}
          resizeMode="cover"
          style={{
            height: hp("20%"),
            width: wp("40%"),
            borderRadius: SIZES.radius,
          }}
        />
      </SharedElement>
      <View style={{ position: "absolute", left: wp('2%'), bottom: hp("6%") }}>
        <SharedElement
          id={`${sharedElementPrefix}-CategoryCard-Title-${category?.id}`}
          style={[StyleSheet.absoluteFillObject]}
        >
          <Text
            style={{
              color: COLORS.white,
              fontSize: wp('5.5%'),
              fontWeight: "bold",
              position: "absolute",
            }}
          >
            {category?.title}
          </Text>
        </SharedElement>
      </View>
    </TouchableOpacity>
  );
}
