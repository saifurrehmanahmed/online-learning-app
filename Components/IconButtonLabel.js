import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { SIZES } from "../constants";

export default function IconButtonLabel({
  conainerStyle,
  icon,
  iconStyle,
  label,
  labelStyle,
  onPress,
}) {
  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        ...conainerStyle,
      }}
      onPress={onPress}
    >
      <Image
        source={icon}
        resizeMode="contain"
        style={{ width: 20, height: 20, ...iconStyle }}
      />
      <Text style={{ marginLeft: SIZES.base, fontSize: 5, ...labelStyle }}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}
