import { Constants } from "@/src/constants/Constant";
import { StorageMmkv } from "@/src/store/Storage";
import { isBefore } from "date-fns";
import { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";

type Props = {
  firstName: string;
  lastName: string;
};

interface Quote {
  quote: string;
  date: Date;
}

export default function Header({ firstName, lastName }: Props) {
  const quote = useMemo(() => {
    var midNight = new Date();
    midNight.setHours(0, 0, 0, 0);

    // Retrieve last saved settings
    let quoteSettings: Quote | null = JSON.parse(
      StorageMmkv.getString("quoteSettings") ?? "null"
    );

    // If no settings or they are from before midnight: regenerate
    if (
      !quoteSettings ||
      isBefore(quoteSettings.date, midNight) ||
      !quoteSettings.quote
    ) {
      // Re-initialise for a new day
      quoteSettings = {
        quote: Constants.messages[Math.floor(Math.random() * 51)],
        date: midNight, // Take note of the date of generation
      };
      // Save this in storage so that it will be read when page reloads
      StorageMmkv.setString("quoteSettings", JSON.stringify(quoteSettings));
    }
    return quoteSettings.quote;
  }, []);

  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>
        Ciao, {`${firstName} ${lastName}`.toLowerCase()}
      </Text>
      <Text style={styles.headerSubTitle}>{quote}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flex: 0.5,
    justifyContent: "center",
    borderBottomEndRadius: 24,
    borderBottomLeftRadius: 24,
    backgroundColor: "#356EFD",
    paddingTop: 16,
    paddingHorizontal: 16,
  },
  headerTitle: {
    fontSize: 25,
    fontWeight: "600",
    color: "#fff",
    textTransform: "capitalize",
  },
  headerSubTitle: {
    fontSize: 14,
    fontWeight: "400",
    color: "#fff",
  },
});
