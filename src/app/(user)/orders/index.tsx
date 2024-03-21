import orders from '@/assets/data/orders';
import OrderListItem from '@/src/components/OrderListItem';
import { FlatList } from 'react-native';

export default function OrderScreen() {
  return (
    <FlatList
      data={orders}
      renderItem={({ item }) => <OrderListItem order={item} />}
      contentContainerStyle={{ gap: 10, padding: 10 }}
    />
  );
}
