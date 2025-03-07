"use client"

import { useState } from "react"
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, ImageBackground, Dimensions } from "react-native"
import { MaterialCommunityIcons, FontAwesome } from "@expo/vector-icons"
import { StatusBar } from "expo-status-bar"
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function App() {
  const [selectedPlan, setSelectedPlan] = useState("yearly")
    const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <ImageBackground
        source={{ uri: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=1000" }}
        style={styles.backgroundImage}
        imageStyle={{ opacity: 0.4 }}
      >
        <View style={styles.header}>
                <TouchableOpacity onPress={handleBack} style={styles.backButton}>
                  <Ionicons name="chevron-back" size={24} color="white" />
                  <Text style={styles.backText}></Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Premium</Text>
              </View>

        <View style={styles.content}>
          <Text style={styles.title}>Sleep Better</Text>
          <Text style={styles.title}>With Premium</Text>

          <View style={styles.plansContainer}>
            <View style={styles.offerBadge}>
              <Text style={styles.offerText}>Limited time offer</Text>
            </View>

            <TouchableOpacity
              style={[styles.planOption, selectedPlan === "yearly" && styles.selectedPlan]}
              onPress={() => setSelectedPlan("yearly")}
            >
              <View style={styles.radioContainer}>
                {selectedPlan === "yearly" ? (
                  <View style={styles.radioFilled}>
                    <View style={styles.radioInner} />
                  </View>
                ) : (
                  <View style={styles.radioEmpty} />
                )}
              </View>
              <Text style={styles.planText}>Yearly Plan</Text>
              <Text style={styles.priceText}>€2080.99/year</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.planOption, selectedPlan === "monthly" && styles.selectedPlan]}
              onPress={() => setSelectedPlan("monthly")}
            >
              <View style={styles.radioContainer}>
                {selectedPlan === "monthly" ? (
                  <View style={styles.radioFilled}>
                    <View style={styles.radioInner} />
                  </View>
                ) : (
                  <View style={styles.radioEmpty} />
                )}
              </View>
              <Text style={styles.planText}>Monthly Plan</Text>
              <Text style={styles.priceText}>€1250.00/month</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.termsButton}>
            <Text style={styles.termsText}>Privacy Policy & Subscription Terms</Text>
          </TouchableOpacity>

          <View style={styles.privilegeContainer}>
            <Text style={styles.privilegeTitle}>Privilege</Text>
            <View style={styles.privilegeHeaderRow}>
              <Text style={styles.privilegeHeaderText}>Free</Text>
              <View style={styles.paidBadge}>
                <Text style={styles.paidText}>Paid</Text>
              </View>
            </View>

            <View style={styles.privilegeRow}>
              <Text style={styles.privilegeText}>Sleep Tracking</Text>
              <View style={styles.privilegeIcons}>
                <View style={styles.iconContainer}>
                  <MaterialCommunityIcons name="check-circle" size={22} color="#4CD964" />
                </View>
                <View style={styles.iconContainer}>
                  <MaterialCommunityIcons name="check-circle" size={22} color="#4CD964" />
                </View>
              </View>
            </View>

            <View style={styles.privilegeRow}>
              <Text style={styles.privilegeText}>Sleep Analysis</Text>
              <View style={styles.privilegeIcons}>
                <View style={styles.iconContainer}>
                  <MaterialCommunityIcons name="check-circle" size={22} color="#4CD964" />
                </View>
                <View style={styles.iconContainer}>
                  <MaterialCommunityIcons name="check-circle" size={22} color="#4CD964" />
                </View>
              </View>
            </View>

            <View style={styles.privilegeRow}>
              <Text style={styles.privilegeText}>Sleep Expert</Text>
              <View style={styles.privilegeIcons}>
                <View style={styles.iconContainer}>
                  <Text style={styles.limitedText}>Limited</Text>
                </View>
                <View style={styles.iconContainer}>
                  <MaterialCommunityIcons name="check-circle" size={22} color="#4CD964" />
                </View>
              </View>
            </View>

            <View style={styles.privilegeRow}>
              <Text style={styles.privilegeText}>Sleep Sounds</Text>
              <View style={styles.privilegeIcons}>
                <View style={styles.iconContainer}>
                  <Text style={styles.limitedText}>Limited</Text>
                </View>
                <View style={styles.iconContainer}>
                  <MaterialCommunityIcons name="check-circle" size={22} color="#4CD964" />
                </View>
              </View>
            </View>

            <View style={styles.privilegeRow}>
              <Text style={styles.privilegeText}>Snoring</Text>
              <View style={styles.privilegeIcons}>
                <View style={styles.iconContainer}>
                  <FontAwesome name="times" size={22} color="#8E8E93" />
                </View>
                <View style={styles.iconContainer}>
                  <MaterialCommunityIcons name="check-circle" size={22} color="#4CD964" />
                </View>
              </View>
            </View>
          </View>

          <TouchableOpacity style={styles.subscribeButton}>
            <Text style={styles.subscribeText}>Subscribe</Text>
          </TouchableOpacity>

          <Text style={styles.recurringText}>Recurring billing, cancel anytime</Text>
        </View>
      </ImageBackground>
    </SafeAreaView>
  )
}

