import { View, Text, Image, StyleSheet, FlatList } from "react-native";
import React from "react";

import Animated, {
  interpolate,
  Extrapolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
  runOnJS,
} from "react-native-reanimated";
import {
  COLORS,
  FONTS,
  SIZES,
  images,
  icons,
  dummyData,
} from "../../constants";
import { SharedElement } from "react-navigation-shared-element";
import Icons from "../../Components/Icons";
import { BackHandler } from "react-native-web";
import HorizentalCoursesCard from "../../Components/HorizentalCoursesCard";
import { LineDivider } from "../../Components/LineDivider";
import FilterModel from "../../Components/FilterModel";

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

export default function CourseListing({ navigation, route }) {
  const { category, sharedElementPrefix } = route.params;

  const flatListRef = React.useRef();
  const scrollY = useSharedValue(0);
  const onScroll = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentInset.y;
  });

  const filterModelSharedValue1 = useSharedValue(SIZES.height);
  const filterModelSharedValue2 = useSharedValue(SIZES.height);
  function BackHandler() {
    navigation.goBack();
  }
  function renderHeader() {
    return (
      <Animated.View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 250,
          overflow: "hidden",
        }}
      >
        <SharedElement
          id={`${sharedElementPrefix}-CategoryCard-bg-${category?.id}`}
          style={[StyleSheet.absoluteFillObject]}
        >
          <Image
            source={category?.thumbnail}
            resizeMode="cover"
            style={{
              width: "100%",
              height: "100%",
              borderBottomLeftRadius: 60,
            }}
          />
        </SharedElement>
        {/* title */}
        <Animated.View style={{ position: "absolute", bottom: 70, left: 30 }}>
          <SharedElement
            id={`${sharedElementPrefix}-CategoryCard-Title-${category?.id}`}
            style={[StyleSheet.absoluteFillObject]}
          >
            <Text
              style={{
                position: "absolute",
                color: COLORS.white,
                fontSize: 25,
                fontWeight: "bold",
              }}
            >
              {category?.title}
            </Text>
          </SharedElement>
        </Animated.View>
        <Animated.View>
          <Icons
            icon={icons.back}
            iconStyle={{ tintColor: COLORS.black }}
            containerStyle={{
              position: "absolute",
              top: 40,
              left: 20,
              width: 50,
              height: 50,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: COLORS.white,
              borderRadius: 50,
            }}
            onPress={() => BackHandler()}
          />
        </Animated.View>
        <Animated.Image
          source={images.mobile_image}
          resizeMode="contain"
          style={{
            position: "absolute",
            right: 40,
            bottom: -40,
            width: 100,
            height: 200,
          }}
        />
      </Animated.View>
    );
  }

  function renderResult() {
    return (
      <Animated.FlatList
        ref={flatListRef}
        data={dummyData.courses_list_2}
        keyExtractor={(item) => `Results-${item.id}`}
        contentContainerStyle={{ paddingHorizontal: SIZES.padding }}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        keyboardDismissMode="on-drag"
        onScroll={onScroll}
        ListHeaderComponent={
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 270,
              marginBottom: SIZES.base,
            }}
          >
            <Text style={{ flex: 1, fontSize: 16 }}>5761,Results</Text>
            {/* filter button */}
            {/* <Icons
              icon={icons.filter}
              iconStyle={{
                width: 20,
                height: 20,
              }}
              containerStyle={{
                width: 40,
                height: 40,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 18,
                backgroundColor: COLORS.primary,
              }}
              onPress={() => {
                filterModelSharedValue1.value = withTiming(0,{duration:100})
                filterModelSharedValue2.value = withDelay(0,{duration:500})
              }}
            /> */}
          </View>
        }
        renderItem={({ item, index }) => (
          <HorizentalCoursesCard
            course={item}
            containerStyle={{
              marginVertical: SIZES.padding,
              marginTop: index == 0 ? SIZES.radius : SIZES.padding,
            }}
            onPress={() => {
              navigation.navigate("CourseDetails", { selectedCourse: item });
            }}
          />
        )}
      ></Animated.FlatList>
    );
  }
  return (
    <View style={{ flex: 1, backgroundColor: COLORS.white }}>
      {/* render Result */}
      {renderResult()}
      {/* Render header */}
      {renderHeader()}

      {/* Filter model */}
      {/* <FilterModel
        filterModelSharedValue1={filterModelSharedValue1}
        filterModelSharedValue2={filterModelSharedValue2}
      /> */}
    </View>
  );
}

CourseListing.SharedElement = (route, otherRoute, showing) => {
  const { category, sharedElementPrefix } = route.params;
  return [
    {
      id: `${sharedElementPrefix}-CategoryCard.Bg-${category?.id}`,
    },
    {
      id: `${sharedElementPrefix}-CategoryCard.Title-${category?.id}`,
    },
  ];
};
