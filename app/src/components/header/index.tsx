import { Pressable, View,Text } from "react-native"
import {Feather, Ionicons} from '@expo/vector-icons'

interface Props{
    location:string
}

export function Header({location}:Props){
    return (
        <View className="w-full flex flex-row items-center justify-between">
            <View className="flex-1 items-center justify-center">
                <Text className="text-center text-sm text-slate-800">Localização</Text>

                <View className="flex-row items-center justify-center gap-1">
                    <Feather name="map-pin" size={14} color="#FF0000"/>
                    <Text className="text-lg font-bold">{location}</Text>
                </View>
            </View>
        </View>
    )
}