const { width } = Dimensions.get("window")
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0A0F1D",
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(142, 142, 147, 0.1)',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    left: 16,
    zIndex: 1,
  },
  backText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 4,
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
  backgroundImage: {
    flex: 1,
    backgroundColor: "#0A0F1D",
  },
  content: {
    flex: 1,
    padding: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  plansContainer: {
    marginTop: 30,
    position: "relative",
  },
  offerBadge: {
    position: "absolute",
    right: 0,
    top: -15,
    backgroundColor: "#FFCC00",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    zIndex: 1,
  },
  offerText: {
    color: "#000",
    fontSize: 12,
    fontWeight: "bold",
  },
  planOption: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(30, 40, 60, 0.6)",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  selectedPlan: {
    borderColor: "#FFCC00",
    backgroundColor: "rgba(40, 50, 80, 0.6)",
  },
  radioContainer: {
    marginRight: 10,
  },
  radioEmpty: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#8E8E93",
  },
  radioFilled: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#FFCC00",
    alignItems: "center",
    justifyContent: "center",
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#FFCC00",
  },
  planText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
    flex: 1,
  },
  priceText: {
    color: "white",
    fontSize: 14,
  },
  termsButton: {
    marginTop: 5,
    marginBottom: 20,
  },
  termsText: {
    color: "rgba(255, 255, 255, 0.6)",
    fontSize: 12,
    textAlign: "center",
    textDecorationLine: "underline",
  },
  privilegeContainer: {
    marginTop: 10,
  },
  privilegeTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  privilegeHeaderRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 10,
  },
  privilegeHeaderText: {
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: 14,
    width: width / 4,
    textAlign: "center",
  },
  paidBadge: {
    backgroundColor: "#FFCC00",
    paddingHorizontal: 15,
    paddingVertical: 2,
    borderRadius: 15,
    width: width / 4,
    alignItems: "center",
  },
  paidText: {
    color: "#000",
    fontSize: 14,
    fontWeight: "bold",
  },
  privilegeRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  privilegeText: {
    color: "white",
    fontSize: 16,
    flex: 1,
  },
  privilegeIcons: {
    flexDirection: "row",
    width: width / 2,
    justifyContent: "space-around",
  },
  iconContainer: {
    width: width / 4,
    alignItems: "center",
  },
  limitedText: {
    color: "rgba(255, 255, 255, 0.6)",
    fontSize: 12,
  },
  subscribeButton: {
    backgroundColor: "#FFCC00",
    borderRadius: 25,
    padding: 15,
    alignItems: "center",
    marginTop: 20,
  },
  subscribeText: {
    color: "#000",
    fontSize: 18,
    fontWeight: "bold",
  },
  recurringText: {
    color: "rgba(255, 255, 255, 0.6)",
    fontSize: 12,
    textAlign: "center",
    marginTop: 10,
  },
})

