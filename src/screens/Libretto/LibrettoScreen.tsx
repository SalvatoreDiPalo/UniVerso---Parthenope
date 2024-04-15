import { View } from "@/src/components/Themed";
import { RigaLibretto } from "@/src/data/remote/RigaLibretto";
import { useCallback, useMemo } from "react";
import { FlatList } from "react-native";
import { useSelector } from "react-redux";
import LibrettoItem from "./components/LibrettoItem";
import EmptyFlatList from "@/src/components/EmptyFlatList";
import { useGetRigheLibrettoQuery } from "@/src/service/libretto-api";
import { createSelector } from "@reduxjs/toolkit";
import { StatoAppelloEnum } from "@/src/data/remote/enum/StatoAppelloEnum";
import SkeletonList from "@/src/components/Skeleton/SkeletonList";
import { selectMatId } from "@/src/store/Selectors";

export default function LibrettoScreen() {
  const matId = useSelector(selectMatId);

  const selectCarriedOutExams = useMemo(() => {
    const emptyArray: any = [];
    // Return a unique selector instance for this page so that
    // the filter results are correctly memoized
    return createSelector(
      (res) => res.data,
      (data: RigaLibretto[]) =>
        data?.filter((riga) => riga.stato.value === StatoAppelloEnum.S) ??
        emptyArray
    );
  }, []);

  const { isLoading, refetch, righeFiltered } = useGetRigheLibrettoQuery(
    {
      matId,
    },
    {
      selectFromResult: (result) => ({
        ...result,
        righeFiltered: selectCarriedOutExams(result),
      }),
    }
  );

  const renderItem = useCallback(({ item }: { item: RigaLibretto }) => {
    return <LibrettoItem item={item} />;
  }, []);

  return (
    <View style={{ height: "100%", paddingTop: 8 }}>
      <FlatList
        data={righeFiltered}
        renderItem={renderItem}
        overScrollMode="never"
        onRefresh={refetch}
        refreshing={isLoading}
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() =>
          isLoading ? <SkeletonList /> : <EmptyFlatList />
        }
      />
    </View>
  );
}
