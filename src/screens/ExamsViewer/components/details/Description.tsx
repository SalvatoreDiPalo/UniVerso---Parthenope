import { Text, WhiteView } from "@/src/components/Themed";

interface Props {
  title: string;
  description: string;
}

export default function Description({ title, description }: Props) {
  return (
    <WhiteView style={{ marginTop: 16 }}>
      <Text style={{ fontSize: 16, color: "grey", textTransform: "uppercase" }}>
        {title}
      </Text>

      <Text style={{ fontSize: 22 }}>{description}</Text>
    </WhiteView>
  );
}
