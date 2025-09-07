// import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
// import { add } from '@mono/utils';
// import { CheckBox } from '@mono/ui';
// import { useState } from 'react';
import { SafeAreaView, ScrollView, TextInput, Button } from 'react-native';

const mockBooks = [
  {
    id: '1',
    title: "Programmer's adventure",
    author: 'Egor Smirnov',
    genres: ['science fiction', 'adventure', 'drama'],
  },
  {
    id: '2',
    title: 'Algorithms for life',
    author: 'Mickhael Nazarov',
    genres: ['maths', 'scientific', 'technics'],
  },
  {
    id: '3',
    title: 'My beloved frontend',
    author: 'Rodion Baranov',
    genres: ['web', 'education', 'programming'],
  },
];

export default function App() {
  // const [isChecked, setIsChecked] = useState(false);
  return (
    <SafeAreaView style={styles.container}>
      {/* Поиск */}
      <TextInput style={styles.search} placeholder="Поиск книг..." />

      {/* Фильтры */}
      <View style={styles.filters}>
        <Button title="Все" onPress={() => {}} />
        <Button title="Фантастика" onPress={() => {}} />
        <Button title="Научпоп" onPress={() => {}} />
      </View>

      {/* Каталог книг */}
      <ScrollView style={styles.catalog}>
        {mockBooks.map((book) => (
          <View key={book.id} style={styles.card}>
            {/* Обложка-заглушка */}
            <View style={styles.coverPlaceholder}>
              <Text style={{ color: '#888' }}>Обложка</Text>
            </View>

            {/* Информация */}
            <View style={styles.info}>
              <Text style={styles.title}>{book.title}</Text>
              <Text style={styles.author}>{book.author}</Text>
              <Text style={styles.genres}>{book.genres.join(', ')}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
    // <>
    //   <StatusBar backgroundColor="blue" />

    //   <View style={styles.container}>
    //     <Text>Open up App.tsx to start working on your app!</Text>
    //     {/* <CheckBox value={isChecked} onChange={() => setIsChecked(!isChecked)} /> */}
    //   </View>
    // </>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  search: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 8,
    marginBottom: 12,
  },
  filters: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  catalog: {
    flex: 1,
  },
  card: {
    flexDirection: 'row',
    marginBottom: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 12,
  },
  coverPlaceholder: {
    width: 60,
    height: 90,
    backgroundColor: '#eee',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  info: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  author: {
    fontSize: 14,
    color: '#555',
    marginBottom: 4,
  },
  genres: {
    fontSize: 12,
    color: '#777',
  },
});
