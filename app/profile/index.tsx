import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';


export default function ProfileScreen() {
    const router = useRouter();

    const menuItems = [
      {
        icon: <Ionicons name="person-outline" size={22} color="#8E8E93" />,
        title: "Personal Information",
        route: "/profile/personal_information"
      },
      {
        icon: <MaterialCommunityIcons name="clock-outline" size={22} color="#8E8E93" />,
        title: "Sleep schedules",
        route: "/profile/sleep_schedules"
      },
      {
        icon: (
          <View style={styles.iconWithStar}>
        
            <FontAwesome name="star" size={14} color="gold" style={styles.starIcon} />
          </View>
        ),
        title: "Premium",
        route: "/profile/premium"
      },
      {
        icon: (
          <View style={styles.iconWithStar}>
            <MaterialIcons name="subscriptions" size={22} color="#8E8E93" />
            
          </View>
        ),
        title: "Premium feature",
        route: "/profile/subscription"
      },
      {
        icon: <Ionicons name="settings-outline" size={22} color="#8E8E93" />,
        title: "Settings",
        route: "/profile/settings"
      },
      {
        icon: <Ionicons name="help-circle-outline" size={22} color="#8E8E93" />,
        title: "Help & support",
        route: "/profile/help_support"
      },
      {
        icon: <MaterialCommunityIcons name="logout" size={22} color="#8E8E93" />,
        title: "Log out",
        route: "/profile/logout"
      },
    ];
  
    const handleMenuItemPress = (route: string) => {
      router.push(route);
    };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>

      <View style={styles.profileSection}>
        <Image
          source={{ uri: "https://images.unsplash.com/photo-1618641986557-1ecd230959aa?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cHJvZmlsZXxlbnwwfHwwfHx8Mg%3D%3D" }}
          style={styles.profileImage}
        />
        <Text style={styles.name}>Maria</Text>
        <Text style={styles.email}>maria.silvachenko@gmail.com</Text>
      </View>

      <View style={styles.menuContainer}>
        {menuItems.map((item, index) => (
          <TouchableOpacity 
            key={index}
            style={[
              styles.menuItem,
              index === menuItems.length - 1 && styles.lastMenuItem
            ]}
            onPress={() => handleMenuItemPress(item.route)}
          >
            <View style={styles.menuItemContent}>
              {item.icon}
              <Text style={styles.menuItemText}>{item.title}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#8E8E93" />
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121121',
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
    textAlign: 'center',
  },
  profileSection: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 12,
  },
  name: {
    fontSize: 20,
    fontWeight: '600',
    color: 'white',
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 24,
  },
  menuContainer: {
    marginTop: 24,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(142, 142, 147, 0.1)',
  },
  lastMenuItem: {
    borderBottomWidth: 0,
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemText: {
    fontSize: 16,
    color: 'white',
    marginLeft: 12,
  },
  iconWithStar: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starIcon: {
    marginLeft: 4,
  },
});

