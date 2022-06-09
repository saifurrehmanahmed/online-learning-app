import React from "react";
import { View, Text, Image, ImageBackground, ScrollView } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import {
  COLORS,
  SIZES,
  FONTS,
  images,
  icons,
  dummyData,
} from "../../constants";
import Icons from "../../Components/Icons";
import TextButton from "../../Components/TextButton";
import VerticalCourseCard from "../../Components/VerticalCourseCard";
import LineDivider from "../../Components/LineDivider";
import CategoriesCard from "../../Components/CategoriesCard";
import HorizentalCoursesCard from "../../Components/HorizentalCoursesCard";
import { useNavigation } from "@react-navigation/native";
import useOrientation from '../../hooks/useOrientation'
import { widthPercentageToDP as wp , heightPercentageToDP as hp } from 'react-native-responsive-screen'


const Section = ({ containerStyle, title, onPress, children }) => {

  return (
    <View style={{ ...containerStyle }}>
      <View style={{ flexDirection: "row", paddingHorizontal: SIZES.padding }}>
        <Text style={{ flex: 1, fontSize: 20 }}>{title}</Text>
        <TextButton
          contenContainerStyle={{
            width: wp('20%'),
            borderRadius: 30,
            backgroundColor: COLORS.primary,
          }}
          label="See All"
          onPress={onPress}
        />
      </View>
      {children}
    </View>
  );
};

function renderHeader() {
  return (
    <View
      style={{
        flexDirection: "row",
        marginTop: hp('7%'),
        paddingHorizontal: SIZES.padding,
        alignItems: "center",
      }}
    >
      {/* {Greeting} */}
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: hp('3%') }}>Hello,Saif Ur Rehman</Text>
        <Text style={{ color: COLORS.gray50, fontSize: hp('2.2%') }}>
          Saturday,25th spe 2021
        </Text>
      </View>
      {/* IconButton */}
      <Icons
        icon={icons.notification}
        iconStyle={{ tintColor: COLORS.black }}
      />
    </View>
  );
}

function renderStartLearning() {
  return (
    <ImageBackground
      source={images.featured_bg_image}
      style={{
        alignItems: "flex-start",
        marginTop: SIZES.padding,
        marginHorizontal: SIZES.padding,
        padding: wp('7%'),
      }}
      imageStyle={{ borderRadius: SIZES.radius }}
    >
      {/* Info */}
      <View>
        <Text style={{ color: COLORS.white, fontSize: hp('3%') }}>How to </Text>
        <Text style={{ color: COLORS.white, fontSize: hp('3%') }}>
          Make your brain more visibel with out checkList
        </Text>
        <Text
          style={{
            marginTop: hp('3%'),
            color: COLORS.white
          }}
        >
          By Saif Ur Rehman
        </Text>
      </View>
      {/* Image */}
      <Image
        source={images.start_learning}
        style={{ marginTop: hp('5%'), width: wp("75%"), height: hp('14%') }}
      />
      {/* Button */}
      <TextButton
        label="Start Learning"
        contenContainerStyle={{
          height: hp('5%'),
          paddingHorizontal: SIZES.padding,
          borderRadius: 20,
          backgroundColor: COLORS.white,
        }}
        labelStyle={{
          color: COLORS.black,
          fontSize: hp('2%'),
          fontWeight: "bold",
        }}
      />
    </ImageBackground>
  );
}

function renderCourses() {
  return (
    <FlatList
      horizontal
      data={dummyData.courses_list_1}
      listKey="Courses"
      keyExtractor={(item) => `Courses-${item.id}`}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        marginTop: SIZES.padding,
      }}
      renderItem={({ item, index }) => (
        <VerticalCourseCard
          containerStyle={{
            marginLeft: index == 0 ? SIZES.padding : SIZES.base,
            marginRight:
              index == dummyData.courses_list_1.length - 1 ? SIZES.padding : 0,
          }}
          courses={item}
        />
      )}
    />
  );
}

function popularCategory() {
  return (
    <Section title="Popular Courses" containerStyle={{ marginTop: hp('8%') }}>
      <FlatList
        data={dummyData.courses_list_2}
        listKey="PopularCourses"
        keyExtractor={(item) => `PopularCourses ${item.id}`}
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
        ItemSeparatorComponent={() => (
          <LineDivider lineStyle={{ backgroundColor: COLORS.gray20 }} />
        )}
      />
    </Section>
  );
}

const Home = () => {
  const navigation = useNavigation();

  function categoriesSection() {
    return (
      <Section title="Categories">
        <FlatList
          horizontal
          data={dummyData.categories}
          listKey="Categories"
          keyExtractor={(item) => `Categories ${item.id}`}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ marginTop: SIZES.radius,paddingRight:wp('2%') }}
          renderItem={({ item, index }) => (
            <CategoriesCard
              sharedElementPrefix="Home"
              category={item}
              containerStyle={{
                marginLeft: index == 0 ? wp('5%') : wp('-8%'),
                marginRight:
                  index == dummyData.categories.length - 1 ? wp('-5%') : 0,
              }}
              onPress={() =>
                navigation.navigate("CourseListing", {
                  category: item,
                  sharedElementPrefix: "Home",
                })
              }
            />
          )}
        />
      </Section>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.white }}>
      {/* Header Section */}
      {renderHeader()}
      {/* Content Section */}
      <ScrollView
        contentContainerStyle={{ paddingBottom: hp('10%') }}
        showsVerticalScrollIndicator={false}
      >
        {/* render learning */}
        {renderStartLearning()}
        {/* {render courses} */}
        {renderCourses()}
        <LineDivider lineStyle={{ marginVertical: SIZES.padding }} />
        {/* categories section */}
        {categoriesSection()}
        {/* popular category */}
        {popularCategory()}
      </ScrollView>
    </View>
  );
};

export default Home;
