import { Image } from "react-native";
export const DATA = [
  {
    id: "group_1",
    type: "CLUB",
    list_team: [
      {
        id: "group_1_team_1",
        name: "ARSENAL",
        logo: Image.resolveAssetSource(require('../assets/img/team/arsenal.png')).uri
      },
      {
        id: "group_1_team_2",
        name: "MANCHESTER UNITED",
        logo: Image.resolveAssetSource(require('../assets/img/team/manchesterunited.png')).uri
      },
      {
        id: "group_1_team_3",
        name: "LIVERPOOL",
        logo: Image.resolveAssetSource(require('../assets/img/team/liverpool.png')).uri
      },
      {
        id: "group_1_team_4",
        name: "TOTTENHAM",
        logo: Image.resolveAssetSource(require('../assets/img/team/tottenham.png')).uri
      },
      {
        id: "group_1_team_5",
        name: "CHELSEA",
        logo: Image.resolveAssetSource(require('../assets/img/team/chelsea.png')).uri
      },
      {
        id: "group_1_team_6",
        name: "MANCHESTER CITY",
        logo: Image.resolveAssetSource(require('../assets/img/team/manchestercity.png')).uri
      }
    ],
    img: Image.resolveAssetSource(require('../assets/img/premierleague.png')).uri,
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
        logo: Image.resolveAssetSource(require('../assets/img/team/barcelona.png')).uri
      },
      {
        id: "group_2_team_2",
        name: "ATLETICO MADRID",
        logo: Image.resolveAssetSource(require('../assets/img/team/atleticomadrid.png')).uri
      },
      {
        id: "group_2_team_3",
        name: "REAL MADRID",
        logo: Image.resolveAssetSource(require('../assets/img/team/realmadrid.png')).uri
      }
    ],
    img: Image.resolveAssetSource(require('../assets/img/laliga.png')).uri,
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
        logo: Image.resolveAssetSource(require('../assets/img/team/dortmund.png')).uri
      },
      {
        id: "group_3_team_2",
        name: "Bayern Munich",
        logo: Image.resolveAssetSource(require('../assets/img/team/bayernmunich.png')).uri
      }
    ],
    img: Image.resolveAssetSource(require('../assets/img/bundesliga.png')).uri,
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
        logo: Image.resolveAssetSource(require('../assets/img/team/psg.png')).uri
      }
    ],
    img: Image.resolveAssetSource(require('../assets/img/ligue1.png')).uri,
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
        logo: Image.resolveAssetSource(require('../assets/img/team/milan.png')).uri
      },
      {
        id: "group_5_team_2",
        name: "NAPOLI",
        logo: Image.resolveAssetSource(require('../assets/img/team/napoli.png')).uri
      },
      {
        id: "group_5_team_3",
        name: "Juventus",
        logo: Image.resolveAssetSource(require('../assets/img/team/juvetus.png')).uri
      },
      {
        id: "group_5_team_4",
        name: "Inter MILAN",
        logo: Image.resolveAssetSource(require('../assets/img/team/inter.png')).uri
      }
    ],
    img: Image.resolveAssetSource(require('../assets/img/seriea.png')).uri,
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
        logo: Image.resolveAssetSource(require('../assets/img/team/italy.png')).uri
      },
      {
        id: "group_6_team_2",
        name: "BELGIUM",
        logo: Image.resolveAssetSource(require('../assets/img/team/belgium.png')).uri
      },
      {
        id: "group_6_team_3",
        name: "netherlands",
        logo: Image.resolveAssetSource(require('../assets/img/team/netherlands.png')).uri
      },
      {
        id: "group_6_team_4",
        name: "england",
        logo: Image.resolveAssetSource(require('../assets/img/team/england.png')).uri
      },
      {
        id: "group_6_team_5",
        name: "croatia",
        logo: Image.resolveAssetSource(require('../assets/img/team/croatia.png')).uri
      },
      {
        id: "group_6_team_6",
        name: "Spain",
        logo: Image.resolveAssetSource(require('../assets/img/team/spain.png')).uri
      },
      {
        id: "group_6_team_1",
        name: "sweden",
        logo: Image.resolveAssetSource(require('../assets/img/team/sweden.png')).uri
      },
      {
        id: "group_6_team_2",
        name: "portugal",
        logo: Image.resolveAssetSource(require('../assets/img/team/portugal.png')).uri
      },
      {
        id: "group_6_team_3",
        name: "france",
        logo: Image.resolveAssetSource(require('../assets/img/team/france.png')).uri
      },
      {
        id: "group_6_team_4",
        name: "germany",
        logo: Image.resolveAssetSource(require('../assets/img/team/germany.png')).uri
      }
    ],
    img: Image.resolveAssetSource(require('../assets/img/uefa.png')).uri,
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
        logo: Image.resolveAssetSource(require('../assets/img/team/argentina.png')).uri
      },
      {
        id: "group_7_team_2",
        name: "brazil",
        logo: Image.resolveAssetSource(require('../assets/img/team/brazil.png')).uri
      },
      {
        id: "group_7_team_3",
        name: "uruguay",
        logo: Image.resolveAssetSource(require('../assets/img/team/uruguay.png')).uri
      }
    ],
    img: Image.resolveAssetSource(require('../assets/img/nammy.png')).uri,
    select: false,
    name: "South America"
  }
]