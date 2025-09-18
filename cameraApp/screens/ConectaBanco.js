import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from "react-native";
import * as SQLite from 'expo-sqlite';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ConectaBanco() {
    const [db, setDb] = useState(null);
    const [dados, setDados] = useState([]);

    useEffect(() => { criarBanco(); }, []);

    const criarBanco = async () => {
        const database = await SQLite.openDatabaseAsync('BancoApp');
        setDb(database);
        await database.execAsync(`
            CREATE TABLE IF NOT EXISTS fotosEcoment (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                imagem BLOB NOT NULL,
                coment TEXT NOT NULL
            );
        `);
    };

    const salvar = async () => {
        if (!db) return;

        const base64Foto = await AsyncStorage.getItem('ultimaFoto');
        let texto = await AsyncStorage.getItem('texto');

        if (!base64Foto) { alert("Nenhuma foto para salvar!"); return; }
        if (!texto) { alert("texto não encontrada!"); return; }

        const statement = await db.prepareAsync(
            'INSERT INTO fotosEcoment (imagem, coment) VALUES ($imagem, $coment)'
        );

        try {
            await statement.executeAsync({ $imagem: base64Foto, $coment: texto});
            alert("Foto e comentario salvos");
        } finally {
            await statement.finalizeAsync();
        }
    };

    const pegarTudo = async () => {
        if (!db) return;
        const allRows = await db.getAllAsync('SELECT * FROM fotosEcoment');
        setDados(allRows);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={salvar}>
                <Text>💾 Salvar Foto + texto</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={pegarTudo}>
                <Text>📄 Ver o que está salvo</Text>
            </TouchableOpacity>

            <FlatList
                data={dados}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={{ marginBottom: 10, alignItems: 'center' }}>
                        <Text>Id: {item.id}</Text>
                        <Text> </Text>
                        <Text>texto: {item.coment}</Text>
                        <Text></Text>
                        <Image
                            source={{ uri: `data:image/jpeg;base64,${item.imagem}` }}
                            style={{ width: 100, height: 100, borderRadius: 8 }}
                        />
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 8 },
    button: { alignItems: "center", backgroundColor: "#DDDDDD", padding: 10, marginVertical: 10 },
});
