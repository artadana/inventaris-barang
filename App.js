import React from 'react';
import { Text, Image, TextInput, View, StyleSheet, FlatList, KeyboardAvoidingView, RefreshControl, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TabNavigator, TabBarBottom, StackNavigator } from 'react-navigation'; // Version can be specified in package.json

 
class AddScreen extends React.Component {
  constructor()
    {
        super();

        this.state = {
          kode: '',
          nama: '',
          jenis: '',
          merk: '',
          ActivityIndicator_Loading: false,

        }
    }
Insert_Data_Into_MySQL = () =>
    {
        this.setState({ ActivityIndicator_Loading : true }, () =>
        {
            fetch('https://artawebsite.000webhostapp.com/api/kirimData.php',
            {
                method: 'POST',
                headers:
                {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                {
                  kode : this.state.kode,
                  nama : this.state.nama,
                  jenis : this.state.jenis,
                  merk : this.state.merk,
                })

            }).then((response) => response.json()).then((responseJsonFromServer) =>
            {
                alert(responseJsonFromServer);
                this.setState({ ActivityIndicator_Loading : false });
            }).catch((error) =>
            {
                console.error(error);
                this.setState({ ActivityIndicator_Loading : false});
            });
        });
    }

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style = { styles.MainContainer }>
      <View style={{ flex: 1, alignItems:'center', justifyContent: 'center' }}>
        <Image
           source={require('./pti.png')}//image
           style={{width: 200, height: 200 }}
              />
      </View>
      <View style={{ flex: 0.2, alignItems:'center', justifyContent: 'center', paddingBottom: 20, paddingTop: 20 }}>
        <Text style={{fontWeight: 'bold', fontSize: 30, color: '#008B8B' }}>Data Inventaris</Text>
      </View>

                <TextInput
                  placeholder = "Kode Barang"
                  style = { styles.TextInputStyleClass }
                  underlineColorAndroid = "transparent"
                  returnKeyType="next"
                  keyboardType="numeric"
                  onChangeText = {(TextInputText) => this.setState({ kode: TextInputText })} />

                <TextInput
                  placeholder = "Nama Barang"
                  style = { styles.TextInputStyleClass }
                  underlineColorAndroid = "transparent"
                  returnKeyType="next"
                  autoCapitalize="words"
                  onChangeText = {(TextInputText) => this.setState({ nama: TextInputText })} />
                <TextInput
                  placeholder = "Jenis Barang"
                  style = { styles.TextInputStyleClass }
                  underlineColorAndroid = "transparent"
                  returnKeyType="next"
                  autoCapitalize="words"
                  onChangeText = {(TextInputText) => this.setState({ jenis: TextInputText })} />
                <TextInput
                  placeholder = "Merk Barang"
                  style = { styles.TextInputStyleClass }
                  underlineColorAndroid = "transparent"
                  returnKeyType="next"
                  onChangeText = {(TextInputText) => this.setState({ merk: TextInputText })} />

                <TouchableOpacity
                  activeOpacity = { 0.5 }
                  style = { styles.TouchableOpacityStyle }
                  onPress = { this.Insert_Data_Into_MySQL }>

                    <Text style = { styles.TextStyle }>Input Data Inventaris</Text>

                </TouchableOpacity>

                {
                  this.state.ActivityIndicator_Loading ? <ActivityIndicator color='#008B8B' size='large'style={styles.ActivityIndicatorStyle} /> : null

                }

            </KeyboardAvoidingView>


    );
  }
}
class edit extends React.Component {
  static navigationOptions = {
    title: 'edit',
    headerStyle: {
      backgroundColor: '#2962FF',
    },
    headerTintColor: 'white',
    headerTitleStyle: {
      textAlign:'center', 
      alignSelf:'center',
      flex:1
    }
  };
  constructor(props) {
    super(props)
      this.state = {
         kode: '',
         nama: '',
         jenis: '',
         merk: '',
       }
    
     }
 
     componentDidMount(){
 
      // Received Student Details Sent From Previous Activity and Set Into State.
      this.setState({ 
        kode : this.props.navigation.state.params.kode,
        nama : this.props.navigation.state.params.nama,
        jenis : this.props.navigation.state.params.jenis,
        merk : this.props.navigation.state.params.merk,
      })
 
     }
    UpdateStudentRecord = () =>{
      
            fetch('https://artawebsite.000webhostapp.com/api/update.php', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
      
              kode : this.state.kode,
 
              nama : this.state.nama,
      
              jenis : this.state.jenis,
      
              merk : this.state.merk,
      
            })
      
            }).then((response) => response.json())
                .then((responseJson) => {
      
                  // Showing response message coming from server updating records.
                  Alert.alert(responseJson);
      
                }).catch((error) => {
                  console.error(error);
                });
  
      }
     DeleteStudentRecord = () =>{
        
          fetch('https://artawebsite.000webhostapp.com/api/delete.php', {
          method: 'POST',
          headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          },
          body: JSON.stringify({
        
            kode : this.state.kode
        
          })
        
          }).then((response) => response.json())
          .then((responseJson) => {
        
            // Showing response message coming from server after inserting records.
            Alert.alert(responseJson);
        
          }).catch((error) => {
             console.error(error);
          });
 
          this.props.navigation.navigate('ubah');
 
      }
 
