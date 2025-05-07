import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: true,
        tabBarIcon: ({ color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          if (route.name === 'index') iconName = 'calculator-outline';
          else if (route.name === 'currency') iconName = 'cash-outline';
          else if (route.name === 'profile') iconName = 'person-outline';
          else return null;

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tabs.Screen name="currency" options={{ title: 'Cotação' }} />
      <Tabs.Screen name="index" options={{ title: 'Calculadora' }} />
      <Tabs.Screen name="profile" options={{ title: 'Perfil' }} />
    </Tabs>
  );
}
