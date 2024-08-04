import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Modal,Pressable  } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list'
import * as Location from 'expo-location';


export function SOS() {
  const [modalVisible, setModalVisible] = useState(false);
  const [pressTimer, setPressTimer] = useState<NodeJS.Timeout | null>(null);
  const [selected, setSelected] = React.useState("");
  const [city, setCity] = useState(String);
  const [errorMsg, setErrorMsg] = useState(null);

  const data = [
    { key: '1', value: 'Inundações' },
    { key: '2', value: 'Incêndios' },
    { key: '3', value: 'Terremotos' },
    { key: '4', value: 'Deslizamentos de Terra' },
    { key: '5', value: 'Tempestades' },
    { key: '6', value: 'Furacões e Ciclones' },
    { key: '7', value: 'Secas' }
  ];
  

  const handlePressIn = () => {
    
    const timer = setTimeout(() => {
      setModalVisible(true);
    }, 1000); 
    setPressTimer(timer);
  };

  const handlePressOut = () => {
    if (pressTimer) {
      
      clearTimeout(pressTimer);
    }
  };

  
  const handleSelect = (val: any) => {
    setSelected(val);
    setModalVisible(!modalVisible);
    alert('Requisição realizada!')
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      let reverseGeocode = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      if (reverseGeocode.length > 0) {
        const city = String(reverseGeocode[0].city)
        setCity(city);
      }
    })();
  }, []);


  return (
    <View className="flex-1 justify-center items-center">
      <Pressable
        className="w-32 h-32 bg-red-800 rounded-full flex justify-center items-center"
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        <Text className="text-white text-2xl">S.O.S</Text>
      </Pressable>
      <Text className="mt-5 text-center text-lg">
        Clique no botão para solicitar apoio.
      </Text>
   
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
       <View className="flex-1 justify-center items-center bg-slate-400">
       <View className="m-5 bg-white rounded-2xl p-8 items-center shadow-lg opacity-100">
            <Text className="mb-4 text-center text-lg">Qual é o tipo de risco?</Text>
            <SelectList 
              setSelected={handleSelect} 
              data={data} 
              save="value"
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}
