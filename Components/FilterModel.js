import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import Animated, {
  interpolate,
  useAnimatedStyle,
  withDelay,
  withTiming,
} from "react-native-reanimated";

import { FONTS, SIZES, COLORS, icons, constants } from "../constants";

export default function FilterModel({
  filterModelSharedValue1,
  filterModelSharedValue2,
}) {
  const filterModelContainerAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        filterModelSharedValue1.
        value,
        [SIZES.height, 0],
        [0, 1]
      ),
      transform: [
        {
          translateY: filterModelSharedValue1.value,
        },
      ],
    };
  });

  const filterModelbgAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        filterModelSharedValue2.
        value,
        [SIZES.height, 0],
        [0, 1]
      ),
    };
  });

  const filterModelContentAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        filterModelSharedValue2.
        value,
        [SIZES.height, 0],
        [0, 1]
      ),
      transform: [
        {
          translateY: filterModelSharedValue2.value,
        },
      ],
    };
  });

  return (
    //   Main container
    <Animated.View
      style={[
        {
          position: "absolute",
          bottom: 0,
          height: SIZES.height,
          width: SIZES.width,
        },
        filterModelContainerAnimatedStyle,
      ]}
    >
      {/* Bg container */}
      <Animated.Value
        style={[
          {
            flex: 1,
            height: SIZES.height,
            width: SIZES.width,
            backgrounColor: COLORS.transparent,
          },
          filterModelbgAnimatedStyle,
        ]}
      ></Animated.Value>
    </Animated.View>
  );
}
