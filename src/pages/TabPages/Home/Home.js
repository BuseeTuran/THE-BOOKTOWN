import React, {useState, useEffect} from "react";
import { View, Text, FlatList, ScrollView, TextInput, ActivityIndicator } from "react-native";
import axios from "axios";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import styles from "./Home.style";
import BooksCard from "../../../components/BooksCard";

const Action = 'https://www.googleapis.com/books/v1/volumes?q=subject:action&maxResults=10&key=AIzaSyAI3Q5McDff08J0pF7I6tf9KzSalLWezMo'
const Fiction = 'https://www.googleapis.com/books/v1/volumes?q=subject:fiction&maxResults=10&key=AIzaSyAI3Q5McDff08J0pF7I6tf9KzSalLWezMo'
const Science = 'https://www.googleapis.com/books/v1/volumes?q=subject:science&maxResults=10&key=AIzaSyAI3Q5McDff08J0pF7I6tf9KzSalLWezMo'
const Horror = 'https://www.googleapis.com/books/v1/volumes?q=subject:horror&maxResults=10&key=AIzaSyAI3Q5McDff08J0pF7I6tf9KzSalLWezMo'
const History = 'https://www.googleapis.com/books/v1/volumes?q=subject:history&maxResults=10&key=AIzaSyAI3Q5McDff08J0pF7I6tf9KzSalLWezMo'
const Psychology = 'https://www.googleapis.com/books/v1/volumes?q=subject:psychology&maxResults=10&key=AIzaSyAI3Q5McDff08J0pF7I6tf9KzSalLWezMo'


const Home = ({navigation}) => {

    const [actionData, setActionData] = useState([]);
    const [fictionData, setFictionData] = useState([]);
    const [scienceData, setScienceData] = useState([]);
    const [horrorData, setHorrorData] = useState([]);
    const [historyData, setHistoryData] = useState([]);
    const [psychologyData, setPsychologyData] = useState([]);
    
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect (() => {
        async function fetchData() {
            await axios.get(Action).then(response => {
                setActionData(response.data.items)
            });
            await axios.get(Fiction).then(response => {
                setFictionData(response.data.items)
            });
            await axios.get(Science).then(response => {
                setScienceData(response.data.items)
            });
            await axios.get(Horror).then(response => {
                setHorrorData(response.data.items)
            });
            await axios.get(History).then(response => {
                setHistoryData(response.data.items)
            });
            await axios.get(Psychology).then(response => {
                setPsychologyData(response.data.items)
            });
            
            setLoading(false);
        }
        fetchData();
    }, [])


    const renderBooks = ({item}) => {
        if (search && !item.volumeInfo.title.toLowerCase().includes(search.toLowerCase())){
            return null;
        }
        return (<BooksCard volumeInfo={item.volumeInfo} onSelect={() => handleBook(item)}/>)
    }

    const handleBook = item => {
        navigation.navigate('BookDetail', {item});
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.input_container}>
                <TextInput 
                    style={styles.input}
                    onChangeText={text => setSearch(text)}
                    value={search}
                    placeholder="Search for a book"
                />
                <Icon style={styles.icon} name='magnify' size={22} />
            </View>
            {search.length > 0 ? null : (
                <Text style={styles.title}>Action & Adventure</Text>
            )}
            <View style={styles.book_container}>
                {loading ? (
                    <ActivityIndicator/>
                ) : (
                    <FlatList
                        data={actionData}
                        renderItem={renderBooks}
                        keyExtractor={item => item.id} 
                        horizontal
                    />
                )}
            </View>
            {search.length > 0 ? null : (
                <Text style={styles.title}>Fiction</Text>
            )}
            <View style={styles.book_container}>
                {loading ? (
                    <ActivityIndicator/>
                ) : (
                    <FlatList
                        data={fictionData}
                        renderItem={renderBooks}
                        keyExtractor={item => item.id} 
                        horizontal
                    />
                )}
            </View>
            {search.length > 0 ? null : (
                <Text style={styles.title}>Science</Text>
            )}
            <View style={styles.book_container}>
                {loading ? (
                    <ActivityIndicator/>
                ) : (
                    <FlatList
                        data={scienceData}
                        renderItem={renderBooks}
                        keyExtractor={item => item.id} 
                        horizontal
                    />
                )}
            </View>
            {search.length > 0 ? null : (
                <Text style={styles.title}>Horror & Thriller</Text>
            )}
            <View style={styles.book_container}>
                {loading ? (
                    <ActivityIndicator/>
                ) : (
                    <FlatList
                        data={horrorData}
                        renderItem={renderBooks}
                        keyExtractor={item => item.id} 
                        horizontal
                    />
                )}
            </View>
            {search.length > 0 ? null : (
                <Text style={styles.title}>History</Text>
            )}
            <View style={styles.book_container}>
                {loading ? (
                    <ActivityIndicator/>
                ) : (
                    <FlatList
                        data={historyData}
                        renderItem={renderBooks}
                        keyExtractor={item => item.id} 
                        horizontal
                    />
                )}
            </View>
            {search.length > 0 ? null : (
                <Text style={styles.title}>Psychology</Text>
            )}
            <View style={styles.book_container}>
                {loading ? (
                    <ActivityIndicator/>
                ) : (
                    <FlatList
                        data={psychologyData}
                        renderItem={renderBooks}
                        keyExtractor={item => item.id} 
                        horizontal
                    />
                )}
            </View>
            
        </ScrollView>
    )
}

export default Home