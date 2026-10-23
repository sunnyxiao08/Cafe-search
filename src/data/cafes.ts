import { CafeItem } from '../types';

import congratsRealImg from '../assets/images/congrats_interior_real_1792738739345.jpg';
import weiyangRealImg from '../assets/images/weiyang_bookshelf_interior_1792738739413.jpg';
import xiangshanRealImg from '../assets/images/xiangshan_glasshouse_real_1792738739921.jpg';
import triangleRealImg from '../assets/images/triangle_timber_loft_real_1792738740305.jpg';

export const CAFES_DATA: CafeItem[] = [
  {
    id: 'cafe-congrats',
    name: 'Congrats Café',
    tagline: '信義安和老宅二樓侘寂木質空間，採光極佳、平日不限時工作名店',
    image: congratsRealImg,
    district: '大安區',
    address: '台北市大安區文昌街49號',
    mrtStation: '捷運信義安和站 2 號出口 步行 3 分鐘',
    lat: 25.0332,
    lng: 121.5528,
    rating: 4.6,
    reviewCount: 1480,
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent('Congrats Café 台北市大安區文昌街49號'),
    
    socketLevel: 'abundant',
    socketDescription: '平日二樓各座位區與長木桌幾乎均有插座，非常適合筆電工作者久坐',
    outletTypes: ['110V 三孔插座', '長桌專用延長插座'],
    
    wifiSpeedMbps: 240,
    wifiStability: 'ultra_fast',
    wifiDescription: '店內 Wi-Fi 實測 240 Mbps，Ping 8ms，多開網頁與視訊通話皆順暢',
    pingMs: 8,
    
    lightingLevel: 5,
    lightingLabel: '二樓大面採光 自然通透 (5/5)',
    lightingDescription: '文昌街老宅二樓大片開窗，白晝自然日光均勻傾瀉，木質空間明亮溫潤',
    
    interiorStyle: {
      category: 'wabi_sabi',
      name: '古董老件侘寂木質',
      description: '老件木質家具、斑駁灰牆、手作陶藝器皿與綠植盆景，散發濃厚美學底蘊',
      atmosphereTags: ['老宅二樓', '侘寂古董', '採光極佳', '知名手沖肉桂捲'],
    },
    
    timeLimit: {
      type: 'weekdays_unlimited',
      label: '平日不限時 / 假日限2.5小時',
      description: '週一至週五全天不限時；週六日若客滿限時 2.5 小時，低消一杯飲品',
    },
    
    drinkPricing: {
      minPrice: 130,
      maxPrice: 200,
      averagePrice: 155,
      minConsumption: '每人低消一杯飲品',
      sampleMenu: [
        { name: '經典美式咖啡 (淺焙/深焙)', price: 130, category: 'coffee' },
        { name: 'Congrats 招牌拿鐵', price: 150, category: 'coffee' },
        { name: '手沖單品咖啡 (精選莊園豆)', price: 180, category: 'coffee' },
        { name: '小農鮮奶焙茶歐蕾', price: 160, category: 'tea' },
        { name: '自慢手作肉桂捲', price: 140, category: 'dessert' },
      ],
    },
    
    operatingHours: {
      0: { open: '09:30', close: '22:00' }, // Sun
      1: { open: '08:00', close: '22:00' }, // Mon
      2: { open: '08:00', close: '22:00' }, // Tue
      3: { open: '08:00', close: '22:00' }, // Wed
      4: { open: '08:00', close: '22:00' }, // Thu
      5: { open: '08:00', close: '22:00' }, // Fri
      6: { open: '09:30', close: '22:00' }, // Sat
    },
    
    noiseLevel: 'soft_chatter',
    noiseDescription: '白天客人多為單獨使用筆電辦公與看書，背景音樂舒緩，輕聲交談不吵雜',
    seatDescription: '實木工作桌與老件椅子，桌高適中，二樓窗邊位置採光最舒適',
    amenities: ['提供免費常溫飲用水', '乾淨獨立洗手間', '店內有知名手作甜點', '支援 LINE Pay / 街口'],
    bestSuitedFor: ['平日全天遠端辦公', '筆電寫作開發', '閱讀沉思', '咖啡品鑑愛好者'],
  },

  {
    id: 'cafe-weiyang',
    name: '未央咖啡店',
    tagline: '科技大樓夜貓工作族聖地！滿架漫畫與老宅書香，平假日皆不限時',
    image: weiyangRealImg,
    district: '大安區',
    address: '台北市大安區四維路208巷10號',
    mrtStation: '捷建科技大樓站 步行 6 分鐘',
    lat: 25.0275,
    lng: 121.5471,
    rating: 4.5,
    reviewCount: 1120,
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent('未央咖啡店 台北市大安區四維路208巷10號'),
    
    socketLevel: 'abundant',
    socketDescription: '店內插座數量充足，主要長桌與靠牆座均設有插座，適合長時間接電工作',
    outletTypes: ['110V 三孔插座', '牆面多孔延長線'],
    
    wifiSpeedMbps: 180,
    wifiStability: 'fast',
    wifiDescription: '穩定寬頻 180 Mbps，查資料、寫 Code、看文獻連線不中斷',
    pingMs: 11,
    
    lightingLevel: 3,
    lightingLabel: '沉浸昏黃暖調燈光 (3/5)',
    lightingDescription: '經典復古溫馨黃光氛圍，光線偏暗具包覆感，座席配有小檯燈或投射光',
    
    interiorStyle: {
      category: 'vintage_cozy',
      name: '日系老宅文青漫畫感',
      description: '整面牆經典漫畫書櫃、老式沙發、復古海報與店貓穿梭，洋溢生活感',
      atmosphereTags: ['深夜營業至凌晨1點', '平假日皆不限時', '滿櫃漫畫藏書', '水餃貓飯'],
    },
    
    timeLimit: {
      type: 'unlimited',
      label: '平假日全天不限時',
      description: '無論平日或假日一律不限時，客人大多專心做自己的事，無任何催促離席壓力',
    },
    
    drinkPricing: {
      minPrice: 130,
      maxPrice: 190,
      averagePrice: 150,
      minConsumption: '每人低消一杯飲品',
      sampleMenu: [
        { name: '黑咖啡 (熱/冰)', price: 130, category: 'coffee' },
        { name: '經典原味拿鐵', price: 150, category: 'coffee' },
        { name: '未央黑糖鮮奶茶', price: 150, category: 'tea' },
        { name: '高山手沖單品咖啡', price: 180, category: 'coffee' },
        { name: '手工現煮水餃 (10顆)', price: 110, category: 'specialty' },
      ],
    },
    
    operatingHours: {
      0: { open: '13:00', close: '01:00' }, // Sun
      1: { open: '13:00', close: '01:00' }, // Mon
      2: { open: '13:00', close: '01:00' }, // Tue
      3: { open: '13:00', close: '01:00' }, // Wed
      4: { open: '13:00', close: '01:00' }, // Thu
      5: { open: '13:00', close: '01:00' }, // Fri
      6: { open: '13:00', close: '01:00' }, // Sat
    },
    
    noiseLevel: 'library_quiet',
    noiseDescription: '雖然深夜偶有人聲，但大家普遍自律壓低音量，猶如社區公共K書中心',
    seatDescription: '實木長桌與軟墊木椅，大桌面便於同時攤開筆電、滑鼠與筆記本',
    amenities: ['深夜營業至凌晨 01:00', '提供正餐熱水餃與貓飯', '藏書漫畫自由閱覽', '親人店貓'],
    bestSuitedFor: ['深夜衝刺趕工', '論文報告撰寫', '獨立靜心思考', '夜貓族工程師'],
  },

  {
    id: 'cafe-illumination',
    name: '浮光書店 (Illumination Books)',
    tagline: '赤峰街天井老洋樓獨立書店咖啡廳，自然漫射天光與極高專注書香',
    image: congratsRealImg,
    district: '大同區',
    address: '台北市大同區赤峰街47巷16號2樓',
    mrtStation: '捷運中山站 4 號出口 / 雙連站 1 號出口 步行 4 分鐘',
    lat: 25.0544,
    lng: 121.5196,
    rating: 4.6,
    reviewCount: 1240,
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent('浮光書店 台北市大同區赤峰街47巷16號2樓'),
    
    socketLevel: 'abundant',
    socketDescription: '大工作長桌與靠牆座均設有插座，筆電族可安心使用',
    outletTypes: ['110V 三孔插座', '壁面雙孔插座'],
    
    wifiSpeedMbps: 200,
    wifiStability: 'ultra_fast',
    wifiDescription: '200 Mbps 穩定 Wi-Fi，瀏覽資料與文檔雲端同步迅速穩定',
    pingMs: 9,
    
    lightingLevel: 4,
    lightingLabel: '老宅中央天井 自然漫射光 (4/5)',
    lightingDescription: '中央天井將自然天光帶入二樓空間，搭配老磨石子地與木窗，光影柔和通透',
    
    interiorStyle: {
      category: 'vintage_cozy',
      name: '老洋樓獨立書店人文風',
      description: '六十年老打鐵街老宅改建，整面精選哲學、文學與藝術書牆，木造閣樓氛圍',
      atmosphereTags: ['老宅天井', '獨立書店', '安靜書香', '赤峰文青街區'],
    },
    
    timeLimit: {
      type: 'weekdays_unlimited',
      label: '平日不限時 / 假日客滿限時',
      description: '平日全日不限時；假日若遇客滿可能有限時規範，低消一杯飲品',
    },
    
    drinkPricing: {
      minPrice: 130,
      maxPrice: 190,
      averagePrice: 150,
      minConsumption: '一人低消一杯飲品',
      sampleMenu: [
        { name: '黑咖啡 (美式)', price: 130, category: 'coffee' },
        { name: '經典卡布奇諾', price: 150, category: 'coffee' },
        { name: '台灣高山烏龍冷泡茶', price: 160, category: 'tea' },
        { name: '精選耶加雪菲手沖', price: 180, category: 'coffee' },
        { name: '手作磅蛋糕 / 司康', price: 100, category: 'dessert' },
      ],
    },
    
    operatingHours: {
      0: { open: '12:00', close: '22:00' }, // Sun
      1: { open: '12:00', close: '22:00' }, // Mon
      2: { open: '12:00', close: '22:00' }, // Tue
      3: { open: '12:00', close: '22:00' }, // Wed
      4: { open: '12:00', close: '22:00' }, // Thu
      5: { open: '12:00', close: '22:00' }, // Fri
      6: { open: '12:00', close: '22:00' }, // Sat
    },
    
    noiseLevel: 'library_quiet',
    noiseDescription: '書店結合型態，店內極其安靜，宛若小型圖書館，完全沒有吵雜喧嘩',
    seatDescription: '實木長方大桌，桌距適當，椅背支撐良好，非常適合寫稿與敲鍵盤',
    amenities: ['店內精選書籍免費翻閱', '提供自取常溫飲用水', '老件文創展示', '支援行動支付'],
    bestSuitedFor: ['寫作與閱讀', '文書與研究工作', '文青個人筆電辦公', '沉浸式靜心'],
  },

  {
    id: 'cafe-homeys',
    name: "Homey's cafe",
    tagline: '東區老宅二樓傳奇咖啡店！大木桌、插座超多、平假日全天不限時',
    image: weiyangRealImg,
    district: '大安區',
    address: '台北市大安區敦化南路一段236巷36號2樓',
    mrtStation: '捷運忠孝敦化站 6 號出口 步行 4 分鐘',
    lat: 25.0398,
    lng: 121.5489,
    rating: 4.5,
    reviewCount: 1080,
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent("Homey's cafe 台北市大安區敦化南路一段236巷36號2樓"),
    
    socketLevel: 'abundant',
    socketDescription: '台北工作咖啡廳名店，插座配置密度極高，幾乎每個座位旁都能找到插座',
    outletTypes: ['110V 三孔插座', '延長線排插'],
    
    wifiSpeedMbps: 220,
    wifiStability: 'ultra_fast',
    wifiDescription: '220 Mbps 專用光纖，多裝置同時連線依然極為穩定',
    pingMs: 8,
    
    lightingLevel: 4,
    lightingLabel: '二樓街景自然採光 + 溫馨黃光 (4/5)',
    lightingDescription: '大面窗迎向敦南林蔭巷弄，白天採光柔和自然，夜間切換為溫馨復古燈光',
    
    interiorStyle: {
      category: 'vintage_cozy',
      name: '老台北公寓復古風',
      description: '老屋二樓大陽台、古樸沙發、大量獨立搖滾樂 CD、電影海報與豐富書本',
      atmosphereTags: ['東區老店', '全天不限時', '插座超多', '開到深夜23點'],
    },
    
    timeLimit: {
      type: 'unlimited',
      label: '平假日全天不限時',
      description: '名符其實的自由工作者避難所，全天不限時，坐一下午也不會有壓力',
    },
    
    drinkPricing: {
      minPrice: 130,
      maxPrice: 190,
      averagePrice: 150,
      minConsumption: '一人低消一杯飲品',
      sampleMenu: [
        { name: '美式黑咖啡', price: 130, category: 'coffee' },
        { name: '香草拿鐵 / 焦糖拿鐵', price: 160, category: 'coffee' },
        { name: '薄荷洋甘菊草本茶', price: 150, category: 'tea' },
        { name: '精選莊園手沖咖啡', price: 180, category: 'coffee' },
        { name: '招牌肉桂吐司 / 水餃', price: 110, category: 'specialty' },
      ],
    },
    
    operatingHours: {
      0: { open: '12:00', close: '23:00' }, // Sun
      1: { open: '12:00', close: '23:00' }, // Mon
      2: { open: '12:00', close: '23:00' }, // Tue
      3: { open: '12:00', close: '23:00' }, // Wed
      4: { open: '12:00', close: '23:00' }, // Thu
      5: { open: '12:00', close: '23:00' }, // Fri
      6: { open: '12:00', close: '23:00' }, // Sat
    },
    
    noiseLevel: 'soft_chatter',
    noiseDescription: '客人大多帶著筆電敲鍵盤或低語討論，背景音樂選品極佳，氛圍放鬆不分心',
    seatDescription: '實木長桌寬大平整，深處還有獨立安靜書房區，提供更專注的打字空間',
    amenities: ['戶外陽台休憩區', '獨立寧靜書房座席', '開到晚上 23:00', '提供正餐水餃與吐司'],
    bestSuitedFor: ['筆電重度工作者', '長期專案衝刺', '下午到深夜長時間辦公', '團隊輕量對焦'],
  },

  {
    id: 'cafe-sugarman',
    name: 'Sugar Man Cafe',
    tagline: '古亭站傳奇深夜避難所！營業至清晨 4 點，插座充足、日式炒麵超人氣',
    image: weiyangRealImg,
    district: '大安區',
    address: '台北市大安區和平東路一段87-1號',
    mrtStation: '捷運古亭站 5 號出口 步行 4 分鐘',
    lat: 25.0271,
    lng: 121.5262,
    rating: 4.4,
    reviewCount: 1520,
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent('Sugar Man Cafe 台北市大安區和平東路一段87-1號'),
    
    socketLevel: 'abundant',
    socketDescription: '台北深夜辦公族的最愛，許多座位均配有插座及獨立護眼檯燈',
    outletTypes: ['110V 三孔插座', '座席專用延長排插'],
    
    wifiSpeedMbps: 190,
    wifiStability: 'fast',
    wifiDescription: '190 Mbps 順暢連線，無論深夜查文檔或連線遠端伺服器都很穩',
    pingMs: 10,
    
    lightingLevel: 3,
    lightingLabel: '復古昏黃暖燈 + 專用檯燈 (3/5)',
    lightingDescription: '室內呈現低飽和昏黃夜間氛圍，各桌附有可自行開關的明亮小檯燈',
    
    interiorStyle: {
      category: 'vintage_cozy',
      name: '昭和深夜食堂復古風',
      description: '懷舊海報、老皮沙發、黑膠唱片、老式收音機，充滿深夜沉著的孤獨美感',
      atmosphereTags: ['營業至清晨04點', '全天不限時', '日式炒麵招牌', '深夜趕工首選'],
    },
    
    timeLimit: {
      type: 'unlimited',
      label: '平假日全天不限時',
      description: '平假日全時段不限時，是許多文字工作者、影音剪輯師與夜行者的秘密基地',
    },
    
    drinkPricing: {
      minPrice: 120,
      maxPrice: 180,
      averagePrice: 145,
      minConsumption: '一人低消一杯飲品',
      sampleMenu: [
        { name: '冰美式黑咖啡', price: 120, category: 'coffee' },
        { name: '海鹽焦糖拿鐵', price: 150, category: 'coffee' },
        { name: '招牌日式炒麵 (附太陽蛋)', price: 150, category: 'specialty' },
        { name: '手作水餃 (韭菜/高麗菜)', price: 110, category: 'specialty' },
        { name: '小農手沖冰滴咖啡', price: 170, category: 'coffee' },
      ],
    },
    
    operatingHours: {
      0: { open: '14:00', close: '04:00' }, // Sun
      1: { open: '14:00', close: '04:00' }, // Mon
      2: { open: '14:00', close: '04:00' }, // Tue
      3: { open: '14:00', close: '04:00' }, // Wed
      4: { open: '14:00', close: '04:00' }, // Thu
      5: { open: '14:00', close: '04:00' }, // Fri
      6: { open: '14:00', close: '04:00' }, // Sat
    },
    
    noiseLevel: 'soft_chatter',
    noiseDescription: '伴隨老搖滾與獨立民謠，大家各忙各的，敲鍵盤或畫畫，深夜格外專心',
    seatDescription: '實木工作方桌，附帶插座與檯燈，桌椅高度適合長時間俯首工作',
    amenities: ['營業至清晨 04:00', '提供日式炒麵與熱食水餃', '半戶外吸煙通風區', '豐富二手書籍'],
    bestSuitedFor: ['深夜通宵加班', '程式碼 Debug', '靈感大爆發創作', '日夜顛倒遠端工作者'],
  },

  {
    id: 'cafe-zday',
    name: '休習日 Z Day Cafe',
    tagline: '六張犁巷弄北歐木質溫度空間，明亮大窗、優質手沖與自慢定食',
    image: xiangshanRealImg,
    district: '大安區',
    address: '台北市大安區樂業街41巷2號',
    mrtStation: '捷運六張犁站 步行 5 分鐘',
    lat: 25.0229,
    lng: 121.5518,
    rating: 4.6,
    reviewCount: 960,
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent('休習日 Z Day Cafe 台北市大安區樂業街41巷2號'),
    
    socketLevel: 'abundant',
    socketDescription: '店內中央原木工作大長桌與部分邊座設有插座，對辦公筆電族十分友善',
    outletTypes: ['110V 三孔插座', '接地保護插頭'],
    
    wifiSpeedMbps: 210,
    wifiStability: 'ultra_fast',
    wifiDescription: '210 Mbps 雙頻 Wi-Fi，網路訊號滿格，傳輸與視訊體驗良好',
    pingMs: 7,
    
    lightingLevel: 4,
    lightingLabel: '落地窗自然柔光 (4/5)',
    lightingDescription: '臨巷大面落地玻璃窗帶來明亮自然的晨昏採光，木色裝潢營造溫馨視覺感受',
    
    interiorStyle: {
      category: 'modern_minimal',
      name: '北歐簡約暖木綠意',
      description: '原木大桌、手作陶杯、暖色調布幔與植栽綠意，傳遞像家一樣的放鬆安心感',
      atmosphereTags: ['六張犁靜巷', '溫馨食堂風格', '日式咖哩飯', '平日辦公友善'],
    },
    
    timeLimit: {
      type: 'weekdays_unlimited',
      label: '平日不限時 / 假日客滿限時',
      description: '平日全天不限時，適合待滿整個工作日下午；假日若人潮眾多依現場規定',
    },
    
    drinkPricing: {
      minPrice: 120,
      maxPrice: 190,
      averagePrice: 150,
      minConsumption: '一人低消一杯飲品',
      sampleMenu: [
        { name: '休習日美式咖啡', price: 120, category: 'coffee' },
        { name: '小農鮮奶拿鐵 (厚奶調配)', price: 150, category: 'coffee' },
        { name: '自家手沖單品咖啡', price: 180, category: 'coffee' },
        { name: '台灣茶：蜜香紅茶', price: 140, category: 'tea' },
        { name: '日式舒肥雞肉咖哩飯', price: 220, category: 'specialty' },
      ],
    },
    
    operatingHours: {
      0: { open: '11:30', close: '21:00' }, // Sun
      1: { open: '11:30', close: '21:00', isClosed: true }, // Mon: 固定公休
      2: { open: '11:30', close: '21:00' }, // Tue
      3: { open: '11:30', close: '21:00' }, // Wed
      4: { open: '11:30', close: '21:00' }, // Thu
      5: { open: '11:30', close: '21:00' }, // Fri
      6: { open: '11:30', close: '21:00' }, // Sat
    },
    
    noiseLevel: 'soft_chatter',
    noiseDescription: '氛圍安詳舒適，交談音量皆輕柔，午後鍵盤聲與咖啡沖煮聲和諧放鬆',
    seatDescription: '木質長桌桌面寬大，椅子附有軟墊，長時間就座不顯疲累',
    amenities: ['提供美味日式咖哩正餐', '免費過濾飲用水', '精選文創周邊', '無障礙友善入口'],
    bestSuitedFor: ['平日辦公與自修', '創意工作者寫作', '享用早午餐兼工作', '安靜討論'],
  },

  {
    id: 'cafe-youmou',
    name: '羊毛與花 永康店 (youmoutohana Coffee)',
    tagline: '永康街日系文青小庭院，陽光綠意落地窗與寧靜閱讀辦公氛圍',
    image: triangleRealImg,
    district: '大安區',
    address: '台北市大安區永康街37巷12號',
    mrtStation: '捷運東門站 5 號出口 步行 6 分鐘',
    lat: 25.0315,
    lng: 121.5302,
    rating: 4.5,
    reviewCount: 1350,
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent('羊毛與花 永康店 台北市大安區永康街37巷12號'),
    
    socketLevel: 'abundant',
    socketDescription: '後半段工作區與長桌均有豐富插座可供筆電充電使用',
    outletTypes: ['110V 三孔插座', '壁面雙孔插座'],
    
    wifiSpeedMbps: 200,
    wifiStability: 'ultra_fast',
    wifiDescription: '200 Mbps 穩定寬頻，傳遞大檔與播放視訊課程皆能流暢應對',
    pingMs: 9,
    
    lightingLevel: 4,
    lightingLabel: '庭園自然側光 (4/5)',
    lightingDescription: '綠意小庭院引進舒適自然的戶外採光，室內色調柔和溫暖，放鬆雙眼',
    
    interiorStyle: {
      category: 'wabi_sabi',
      name: '日系溫暖木質庭園風',
      description: '原木桌椅、溫暖鎢絲吊燈、日本樂團周邊、庭園小徑與手作陶瓷器皿',
      atmosphereTags: ['永康街靜巷', '日系綠意庭園', '招牌手作甜點', '不限時工作友善'],
    },
    
    timeLimit: {
      type: 'weekdays_unlimited',
      label: '平日不限時 / 假日客滿限時',
      description: '平日不限時，能輕鬆在此待上一整天；假日人潮熱門時段可能有限時',
    },
    
    drinkPricing: {
      minPrice: 140,
      maxPrice: 200,
      averagePrice: 165,
      minConsumption: '每人低消一杯飲品',
      sampleMenu: [
        { name: '經典美式咖啡', price: 140, category: 'coffee' },
        { name: '羊毛與花特調拿鐵', price: 160, category: 'coffee' },
        { name: '宇治抹茶歐蕾', price: 165, category: 'tea' },
        { name: '手沖單品精品咖啡', price: 190, category: 'coffee' },
        { name: '招牌生乳酪蛋糕 / 肉桂捲', price: 140, category: 'dessert' },
      ],
    },
    
    operatingHours: {
      0: { open: '11:00', close: '22:00' }, // Sun
      1: { open: '11:00', close: '22:00' }, // Mon
      2: { open: '11:00', close: '22:00' }, // Tue
      3: { open: '11:00', close: '22:00' }, // Wed
      4: { open: '11:00', close: '22:00' }, // Thu
      5: { open: '11:00', close: '22:00' }, // Fri
      6: { open: '11:00', close: '22:00' }, // Sat
    },
    
    noiseLevel: 'soft_chatter',
    noiseDescription: '後半部工作區格外安靜，音樂風格以日系不插電木吉他為主，舒適不躁動',
    seatDescription: '實木長方大桌，桌子堅固不晃動，椅子坐感扎實舒適',
    amenities: ['綠意戶外庭園座位', '免費提供常溫檸檬水', '手作精緻法式甜點', '支援多元行動支付'],
    bestSuitedFor: ['筆電創作與寫作', '午後專注工作', '閱讀與筆記', '輕量商務洽談'],
  },

  {
    id: 'cafe-louisa-xiangshan',
    name: '路易莎咖啡 象山旗艦門市 (Louisa Coffee)',
    tagline: '雙層挑高玻璃帷幕、象山綠意滿窗！全席插座覆蓋，CP值超高',
    image: xiangshanRealImg,
    district: '信義區',
    address: '台北市信義區信義路五段150巷2號',
    mrtStation: '捷運象山站 2 號出口 步行 3 分鐘',
    lat: 25.0321,
    lng: 121.5694,
    rating: 4.5,
    reviewCount: 2180,
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent('路易莎咖啡 象山旗艦門市 台北市信義區信義路五段150巷2號'),
    
    socketLevel: 'abundant',
    socketDescription: '工作長桌幾乎每個座位均嵌有專屬 110V 插座與 USB 充電孔，筆電族聖地',
    outletTypes: ['每席獨立 110V 插座', 'USB 充電孔', '大工作長桌排插'],
    
    wifiSpeedMbps: 260,
    wifiStability: 'ultra_fast',
    wifiDescription: '商務級雙頻 260 Mbps Wi-Fi，視訊開會、同步大型專案極其流暢',
    pingMs: 6,
    
    lightingLevel: 5,
    lightingLabel: '雙層挑高 全自然玻璃天光 (5/5)',
    lightingDescription: '面向象山公園大片挑高玻璃窗，自然光線灑落整棟空間，視野極佳完全不壓抑',
    
    interiorStyle: {
      category: 'modern_minimal',
      name: '挑高玻璃日光工坊',
      description: '挑高兩層樓鋼構玻璃帷幕，寬闊大木桌、黑色鐵件與簡約木紋地磚',
      atmosphereTags: ['雙層挑高玻璃屋', '全席插座', '象山綠意景觀', '平價親民'],
    },
    
    timeLimit: {
      type: 'unlimited',
      label: '平假日全天不限時',
      description: '全時段皆不限時，營業時間從早晨 07:00 開到晚間 21:30',
    },
    
    drinkPricing: {
      minPrice: 60,
      maxPrice: 120,
      averagePrice: 85,
      minConsumption: '一人低消任一品項 (百元有找)',
      sampleMenu: [
        { name: '莊園美式咖啡 (大杯)', price: 65, category: 'coffee' },
        { name: '莊園級拿鐵咖啡', price: 90, category: 'coffee' },
        { name: '英國皇家紅茶', price: 50, category: 'tea' },
        { name: '黑糖雪點奶茶', price: 70, category: 'tea' },
        { name: '熱壓吐司 / 貝果早午餐', price: 65, category: 'specialty' },
      ],
    },
    
    operatingHours: {
      0: { open: '07:00', close: '21:30' }, // Sun
      1: { open: '07:00', close: '21:30' }, // Mon
      2: { open: '07:00', close: '21:30' }, // Tue
      3: { open: '07:00', close: '21:30' }, // Wed
      4: { open: '07:00', close: '21:30' }, // Thu
      5: { open: '07:00', close: '21:30' }, // Fri
      6: { open: '07:00', close: '21:30' }, // Sat
    },
    
    noiseLevel: 'moderate_cafe',
    noiseDescription: '二樓大部分為單獨工作的遠端工程師與學生，打字鍵盤聲整齊，交談大多輕聲細語',
    seatDescription: '特別訂製的大型共享工作長桌，桌面極寬，附獨立插座與舒適木椅',
    amenities: ['早餐 07:00 開始營業', '百元內高CP值超值飲品', '象山公園散步景致', '支援全行動支付與載具'],
    bestSuitedFor: ['全日遠端工作 Code Sprint', '日常高頻率辦公', '高 CP 值工作首選', '早起晨型工作者'],
  },

  {
    id: 'cafe-triangle-garden',
    name: '角公園咖啡 Triangle Garden Cafe',
    tagline: '太原路百年木造大閣樓！大片街角木窗天光、寬大實木桌與手沖單品',
    image: triangleRealImg,
    district: '大同區',
    address: '台北市大同區太原路131號2樓',
    mrtStation: '捷運中山站 6 號出口 步行 6 分鐘 / 台北車站 10 分鐘',
    lat: 25.0526,
    lng: 121.5168,
    rating: 4.6,
    reviewCount: 1420,
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent('角公園咖啡 Triangle Garden Cafe 台北市大同區太原路131號2樓'),
    
    socketLevel: 'abundant',
    socketDescription: '大木桌與靠牆座均配置插座，老閣樓空間寬敞，插座取用極為方便',
    outletTypes: ['110V 三孔插座', '長桌排插'],
    
    wifiSpeedMbps: 210,
    wifiStability: 'ultra_fast',
    wifiDescription: '210 Mbps 高速寬頻，訊號全店均勻覆蓋，連線穩定',
    pingMs: 8,
    
    lightingLevel: 4,
    lightingLabel: '街角雙向木窗漫射天光 (4/5)',
    lightingDescription: '位處街角二樓，兩面大窗迎來充分均勻的戶外天光，木樑間透著溫潤自然氛圍',
    
    interiorStyle: {
      category: 'vintage_cozy',
      name: '百年挑高木造老屋閣樓',
      description: '日治時期木構老建築、挑高斜屋頂、老件家具、木造桁架與黑膠唱盤放音',
      atmosphereTags: ['百年木構閣樓', '挑高斜屋頂', '角咖啡黑糖', '鄰近台北車站與中山'],
    },
    
    timeLimit: {
      type: 'weekdays_unlimited',
      label: '平日不限時 / 假日若客滿限時',
      description: '平日全天不限時，客人大多帶著筆電在長桌各自工作；假日若客滿依店家告示',
    },
    
    drinkPricing: {
      minPrice: 130,
      maxPrice: 200,
      averagePrice: 155,
      minConsumption: '一人低消一杯飲品',
      sampleMenu: [
        { name: '經典美式咖啡', price: 130, category: 'coffee' },
        { name: '招牌角咖啡 (黑糖鮮奶濃縮)', price: 160, category: 'specialty' },
        { name: '精選耶加雪菲手沖單品', price: 180, category: 'coffee' },
        { name: '蜜香烏龍鮮奶茶', price: 150, category: 'tea' },
        { name: '孫女的布丁 (超人氣手工布丁)', price: 120, category: 'dessert' },
      ],
    },
    
    operatingHours: {
      0: { open: '10:00', close: '18:00' }, // Sun
      1: { open: '10:00', close: '18:00' }, // Mon
      2: { open: '10:00', close: '18:00' }, // Tue
      3: { open: '10:00', close: '18:00' }, // Wed
      4: { open: '10:00', close: '18:00', isClosed: true }, // Thu: 公休
      5: { open: '10:00', close: '18:00' }, // Fri
      6: { open: '10:00', close: '18:00' }, // Sat
    },
    
    noiseLevel: 'soft_chatter',
    noiseDescription: '老木屋吸音良好，加上輕柔古典爵士樂，整體環境格外安詳恬靜',
    seatDescription: '手工訂製實木大桌，桌面質地厚實溫潤，椅子有靠背坐墊',
    amenities: ['手工自製焦糖布丁', '免費常溫熱水自助', '日治時期木屋歷史解說', '安靜自律氛圍'],
    bestSuitedFor: ['白天專注辦公', '深度閱讀與思考', '文字創作', '遠離市區喧囂的沉靜午後'],
  },

  {
    id: 'cafe-alley',
    name: '弄宅咖啡 Alley Cafe',
    tagline: '松江南京巷弄百年老屋，天井光影、榻榻米席與安靜工作時光',
    image: triangleRealImg,
    district: '中山區',
    address: '台北市中山區松江路150巷18-1號',
    mrtStation: '捷運松江南京站 8 號出口 步行 5 分鐘',
    lat: 25.0540,
    lng: 121.5328,
    rating: 4.7,
    reviewCount: 780,
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent('弄宅咖啡 台北市中山區松江路150巷18-1號'),
    
    socketLevel: 'moderate',
    socketDescription: '一般木桌席位與吧檯備有插座，榻榻米區無插座，需要插座建議選一般座席',
    outletTypes: ['110V 三孔插座', '壁面雙孔插頭'],
    
    wifiSpeedMbps: 190,
    wifiStability: 'ultra_fast',
    wifiDescription: '190 Mbps 穩定 Wi-Fi，上傳下載均勻，視訊與文書皆順暢',
    pingMs: 8,
    
    lightingLevel: 4,
    lightingLabel: '老宅天井玻璃天窗 (4/5)',
    lightingDescription: '屋頂特別開設玻璃採光天窗，自然光柔和穿透木格柵灑落，光影極美',
    
    interiorStyle: {
      category: 'wabi_sabi',
      name: '京都町家木造禪意風',
      description: '百年木造平房、日式榻榻米座席、手工木門、茶具器物與親人貓咪',
      atmosphereTags: ['百年老平房', '京都町家風情', '天井玻璃天窗', '親人店貓'],
    },
    
    timeLimit: {
      type: 'weekdays_unlimited',
      label: '平日不限時 / 假日限時2小時',
      description: '週二至週五平日不限時；週六日若客滿限時 2 小時，低消一杯飲品',
    },
    
    drinkPricing: {
      minPrice: 150,
      maxPrice: 220,
      averagePrice: 175,
      minConsumption: '一人低消一杯飲品',
      sampleMenu: [
        { name: '弄宅配方 美式咖啡', price: 150, category: 'coffee' },
        { name: '小農鮮奶濃縮拿鐵', price: 170, category: 'coffee' },
        { name: '京都宇治煎茶 (可回沖)', price: 170, category: 'tea' },
        { name: '莊園手沖單品咖啡', price: 190, category: 'coffee' },
        { name: '京都風提拉米蘇', price: 150, category: 'dessert' },
      ],
    },
    
    operatingHours: {
      0: { open: '12:00', close: '19:00' }, // Sun
      1: { open: '12:00', close: '19:00', isClosed: true }, // Mon: 公休
      2: { open: '12:00', close: '19:00' }, // Tue
      3: { open: '12:00', close: '19:00' }, // Wed
      4: { open: '12:00', close: '19:00' }, // Thu
      5: { open: '12:00', close: '19:00' }, // Fri
      6: { open: '12:00', close: '19:00' }, // Sat
    },
    
    noiseLevel: 'library_quiet',
    noiseDescription: '入內需脫鞋，店內氣氛極為清幽沉靜，彷彿置身京都小巷，專注力十足',
    seatDescription: '實木長桌木椅，桌面平整，亦有日式榻榻米放鬆閱讀區',
    amenities: ['預約優先制可線上訂位', '日式茶道與手沖咖啡', '親人安靜店貓陪伴', '乾淨木質洗手間'],
    bestSuitedFor: ['午後心流專注工作', '沉靜寫作與企劃', '輕量筆電文書', '日式禪意放鬆體驗'],
  },
];
