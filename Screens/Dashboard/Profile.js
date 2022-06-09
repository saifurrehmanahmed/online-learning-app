import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";

import LineDivider from "../../Components/LineDivider";
import TextButton from "../../Components/TextButton";
import Icons from "../../Components/Icons";
import ProgressBar from "../../Components/ProgressBar";
import { COLORS, FONTS, SIZES, icons, images } from "../../constants";
import ProfileValue from "../../Components/ProfileValue";
import RadioButtonProfile from "../../Components/RadioButtonProfile";
import { connect } from "react-redux";
import { toggleTheme } from "../../stores/themeActions";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'



function renderProfileSection() {
  return (
    <View style={styles.profileSectionContainer}>
      <ProfileValue icon={icons.profile} label="Name" value="Saif Ur Reham" />
      <LineDivider lineStyle={{ width: wp("75%") }} />
      <ProfileValue icon={icons.email} label="Email" value="saif@gmail.com" />
      <LineDivider lineStyle={{ width: wp("75%") }} />
      <ProfileValue
        icon={icons.password}
        label="Password"
        value="Updated 2 weeks ago"
      />
      <LineDivider lineStyle={{ width: wp("75%") }} />
      <ProfileValue icon={icons.call} label="Phone" value="03170049094" />
    </View>
  );
}

function renderProfileSection2() {
  const [courseNotification, setCourseNotification] = React.useState(false);
  const [studyRemainder, setStudyRemainder] = React.useState(false);
  return (
    <View style={styles.profileSectionContainer}>
      <ProfileValue icon={icons.star} label="Star" value="Pages" />
      <LineDivider lineStyle={{width:wp("75%")}} />
      <RadioButtonProfile
        icon={icons.new_icon}
        label="New Course Notification"
        isSelected={courseNotification}
        onPress={() => !setCourseNotification}
      />
      <LineDivider lineStyle={{width:wp("75%")}} />
      <RadioButtonProfile
        icon={icons.reminder}
        label="Study Remainder"
        isSelected={studyRemainder}
        onPress={() => !setStudyRemainder}
      />
    </View>
  );
}

const Profile = ({ appTheme, toggleTheme }) => {
  function toggleThemeHandler() {
    if (appTheme?.name == "light") {
      toggleTheme("dark");
    } else {
      toggleTheme("light");
    }
  }
  function renderHeader() {
    return (
      <View
        style={{
          flexDirection: "row",
          marginTop: hp('7%'),
          paddingHorizontal: wp('8%'),
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            fontSize: wp('6%'),
            fontWeight: "bold",
            color: appTheme?.textColor,
          }}
        >
          Profile
        </Text>
        <Icons
          icon={icons.sun}
          iconStyle={{ tintColor: appTheme?.tintColor }}
          onPress={() => toggleThemeHandler()}
        />
      </View>
    );
  }
  function renderProfileCard() {
    return (
      <View
        style={{
          flexDirection: "row",
          marginTop: SIZES.padding,
          paddingHorizontal: SIZES.radius,
          paddingVertical: 20,
          borderRadius: SIZES.radius,
          backgroundColor: appTheme?.backgroundColor2,
        }}
      >
        <TouchableOpacity style={{ width: wp('24%'), height: hp('12%') }}>
          <Image
            source={images.saif}
            style={{
              width: wp("24%"),
              height: hp("12%"),
              borderWidth: 1,
              borderRadius: 40,
              borderColor: COLORS.white,
            }}
          />
          <View
            style={{
              position: "absolute",
              width: wp("25%"),
              height: hp("13%"),
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View
              style={{
                width: wp("9%"),
                height: hp('4%'),
                marginBottom: hp('-10%'),
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 15,
                backgroundColor: COLORS.primary,
              }}
            >
              <Image
                source={icons.camera}
                resizeMode="contain"
                style={{ width: wp('5%'), height: hp('5%') }}
              />
            </View>
          </View>
        </TouchableOpacity>
        {/* Details */}
        <View
          style={{ flex: 1, marginLeft: SIZES.radius, alignItems: "flex-start" }}
        >
          <Text style={{ color: COLORS.white, ...FONTS.h2 }}>Saif Ur Rehman</Text>
          <Text style={{ color: COLORS.white, ...FONTS.body5 }}>
            React Native Develpor
          </Text>
          <ProgressBar
            progress="80%"
            containerStyle={{ marginTop: SIZES.radius }}
          />
          <View style={{ flexDirection: "row" }}>
            <Text style={{ color: COLORS.white, flex: 1 }}>Overall progress</Text>
            <Text style={{ color: COLORS.white }}>80%</Text>
          </View>
          <TextButton
            label="+ Become Member"
            contenContainerStyle={{
              backgroundColor: appTheme?.backgroundColor4,
              height: hp('5%'),
              marginTop: SIZES.padding,
              borderRadius: 20,
              paddingHorizontal: SIZES.radius,
            }}
            labelStyle={{ color: appTheme?.textColor2 }}
          />
        </View>
      </View>
    );
  }
  return (
    <View style={{ flex: 1, backgroundColor: appTheme?.backgroundColor1 }}>
      {/* render Header */}
      {renderHeader()}
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: SIZES.padding,
          paddingBottom: hp('10%'),
        }}
      >
        {/* Profile card */}
        {renderProfileCard()}

        {/* profile section */}
        {renderProfileSection()}

        {/* render profile section 2 */}
        {renderProfileSection2()}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  profileSectionContainer: {
    marginTop: SIZES.padding,
    paddingHorizontal: SIZES.padding,
    borderWidth: 1,
    borderRadius: SIZES.radius,
    borderColor: COLORS.gray20,
  },
});

function mapStateToProps(state) {
  return {
    appTheme: state.appTheme,
    error: state.error,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    toggleTheme: (themeType) => {
      return dispatch(toggleTheme(themeType));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
