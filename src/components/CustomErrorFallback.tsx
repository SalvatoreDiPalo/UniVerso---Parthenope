import { FallbackComponentProps } from "react-native-error-boundary";
import { SafeAreaView, StyleSheet, TouchableOpacity } from "react-native";
import { Text, View } from "./Themed";

export default function CustomErrorFallback({
  error,
  resetError,
}: FallbackComponentProps) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Oops!</Text>
        <Text style={styles.subtitle}>Si è presentato un errore</Text>
        <Text style={styles.error}>{error.message}</Text>
        <TouchableOpacity style={styles.button} onPress={resetError}>
          <Text style={styles.buttonText}>Riprova</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fafafa",
    flex: 1,
    justifyContent: "center",
  },
  content: {
    marginHorizontal: 16,
  },
  title: {
    fontSize: 48,
    fontWeight: "300",
    paddingBottom: 16,
    color: "#000",
  },
  subtitle: {
    fontSize: 28,
    fontWeight: "800",
    color: "#000",
  },
  error: {
    paddingVertical: 16,
  },
  button: {
    backgroundColor: "#2196f3",
    borderRadius: 50,
    padding: 16,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    textAlign: "center",
  },
});
