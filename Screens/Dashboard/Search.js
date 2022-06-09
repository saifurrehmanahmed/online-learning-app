import React from "react";
import { View, Text, Image, TextInput } from "react-native";
import { Shadow } from "react-native-shadow-2";
import { FlatList } from "react-native-gesture-handler";
import { FONTS, COLORS, SIZES, icons, dummyData } from "../../constants";
import CategoriesCard from "../../Components/CategoriesCard";
import TextButton from "../../Components/TextButton";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'

function renderTopSearch() {
  return (
    <View style={{ marginTop: SIZES.padding }}>
      <Text
        style={{
          marginHorizontal: SIZES.padding,
          ...FONTS.h2,
          fontWeight: "bold",
        }}
      >
        Top Search
      </Text>
      <FlatList
        horizontal
        data={dummyData.top_searches}
        listKey="TopSearches"
        keyExtractor={(item) => `TopSearches-${item.id}`}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          marginTop: SIZES.radius,
        }}
        renderItem={({ item, index }) => (
          <TextButton
            label={item.label}
            contenContainerStyle={{
              paddingVertical: SIZES.radius,
              paddingHorizental: SIZES.padding,
              marginLeft: index == 0 ? SIZES.padding : SIZES.radius,
              marginRight:
                index == dummyData.top_searches.length - 1 ? SIZES.padding : 0,
              borderRadius: SIZES.radius,
              backgroundColor: COLORS.gray10,
            }}
            labelStyle={{
              color: COLORS.gray50,
              ...FONTS.h3,
              paddingLeft: wp("4%"),
              paddingRight: wp('4%'),
            }}
          />
        )}
      />
    </View>
  );
}

function renderSearchBar() {
  //   const inputRange = [0, 55];
  //   const searchBarAnimatedStyle = useAnimatedStyle(() => {
  //     return {
  //       height: interpolate(
  //         scrollY.value,
  //         inputRange,
  //         [55, 0],
  //         Extrapolate.CLAMP
  //       ),
  //     };
  //   });
  return (
    <Animated.View
      style={[
        {
          position: "absolute",
          top: hp('7%'),
          paddingHorizontal: SIZES.padding,
          height: hp('7%'),
        },
      ]}
    >
      <Shadow>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            width: SIZES.width - SIZES.padding * 2,
            paddingHorizontal: SIZES.radius,
            borderRadius: SIZES.radius,
            backgroundColor: COLORS.white,
          }}
        >
          <Image
            source={icons.search}
            style={{ width: wp('7%'), height: hp('3.5%'), tintColor: COLORS.gray40 }}
          />
          <TextInput
            style={{ flex: 1, marginLeft: SIZES.base, ...FONTS.h4 }}
            value=""
            placeholder="Search for Courses, Topics and Educator"
            placeholderTextColor={COLORS.gray}
          />
        </View>
      </Shadow>
    </Animated.View>
  );
}

const Search = () => {
  const scrollViewRef = React.useRef();
  const scrollY = useSharedValue(0);
  const onScroll = useAnimatedScrollHandler(
    (event) => (scrollY.value = event.contentOffset.y)
  );

  const navigation = useNavigation();

  function browseSearch() {
    return (
      <View style={{ marginTop: SIZES.padding, }}>
        <Text
          style={{
            marginHorizontal: SIZES.padding,
            ...FONTS.h2,
            fontWeight: "bold",
          }}
        >
          Browse Categories
        </Text>
        <FlatList
          data={dummyData.categories}
          numColumns={2}
          scrollEnabled={false}
          listKey="BrowseCategories"
          keyExtractor={(item) => `BrowseCategories-${item.id}`}
          contentContainerStyle={{ marginTop: SIZES.radius }}
          renderItem={({ index, item }) => (
            <CategoriesCard
              sharedElementPrefix="Search"
              category={item}
              containerStyle={{
                height: hp('20%'),
                width:wp('40%'),
                marginTop: SIZES.radius,
                marginLeft: (index - 1) % 2 == 0 ? wp('3%') : hp('4%'),
                
              }}
              onPress={() =>
                navigation.navigate("CourseListing", {
                  category: item,
                  sharedElementPrefix: "Search",
                })
              }
            />
          )}
        />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.white }}>
      <Animated.ScrollView
        ref={scrollViewRef}
        contentContainerStyle={{ marginTop: hp('14%'), paddingBottom: hp('25%') }}
        showsVerticalScrollIndicator={false}
        // scrollEventThrottle={16}
        keyboardDismissMode="on-drag"
        onScroll={onScroll}
      // onScrollEndDrag
      >
        {/* topSearch */}
        {renderTopSearch()}
        {/* Browse Searches */}
        {browseSearch()}
      </Animated.ScrollView>
      {/* render search bar */}
      {renderSearchBar()}
    </View>
  );
};

export default Search;
