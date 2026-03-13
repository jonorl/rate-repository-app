import { Stack } from "expo-router";

export default function RootLayout() {
  return <Stack>
    <Stack.Screen 
        name="index" 
        options={{ 
          title: 'Home', // Changes "index" to "Home"
          headerShown: false // Or hide it if you want to use your AppBar.tsx instead
        }} 
      />
  </Stack> ;
}
