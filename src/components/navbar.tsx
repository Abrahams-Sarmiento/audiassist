import { Link, router, usePathname } from 'expo-router';
import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Pressable,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useUser } from '../context/user';
import { client } from '../db/client';

export const Navbar = () => {
  const pathname = usePathname();
  const { isLoggedIn } = useUser();
  const [canGoBack, setCanGoBack] = useState(router.canGoBack());
  const [menuOpen, setMenuOpen] = useState(false);
  const animation = useRef(new Animated.Value(0)).current;

  const toggleMenu = () => {
    if (menuOpen) {
      Animated.timing(animation, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(animation, {
        toValue: 1,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }
    setMenuOpen(!menuOpen);
  };

  const menuStyle = {
    opacity: animation,
    zIndex: menuOpen ? 1 : -1,
    transform: [
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [-200, 0], // Adjust -100 based on your menu height
        }),
      },
    ],
  };

  useEffect(() => {
    setCanGoBack(router.canGoBack());
  }, [pathname]);

  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        {canGoBack ? (
          <View>
            <Pressable onPress={() => router.back()}>
              <Icon name="angle-left" size={24} color="#fff" />
            </Pressable>
          </View>
        ) : null}
        <Text style={styles.title}>AudiAssist</Text>
        {isLoggedIn ? (
          <TouchableOpacity onPress={toggleMenu}>
            <Icon name={menuOpen ? 'times' : 'bars'} size={24} color="#fff" />
          </TouchableOpacity>
        ) : null}
      </View>
      <Animated.View style={[styles.menu, menuStyle]}>
        <Pressable
          onPress={() => {
            router.push('/listado-usuarios');
            toggleMenu();
          }}
        >
          <Text style={styles.menuItem}>Usuarios</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            router.push('/listado-audifonos');
            toggleMenu();
          }}
        >
          <Text style={styles.menuItem}>Audífonos</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            router.push('/listado-calendarios');
            toggleMenu();
          }}
        >
          <Text style={styles.menuItem}>Calendarios</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            router.push('/ayuda');
            toggleMenu();
          }}
        >
          <Text style={styles.menuItem}>Ayuda</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            client.auth.signOut();
            toggleMenu();
          }}
        >
          <Text style={styles.menuItem}>Cerrar sesión</Text>
        </Pressable>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    zIndex: 1,
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#2c3e50',
    zIndex: 2,
  },
  title: {
    color: '#f1c40f',
    fontSize: 24,
    fontWeight: 'bold',
  },
  menu: {
    position: 'absolute',
    top: 60, // adjust based on your navbar height
    left: 0,
    right: 0,
    backgroundColor: '#34495e',
    zIndex: 1,
  },
  menuItem: {
    color: '#444',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#2c3e50',
    backgroundColor: '#fff',
  },
});
