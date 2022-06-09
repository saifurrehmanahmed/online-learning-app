import { View, Text, ScrollView, Image } from "react-native";
import React from "react";
import { dummyData, SIZES, COLORS, icons } from "../../../constants";
import TextButton from "../../../Components/TextButton";
import Icons from "../../../Components/Icons";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'

export default function CourseFile() {
  function renderStudent() {
    let students = [];
    if (dummyData?.course_details?.students.length > 3) {
      students = dummyData?.course_details?.students.slice(0, 3);
    } else {
      students = dummyData?.course_details?.students;
    }
    return (
      <View>
        <Text style={{ fontSize: wp("8%"), fontWeight: "bold" }}>Students</Text>
        <View
          style={{
            flexDirection: "row",
            marginTop: SIZES.radius,
            alignItems: "center",
          }}
        >
          {students.map((item, index) => {
            return (
              <View
                key={`Students-${index}`}
                style={{ marginLeft: index > 0 ? SIZES.radius : 0 }}
              >
                <Image
                  source={item?.thumbnail}
                  style={{ width: wp("22%"), height: hp('11%') }}
                />
              </View>
            );
          })}
          {dummyData?.course_details?.students.length > 3 && (
            <TextButton
              label="View All"
              labelStyle={{ color: COLORS.primary, fontSize: wp('4%') }}
              contenContainerStyle={{
                marginLeft: SIZES.base,
                backgroundColor: null,
              }}
            />
          )}
        </View>
      </View>
    );
  }
  function renderFiles() {
    return (
      <View style={{ marginTop: SIZES.padding }}>
        <Text style={{ fontSize: wp("8%"), fontWeight: "bold" }}>Files</Text>
        {dummyData?.course_details?.files.map((item, index) => {
          return (
            <View
              key={`Files-${index}`}
              style={{ flexDirection: "row", marginTop: SIZES.radius }}
            >
              <Image
                source={item?.thumbnail}
                style={{ width: wp("22%"), height: hp('11%') }}
              />
              <View style={{ flex: 1, marginLeft: SIZES.radius }}>
                <Text style={{ fontSize: wp('5%') }}>{item?.name}</Text>
                <Text style={{ fontSize: wp('4%'), color: COLORS.gray30 }}>
                  {item?.author}
                </Text>
                <Text style={{ fontSize: wp('3.5%'), color: COLORS.gray30 }}>
                  {item?.upload_date}
                </Text>
              </View>
              <Icons
                icon={icons.menu}
                iconStyle={{ width: wp("7%"), height: hp('5%') }}
                containerStyle={{
                  alignItems: "center",
                  justifyContent: "center",
                }}
              />
            </View>
          );
        })}
      </View>
    );
  }
  return (
    <ScrollView style={{ padding: SIZES.padding }}>
      {/* render stuents */}
      {renderStudent()}
      {/* render files */}
      {renderFiles()}
    </ScrollView>
  );
}
