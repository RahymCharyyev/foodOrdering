import products from '@/assets/data/products';
import { Button } from '@/src/components/Button';
import { defaultPizzaImage } from '@/src/components/ProductListItem';
import { useCart } from '@/src/provider/CartProvider';
import { PizzaSize } from '@/src/types';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

const sizes: PizzaSize[] = ['S', 'M', 'L', 'XL'];

const ProductDetailsScreen = () => {
  const { id } = useLocalSearchParams();
  const { addItem } = useCart();
  const router = useRouter();
  const [selectedSize, setSelectedSize] = useState<PizzaSize>('M');
  const product = products.find((p) => p.id.toString() === id);

  const addToCart = () => {
    if (!product) {
      return;
    }
    addItem(product, selectedSize);
    router.push('/cart');
  };

  if (!product) {
    return <Text>Product not found</Text>;
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: product?.name }} />
      <Image
        style={styles.image}
        source={{ uri: product.image || defaultPizzaImage }}
      />
      <Text>Select size</Text>
      <View style={styles.sizes}>
        {sizes.map((size, index) => (
          <Pressable
            onPress={() => {
              setSelectedSize(size);
            }}
            key={index}
            style={[
              styles.size,
              {
                backgroundColor: selectedSize === size ? 'gainsboro' : 'white',
              },
            ]}
          >
            <Text
              style={[
                styles.sizeText,
                {
                  color: selectedSize === size ? 'black' : 'gray',
                },
              ]}
            >
              {size}
            </Text>
          </Pressable>
        ))}
      </View>
      <Text style={styles.price}>$ {product.price}</Text>
      <Button onPress={addToCart} text='Add to cart' />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    padding: 10,
  },
  image: {
    width: '100%',
    aspectRatio: 1,
  },
  sizes: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  size: {
    backgroundColor: 'gainsboro',
    width: 50,
    aspectRatio: 1,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sizeText: {
    fontSize: 20,
    fontWeight: '500',
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 'auto',
  },
});

export default ProductDetailsScreen;
