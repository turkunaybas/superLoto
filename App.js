import { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import { borderBottomColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';

export default function App() {
  const [selectedNumbers, setSelectedNumbers] = useState([]); // seçtiğim numaraları setlediğim geçici liste kaydet butonunun yanında bulunur.
  const [staticNumbers, setStaticNumbers] = useState([]); //banko sayı listem
  const [columnList, setColumnList] = useState({}); //içinde kolonlardan oluşan listeleri tutan obje
  const [winPrize, setWinPrize] = useState(); // çekilen sayılar

  const [winPrizee, setWinPrizee] = useState();


  const [myWinnerNumber, setMyWinnerNumber] = useState({});//çekilen sayılarla uyuşan sayılar
  const [hasStaticNumbers, setHasStaticNumbers] = useState(false); //başlangıçta banko sayı seçtiysem durumu
  const lotoNumbers = [...new Array(49)]; // altta işaretleme yapabildiğim 49a kadar olan sayılar
  const [show, setShow] = useState(false);
  // 49 sayının rengini belirleyen fonks
  function returnBgColor(index) {
    if (selectedNumbers.length > 5 && !selectedNumbers.includes(index + 1)) return { textColor: 'black', bgColor: '#dcdcdc' }
    else if (selectedNumbers.includes(index + 1)) return { textColor: 'white', bgColor: 'pink' }
    else if (staticNumbers.includes(index + 1)) return { textColor: 'white', bgColor: '#75bf6b' }
    else return { textColor: 'black', bgColor: '#c3c3c3' }
  }

  // kazanan numaraları  49 sayı içinden seçen algoritma 6 adet seçer.
  function winNumbers() {
    let array = Array.from(Array(49), (_, index) => index + 1); //=> [1, 2, 3, 4, 5, 6, 7, 8, 9,...49] 1den 49a kadar array oluşturduk
    let winnerNumbers = [];
    for (let index = 0; index < 6; index++) {
      let randomNumber = array[Math.floor(Math.random() * array.length)];
      array = array.filter(item => item !== randomNumber)
      winnerNumbers.push(randomNumber);
    }
    return winnerNumbers;
  }


  function kolonOlustur() {
    const array = Array.from(Array(49), (_, index) => index + 1); //=> [1, 2, 3, 4, 5, 6, 7, 8, 9,...49] 1den 49a kadar array oluşturduk
    const numbersToDelete = new Set(staticNumbers);
    let newArr = array.filter((number) => {
      return !numbersToDelete.has(number);
    });
    
    let randomList = [];
    for (let index = 0; index < 6-staticNumbers.length; index++) {
      let randomNumber = newArr[Math.floor(Math.random() * newArr.length)];
      newArr = newArr.filter(item => item !== randomNumber)
      randomList.push(randomNumber);
    }
    return randomList;
  }
  //benim numaralarımla kazananları karşılaştıran algoritma 
  function arrayMatch(arr1, arr2, index) {
    var arr = [];
    arr1 = arr1.toString().split(',').map(Number);
    arr2 = arr2.toString().split(',').map(Number);
    console.log(arr1);
    // for array1
    for (var i in arr1) {
      if (arr2.indexOf(arr1[i]) !== -1)
        arr.push(arr1[i]);
    }

    setMyWinnerNumber(prev => ({ ...prev, [index + 1]: arr }))
  }
  //oyunu baştan başlatır her şeyi sıfırlar
  function rePlay() {
    setSelectedNumbers([]);
    setStaticNumbers([]);
    setColumnList({});
    setMyWinnerNumber({});
    setWinPrize(winNumbers());
    setHasStaticNumbers(false);
    setShow(false)
  }
  //gönder dediğimde benim sütunlarıla kazananları kontrol eden fonksiyon
  function checkNumber() {
    Object.values(columnList).map((item, index) => {
      arrayMatch(winPrize, item, index)
    })
    setShow(true)
  }

  //static listem varsa o değerleri seçtiklerim yani bankolarla seçimleri karıştırıp kolon oluşturan fonksiyon
  function shuffleStaticNumbers(array) {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    return array;

  }

  //uygulama açıldığında kazanan numaraları çeken fonksiyon
  useEffect(() => {
    setWinPrize(winNumbers());
  }, [])

  //bu2



useEffect(() => {
 console.log('random değerler',winPrizee);
}, [winPrizee]);


  // useEffect(() => {
  //   console.log('winPrize', winPrize);
  // }, [winPrize])
  // useEffect(() => {
  //   console.log('myWinnerNumber', myWinnerNumber);
  // }, [myWinnerNumber])

  return (
    <SafeAreaView style={{ flex: 1, marginTop: "15%" }}>

      <View style={{ flex: 2, }}>
        <View style={{ flex: 1, justifyContent: "space-between", }}>
          {hasStaticNumbers ? (<View style={{ flex: 4, flexDirection: "row" }}>
            <View style={{ flex: 8 }}>
              <ScrollView persistentScrollbar={true} style={{ flex: 1, marginBottom: "2%", }}>
                {/* oluşturduğum kolonlarımın gösterildiği alan */}
                {Object.values(columnList).map((item, index) => (
                  <View style={{ flexDirection: 'row', marginTop: "3%", marginLeft: "2%" }}>
                    <View style={{ width: 30, backgroundColor: "white", height: 20, borderRadius: 15, justifyContent: "center", alignItems: "center", borderWidth: 1, borderColor: "blue" }}>
                      <Text>{index + 1}</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                      {item.map(itm => (
                        // eşleşen sonucum bulunduğu sayı mavi çerçevelenir
                        <View style={{
                          width: 40, height: 40, backgroundColor: 'pink', borderRadius: 100, borderColor: 'blue', borderWidth: 1,
                          alignItems: 'center', justifyContent: 'center', marginHorizontal: '1%',
                          borderColor: myWinnerNumber?.[index + 1]?.includes(itm) ? 'blue' : "white", borderWidth: myWinnerNumber?.[index + 1]?.includes(itm) ? 2 : 1,
                        }}>
                          <Text style={{}}>{itm}</Text>
                        </View>))}
                    </View>
                  </View>
                ))}
              </ScrollView>
            </View>

            {/* gönder butonum eğer kolon objemde liste varsa aktif olur ve bir kez tıkladığımda loto sonlanır sayıları çekilen sayılarla karşılaştırır tetiklerinir böylece sonucu görürüz */}
            <View style={{ flex: 2, alignItems: "center", justifyContent: "center", }}>
              <TouchableOpacity disabled={Object.values(columnList).length === 0} onPress={checkNumber}
                style={{ flex: 1, width: "70%", borderColor: "#75bf6b", borderWidth: 2, borderRadius: 15, justifyContent: "center", alignItems: "center", backgroundColor: "#75bf6b" }}>
                <Text style={{ fontSize: 20 }}>
                  G{'\n'}Ö{'\n'}N{'\n'}D{'\n'}E{'\n'}R
                </Text>
              </TouchableOpacity>
            </View>

          </View>) : (
            <View style={{ flex: 4, justifyContent: 'center', alignItems: 'center', }}>
              <Text style={{ color: "orange", fontSize: 20, fontWeight: "bold" }}>Banko sayılarınızı seçiniz... {'\n'}İsterseniz seçim yapmayabilirsiniz</Text>
            </View>
          )}

          {/* kazanan sayılarımın gösterildiği alan */}

          <View style={{ flex: 1, justifyContent: "center", alignItems: "center", marginTop: "3%", borderTopColor: hasStaticNumbers ? "pink" : "white", borderTopWidth: 1 }}>
            {show == true && hasStaticNumbers && <View style={{ flexDirection: 'row' }}>
              <Text style={{ fontSize: 18 }} > Kazanan sayılar</Text>
              {winPrize?.map(itm => (
                <View style={{
                  width: 30, height: 30, borderRadius: 100, borderColor: 'red', borderWidth: 1,
                  alignItems: 'center', justifyContent: 'center', marginHorizontal: '1%',
                }}>
                  <Text style={{}}>{itm}</Text>
                </View>
              ))}
            </View>}
          </View>
        </View>
      </View>


      {/* static numberlarımın gösterildiği yer */}
      {!show && <View style={{ flexDirection: 'row', justifyContent: "flex-end", }}>
        {staticNumbers?.map((item) => <View style={{
          width: 25, height: 25, borderRadius: 100, borderColor: '#75bf6b', borderWidth: 1,
          alignItems: 'center', justifyContent: 'center', marginHorizontal: '1%',
        }}>
          <Text>{item}</Text>
        </View>)}
      </View>}

      {/* Gönder butonuna basıldıktan sonra buton disable olur ve oyun başa sarsın diye gösterilir */}
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {hasStaticNumbers && show  && <View>
          <TouchableOpacity onPress={rePlay}>
            <Text style={{ fontSize: 25, fontWeight: "bold" ,color:"orange"}}> Lotoyu Tekrarla ! </Text>
          </TouchableOpacity>
        </View>}

        
        {/* seçtiğim sayıların görüünüp kaydedildiği kısım */}
        {!show && <View style={{ flex: 1, flexDirection: 'row', alignItems: "flex-end", marginBottom: "5%", justifyContent: 'space-around' }}>
          {selectedNumbers.length !== 0 ? <View style={{ flex: 4, flexDirection: 'row', backgroundColor: '#c3c3c3', marginLeft: "4%", borderRadius: 10, }}>
            {selectedNumbers.map((item, index) => (
              <View style={{
                width: 40, height: 40, backgroundColor: 'pink', borderRadius: 100, borderWidth: 1,
                alignItems: 'center', justifyContent: 'center', marginHorizontal: '1.4%',
                borderColor: 'orange', borderWidth: 1, marginVertical: "1.3%"
              }}>
                <Text style={{}}>{item}</Text>
              </View>
            ))}
          </View> : <View style={{ flex: 4, flexDirection: 'row', backgroundColor: '#c3c3c3', height: 40, marginLeft: "4%", borderRadius: 10 }} />}

          <View style={{ flex: 1, paddingHorizontal: 10 }}>
            {/* kaydettiğimde eğer banko sayım varsa bunları seçtiklerimle karıştırıp kolan üretirim yoksa eğer seçtiğim sırayla ekler kolon üretirim ve kolon listeme kaydederim */}
            <TouchableOpacity
              style={{ width: '100%', height: 45, backgroundColor: hasStaticNumbers && selectedNumbers.length !== 6 - staticNumbers.length ? '#dcdcdc' : "orange", alignItems: "center", justifyContent: "center", borderRadius: 10 }}
              disabled={hasStaticNumbers && selectedNumbers.length !== 6 - staticNumbers.length}
              onPress={() => {
                if (!hasStaticNumbers) {
                  setHasStaticNumbers(true);
                }
                else {
                  setColumnList((prev) => {
                    return { ...prev, [Object.keys(prev).length + 1]: staticNumbers.length > 0 ? shuffleStaticNumbers([...selectedNumbers, ...staticNumbers]) : selectedNumbers }
                  })
                  setSelectedNumbers([]);
                }
              }}>
              {/* aynı butonu seç , geç ,kaydet butonu olarak durumlara göre güncelledik  */}
              <Text>{hasStaticNumbers ? 'Kaydet' : staticNumbers.length > 0 ? 'Seç' : 'Geç'}</Text>
            </TouchableOpacity>
          </View>
        </View>}
      </View>
      {/* seçtiğim sayıların görünüp kaydedildiği kısım  bitiş*/}










      {/*  sayı seçim klavye alanı */}
      <View style={{ flex: 2 }}>
        {!show &&
          <View style={{ flex: 1, flexWrap: "wrap", flexDirection: 'row', justifyContent: 'center', }}>
            {lotoNumbers.map((item, index) => (
              // seçilen sayı listesi uzunluğu büyükse seçim yaptırmaz banko sayı dışında önceden seçtiklerimi listeden çıkarabilmek için tıklayabilirim sadece
              <TouchableOpacity disabled={selectedNumbers.length > (5 - staticNumbers.length) && !selectedNumbers.includes(index + 1) || hasStaticNumbers&& staticNumbers.includes(index + 1)}
                onPress={() => {
                  if (!hasStaticNumbers) {
                    setStaticNumbers(prev => {
                      if (prev.includes(index + 1)) {
                        return prev.filter(itm => itm !== index + 1)
                      } else {
                        return [...prev, index + 1]
                      }
                    })
                  }
                  // eğer banko sayı seçme aşamasındaysak bonko sayı tekrar basınca silinir yoksa eklenir sayı seçiyorsak banko sayıya dokunamayız
                  else setSelectedNumbers(prev => {
                    if (prev.includes(index + 1)) {
                      return prev.filter(itm => itm !== index + 1)
                    } else {
                      return [...prev, index + 1]
                    }
                  })
                }}
                style={{
                  width: "11%", height: 30, justifyContent: 'center', alignItems: 'center',
                  backgroundColor: returnBgColor(index).bgColor, borderColor: returnBgColor(index).bgColor,
                  borderWidth: 1, marginHorizontal: '1%', marginVertical: '1%', borderRadius: 100
                }}>
                <Text style={{ textAlign: 'center', color: returnBgColor(index).textColor }}>{index + 1}</Text>
              </TouchableOpacity>

            ))}
          </View>}
      </View>
    </SafeAreaView>
  );
}

// ekran açıldı banko seçtim
// kaç kolon oynnanacak söyledim
// 49 sayı içerisinden atadı
