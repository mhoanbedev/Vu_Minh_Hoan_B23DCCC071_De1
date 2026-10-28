import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import BookDetailScreen from '../screens/BookDetailScreen';
import BookFormScreen from '../screens/BookFormScreen';
import BookListScreen from '../screens/BookListScreen';
import { colors, typography } from '../theme';
import { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.background },
        headerTintColor: colors.onSurface,
        headerTitleStyle: {
          fontSize: typography.titleLarge.fontSize,
          fontWeight: typography.titleLarge.fontWeight,
        },
        headerShadowVisible: false,
        contentStyle: { backgroundColor: colors.background },
      }}
    >
      <Stack.Screen
        name="BookList"
        component={BookListScreen}
        options={{ title: 'Thư viện' }}
      />
      <Stack.Screen
        name="BookDetail"
        component={BookDetailScreen}
        options={{ title: 'Chi tiết sách' }}
      />
      <Stack.Screen
        name="BookForm"
        component={BookFormScreen}
        options={({ route }) => ({
          title: route.params?.bookId ? 'Sửa sách' : 'Thêm sách',
        })}
      />
    </Stack.Navigator>
  );
}
