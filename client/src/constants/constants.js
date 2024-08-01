export const BASE_URL = 'http://localhost:3000';

export const headerNavbarLinks = [
  {
    link: '/',
    name: 'Головна'
  },
  {
    link: '/about',
    name: 'Про компанію'
  },
  {
    link: '/sale',
    name: 'Знижки'
  },
  {
    link: '/novelty',
    name: 'Новинки'
  },
  {
    link: '/delivery-info',
    name: 'Умови оплати та доставки'
  }
];

export const foterNavLinks = [
  {
    link: '/about',
    name: 'Про компанію'
  },
  {
    link: '/contacts',
    name: 'Контакти'
  },
  {
    link: '/delivery-info',
    name: 'Умови оплати та доставки'
  }
];

export const messengers = url => [
  {
    icon: 'whatsapp',
    link: `https://api.whatsapp.com/send?text=${encodeURIComponent(url)}`
  },
  {
    icon: 'telegram',
    link: `https://t.me/share/url?url=${encodeURIComponent(url)}`
  },
  {
    icon: 'facebook',
    link: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      url
    )}`
  },
  {
    icon: 'gmail',
    link: `https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=&su=Your%20Subject&body=${encodeURIComponent(
      url
    )}&ui=2&tf=1&pli=1`
  },
  {
    icon: 'skype',
    link: `https://web.skype.com/share?url=${encodeURIComponent(url)}`
  },
  {
    icon: 'twitter',
    link: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      url
    )}&text=Check%20this%20out!`
  }
];

export const PLACEHOLDER_LABELS = {
  SEARCH_PLACEHOLDER: 'Я шукаю ...'
};

export const BUTTON_LABELS = {
  BUTTON_SEARCH: 'Знайти',
  BUTTON_CATALOG: 'Каталог товарів',
  BUTTON_LOGOUT: 'Logout',
  BUTTON_REGISTRATION: 'Registration',
  BUTTON_LOGIN: 'Login'
};

export const svgOption = {
  DEFAULT_SIZE: 25,
  DEFAULT_COLOR: '#ffffff'
};
