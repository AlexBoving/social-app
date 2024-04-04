import {
  View,
  Modal,
  Text,
  StyleSheet,
  useColorScheme,
  Pressable,
} from "react-native";
import Colors from "@/constants/Colors";
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";

interface DateOfBirthProps {
  modalVisible: boolean;
  setModalVisible: (arg0: boolean) => void;
}

const DateOfBirth = ({ modalVisible, setModalVisible }: DateOfBirthProps) => {
  const colorScheme = useColorScheme();
  const themeColors = colorScheme === "dark" ? Colors.dark : Colors.light;
  const inversedThemeColors =
    colorScheme === "dark" ? Colors.light : Colors.dark;

  const [date, setDate] = useState<Date>(new Date());
  return (
    <Modal animationType="slide" transparent={true} visible={modalVisible}>
      <View style={styles.centeredView}>
        <View
          style={[styles.modalView, { backgroundColor: themeColors.surface }]}
        >
          <DateTimePicker
            value={date}
            mode="date"
            display="inline"
            onChange={(event, selectedDate) => {
              setDate(selectedDate as Date);
            }}
          />
          <Pressable
            style={[
              styles.confirmButton,
              { backgroundColor: themeColors.primary },
            ]}
            onPress={() => {
              setModalVisible(false);
            }}
          >
            <Text style={{ color: inversedThemeColors.text, fontSize: 20 }}>
              CONFIRM
            </Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default DateOfBirth;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    width: "90%",
    padding: 20,
    borderRadius: 20,
    gap: 20,
  },
  confirmButton: {
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    borderRadius: 12,
  },
});
