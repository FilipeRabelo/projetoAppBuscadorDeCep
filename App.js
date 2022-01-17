import React, {useState, useRef} from "react";
import {View, Text, TextInput, 
  TouchableOpacity, StyleSheet, SafeAreaView, Keyboard } from 'react-native';

import api from './src/services/api';

export default function App(){

  const [cep, setCep] = useState('');
  const inputRef = useRef(null);           // states // 
  const [cepUser, setCepUser] = useState(null);

  function limpar(){
    setCep('')
    inputRef.current.focus();
    setCepUser(null);
  }

  async function buscar(){
    if(cep == ''){
      alert('Digite um Cep valido');
      setCep('');
      return;  // para parar o loop //
    }

    try{
      const response = await api.get(`/${cep}/json `);
      console.log(response.data);
      setCepUser(response.data);

      Keyboard.dismiss(); // garantir q o teclado vai fechar //

    }catch(error){
      console.log('ERRO: ' + error);
    }
  }

  return(
    <SafeAreaView style={styles.container}>

      <View style={{alignItems:'center'}}>

        <Text style={styles.texto}>Digite o Cep desejado</Text>

        <TextInput 
        style={styles.input}
        placeholder= "Digite o Cep..."
        value={cep}
        onChangeText={ (texto) => setCep(texto) } 
        keyboardType="numeric"   
        ref={inputRef}              
         />
      </View>

      <View style={styles.areaBtn}>

        <TouchableOpacity 
        style={ [styles.btn, {backgroundColor: '#1d75cd'} ]} 
        onPress={buscar}
        >

          <Text style={styles.textBtn}>Buscar</Text>

        </TouchableOpacity>

        <TouchableOpacity 
        style={ [styles.btn, {backgroundColor: '#cd3e1d'} ]} 
        onPress={limpar}
        >
          <Text style={styles.textBtn}>Limpar</Text>
        </TouchableOpacity>
        
      </View>

      {cepUser && 
       <View style={styles.resultado}>
       <Text style={styles.itemText}>CEP: {cepUser.cep}</Text>
       <Text style={styles.itemText}>Logradouro: {cepUser.logradouro}</Text>
       <Text style={styles.itemText}>Bairro: {cepUser.bairro}</Text>
       <Text style={styles.itemText}>Cidade: {cepUser.localidade}</Text>
       <Text style={styles.itemText}>Estado: {cepUser.uf}</Text>
     </View>
      }     

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#FFFF00'
  },
  texto:{
    marginTop: 15,
    marginBottom: 15,
    fontSize: 25,
    fontWeight:'bold',
    textAlign: 'center',
    color: '#00008B'
  },
  input:{
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 5,
    width: '95%',
    padding: 10,
    fontSize: 18
  },
  areaBtn:{
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 15,
    justifyContent: 'space-around'
  },
  btn:{
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    borderRadius: 5,
    
  },
  textBtn:{
    fontSize: 20,
    color: '#FFF'
  },
  resultado:{
    flex:1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  itemText:{
    fontSize: 22
  }
})