import React, { useRef } from "react";
import { View, Text, Animated, TouchableOpacity, Image } from "react-native";
import { COLORS, SIZES, FONTS, constants } from "../../constants";
import Home from "./Home";
import Search from "./Search";
import Profile from "./Profile";
import { Shadow } from "react-native-shadow-2";
import { connect } from "react-redux";
import { widthPercentageToDP as wp , heightPercentageToDP as hp } from 'react-native-responsive-screen'

const bottom_tabs = constants.bottom_tabs.map((bottom_tab) => ({
  ...bottom_tab,
  ref: React.createRef(),
}));

const Tabs = ({ scrollX, onBottomTabPress }) => {
  const containedRef = React.useRef();
  const [measureLayout, setMeasureLayout] = React.useState([]);
  React.useEffect(() => {
    let ml = [];
    bottom_tabs.forEach((bottom_tab) => {
      bottom_tab?.ref?.current?.measureLayout(
        containedRef.current,
        (x, y, width, height) => {
          ml.push({
            x,
            y,
            width,
            height,
          });
          if (ml.length === bottom_tabs.length) {
            setMeasureLayout(ml);
          }
        }
      );
    });
  }, [containedRef.current]);
  return (
    <View ref={containedRef} style={{ flex: 1, flexDirection: "row" }}>
      {/* Tab indicator */}
      {measureLayout.length > 0 && (
        <TabIndicator measureLayout={measureLayout} scrollX={scrollX} />
      )}
      {bottom_tabs.map((item, index) => {
        return (
          <TouchableOpacity
            key={`BottomTab-${index}`}
            ref={item.ref}
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              paddingHorizontal: wp('8%'),
            }}
            onPress={() => {
              onBottomTabPress(index);
            }}
          >
            <Image
              source={item.icon}
              resizeMode="contain"
              style={{ height: hp('5%'), width: wp('8%') }}
            />
            <Text style={{ marginTop: hp("1%"), color: COLORS.white, ...FONTS.h3 }}>
              {item.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const TabIndicator = ({ measureLayout, scrollX }) => {
  const inputRange = bottom_tabs.map((_, i) => i * SIZES.width);
  const tabIndicatorWidth = scrollX.interpolate({
    inputRange,
    outputRange: measureLayout.map((measure) => measure.width),
  });
  const translateX = scrollX.interpolate({
    inputRange,
    outputRange: measureLayout.map((measure) => measure.x),
  });
  return (
    <Animated.View
      style={{
        position: "absolute",
        left: 0,
        height: "100%",
        width: tabIndicatorWidth,
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.primary,
        transform: [
          {
            translateX,
          },
        ],
      }}
    />
  );
};

const MainLayout = ({ appTheme }) => {
  const flatlistRef = useRef();
  const scrollX = React.useRef(new Animated.Value(0)).current;

  const onBottomTabPress = React.useCallback((bottomTabIndex) => {
    flatlistRef?.current?.scrollToOffset({
      offset: bottomTabIndex * SIZES.width,
    });
  });
  function renderContent() {
    return (
      <View style={{ flex: 1 }}>
        <Animated.FlatList
          ref={flatlistRef}
          horizontal
          pagingEnabled
          scrollEnabled={false}
          snapToAlignment="center"
          decelerationRate="fast"
          showsHorizontalScrollIndicator={false}
          data={constants.bottom_tabs}
          keyExtractor={(item) => `Main-${item.id}`}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
          renderItem={({ item, index }) => {
            return (
              <View style={{ height: SIZES.height, width: SIZES.width }}>
                {item.label == constants.screens.home && <Home />}
                {item.label == constants.screens.search && <Search />}
                {item.label == constants.screens.profile && <Profile />}
              </View>
            );
          }}
        />
      </View>
    );
  }

  function renderBottomTab() {
    return (
      <View
        style={{
          paddingBottom: SIZES.height > 800 ? 20 : 5,
          paddingHorizontal: SIZES.padding,
          paddingVertical: SIZES.radius,
          backgroundColor: appTheme?.backgroundColor1,
        }}
      >
        <Shadow size={[SIZES.width - SIZES.padding * 2, 85]}>
          <View
            style={{
              flex: 1,
              borderRadius: SIZES.radius,
              backgroundColor: COLORS.primary3,
            }}
          >
            <Tabs scrollX={scrollX} onBottomTabPress={onBottomTabPress} />
          </View>
        </Shadow>
      </View>
    );
  }
  return (
    <View style={{ flex: 1, backgroundColor: COLORS.white }}>
      {/* render content */}
      {renderContent()}
      {/* Bottom tab */}
      {renderBottomTab()}
    </View>
  );
};

function mapStateToProps(state) {
  return {
    appTheme: state.appTheme,
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(MainLayout);
