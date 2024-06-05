import { View, Text, StyleSheet, Image} from 'react-native'
import React, { useEffect, useState } from 'react'
import { db } from '../../constants/FirebaseConfig'
import { collection, query, getDocs } from 'firebase/firestore';
import { FlatList } from 'react-native';

const Slider = () => {

  const [sliderList, setSliderList] = useState([]);
  useEffect(() => {
    GetSliderList();
  },[])

  const GetSliderList = async() => {
    setSliderList([]);
    const q = query(collection(db, "Slider"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.data());
      setSliderList(prev => [...prev, doc.data()])
    });
  }
  return (
    <View>
      <Text style={styles.Heading}>Offers For You</Text>
      <FlatList 
        data={sliderList}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        renderItem={({item, index}) => (
            <Image style={styles.sliderImage} source={{uri: item?.imageUrl}} />
        )}
      />
    </View>
  )
}

export default Slider

const styles = StyleSheet.create({
  Heading: {
    fontSize: 18,
    fontFamily: 'outfit-Bold',
    matrginBottom: 5
  },
  sliderImage: {
    width: 250,
    height: 150,
    borderRadius:20,
    marginRight: 10,
    marginTop: 10
  }
})
// import { StyleSheet, Text, View, Image } from 'react-native'
// import React, { useEffect } from 'react'
// import GlobalApi from '../../constants/GlobalApi'
// import { FlatList } from 'react-native';

// export default function Slider() {

//   const [slider, setSliders] = React.useState();
//   useEffect(() => {
//     getSliders();
//   },[]);
//   const getSliders = () => {
//     GlobalApi.getSlider().then(resp => {
//       console.log("resp",resp.sliders)
//       setSliders(resp?.sliders)
//     })
//   }
//   return (
//     <View>
//       <Text style={styles.Heading}>Offers For You</Text>
//       <FlatList
//         data={slider}
//         horizontal={true}
//         renderItem={({item, index}) => (
//           <View>
//             <Text>{item?.name}</Text>
//             <Image style={styles.sliderImage} source={{uri: item?.image?.url}} />
//           </View>
//         )}
//       />
//     </View>
//   )
// }
