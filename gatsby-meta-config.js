module.exports = {
  title: `woogooree`,
  description: `우구리 블로그`,
  language: `ko`, // `ko`, `en` => currently support versions for Korean and English
  siteUrl: `https://woogooree.github.io`,
  ogImage: `/og-image.png`, // Path to your in the 'static' folder
  comments: {
    utterances: {
      repo: ``, // `zoomkoding/zoomkoding-gatsby-blog`,
    },
  },
  ga: '0', // Google Analytics Tracking ID
  author: {
    name: `심우진`,
    bio: {
      role: `개발자`,
      description: ['자신감을 추구하는', '새로운 것에 도전하는', '외국어도 잘하고 싶은'],
      thumbnail: 'nuguri.png', // Path to the image in the 'asset' folder
    },
    social: {
      github: `https://github.com/woogooree`, // `https://github.com/zoomKoding`,
      linkedIn: ``, // `https://www.linkedin.com/in/jinhyeok-jeong-800871192`,
      email: `woogooree@gmail.com`, // `zoomkoding@gmail.com`,
    },
  },

  // metadata for About Page
  about: {
    timestamps: [
      // =====       [Timestamp Sample and Structure]      =====
      // ===== 🚫 Don't erase this sample (여기 지우지 마세요!) =====
      {
        date: '',
        activity: '',
        links: {
          github: '',
          post: '',
          googlePlay: '',
          appStore: '',
          demo: '',
        },
      },
      // ========================================================
      // ========================================================
      {
        date: '2023.08',
        activity: '경상대학교 졸업 (농학사)',
      },
      // ========================================================
      // ========================================================
      {
        date: '2024.01',
        activity: '개발 공부 시작 (JAVA & JSP 기초)',
      },
      // ========================================================
      // ========================================================
      {
        date: '2024.03 - 2025.02',
        activity: '한국폴리텍대학 하이테크 과정 (AI소프트웨어)',
      },
      // ========================================================
      // ========================================================
      {
        date: '2024.05',
        activity: '개발 블로그 & 깃허브 리뉴얼 (C, C++, C#)',
      },
      // ========================================================
      // ========================================================
      {
        date: '2024.06',
        activity: '정보처리기사 취득',
        links: {
          github: '',
          post: '/certificate_main',
          googlePlay: '',
          appStore: '',
          demo: '',
        },
      },
    ],

    projects: [
      // =====        [Project Sample and Structure]        =====
      // ===== 🚫 Don't erase this sample (여기 지우지 마세요!)  =====
      {
        title: '',
        description: '',
        techStack: ['', ''],
        thumbnailUrl: '',
        links: {
          post: '',
          github: '',
          googlePlay: '',
          appStore: '',
          demo: '',
        },
      },
      // ========================================================
      // ========================================================
      {
        title: '2023 GNU-VMU 글로벌 캡스톤디자인 프로그램',
        description:
          '2022.09 - 2023.07 글로벌 캡스톤디자인 탄소중립 화장품개발 프로젝트(1위)로 베트남 현지기업 탐방',
        techStack: ['presentation'],
        thumbnailUrl: 'capstone.png',
        links: {
          post: '/projectC_01',
          github: '',
          demo: 'https://www.gnu.ac.kr/linc/na/ntt/selectNttInfo.do?mi=11803&bbsId=4085&nttSn=2192268',
        },
      },
      // ========================================================
      // ========================================================
      {
        title: '2024 ICT멘토링 한이음공모전',
        description:
          '2024.03 - 2024.11 전력관리 플랫폼 KEPSI 프로젝트',
        techStack: ['flutter', 'Firebase', 'Embedded'],
        thumbnailUrl: 'KEPSI.png',
        links: {
          post: '/projectK_01',
          github: 'https://github.com/woogooree/KEPSI',
          demo: '',
        },
      },
    ],
  },
};
