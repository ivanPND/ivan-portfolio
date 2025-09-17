export const projects = [
  {
    id: 'behavioural-modelling-toolkit',
    title: 'Behavioural Modelling Toolkit',
    summary: 'A web app that simulates behavioural decision-making using probabilistic models. Built with Python and Django.',
    tech: ['Python', 'Django', 'NumPy', 'SciPy', 'Matplotlib', 'HTML', 'CSS', 'JavaScript'],
    github: 'https://github.com/ivanPND/fyp',
    images: [
      {
        src: '/assets/images/fyp1.JPG',
        alt: "Behavioural Modelling Toolkit's main menu",
      },
      {
        src: '/assets/images/fyp2.JPG',
        alt: 'Drift Diffusion Model',
      },
      {
        src: '/assets/images/fyp3.JPG',
        alt: "Kalman Filter's matrix inputs",
      },
      {
        src: '/assets/images/fyp4.JPG',
        alt: "DDM's histogram plot",
      },
    ],
  },
  {
    id: 'payment-app',
    title: 'Payment App',
    summary: 'A peer-to-peer payment platform with currency conversion and admin tools. Built with Python and Django.',
    tech: ['Python', 'Django', 'Bootstrap', 'Django REST Framework', 'SQLite', 'HTML', 'CSS'],
    github: 'https://github.com/ivanPND/webapps2025',
    images: [
      {
        src: '/assets/images/was24.JPG',
        alt: 'Landing page',
      },
      {
        src: '/assets/images/was25.JPG',
        alt: 'Transaction history',
      },
      {
        src: '/assets/images/um9.JPG',
        alt: 'Pending requests',
      },
      {
        src: '/assets/images/was27.JPG',
        alt: 'Admin dashboard',
      },
    ],
  },
  {
    id: 'secure-password-manager',
    title: 'Secure Password Manager',
    summary:
      'A secure password manager with encrypted local storage, user authentication, and a desktop UI. Built with C# and WinForms using AES encryption and PBKDF2 password hashing.',
    tech: ['C#', '.NET 6', 'WinForms', 'AES', 'PBKDF2', 'Newtonsoft.Json'],
    github: 'https://github.com/ivanPND/SecurePasswordVault',
    images: [
      {
        src: '/assets/images/c1.JPG',
        alt: 'Login page',
      },
      {
        src: '/assets/images/c10.JPG',
        alt: 'Hashed password and salt',
      },
      {
        src: '/assets/images/c6.JPG',
        alt: 'Empty vault',
      },
      {
        src: '/assets/images/c9.JPG',
        alt: 'View password screen',
      },
    ],
  },
  {
    id: 'quickcom',
    title: 'QuickCom',
    summary:
      'A secure command line messaging system with encrypted communication, offline message queueing, and local user authentication. Built in modern C++ with networking powered by Boost.Asio.',
    tech: ['C++20', 'Boost.Asio', 'SQLite', 'OpenSSL', 'Windows Sockets', 'CMake'],
    github: 'https://github.com/ivanPND/QuickCom',
    images: [
      {
        src: '/assets/images/ss1.JPG',
        alt: 'QuickCom main terminal',
      },
      {
        src: '/assets/images/ss2.JPG',
        alt: 'Inbox view',
      },
      {
        src: '/assets/images/ss3.JPG',
        alt: 'Encrypted message in database',
      },
      {
        src: '/assets/images/ss4.JPG',
        alt: 'Message queueing and SQLite storage',
      },
    ],
  },
];
