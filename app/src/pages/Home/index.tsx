import { Text, View } from "react-native";

export function Home() {
    return (
        <View className="flex-1 items-center justify-center h-full">
            <Text className="font-bold text-lg text-center">
                Bem-vindo ao App Me Ajuda!
            </Text>
            <Text className="text-base text-center">
                Aqui você pode solicitar ajuda rapidamente em situações de emergência.
            </Text>
        </View>

    );
}
