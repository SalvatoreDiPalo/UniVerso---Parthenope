import { shallowEqual, useSelector } from "react-redux";
import { Text, View } from "../../../../components/Themed";
import { useCallback, useMemo, useRef, useState } from "react";
import { FlatList } from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { AppelloLibretto } from "@/src/data/remote/AppelloLibretto";
import EmptyFlatList from "@/src/components/EmptyFlatList";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { RootStackParamList } from "@/src/navigation/RootStackParamList";
import { useGetAppelliPerRigaLibrettoByAdsceIdsQuery } from "@/src/service/libretto-api";
import SkeletonList from "@/src/components/Skeleton/SkeletonList";
import {
  selectAdsceIdsOfExamsToEnrollInFromRigheLibretto,
  selectMatId,
} from "@/src/store/Selectors";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import ExamDetailScreen from "../details/ExamDetail";
import BookableItem from "./BookableItem";

export default function Bookable() {
  const matId = useSelector(selectMatId);
  const [appello, setAppello] = useState<AppelloLibretto | undefined>();
  const adsceIds = useSelector(
    selectAdsceIdsOfExamsToEnrollInFromRigheLibretto,
    shallowEqual
  );
  const navigation: NavigationProp<RootStackParamList> = useNavigation();
  const insets = useSafeAreaInsets();

  const bottomSheetRef = useRef<BottomSheet>(null);

  const snapPoints = useMemo(() => ["90%"], []);

  const { data, isLoading, refetch } =
    useGetAppelliPerRigaLibrettoByAdsceIdsQuery({ matId, adsceIds });

  function setAppelloAndOpenBottomsheet(appello: AppelloLibretto): void {
    setAppello(appello);
    bottomSheetRef.current?.expand();
  }

  const renderItem = useCallback(({ item }: { item: AppelloLibretto }) => {
    return (
      <BookableItem
        key={item.appelloId}
        item={item}
        navigation={navigation}
        onPress={(appello: AppelloLibretto) =>
          setAppelloAndOpenBottomsheet(appello)
        }
      />
    );
  }, []);

  return (
    <View style={{ height: "100%", paddingTop: 8 }}>
      <FlatList
        contentContainerStyle={{ paddingBottom: insets.bottom, flexGrow: 1 }}
        data={data}
        renderItem={renderItem}
        onRefresh={refetch}
        keyExtractor={(item) => item.appelloId!.toString()}
        showsVerticalScrollIndicator={false}
        refreshing={isLoading}
        overScrollMode="never"
        ListEmptyComponent={() =>
          isLoading ? <SkeletonList /> : <EmptyFlatList />
        }
      />

      <BottomSheet
        ref={bottomSheetRef}
        backdropComponent={(props) => (
          <BottomSheetBackdrop
            {...props}
            onPress={() => bottomSheetRef.current?.close()}
            disappearsOnIndex={-1}
          />
        )}
        snapPoints={snapPoints}
        index={-1}
        backgroundStyle={{
          borderTopLeftRadius: 26,
          borderTopRightRadius: 26,
        }}
        enablePanDownToClose
        style={{
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 12,
          },
          shadowOpacity: 0.58,
          shadowRadius: 16.0,

          elevation: 24,
        }}
      >
        <BottomSheetView>
          {appello && <ExamDetailScreen item={appello} />}
        </BottomSheetView>
      </BottomSheet>
    </View>
  );
}
