import { Constants } from "@/src/constants/Constant";
import SkeletonItem from "./SkeletonItem";

export default function SkeletonList() {
  return Array.from({ length: Constants.defaultNumPlaceholders }, () => (
    <SkeletonItem
      key={Math.floor(Math.random() * Math.floor(Math.random() * Date.now()))}
    />
  ));
}
