import React, { useState, useEffect } from 'react';
import { Text, View, FlatList, TouchableOpacity, Image } from 'react-native';
import { color } from "../../../utils";
import { Screen } from "../../../constants";
import { IconHeader, IconSelectBox, IconTick } from "../../../assets/svg/ic_svg";
import { homeStyles as styles } from "../styles";

const DATA = [
  {
    id: "group_1",
    type: "CLUB",
    list_team: [
      {
        id: "group_1_team_1",
        name: "ARSENAL",
        logo: require('../../../assets/img/team/arsenal.png')
      },
      {
        id: "group_1_team_2",
        name: "MANCHESTER UNITED",
        logo: require('../../../assets/img/team/manchesterunited.png')
      },
      {
        id: "group_1_team_3",
        name: "LIVERPOOL",
        logo: require('../../../assets/img/team/liverpool.png')
      },
      {
        id: "group_1_team_4",
        name: "TOTTENHAM",
        logo: require('../../../assets/img/team/tottenham.png')
      },
      {
        id: "group_1_team_5",
        name: "CHELSEA",
        logo: require('../../../assets/img/team/chelsea.png')
      },
      {
        id: "group_1_team_6",
        name: "MANCHESTER CITY",
        logo: require('../../../assets/img/team/manchestercity.png')
      }
    ],
    img: require('../../../assets/img/premierleague.png'),
    select: false,
    name: "Premier League"
  },
  {
    id: "group_2",
    type: "CLUB",
    list_team: [
      {
        id: "group_2_team_1",
        name: "BARCELONA",
        logo: require('../../../assets/img/team/barcelona.png')
      },
      {
        id: "group_2_team_2",
        name: "ATLETICO MADRID",
        logo: require('../../../assets/img/team/atleticomadrid.png')
      },
      {
        id: "group_2_team_3",
        name: "REAL MADRID",
        logo: require('../../../assets/img/team/realmadrid.png')
      }
    ],
    img: require('../../../assets/img/laliga.png'),
    select: false,
    name: "Laliga"
  },
  {
    id: "group_3",
    type: "CLUB",
    list_team: [
      {
        id: "group_3_team_1",
        name: "Borussia Dortmund",
        logo: require('../../../assets/img/team/dortmund.png')
      },
      {
        id: "group_3_team_2",
        name: "Bayern Munich",
        logo: require('../../../assets/img/team/bayernmunich.png')
      }
    ],
    img: require('../../../assets/img/bundesliga.png'),
    select: false,
    name: "Bundesliga"
  },
  {
    id: "group_4",
    type: "CLUB",
    list_team: [
      {
        id: "group_4_team_1",
        name: "Paris Saint Germain",
        logo: require('../../../assets/img/team/psg.png')
      }
    ],
    img: require('../../../assets/img/ligue1.png'),
    select: false,
    name: "Ligue 1"
  },
  {
    id: "group_5",
    type: "CLUB",
    list_team: [
      {
        id: "group_5_team_1",
        name: "AC MILAN",
        logo: require('../../../assets/img/team/milan.png')
      },
      {
        id: "group_5_team_2",
        name: "NAPOLI",
        logo: require('../../../assets/img/team/napoli.png')
      },
      {
        id: "group_5_team_3",
        name: "Juventus",
        logo: require('../../../assets/img/team/juvetus.png')
      },
      {
        id: "group_5_team_4",
        name: "Inter MILAN",
        logo: require('../../../assets/img/team/inter.png')
      }
    ],
    img: require('../../../assets/img/seriea.png'),
    select: false,
    name: "Serie A"
  },
  {
    id: "group_6",
    type: "NATIONAL",
    list_team: [
      {
        id: "group_6_team_1",
        name: "ITALY",
        logo: require('../../../assets/img/team/italy.png')
      },
      {
        id: "group_6_team_2",
        name: "BELGIUM",
        logo: require('../../../assets/img/team/belgium.png')
      },
      {
        id: "group_6_team_3",
        name: "netherlands",
        logo: require('../../../assets/img/team/netherlands.png')
      },
      {
        id: "group_6_team_4",
        name: "england",
        logo: require('../../../assets/img/team/england.png')
      },
      {
        id: "group_6_team_5",
        name: "croatia",
        logo: require('../../../assets/img/team/croatia.png')
      },
      {
        id: "group_6_team_6",
        name: "Spain",
        logo: require('../../../assets/img/team/spain.png')
      },
      {
        id: "group_6_team_1",
        name: "sweden",
        logo: require('../../../assets/img/team/sweden.png')
      },
      {
        id: "group_6_team_2",
        name: "portugal",
        logo: require('../../../assets/img/team/portugal.png')
      },
      {
        id: "group_6_team_3",
        name: "france",
        logo: require('../../../assets/img/team/france.png')
      },
      {
        id: "group_6_team_4",
        name: "germany",
        logo: require('../../../assets/img/team/germany.png')
      }
    ],
    img: require('../../../assets/img/uefa.png'),
    select: false,
    name: "UEFA"
  },
  {
    id: "group_7",
    type: "NATIONAL",
    list_team: [
      {
        id: "group_7_team_1",
        name: "argentina",
        logo: require('../../../assets/img/team/argentina.png')
      },
      {
        id: "group_7_team_2",
        name: "brazil",
        logo: require('../../../assets/img/team/brazil.png')
      },
      {
        id: "group_7_team_3",
        name: "uruguay",
        logo: require('../../../assets/img/team/uruguay.png')
      }
    ],
    img: require('../../../assets/img/nammy.png'),
    select: false,
    name: "South America"
  }
]

