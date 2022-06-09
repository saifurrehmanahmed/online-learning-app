import { View, Text, Image } from "react-native";
import React from "react";
import { COLORS, FONTS, SIZES } from "../constants";

export default function IconsLabel({
  containerStyle,
  icon,
  iconSyle,
  label,
  labelStyle,
}) {
  return (
    <View
      style={{ flexDirection: "row", alignItems: "center", ...containerStyle }}
    >
      <Image
        source={icon}
        style={{ width: 20, height: 20, tintColor: COLORS.gray10, ...iconSyle }}
      />
      <Text
        style={{
          marginLeft: SIZES.base,
          color: COLORS.gray30,
          fontSize:12,
          ...labelStyle,
        }}
      >
        {label}
      </Text>
    </View>
  );
}
