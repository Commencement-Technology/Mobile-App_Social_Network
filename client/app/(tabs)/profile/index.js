import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { Octicons } from "@expo/vector-icons";
import Avatar from "../../../components/Avatar";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useCallback, useMemo, useRef } from "react";

import { GLOBAL_TYPES } from "../../../redux/actions/globalTypes";
import ModalLogOut from "../../../components/profile/ModalLogOut";
import ModalMyPost from "../../../components/profile/ModalMyPost";

const index = () => {
  const auth=useSelector(state=>state.auth);
  const bottomSheetModalLogOut = useRef(null);
  const dispatch = useDispatch();

  const snapPointsLogOut = useMemo(() => ["25%"], []);

  const handleOpenLogOutModal = useCallback(() => {
    bottomSheetModalLogOut.current?.present();
  }, []);

  const handleCloseLogOutModal = () => {
    dispatch({
      type: GLOBAL_TYPES.LOGOUT_MODAL,
      payload: false,
    });
    bottomSheetModalLogOut.current?.dismiss();
  };
  const [selectedIcon, setSelectedIcon] = useState("grid");
  const handleIconPress = (iconName) => {
    setSelectedIcon(iconName);
  };
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
          justifyContent: "space-between",
          flexDirection: "row",
          height: 50,
          marginTop: StatusBar.currentHeight,
          backgroundColor: "#fff",
        }}
      >
        <View>
          <TouchableOpacity onPress={handleOpenLogOutModal}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
              }}
            >
             {auth.username}
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
          }}
        >
          <TouchableOpacity>
            <Octicons name="diff-added" size={24} color="black" />
          </TouchableOpacity>

          <TouchableOpacity>
            <Ionicons
              name="ios-reorder-three-outline"
              size={35}
              color="black"
            />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 10,
            paddingHorizontal: 10,
          }}
        >
          {/* Logo User, Name and info following, follower, post */}
          <View
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Logo User, Name */}
            <View
              style={{
                marginLeft: 10,
              }}
            >
              <Avatar
                size="large"
                avatar={auth.avatar}
              ></Avatar>
            </View>

            <Text
              style={{
                fontSize: 15,
                fontWeight: 500,
                marginLeft: 5,
                marginTop: 5,
              }}
            >
              {" "}
              {auth.fullname}
            </Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 10,
            }}
          >
            {/* post, following, follwer */}
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{
                  fontSize: 17,
                  fontWeight: "bold",
                }}
              >
                {0}
              </Text>
              <Text>Bài viết</Text>
            </View>
            <TouchableOpacity
              onPress={() => router.push("/profile/following")}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 8,
              }}
            >
              <Text
                style={{
                  fontSize: 17,
                  fontWeight: "bold",
                }}
              >
                {auth.followers.length}
              </Text>
              <Text
                style={{
                  fontSize: 10,
                }}
              >
                Người theo dõi
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => router.push("/profile/following")}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 7,
              }}
            >
              <Text
                style={{
                  fontSize: 17,
                  fontWeight: "bold",
                }}
              >
                {auth.following.length}
              </Text>
              <Text
                style={{
                  fontSize: 10,
                }}
              >
                Đang theo dõi
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* Button */}
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignContent: "center",
            alignItems: "center",
            justifyContent: "center",
            justifyContent: "space-between",
            marginBottom: 20,
          }}
        >
          <TouchableOpacity
            style={{
              display: "flex",
              alignContent: "center",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#DDDD",
              borderRadius: 5,
              paddingVertical: 5,
              paddingHorizontal: 30,
              width: 160,
              marginLeft: 10,
            }}
            onPress={() => router.push("/profile/editProfile")}
          >
            <Text
              style={{
                fontSize: 15,
                fontWeight: 600,
              }}
            >
              Chỉnh sửa
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              display: "flex",
              alignContent: "center",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#DDDD",
              borderRadius: 5,
              paddingVertical: 5,
              paddingHorizontal: 30,
              width: 160,
              marginRight: 10,
            }}
            onPress={() => router.push("/profile/changePasswork")}
          >
            <Text
              style={{
                fontSize: 15,
                fontWeight: 600,
              }}
            >
              Đổi mật khẩu
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <TouchableOpacity
            style={{
              paddingHorizontal: 80,
              paddingBottom: 10,
              borderBottomWidth: 1,
              borderColor: selectedIcon === "grid" ? "#000000" : "#DDDDDD",
            }}
            onPress={() => handleIconPress("grid")}
          >
            <MaterialCommunityIcons
              name="grid"
              size={24}
              color={selectedIcon === "grid" ? "#000000" : "#DDDDDD"}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              paddingHorizontal: 80,
              borderBottomWidth: 1,
              borderColor: selectedIcon === "bookmark" ? "#000000" : "#DDDDDD",
              paddingBottom: 10,
            }}
            onPress={() => handleIconPress("bookmark")}
          >
            <Feather
              name="bookmark"
              size={24}
              color={selectedIcon === "bookmark" ? "#000000" : "#DDDDDD"}
            />
          </TouchableOpacity>
        </View>
        <View>
          {selectedIcon === "grid" ? (
            <View>
              <ModalMyPost />
            </View>
          ) : (
            <View>
              <Text>
                <ModalMyPost />
              </Text>
            </View>
          )}
        </View>
        <BottomSheetModal
          ref={bottomSheetModalLogOut}
          index={0}
          snapPoints={snapPointsLogOut}
          backgroundStyle={styles.modal}
          onDismiss={() => handleCloseLogOutModal()}
          onChange={(index) => {
            if (index === -1) {
              handleCloseLogOutModal();
            }
          }}
        >
          <ModalLogOut handleCloseLogOutModal={handleCloseLogOutModal} />
        </BottomSheetModal>
      </ScrollView>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({});
