import React, {useEffect} from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SplashScreen from "react-native-splash-screen";
import FlashMessage from "react-native-flash-message";

import Login from "./pages/Auth/Login";
import Sign from "./pages/Auth/Sign";

import Home from "./pages/TabPages/Home";
import Sociability from "./pages/TabPages/Sociability";
import Favorites from "./pages/TabPages/Favorites";
import Profile from "./pages/TabPages/Profile";
import TabBarIcon from "./components/TabBarIcon";

import BookDetail from "./pages/BookDetail";
import UserProfile from "./pages/UserProfile";


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function AuthStack () {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="LoginPage" component={Login} />
      <Stack.Screen name="SignPage" component={Sign} />
    </Stack.Navigator>
  )
}

function TabPages () {
  return (
    <Tab.Navigator 
      screenOptions={{  
        tabBarShowLabel: false, 
        tabBarInactiveBackgroundColor: '#E6E6E6', 
        tabBarActiveBackgroundColor: '#D9D9D9',
       
      }}>
      <Tab.Screen name="Home" component={Home} options={HomeOptions} />
      <Tab.Screen name="Sociability" component={Sociability} options={SociabilityOptions} />
      <Tab.Screen name="Favorites" component={Favorites} options={FavoritesOptions} />
      <Tab.Screen name="Profile" component={Profile} options={ProfileOptions} />
    </Tab.Navigator>
  )
}

function Router () {

  useEffect(() => {
    SplashScreen.hide();
  }, []);


  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="AuthStack" component={AuthStack} options={{headerShown: false}} />
        <Stack.Screen name="TabPages" component={TabPages} options={{headerShown: false}} />
        <Stack.Screen 
          name="BookDetail" 
          component={BookDetail} 
          options={{
            headerTitleAlign: 'center',
            headerTitle: 'BOOK DETAİL',
            headerTintColor: '#999999'
          }} 
        />
        <Stack.Screen name="UserProfile" component={UserProfile} options={{headerShown: false}}/>
        
      </Stack.Navigator>

      <FlashMessage position="top" />
    </NavigationContainer>

  )
}



const HomeOptions = () => ({
  headerShown: false,
  tabBarIcon: ({focused}) => <TabBarIcon iconName="home-outline" focused={focused}/>,

});

const SociabilityOptions = () => ({
  headerShown: false,
  tabBarIcon: ({focused}) => <TabBarIcon iconName="account-group-outline" focused={focused}/>,
});

const FavoritesOptions = () => ({
  headerShown: false,
  tabBarIcon: ({focused}) => <TabBarIcon iconName="heart-outline" focused={focused}/>,
});

const ProfileOptions = () => ({
  headerShown: false,
  tabBarIcon: ({focused}) => <TabBarIcon iconName="clipboard-account-outline" focused={focused}/>,
});



export default Router