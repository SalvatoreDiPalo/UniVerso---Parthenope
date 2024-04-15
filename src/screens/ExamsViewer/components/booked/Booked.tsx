import { View } from "../../../../components/Themed";
import { shallowEqual, useSelector } from "react-redux";
import { useCallback, useMemo, useRef, useState } from "react";
import { FlatList } from "react-native";
import EmptyFlatList from "@/src/components/EmptyFlatList";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  useGetPrenotazioniPerAdsceIdsQuery,
  useLazyGetAppelliPerRigaLibrettoQuery,
} from "@/src/service/libretto-api";
import SkeletonList from "@/src/components/Skeleton/SkeletonList";
import { selectMatId, selectRigheLibretto } from "@/src/store/Selectors";
import { ExtendsIscrizioneAppello } from "@/src/data/ExtendsIscrizioneAppello";
import * as Progress from "react-native-progress";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import ExamDetailScreen from "../details/ExamDetail";
import { AppelloLibretto } from "@/src/data/remote/AppelloLibretto";
import BookedItem from "./BookedItem";
import { Constants } from "@/src/constants/Constant";

export default function Booked() {
  const [loading, setLoading] = useState(false);
  const [selectedAppello, setSelectedAppello] = useState<
    AppelloLibretto | undefined
  >();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["90%"], []);

  const matId = useSelector(selectMatId);

  const righeLibretto = useSelector(selectRigheLibretto, shallowEqual);
  const insets = useSafeAreaInsets();
  const [trigger] = useLazyGetAppelliPerRigaLibrettoQuery();

  const { data, isLoading, refetch } = useGetPrenotazioniPerAdsceIdsQuery({
    matId,
    righeLibretto,
  });

  const loadAppelloAndNavigateInto = async (appId: number, adsceId: number) => {
    setLoading(true);
    const response = await trigger({
      matId,
      adsceId,
      filter: `appId==${appId}`,
      q: undefined,
    });
    if (response.error || (response.data?.length ?? 0) === 0) {
      throw new Error(Constants.errorMessage);
    }
    setLoading(false);
    setSelectedAppello(response.data![0]);
    bottomSheetRef.current?.expand();
  };

  const renderItem = useCallback(
    ({ item }: { item: ExtendsIscrizioneAppello }) => {
      return (
        <BookedItem
          item={item}
          loadAppelloAndNavigateInto={loadAppelloAndNavigateInto}
        />
      );
    },
    []
  );

  return (
    <View style={{ height: "100%", paddingTop: 8 }}>
      <FlatList
        contentContainerStyle={{
          paddingBottom: insets.bottom,
          flexGrow: 1,
          opacity: loading ? 0.8 : 1,
        }}
        data={data}
        renderItem={renderItem}
        onRefresh={refetch}
        refreshing={isLoading}
        overScrollMode="never"
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() =>
          isLoading ? <SkeletonList /> : <EmptyFlatList />
        }
      />
      <Progress.Circle
        size={84}
        indeterminate={true}
        borderWidth={8}
        style={{
          position: "absolute",
          alignSelf: "center",
          height: "100%",
          justifyContent: "center",
          display: loading ? "flex" : "none",
        }}
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
        <BottomSheetView style={{ flex: 1 }}>
          {selectedAppello && <ExamDetailScreen item={selectedAppello} />}
        </BottomSheetView>
      </BottomSheet>
    </View>
  );
}
