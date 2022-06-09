import {
  View,
  Text,
  FlatList,
  Image,
  TextInput,
  Touchable,
} from "react-native";
import React from "react";
import { COLORS, dummyData, SIZES, icons } from "../../../constants";
import IconButtonLabel from "../../../Components/IconButtonLabel";
import IconsLabel from "../../../Components/IconsLabel";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'

const CommentSecction = ({ commentItem, commentOption, relies }) => {
  return (
    <View style={{ flexDirection: "row", marginTop: SIZES.padding }}>
      <Image
        source={commentItem?.profile}
        style={{ width: wp("10%"), height: hp('5%'), borderRadius: 25 }}
      />
      {/* name and comment */}
      <View style={{ flex: 1, marginLeft: SIZES.radius }}>
        {/* name */}
        <Text style={{ fontSize: wp('5%'), fontWeight: "bold" }}>Saif ur Rehman</Text>
        {/* comment */}
        <Text style={{ fontSize: wp('4%') }}>{commentItem?.comment}</Text>
        {/* Comment option */}
        {commentOption}
      </View>
    </View>
  );
};

export default function CourseDiscussion() {
  function renderDisscussion() {
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          data={dummyData?.course_details?.discussions}
          keyExtractor={(item) => `Disscussion-main-${item.id}`}
          contentContainerStyle={{
            paddingHorizontal: SIZES.padding,
            paddingBottom: hp('10%'),
          }}
          renderItem={({ item, index }) => (
            <CommentSecction
              commentItem={item}
              commentOption={
                <View
                  style={{
                    flexDirection: "row",
                    marginTop: SIZES.radius,
                    paddingVertical: SIZES.base,
                    borderBottomWidth: 1,
                    borderTopWidth: 1,
                    borderColor: COLORS.gray20,
                  }}
                >
                  {/* Comment */}
                  <IconButtonLabel
                    icon={icons.comment}
                    label={item?.no_of_comments}
                    icoStyle={{
                      // width: 20,
                      // height: 20,
                      // tintColor: COLORS.black,
                    }}
                    labelStyle={{
                      marginLeft: wp("2%"),
                      color: COLORS.black,
                      fontSize: wp('3.4%'),
                    }}
                  />

                  {/* likes */}
                  <IconButtonLabel
                    icon={icons.heart}
                    label={item?.no_of_likes}
                    conainerStyle={{ marginLeft: SIZES.radius }}
                    // icoStyle={{
                    //   width: 20,
                    //   height: 20,
                    //   tintColor: COLORS.black,
                    // }}
                    labelStyle={{
                      marginLeft: wp("2%"),
                      color: COLORS.black,
                      fontSize: wp('3.4%'),
                    }}
                  />
                  {/* post date  */}
                  <Text style={{ flex: 1, textAlign: "right", fontSize: wp('3.4%') }}>
                    {item?.posted_on}
                  </Text>
                </View>
              }
            />
          )}
        />
      </View>
    );
  }
  function footerSection() {
    return (
      <View
        style={{
          flexDirection: "row",
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: hp('7%'),
          paddingHorizontal: SIZES.padding,
          paddingVertical: SIZES.radius,
          backgroundColor: COLORS.gray10,
        }}
      >
        <TextInput
          style={{ flex: 1, marginRight: SIZES.base, fontSize: wp('4%') }}
          multiline
          placeholder="Type Something"
          placeholderTextColor={COLORS.gray80}
        />

        <IconButtonLabel
          icon={icons.right_arrow}
          conainerStyle={{ marginLeft: SIZES.radius }}

          labelStyle={{
            marginLeft: wp("2%"),
            color: COLORS.black,
            fontSize: wp('3.4%'),
          }}
        />
      </View>
    );
  }
  return (
    <View style={{ flex: 1, backgroundColor: COLORS.white }}>
      {/* {render disscussion} */}
      {renderDisscussion()}
      {/* footer section */}
      {footerSection()}
    </View>
  );
}
