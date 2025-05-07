import { Text, View } from "react-native";

export default function notfound() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Pagina não encontrada.</Text>
    </View>
  );
}
