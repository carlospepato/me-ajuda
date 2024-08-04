
import Constants from 'expo-constants';
import {Lista} from '@/src/pages/Lista'
import {SOS} from '@/src/pages/SOS'
import { createDrawerNavigator } from '@react-navigation/drawer';
const Drawer = createDrawerNavigator();
 
const barHeight = Constants.statusBarHeight;

export default function Index(){
   
    return(
   
    <Drawer.Navigator>
    <Drawer.Screen name="S.O.S" component={SOS} />
    <Drawer.Screen name="O que devo fazer se..." component={Lista} />
  </Drawer.Navigator>
    )
}