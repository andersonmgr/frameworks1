import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

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
        tabBarLabelStyle: {
          fontSize: 12, // Ajuste o tamanho da fonte para evitar corte
          fontWeight: 'bold', // Pode ajudar a melhorar a legibilidade
          marginTop: 5, // Ajuste o espaço entre o ícone e o texto
        },
        tabBarStyle: {
          paddingBottom: 5, // Ajuste o espaçamento inferior
          height: 60, // Pode aumentar a altura da barra de navegação para dar mais espaço
        },
      })}
    >
      <Tabs.Screen name="currency" options={{ title: 'Cotação' }} />
      <Tabs.Screen name="index" options={{ title: 'Calculadora' }} />
      <Tabs.Screen name="profile" options={{ title: 'Perfil' }} />
    </Tabs>
  );
}
