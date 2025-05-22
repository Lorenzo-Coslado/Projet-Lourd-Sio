import { useThemeColor } from "@/hooks/useThemeColor";
import { Tabs } from "expo-router";
import { Image, Text } from "react-native";

export default function TabsLayout() {
  const colors = useThemeColor();
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          elevation: 0,
          backgroundColor: "#fff",
          borderTopWidth: 0,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: ({ focused }) =>
            focused ? <Text style={{ color: "#173EA5", fontSize: 12 }}>Pokédex</Text> : null,
          tabBarIcon: ({ focused }) => (
            <Image
              source={focused ? require('@/assets/images/menu/pokeballActive.png') :
                require('@/assets/images/menu/pokeball.png')}
              style={{ width: 26, height: 26, tintColor: focused ? undefined : colors.grayMedium }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="favoris"
        options={{
          tabBarLabel: ({ focused }) =>
            focused ? <Text style={{ color: "#173EA5", fontSize: 12 }}>Favoris</Text> : null,
          tabBarIcon: ({ focused }) => (
            <Image
              source={focused ? require('@/assets/images/menu/likeActive.png') :
                require('@/assets/images/menu/like.png')}
              style={{ width: 26, height: 26, tintColor: focused ? undefined : colors.grayMedium }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="friends"
        options={{
          tabBarLabel: ({ focused }) =>
            focused ? <Text style={{ color: "#173EA5", fontSize: 12 }}>Amis</Text> : null,
          tabBarIcon: ({ focused }) => (
            <Image
              source={focused ? require('@/assets/images/menu/friend.png') :
                require('@/assets/images/menu/friend.png')}
              style={{ width: 26, height: 26, tintColor: focused ? colors.tint : colors.grayMedium }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profil"
        options={{
          tabBarLabel: ({ focused }) =>
            focused ? <Text style={{ color: "#173EA5", fontSize: 12 }}>Profil</Text> : null,
          tabBarIcon: ({ focused }) => (
            <Image
              source={focused ? require('@/assets/images/menu/userActive.png') :
                require('@/assets/images/menu/user.png')}
              style={{ width: 26, height: 26, tintColor: focused ? undefined : colors.grayMedium }}
            />
          ),
        }}
      />
    </Tabs>
  );
}