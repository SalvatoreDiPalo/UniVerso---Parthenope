import { RootStackParamList } from "@/src/navigation/RootStackParamList";
import { View } from "@/src/components/Themed";
import { TaxWrapper } from "@/src/data/TaxWrapper";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useCallback } from "react";
import { FlatList } from "react-native";
import TaxItem from "./components/TaxItem";
import EmptyFlatList from "@/src/components/EmptyFlatList";
import { useGetTrattiCarrieraQuery } from "@/src/service/libretto-api";
import { useGetListaAddebitiStudenteByAaIdsQuery } from "@/src/service/tasse-api";
import { skipToken } from "@reduxjs/toolkit/query";
import SkeletonList from "@/src/components/Skeleton/SkeletonList";

export default function TaxesScreen() {
  const navigation: NavigationProp<RootStackParamList> = useNavigation();

  const {
    data: datiTratti,
    isLoading: isTrattiLoading,
    refetch: refetchTratti,
  } = useGetTrattiCarrieraQuery("-aaRegId");

  const { data, isLoading, refetch } = useGetListaAddebitiStudenteByAaIdsQuery(
    datiTratti ?? skipToken
  );

  const renderItem = useCallback(({ item }: { item: TaxWrapper }) => {
    return <TaxItem key={item.aaId} item={item} navigation={navigation} />;
  }, []);

  const reloadData = () => {
    refetchTratti();
    refetch();
  };

  return (
    <View style={{ height: "100%", paddingTop: 8 }}>
      <FlatList
        contentContainerStyle={{ flexGrow: 1 }}
        data={data}
        renderItem={renderItem}
        onRefresh={reloadData}
        keyExtractor={(item) => item.aaId.toString()}
        refreshing={isTrattiLoading || isLoading}
        overScrollMode="never"
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() =>
          isLoading ? <SkeletonList /> : <EmptyFlatList />
        }
      />
    </View>
  );
}
