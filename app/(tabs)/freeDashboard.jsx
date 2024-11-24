import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import ModalComponent from "../../components/modal";

const FreeDashboard = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Tasks</Text>
      </View>
      <TouchableOpacity onPress={toggleModal} style={styles.addButton}>
        <Text style={styles.addButtonText}>Add Task</Text>
      </TouchableOpacity>

      <ModalComponent visible={modalVisible} onClose={toggleModal} />
    </SafeAreaView>
  );
};

export default FreeDashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF6E9",
    paddingHorizontal: wp(4), // إضافة padding جانبي
  },
  headerContainer: {
    paddingVertical: hp(2),
  },
  headerText: {
    fontWeight: "bold",
    fontSize: wp(6), // استخدام wp لتحديد حجم الخط استجابة
    color: "#BF3F00",
  },
  addButton: {
    paddingVertical: hp(1.5), // زيادة المسافة الرأسية
    marginLeft: wp(4), // استخدام wp لتحديد المسافة
    backgroundColor: "#BF3F00",
    width: wp(40), // جعل العرض نسبيًا بالنسبة للشاشة
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: hp(2),
  },
  addButtonText: {
    fontSize: wp(6), // تغيير حجم النص ليكون مرنًا حسب عرض الشاشة
    color: "white",
  },
});
