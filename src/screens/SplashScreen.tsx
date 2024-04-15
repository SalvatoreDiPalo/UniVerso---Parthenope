import React from "react";
import { WhiteView } from "../components/Themed";

export default function SplashScreen() {
  return (
    <WhiteView style={{ flex: 1 }}>
      <WhiteView
        style={{
          transform: "translateY(50x) translateX(150px) rotate(45deg)",
          height: 1000,
          width: 1000,
          backgroundColor: "#EBF1FE",
        }}
      ></WhiteView>
    </WhiteView>
  );
}
