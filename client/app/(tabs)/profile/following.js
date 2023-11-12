import React from "react";
import { View, Text, TextInput } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { router } from "expo-router";
import Avatar from "../../../components/Avatar";
import { AntDesign } from "@expo/vector-icons";
import { StatusBar } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";
import CheckBox from "react-native-check-box";
import { useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import FollowerCard from "../../../components/profile/followerCard";
import FollowingCard from "../../../components/profile/followingCard";

const following = () => {
  const [selectedfollow, setselectedfollow] = useState("following");
  const handleIconPress = (follow) => {
    setselectedfollow(follow);
  };
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View
      style={{
        display: "flex",
        flex: 1,
        flexDirection: "column",
        backgroundColor: "#fff",
      }}
    >
      <View
        style={{
          paddingHorizontal: 10,
          display: "flex",
          alignItems: "center",
          flexDirection: "row",
          height: 60,
          marginTop: StatusBar.currentHeight,
          backgroundColor: "#fff",
          marginBottom: 10,
          borderBottomColor: "#DDDDDD",
          borderBottomWidth: 1,
        }}
      >
        <Pressable onPress={() => router.push("/profile")}>
          <Ionicons name="chevron-back-outline" size={24} color="black" />
        </Pressable>

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            flex: 1,
            alignItems: "center",
            paddingHorizontal: 10,
            paddingVertical: 10,
            justifyContent: "center",
          }}
        >
          <Text style={{ fontSize: 19, fontWeight: "bold" }}>
            _hoang.phuc.seiza_
          </Text>
        </View>
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <TouchableOpacity
          style={{
            paddingHorizontal: 50,
            paddingBottom: 10,
            borderBottomWidth: 1,
            borderColor: selectedfollow === "following" ? "#000000" : "#DDDDDD",
          }}
          onPress={() => handleIconPress("following")}
        >
          <Text
            style={{
              fontSize: 13,
              fontWeight: 600,
              color: selectedfollow === "following" ? "#000000" : "#DDDDDD",
            }}
          >
            Người theo dõi
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            paddingHorizontal: 50,
            borderBottomWidth: 1,
            borderColor: selectedfollow === "follower" ? "#000000" : "#DDDDDD",
            paddingBottom: 10,
          }}
          onPress={() => handleIconPress("follower")}
        >
          <Text
            style={{
              fontSize: 13,
              fontWeight: 600,
              color: selectedfollow === "follower" ? "#000000" : "#DDDDDD",
            }}
          >
            Đang theo dõi
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        {selectedfollow === "following" ? (
          <View>
            <ScrollView>
              <Text
                style={{
                  marginStart: 10,
                  marginTop: 10,
                  marginBottom: 10,
                  fontSize: 15,
                  fontWeight: "bold",
                }}
              >
                Tất cả người theo dõi
              </Text>
              <FollowerCard  />
              <FollowerCard  />
              <FollowerCard  />
              <FollowerCard  />
              <FollowerCard  />
              <FollowerCard  />
              <FollowerCard  />
              <FollowerCard  />
              <FollowerCard  />
              <FollowerCard  />
              <FollowerCard  />
              {/* Modal Alert */}

            </ScrollView>
          </View>
        ) : (
          <View>
            <ScrollView>
              <Text
                style={{
                  marginStart: 10,
                  marginTop: 10,
                  marginBottom: 10,
                  fontSize: 15,
                  fontWeight: "bold",
                }}
              >
                Bạn theo dõi
              </Text>
              <FollowingCard />
              <FollowingCard />
              <FollowingCard />
              <FollowingCard />
              <FollowingCard />
              <FollowingCard />
              <FollowingCard />
              <FollowingCard />
              <FollowingCard />
              <FollowingCard />
              <FollowingCard />
              <FollowingCard />
            </ScrollView>
          </View>
        )}
      </View>
    </View>
  );
};

export default following;
