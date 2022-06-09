import { View, Text, ScrollView, Image, FlatList } from "react-native";
import React from "react";

import {
  COLORS,
  FONTS,
  icons,
  images,
  SIZES,
  dummyData,
} from "../../../constants";
import Icons from "../../../Components/Icons";
import IconsLabel from "../../../Components/IconsLabel";
import TextButton from "../../../Components/TextButton";
import LineDivider from "../../../Components/LineDivider";
import HorizentalCoursesCard from "../../../Components/HorizentalCoursesCard";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'

export default function CoursesChapter() {
  function renderHeaders() {
    return (
      <View
        style={{ marginTop: SIZES.padding, paddingHorizontal: SIZES.padding }}
      >
        {/* course name */}
        <Text style={{ fontSize: wp('7%'), fontWeight: "bold" }}>
          {dummyData?.course_details?.title}
        </Text>

        {/* students and duration time */}
        <View style={{ flexDirection: "row", marginTop: SIZES.base }}>
          <Text style={{ fontSize: wp('4%'), color: COLORS.gray30 }}>
            {dummyData?.course_details?.number_of_students}
          </Text>
          <IconsLabel
            icon={icons.time}
            label={dummyData?.course_details?.duration}
            containerStyle={{ marginLeft: SIZES.radius }}
            // iconStyle={{ width: wp('10%'), height: hp('15%') }}
            labelStyle={{ fontSize: wp('4%') }}
          />
        </View>
        {/* instructor */}
        <View
          style={{
            flexDirection: "row",
            marginTop: SIZES.radius,
            alignItems: "center",
          }}
        >
          {/* profile photo */}
          <Image
            source={images.saif}
            style={{ height: hp('8%'), width: wp('17%'), borderRadius: wp('10%') }}
          />
          {/* name */}
          <View
            style={{
              flex: 1,
              marginLeft: SIZES.base,
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: wp('5%') }}>Saif Ur Rehman Ahmed</Text>
            <Text style={{ fontSize: wp('3.5%') }}>React Native Developer</Text>
          </View>
          {/* button */}
          <TextButton
            label="Follow +"
            contenContainerStyle={{ width: wp('24%'), height: hp("5%"), borderRadius: 25 }}
            labelStyle={{ fontSize: 14 }}
          />
        </View>
      </View>
    );
  }

  function renderChapters() {
    return (
      <View>
        {dummyData?.course_details?.videos.map((item, index) => {
          return (
            <View
              key={`Videos-${index}`}
              style={{
                alignItems: "center",
                height: hp("9%"),
                backgroundColor: item?.is_playing
                  ? COLORS.additionalColor11
                  : null,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  paddingHorizontal: SIZES.padding,
                  alignItems: "center",
                  height: hp('9%'),
                }}
              >
                {/* icons */}
                <Image
                  source={
                    item?.is_complete
                      ? icons.completed
                      : item?.is_playing
                        ? icons.play_1
                        : icons.lock
                  }
                  style={{
                    width: wp('10%'),
                    height: hp('5%'),
                  }}
                />
                {/* title and duration */}
                <View style={{ flex: 1, marginLeft: SIZES.radius }}>
                  <Text style={{ fontSize: wp('4%') }}>{item?.title}</Text>
                  <Text style={{ color: COLORS.gray30, fontSize: wp('3.5%') }}>
                    {item?.duration}
                  </Text>
                </View>
                {/* Sizes and status */}
                <View style={{ flexDirection: "row" }}>
                  <Text style={{ color: COLORS.gray30, fontSize: wp('3.5%') }}>
                    {item?.size}
                  </Text>
                  <Image
                    source={
                      item?.is_downloaded ? icons.completed : icons.download
                    }
                    style={{
                      marginLeft: SIZES.base,
                      width: wp("6%"),
                      height: hp("3%"),
                      tintColor: item?.is_lock ? COLORS.additionalColor4 : null,
                    }}
                  />
                </View>
              </View>
              {/* progress bar */}
              {item?.is_playing && (
                <View
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    height: hp('1%'),
                    width: item?.progress,
                    backgroundColor: COLORS.primary,
                  }}
                />
              )}
            </View>
          );
        })}
      </View>
    );
  }
  function renderPopularCourses() {
    return (
      <View style={{ marginTop: SIZES.padding }}>
        <View
          style={{ flexDirection: "row", paddingHorizontal: SIZES.padding }}
        >
          <Text style={{ flex: 1, fontSize: hp('3%') }}>Popular Courses</Text>
          <TextButton
            contenContainerStyle={{
              width: wp("20%"),
              borderRadius: 30,
              backgroundColor: COLORS.primary,
            }}
            label="See All"
          />
        </View>
        <FlatList
          data={dummyData.courses_list_2}
          listKey="PopularCourses"
          scrollEnabled={false}
          keyExtractor={(item) => `PopularCourses-${item.id}`}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            marginTop: SIZES.radius,
            paddingHorizontal: SIZES.padding,
          }}
          renderItem={({ item, index }) => (
            <HorizentalCoursesCard
              course={item}
              containerStyle={{
                marginVertical: SIZES.padding,
                marginTop: index == 0 ? SIZES.radius : SIZES.padding,
              }}
            />
          )}
        />
      </View>
    );
  }
  return (
    <ScrollView>
      {/* Headers */}
      {renderHeaders()}
      {/* Line divider */}
      <LineDivider lineStyle={{ height: 1, marginVertical: SIZES.radius }} />
      {/* render chapter  */}
      {renderChapters()}

      {/* render popular courses */}
      {renderPopularCourses()}
    </ScrollView>
  );
}
