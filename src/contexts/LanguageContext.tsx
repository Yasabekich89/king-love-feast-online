
import React, { createContext, useState, useContext, ReactNode } from 'react';

type Language = 'en' | 'am' | 'ru';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.menu': 'Menu',
    'nav.reservations': 'Reservations',
    'nav.about': 'About Us',
    'nav.contact': 'Contact',
    
    // Hero section
    'hero.title': 'Royal Flavors',
    'hero.subtitle': 'Premium Meats Fit For Kings',
    'hero.cta': 'Reserve a Table',
    
    // Menu section
    'menu.title': 'Our Royal Selection',
    'menu.subtitle': 'Crafted with passion and expertise',
    'menu.viewAll': 'View Full Menu',
    'menu.discover': 'Discover Our Menu',
    'menu.sortBy': 'Sort by',
    'menu.sortPopular': 'Most Popular',
    'menu.sortSpicyHigh': 'Spiciest First',
    'menu.sortSpicyLow': 'Mildest First',
    'menu.categories': 'Categories',
    'menu.meatTypes': 'Meat Types',
    'menu.spiceLevel': 'Spice Level',
    'menu.clearFilters': 'Clear Filters',
    'menu.filters': 'Filters',
    'menu.filterOptions': 'Filter Options',
    'menu.all': 'All Items',
    'menu.noResults': 'No items match your filters',
    'menu.popular': 'Popular',
    'menu.moreInfo': 'More Info',
    
    // Menu categories
    'menu.category.steaks': 'Steaks',
    'menu.category.burgers': 'Burgers',
    'menu.category.specialties': 'Specialties',
    'menu.category.poultry': 'Poultry',
    'menu.category.platters': 'Platters',
    'menu.category.sides': 'Sides',
    
    // Meat types
    'menu.meatType.beef': 'Beef',
    'menu.meatType.lamb': 'Lamb',
    'menu.meatType.chicken': 'Chicken',
    'menu.meatType.pork': 'Pork',
    'menu.meatType.vegetarian': 'Vegetarian',
    
    // Menu items
    'menu.kingRibeye.title': 'King\'s Ribeye',
    'menu.kingRibeye.description': 'Prime cut ribeye steak, perfectly marbled and grilled to your preference',
    'menu.kingRibeye.price': '$45',
    
    'menu.crownBurger.title': 'Crown Burger',
    'menu.crownBurger.description': 'Half-pound Angus beef patty with gold-leaf cheese, truffle aioli, and royal garnishes',
    'menu.crownBurger.price': '$28',
    
    'menu.royalRack.title': 'Royal Rack of Lamb',
    'menu.royalRack.description': 'Premium lamb rack crusted with herbs and roasted to perfection',
    'menu.royalRack.price': '$52',
    
    'menu.kinglyTbone.title': 'Kingly T-Bone',
    'menu.kinglyTbone.description': 'Generous T-bone steak combining tenderloin and strip steak, aged 28 days',
    'menu.kinglyTbone.price': '$56',
    
    'menu.queenlyChicken.title': 'Queenly Chicken',
    'menu.queenlyChicken.description': 'Free-range chicken breast, pan-seared with herbs and served with a white wine sauce',
    'menu.queenlyChicken.price': '$34',
    
    'menu.royalBbq.title': 'Royal BBQ Platter',
    'menu.royalBbq.description': 'Selection of premium meats slow-smoked and glazed with our signature royal BBQ sauce',
    'menu.royalBbq.price': '$65',
    
    'menu.truffleFries.title': 'Truffle Fries',
    'menu.truffleFries.description': 'Golden crisp fries tossed with truffle oil, parmesan and fresh herbs',
    'menu.truffleFries.price': '$12',
    
    'menu.mashedPotatoes.title': 'Loaded Mashed Potatoes',
    'menu.mashedPotatoes.description': 'Creamy mashed potatoes with butter, chives, bacon bits, and melted cheese',
    'menu.mashedPotatoes.price': '$10',
    
    // Instagram section
    'instagram.title': 'Follow Our Royal Journey',
    'instagram.subtitle': 'Latest from @kingslovemeat',
    'instagram.followUs': 'Follow us on Instagram',
    
    // About section
    'about.title': 'Our Royal Heritage',
    'about.content': 'Kings Love Meat was born from a passion for exceptional quality meats and the art of perfect preparation. Our master chefs combine traditional techniques with innovative flavors to create a dining experience worthy of royalty.',
    'about.more': 'Read More',
    
    // Reservation section
    'reservation.title': 'Reserve Your Royal Table',
    'reservation.name': 'Full Name',
    'reservation.date': 'Date',
    'reservation.time': 'Time',
    'reservation.guests': 'Number of Guests',
    'reservation.phone': 'Phone Number',
    'reservation.special': 'Special Requests',
    'reservation.submit': 'Confirm Reservation',
    'reservation.success': 'Your reservation has been sent. We will confirm shortly.',
    
    // Contact page
    'contact.title': 'Contact Us',
    'contact.subtitle': 'We would be delighted to hear from you',
    'contact.infoTitle': 'Contact Information',
    'contact.phone': 'Phone & WhatsApp',
    'contact.phoneDesc': 'Call us directly or message us on WhatsApp',
    'contact.address': 'Our Address',
    'contact.findUs': 'Visit us for an exceptional dining experience',
    'contact.hours': 'Opening Hours',
    'contact.hoursDetails': 'Monday - Sunday: 12:00PM - 11:00PM',
    'contact.socialTitle': 'Connect With Us',
    'contact.socialFollow': 'Follow us on social media for exclusive updates and offers',
    'contact.findUsMap': 'Find Us On The Map',
    
    // Footer
    'footer.address': '38 Tumanyan St, Yerevan, Armenia',
    'footer.hours': 'Open: Mon-Sun 12:00PM - 11:00PM',
    'footer.rights': 'All Rights Reserved',
  },
  
  am: {
    // Navigation
    'nav.home': 'Գլխավոր',
    'nav.menu': 'Մենյու',
    'nav.reservations': 'Ամրագրումներ',
    'nav.about': 'Մեր մասին',
    'nav.contact': 'Կապ',
    
    // Hero section
    'hero.title': 'Թագավորական համեր',
    'hero.subtitle': 'Բարձրակարգ միս արժանի թագավորների համար',
    'hero.cta': 'Ամրագրել սեղան',
    
    // Menu section
    'menu.title': 'Մեր թագավորական ընտրանին',
    'menu.subtitle': 'Պատրաստված կրքով և փորձով',
    'menu.viewAll': 'Դիտել ամբողջ մենյուն',
    'menu.discover': 'Բացահայտեք մեր մենյուն',
    'menu.sortBy': 'Տեսակավորել',
    'menu.sortPopular': 'Ամենահայտնի',
    'menu.sortSpicyHigh': 'Ամենաթեժ',
    'menu.sortSpicyLow': 'Ամենամեղմ',
    'menu.categories': 'Կատեգորիաներ',
    'menu.meatTypes': 'Մսի տեսակներ',
    'menu.spiceLevel': 'Թեժության աստիճան',
    'menu.clearFilters': 'Մաքրել ֆիլտրերը',
    'menu.filters': 'Ֆիլտրեր',
    'menu.filterOptions': 'Ֆիլտրի ընտրանքներ',
    'menu.all': 'Բոլոր տեսակները',
    'menu.noResults': 'Արդյունքներ չկան',
    'menu.popular': 'Հայտնի',
    'menu.moreInfo': 'Ավելին',
    
    // Menu categories
    'menu.category.steaks': 'Սթեյքեր',
    'menu.category.burgers': 'Բուրգերներ',
    'menu.category.specialties': 'Հատուկ առաջարկներ',
    'menu.category.poultry': 'Թռչնամիս',
    'menu.category.platters': 'Սպասքեր',
    'menu.category.sides': 'Հավելումներ',
    
    // Meat types
    'menu.meatType.beef': 'Տավարի միս',
    'menu.meatType.lamb': 'Գառան միս',
    'menu.meatType.chicken': 'Հավի միս',
    'menu.meatType.pork': 'Խոզի միս',
    'menu.meatType.vegetarian': 'Բուսական',
    
    // Menu items
    'menu.kingRibeye.title': 'Թագավորական Ռիբայ',
    'menu.kingRibeye.description': 'Առաջնակարգ կտրված ռիբայ սթեյք, կատարյալ մարմանդ և խորոված ըստ ձեր նախասիրության',
    'menu.kingRibeye.price': '18000֏',
    
    'menu.crownBurger.title': 'Թագի Բուրգեր',
    'menu.crownBurger.description': 'Կես ֆունտ Անգուսի տավարի կոտլետ ոսկե-տերև պանրով, տրյուֆելի այոլիով և թագավորական զարդարանքներով',
    'menu.crownBurger.price': '11000֏',
    
    'menu.royalRack.title': 'Թագավորական գառան կողեր',
    'menu.royalRack.description': 'Բարձրակարգ գառան կողեր խոտաբույսերով և կատարելապես խորոված',
    'menu.royalRack.price': '21000֏',
    
    'menu.kinglyTbone.title': 'Թագավորական T-ոսկոր',
    'menu.kinglyTbone.description': 'Առատ T-ոսկոր սթեյք՝ միացնելով սրտալարը և շերտավոր սթեյքը, 28 օր հնեցված',
    'menu.kinglyTbone.price': '22000֏',
    
    'menu.queenlyChicken.title': 'Թագուհու հավ',
    'menu.queenlyChicken.description': 'Ազատ տարածքում աճեցված հավի կրծքամիս, տապակած խոտաբույսերով և մատուցված սպիտակ գինու սոուսով',
    'menu.queenlyChicken.price': '14000֏',
    
    'menu.royalBbq.title': 'Թագավորական խորովածի ափսե',
    'menu.royalBbq.description': 'Բարձրակարգ մսերի ընտրանի՝ դանդաղ ապխտած և մեր հատուկ թագավորական բարբիքյու սոուսով',
    'menu.royalBbq.price': '26000֏',
    
    'menu.truffleFries.title': 'Տրյուֆելի ֆրի',
    'menu.truffleFries.description': 'Ոսկեգույն խրթխրթան կարտոֆիլ ֆրի՝ տրյուֆելի յուղով, պարմեզանով և թարմ խոտաբույսերով',
    'menu.truffleFries.price': '4800֏',
    
    'menu.mashedPotatoes.title': 'Հարուստ պյուրե',
    'menu.mashedPotatoes.description': 'Կրեմային կարտոֆիլի պյուրե՝ կարագով, սոխաածուկով, բեկոնի կտորներով և հալված պանրով',
    'menu.mashedPotatoes.price': '4000֏',
    
    // Instagram section
    'instagram.title': 'Հետևեք մեր թագավորական ճանապարհին',
    'instagram.subtitle': 'Վերջինները @kingslovemeat-ից',
    'instagram.followUs': 'Հետևեք մեզ Instagram-ում',
    
    // About section
    'about.title': 'Մեր թագավորական ժառանգությունը',
    'about.content': 'Kings Love Meat-ը ծնվել է բացառիկ որակի մսի և կատարյալ պատրաստման արվեստի կրքից: Մեր գլխավոր խոհարարները համադրում են ավանդական տեխնիկաները նորարարական համեմունքների հետ՝ ստեղծելով սննդի փորձառություն, որն արժանի է թագավորության:',
    'about.more': 'Կարդալ ավելին',
    
    // Reservation section
    'reservation.title': 'Ամրագրեք ձեր թագավորական սեղանը',
    'reservation.name': 'Անուն Ազգանուն',
    'reservation.date': 'Ամսաթիվ',
    'reservation.time': 'Ժամ',
    'reservation.guests': 'Հյուրերի քանակ',
    'reservation.phone': 'Հեռախոսահամար',
    'reservation.special': 'Հատուկ պահանջներ',
    'reservation.submit': 'Հաստատել ամրագրումը',
    'reservation.success': 'Ձեր ամրագրումն ուղարկվել է: Մենք շուտով կհաստատենք:',
    
    // Contact page
    'contact.title': 'Կապվեք մեզ հետ',
    'contact.subtitle': 'Մենք ուրախ կլինենք լսել ձեզանից',
    'contact.infoTitle': 'Կոնտակտային տվյալներ',
    'contact.phone': 'Հեռախոս և WhatsApp',
    'contact.phoneDesc': 'Զանգահարեք մեզ կամ գրեք WhatsApp-ով',
    'contact.address': 'Մեր հասցեն',
    'contact.findUs': 'Այցելեք մեզ բացառիկ ճաշակման փորձառության համար',
    'contact.hours': 'Աշխատանքային ժամեր',
    'contact.hoursDetails': 'Երկուշաբթի - Կիրակի: 12:00 - 23:00',
    'contact.socialTitle': 'Կապվեք մեզ հետ',
    'contact.socialFollow': 'Հետևեք մեզ սոցիալական ցանցերում բացառիկ թարմացումների և առաջարկների համար',
    'contact.findUsMap': 'Գտեք մեզ քարտեզի վրա',
    
    // Footer
    'footer.address': 'Թումանյան փող. 38, Երևան, Հայաստան',
    'footer.hours': 'Բաց է՝ Երկ-Կիր 12:00 - 23:00',
    'footer.rights': 'Բոլոր իրավունքները պաշտպանված են',
  },
  
  ru: {
    // Navigation
    'nav.home': 'Главная',
    'nav.menu': 'Меню',
    'nav.reservations': 'Бронирование',
    'nav.about': 'О нас',
    'nav.contact': 'Контакты',
    
    // Hero section
    'hero.title': 'Королевские вкусы',
    'hero.subtitle': 'Премиальное мясо, достойное королей',
    'hero.cta': 'Забронировать стол',
    
    // Menu section
    'menu.title': 'Наша королевская коллекция',
    'menu.subtitle': 'Создано со страстью и мастерством',
    'menu.viewAll': 'Посмотреть все меню',
    'menu.discover': 'Откройте для себя наше меню',
    'menu.sortBy': 'Сортировать по',
    'menu.sortPopular': 'Самые популярные',
    'menu.sortSpicyHigh': 'Самые острые',
    'menu.sortSpicyLow': 'Самые мягкие',
    'menu.categories': 'Категории',
    'menu.meatTypes': 'Виды мяса',
    'menu.spiceLevel': 'Уровень остроты',
    'menu.clearFilters': 'Очистить фильтры',
    'menu.filters': 'Фильтры',
    'menu.filterOptions': 'Варианты фильтра',
    'menu.all': 'Все блюда',
    'menu.noResults': 'Ничего не найдено',
    'menu.popular': 'Популярное',
    'menu.moreInfo': 'Подробнее',
    
    // Menu categories
    'menu.category.steaks': 'Стейки',
    'menu.category.burgers': 'Бургеры',
    'menu.category.specialties': 'Фирменные блюда',
    'menu.category.poultry': 'Птица',
    'menu.category.platters': 'Ассорти',
    'menu.category.sides': 'Гарниры',
    
    // Meat types
    'menu.meatType.beef': 'Говядина',
    'menu.meatType.lamb': 'Ягнятина',
    'menu.meatType.chicken': 'Курица',
    'menu.meatType.pork': 'Свинина',
    'menu.meatType.vegetarian': 'Вегетарианское',
    
    // Menu items
    'menu.kingRibeye.title': 'Королевский Рибай',
    'menu.kingRibeye.description': 'Первоклассный стейк рибай, идеально мраморный и приготовленный по вашему вкусу',
    'menu.kingRibeye.price': '4500₽',
    
    'menu.crownBurger.title': 'Коронный Бургер',
    'menu.crownBurger.description': 'Полфунта говядины Ангус с сыром в золотой фольге, трюфельным айоли и королевскими гарнирами',
    'menu.crownBurger.price': '2800₽',
    
    'menu.royalRack.title': 'Королевская стойка ягненка',
    'menu.royalRack.description': 'Премиальная стойка ягненка, покрытая травами и идеально обжаренная',
    'menu.royalRack.price': '5200₽',
    
    'menu.kinglyTbone.title': 'Королевский Тибон',
    'menu.kinglyTbone.description': 'Щедрый стейк на Т-образной кости, сочетающий вырезку и стриплойн, выдержанный 28 дней',
    'menu.kinglyTbone.price': '5600₽',
    
    'menu.queenlyChicken.title': 'Куриное блюдо Королевы',
    'menu.queenlyChicken.description': 'Куриная грудка свободного выгула, обжаренная с травами и подаваемая с соусом из белого вина',
    'menu.queenlyChicken.price': '3400₽',
    
    'menu.royalBbq.title': 'Королевское ассорти барбекю',
    'menu.royalBbq.description': 'Подборка премиальных мясных блюд, медленно копченых и глазированных нашим фирменным королевским соусом барбекю',
    'menu.royalBbq.price': '6500₽',
    
    'menu.truffleFries.title': 'Картофель фри с трюфелем',
    'menu.truffleFries.description': 'Золотистый хрустящий картофель фри с трюфельным маслом, пармезаном и свежими травами',
    'menu.truffleFries.price': '1200₽',
    
    'menu.mashedPotatoes.title': 'Богатое картофельное пюре',
    'menu.mashedPotatoes.description': 'Сливочное картофельное пюре с маслом, зеленым луком, беконом и плавленым сыром',
    'menu.mashedPotatoes.price': '1000₽',
    
    // Instagram section
    'instagram.title': 'Следите за нашим королевским путешествием',
    'instagram.subtitle': 'Последние новости от @kingslovemeat',
    'instagram.followUs': 'Подписывайтесь на наш Instagram',
    
    // About section
    'about.title': 'Наше королевское наследие',
    'about.content': 'Kings Love Meat родился из страсти к исключительно качественному мясу и искусству идеального приготовления. Наши шеф-повара сочетают традиционные техники с инновационными вкусами, создавая гастрономический опыт, достойный королевской особы.',
    'about.more': 'Читать далее',
    
    // Reservation section
    'reservation.title': 'Забронируйте ваш королевский стол',
    'reservation.name': 'Полное имя',
    'reservation.date': 'Дата',
    'reservation.time': 'Время',
    'reservation.guests': 'Количество гостей',
    'reservation.phone': 'Номер телефона',
    'reservation.special': 'Особые пожелания',
    'reservation.submit': 'Подтвердить бронирование',
    'reservation.success': 'Ваше бронирование отправлено. Мы скоро подтвердим.',
    
    // Contact page
    'contact.title': 'Свяжитесь с нами',
    'contact.subtitle': 'Мы будем рады услышать вас',
    'contact.infoTitle': 'Контактная информация',
    'contact.phone': 'Телефон и WhatsApp',
    'contact.phoneDesc': 'Позвоните нам или напишите в WhatsApp',
    'contact.address': 'Наш адрес',
    'contact.findUs': 'Посетите нас для исключительного гастрономического опыта',
    'contact.hours': 'Часы работы',
    'contact.hoursDetails': 'Понедельник - Воскресенье: 12:00 - 23:00',
    'contact.socialTitle': 'Присоединяйтесь к нам',
    'contact.socialFollow': 'Подписывайтесь на наши социальные сети для эксклюзивных обновлений и предложений',
    'contact.findUsMap': 'Найдите нас на карте',
    
    // Footer
    'footer.address': 'ул. Туманяна 38, Ереван, Армения',
    'footer.hours': 'Открыто: Пн-Вс 12:00 - 23:00',
    'footer.rights': 'Все права защищены',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
