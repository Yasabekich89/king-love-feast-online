
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
    
    // Instagram section
    'instagram.title': 'Follow Our Royal Journey',
    'instagram.subtitle': 'Latest from @kingslovemeat',
    
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
    
    // Footer
    'footer.address': '15 Royal Avenue, Yerevan, Armenia',
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
    
    // Instagram section
    'instagram.title': 'Հետևեք մեր թագավորական ճանապարհին',
    'instagram.subtitle': 'Վերջինները @kingslovemeat-ից',
    
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
    
    // Footer
    'footer.address': 'Թագավորական պողոտա 15, Երևան, Հայաստան',
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
    
    // Instagram section
    'instagram.title': 'Следите за нашим королевским путешествием',
    'instagram.subtitle': 'Последние новости от @kingslovemeat',
    
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
    
    // Footer
    'footer.address': 'Королевский проспект 15, Ереван, Армения',
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
