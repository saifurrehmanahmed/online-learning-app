import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Animated,
  Keyboard,
} from "react-native";
import React from "react";
// import Video from "react-native";
import { Video } from "expo-av";

import {
  FONTS,
  icons,
  COLORS,
  SIZES,
  constants,
  dummyData,
} from "../../constants";
import Icons from "../../Components/Icons";
import LineDivider from "../../Components/LineDivider";
import CoursesChapter from "./CoursesTab/CoursesChapter";
import CourseFile from "./CoursesTab/CourseFile";
import CourseDiscussion from "./CoursesTab/CourseDiscussion";

const course_details_tabs = constants.course_details_tabs.map(
  (course_details_tabs) => ({
    ...course_details_tabs,
    ref: React.createRef(),
  })
);

// const TabIndicator = ({ measuredLayout, scrollX }) => {
//   return (
//     <Animated.View
//       style={{
//         position: "absolute",
//         bottom: 0,
//         height: 4,
//         width: 100,
//         borderRadius: SIZES.radius,
//         backgroundColor: COLORS.primary,
//       }}
//     ></Animated.View>
//   );
// };

const Tabs = ({ scrollX, onTabPress }) => {
  const [measuredLayout, setMeasuredLayout] = React.useState([]);
  const containerRef = React.useRef();

  // React.useEffect(() => {
  //   let ml = [];
  //   course_details_tabs.forEach((course_details_tabs) => {
  //     course_details_tabs?.ref?.current?.measuredLayout(
  //       containerRef.current,
  //       (x, y, height, width) => {
  //         ml.push({
  //           x,
  //           y,
  //           height,
  //           width,
  //         });
  //         if (ml.length === course_details_tabs.length) {
  //           setMeasuredLayout(ml);
  //         }
  //       }
  //     );
  //   });
  // }, [containerRef.current]);
  return (
    <View ref={containerRef} style={{ flex: 1, flexDirection: "row" }}>
      {/* tab indicator */}

      {/* {measuredLayout.length > 0 && (
        <TabIndicator measuredLayout={measuredLayout} scrollX={scrollX} />
      )} */}
      {/* tab */}
      {course_details_tabs.map((item, index) => {
        return (
          <TouchableOpacity
            key={`Tab-${index}`}
            ref={item.ref}
            style={{
              flex: 1,
              paddingHorizontal: 15,
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={() => onTabPress(index)}
          >
            <Text style={{ fontSize: 15, fontWeight: "bold" }}>
              {item.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default function CourseDetails({ navigation, route }) {
  const { selectedCourse } = route.params;
  const [video, setVideo] = React.useState(false);
  const videos = React.useRef(null);
  const flatListRef = React.useRef();
  const scrollX = React.useRef(new Animated.Value(0)).current;

  const onTabPress = React.useCallback((tabIndex) => {
    flatListRef?.current?.scrollToOffset({
      offset: tabIndex * SIZES.width,
    });
  });
  const renderHeaderComponent = () => {
    return (
      <>
        {/* render back button */}
        <View style={{ flex: 1 }}>
          <Icons
            icon={icons.back}
            iconStyle={{ width: 25, height: 25, tintColor: COLORS.black }}
            containerStyle={{
              width: 40,
              height: 40,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 20,
              backgroundColor: COLORS.white,
            }}
            onPress={() => navigation.goBack()}
          />
        </View>
        {/* share and favourit button */}
        <View style={{ flexDirection: "row" }}>
          <Icons
            icon={icons.media}
            iconStyle={{ tintColor: COLORS.white }}
            containerStyle={{
              width: 40,
              height: 40,
              alignItems: "center",
              justifyContent: "center",
            }}
          />
          <Icons
            icon={icons.favourite_outline}
            iconStyle={{ tintColor: COLORS.white }}
            containerStyle={{
              width: 40,
              height: 40,
              alignItems: "center",
              justifyContent: "center",
            }}
          />
        </View>
      </>
    );
  };
  const renderHeader = () => {
    return (
      <View
        style={{
          position: "absolute",
          top: SIZES.height > 800 ? 40 : 20,
          left: 0,
          right: 0,
          flexDirection: "row",
          paddingHorizontal: SIZES.padding,
          zIndex: 1,
        }}
      >
        {renderHeaderComponent()}
      </View>
    );
  };
  const renderVideoSection = () => {
    return (
      <View
        style={{
          height: SIZES.height > 800 ? 220 : 200,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: COLORS.gray90,
        }}
      >
        <ImageBackground
          source={selectedCourse?.thumbnail}
          style={{
            height: "100%",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Icons
            icon={icons.play}
            iconStyle={{ width: 25, height: 25, tintColor: COLORS.white }}
            containerStyle={{
              width: 55,
              height: 55,
              alignItems: "center",
              justifyContent: "center",
              marginTop: SIZES.padding,
              borderRadius: 30,
              backgroundColor: COLORS.primary,
            }}
            onPress={() => {
              setVideo(true);
            }}
          />
        </ImageBackground>
        {video && (
          <Video
            ref={videos}
            source={{
              uri: "https://www.youtube.com/watch?v=jFkIE-WCPzg",
            }}
            controls={true}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              backgroundColor: COLORS.black,
            }}
          />
        )}
      </View>
    );
  };
  function renderContentSection() {
    return (
      <View
        style={{
          flex: 1,
        }}
      >
        {/* tab */}
        <View style={{ height: 60 }}>
          <Tabs scrollX={scrollX} onTabPress={onTabPress} />
        </View>
        {/* Line divider */}
        <LineDivider lineStyle={{ backgroundColor: COLORS.gray20 }} />

        {/* content */}
        <Animated.FlatList
          ref={flatListRef}
          horizontal
          paggingEnabled
          snapToAlignment="center"
          snapToInterval={SIZES.width}
          decelerationRate="fast"
          keyboardDismissMode="on-drag"
          showsHorizontalScrollIndicator={false}
          data={constants.course_details_tabs}
          keyExtractor={(item) => `CourseDetailsTab-${item.id}`}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
          renderItem={({ item, index }) => {
            return (
              <View style={{ width: SIZES.width }}>
                {index == 0 && <CoursesChapter /> }
                {index == 1 && <CourseFile />}
                {index == 2 && <CourseDiscussion />}
              </View>
            );
          }}
        />
      </View>
    );
  }

  
  
  return (
    <View style={{ flex: 1, backgroundColor: COLORS.white }}>
      {/* render header */}
      {renderHeader()}
      {/* render video section */}
      {renderVideoSection()}

      {/* render content section */}
      {renderContentSection()}

    </View>
  );
}