const SelectBox = ({ isCheck }) => {
  return (
    <>
      {
        isCheck ? <IconSelectBox /> : <View style={styles.box} />
      }
    </>
  )
}

const IconCheck = () => {
  return (
    <View style={[styles.iconTick, styles.myShadow]}>
      <IconTick />
    </View>
  )
}

const Home = ({ navigation }) => {
  const [data, setData] = useState(DATA)
  const [allClub, setAllClub] = useState(false)
  const [allNational, setAllNational] = useState(false)

  useEffect(() => {
    let isAllClub = true;
    let isAllNational = true
    data.map((item, index) => {
      if (!item.select) {
        if (item.type === 'CLUB') {
          isAllClub = false
        } else {
          isAllNational = false
        }
      }
    })
    setAllNational(isAllNational)
    setAllClub(isAllClub)
  }, [data])

  const onPressTouchable = (e) => {
    setData((prev) => {
      let temp = prev.map((item) => {
        if (e.id === item.id) {
          return { ...item, select: !item.select }
        }
        return item
      })
      return temp
    })
  }

  const renderTouchable = ({ item }) => {
    return (
      <TouchableOpacity activeOpacity={0.7} style={[styles.myTouchable, styles.myShadow]} onPress={() => onPressTouchable(item)}>
        <Image source={item.img} style={styles.btnImg} />
        {
          item?.select && (
            <IconCheck />
          )
        }
      </TouchableOpacity>
    )
  }

  const onSetData = (param) => {
    setData((prev) => {
      let temp = prev.map((item) => {
        if (item.type === param) {
          return { ...item, select: param === 'CLUB' ? !allClub : !allNational }
        }
        return item
      })
      return temp
    })
  }

  const onSelectAllClub = () => {
    setAllClub(!allClub)
    console.log(data);
    onSetData('CLUB')
  }

  const onSelectAllClubNational = () => {
    setAllNational(!allNational)
    onSetData('NATIONAL')
  }

  const onPressNext = () => {
    let temp = []
    data.map((item, index) => {
      if (item.select) {
        temp = [...temp, ...item.list_team]
      }
    })
    navigation.navigate(Screen.LIST_TEAM_SCREEN, { data: temp })
  }

  return (
    <View style={styles.container}>

      {/* HEADER */}
      <View style={[styles.header, styles.myRow]}>
        <View style={styles.myRow}>
          <IconHeader />
          <Text style={styles.txtHeader}>Chọn giải đấu</Text>
        </View>
        <TouchableOpacity onPress={onPressNext}>
          <Text style={[styles.txtHeader, { color: color.violet }]}>Tiếp theo</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <FlatList
          data={data.filter(item => item.type === 'CLUB')}
          keyExtractor={(contact, index) => String(index)}
          renderItem={renderTouchable}
          numColumns={2}
          ListHeaderComponent={() => {
            return (
              <View style={[styles.myRow, styles.titleView]}>
                <Text style={styles.txtTitle}>Giải đấu</Text>
                <TouchableOpacity onPress={onSelectAllClub}>
                  <SelectBox isCheck={allClub} />
                </TouchableOpacity>
              </View>
            )
          }}
          ListFooterComponent={() => {
            return (
              <>
                <View style={[styles.myRow, styles.titleView]}>
                  <Text style={styles.txtTitle}>Giải đấu</Text>
                  <TouchableOpacity onPress={onSelectAllClubNational}>
                    <SelectBox isCheck={allNational} />
                  </TouchableOpacity>
                </View>
                <FlatList
                  data={data.filter(item => item.type === 'NATIONAL')}
                  keyExtractor={(contact, index) => String(index)}
                  renderItem={renderTouchable}
                  numColumns={2}
                />
              </>
            )
          }}
        />
      </View>
    </View>
  )
};

export default Home;