render() {
 
      return (
   
   <View style={styles.MainContainer}>
   
          <Text style={{fontSize: 20, textAlign: 'center', marginBottom: 7}}> Data barang </Text>
    
          <TextInput
            
            placeholder="input nama"
            
            value={this.state.nama}
   
            onChangeText={ TextInputValue => this.setState({ nama : TextInputValue }) }
   
            underlineColorAndroid='transparent'
   
            style={styles.TextInputStyleClass}
          />
   
         <TextInput
            
            placeholder="input jenis barang"
 
            value={this.state.jenis}
   
            onChangeText={ TextInputValue => this.setState({ jenis : TextInputValue }) }
   
            underlineColorAndroid='transparent'
   
            style={styles.TextInputStyleClass}
          />
   
         <TextInput
            
            placeholder="merk barang"
 
            value={this.state.TextInput_merk}
   
            onChangeText={ TextInputValue => this.setState({ merk : TextInputValue }) }
   
            underlineColorAndroid='transparent'
   
            style={styles.TextInputStyleClass}
          />
   
   
         <TouchableOpacity activeOpacity = { .4 } style={styles.TouchableOpacityStyle} onPress={this.UpdateStudentRecord} >
            <Text style={styles.TextStyle}> Update Data </Text>
         </TouchableOpacity>
   
         <TouchableOpacity activeOpacity = { .4 } style={styles.TouchableOpacityStyle} onPress={this.DeleteStudentRecord} >
            <Text style={styles.TextStyle}> Delete Data </Text>
        </TouchableOpacity>
   
   </View>
              
      );
    }
 
}
class ViewScreen extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        loading: false,
        data: [],
        error: null,
        refreshing: false,
        ActivityIndicator_Loading: false,
      };
  }

  GetStudentIDFunction=(kode, nama, jenis, merk)=>{
 
    this.props.navigation.navigate('ubah', { 

      kode : kode,
      nama : nama,
      jenis : jenis,
      merk : merk
      

    });

}

    componentDidMount()  {
      this.setState({ ActivityIndicator_Loading : true }, () =>
      {
          this.setState({refreshing: true});
          const url = 'https://artawebsite.000webhostapp.com/api/ambilData.php';
         //this.setState({ loading: true });
          fetch (url)
          .then((response) => response.json())
          .then((responseJson) => {
            console.log("comp");
            console.log(responseJson);
            this.setState({
              data: responseJson,
              error: responseJson.error || null,
              loading: false,
              refreshing: false,
              ActivityIndicator_Loading: false,

            });
          }
        );
      });
    }
    _keyExtractor = (item, index) => item.kode;

    render() {
      return (
  <View>
        <View style={ styles.Header }>
          <Text style={ styles.TextHeader }> Data Inventaris Barang </Text>
        </View>
           {
            this.state.ActivityIndicator_Loading ? <ActivityIndicator color='#008B8B' size='large'style={styles.ActivityIndicatorStyle} /> : null
            }
          <FlatList
            data={this.state.data}
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this.componentDidMount.bind(this)}
              />
            }
            keyExtractor={this._keyExtractor}
            renderItem={({item}) =>
              <View style={styles.BoxClass}>
                <Text
              
                >Kode Barang : {item.kode}</Text>
                <Text onPress={this.GetStudentIDFunction.bind(this, item.nama, item.merk,item.kode, item.jenis,)}>Nama Barang : {item.nama}</Text>
                <Text>Jenis Barang : {item.jenis}</Text>
                <Text>Merk : {item.merk}</Text>
              </View>
          }
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.componentDidMount.bind(this)}
            />
          }
          />
     </View>

      );
    }
}

const ubahstack = StackNavigator({
  Lihat: { screen: ViewScreen },
  ubah: { screen: edit },
});
export default TabNavigator(
  {
    Tambah: { screen: AddScreen },
    Lihat: {screen: ubahstack},
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Tambah') {
          iconName = `ios-add-circle${focused ? '' : '-outline'}`;
        }
        else if (routeName === 'Lihat') {
          iconName = `ios-list-box${focused ? '' : '-outline'}`;
        }  
        return <Ionicons name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    tabBarOptions: {
      activeTintColor: 'white',
      inactiveTintColor: '#000000',
      style: {
        backgroundColor: '#008B8B'
      }
    },
    animationEnabled: false,
    swipeEnabled: true,
  }
);
const styles = StyleSheet.create({
    Header: {
        marginTop: 5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'#64B5F6',
    },
    TextHeader: {
        marginTop: 90,
        fontSize: 30.
    },
    ListItem: {
        backgroundColor:'#BBDEFB',
        marginTop: 5,
        flex: 1
    },
    ListFirst: {
      fontSize: 20
    },
    MainContainer:
    {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      margin: 20

    },

    TextInputStyleClass:
    {
      textAlign: 'center',
      height: 40,
      backgroundColor : "#fff",
      borderWidth: 1,
      borderColor: '#008B8B',
      borderRadius: 7 ,
      marginBottom: 10,
      width: '95%'
    },

    BoxClass:
    {
      alignItems: 'flex-start',
      height: 90,
      backgroundColor: '#fff',
      borderWidth: 4,
      borderColor: '#008B8B',
      borderRadius: 7,
      width: '100%',
      paddingTop: 4,
      paddingBottom: 4
    },

    TouchableOpacityStyle:
   {
      paddingTop:10,
      paddingBottom:10,
      backgroundColor:'#008B8B',
      marginBottom: 20,
      width: '50%',
      borderRadius: 7

    },

    TextStyle:
    {
       color: '#fff',
        textAlign: 'center',
        fontSize: 18
    },

    ActivityIndicatorStyle:{

      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      alignItems: 'center',
      justifyContent: 'center'

  },
    Header: {
        paddingTop: 5,
        paddingBottom: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    TextHeader: {
        fontSize: 30,
        color: '#008B8B'
    },

  });
