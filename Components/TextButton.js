import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { COLORS, FONTS } from "../constants";

export default function TextButton({
  contenContainerStyle,
  disabled,
  label,
  labelStyle,
  onPress,
}) {
  return (
    <TouchableOpacity
      style={{
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: COLORS.primary,
        ...contenContainerStyle,
      }}
      disabled={disabled}
      onPress={onPress}
    >
      <Text style={{ ...labelStyle}}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}
