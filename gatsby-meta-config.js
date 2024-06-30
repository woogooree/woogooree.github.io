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
        date: '2023.01',
        activity: '웹개발 공부 시작 (HTML&CSS)',
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
        date: '2024.01 - 2024.02',
        activity: 'JAVA & JSP 기초 공부',
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
        title: '2023 스파르타코딩클럽 비개발자 웹개발 종합반',
        description:
          '2023.01 - 2023.02 웹개발의 기초부터 자바스크립트, DB연동, 서버개발, AWS까지 폭넓고 빠르게 배울 수 있었던 교육과정 수료',
        techStack: ['HTML', 'CSS', 'Javascript', 'mongoDB', 'Flask', 'AWS'],
        thumbnailUrl: 'sparta.png',
        links: {
          post: '',
          github: '',
          demo: '',
        },
      },
      // ========================================================
      // ========================================================
      {
        title: '2023 GNU-VMU 글로벌캡스톤디자인 팀프로젝트',
        description:
          '2022.09 - 2023.07 글로벌캡스톤디자인 탄소중립 화장품개발 프로젝트(1위)로 베트남 현지기업 탐방경험 및 영어 프레젠테이션 경험',
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
        title: '2024 ICT멘토링 한이음공모전 팀프로젝트',
        description:
          '2024.03 - 2024.11 전력관리 플랫폼 KEPSI 라는 주제로 참여하여 시리얼통신과 전력데이터 파싱과 API연동을 메인으로 서버와 앱까지 구현하는 프로젝트',
        techStack: ['flutter', 'Firebase', 'Embedded'],
        thumbnailUrl: 'kepsi.png',
        links: {
          post: '/projectK_01',
          github: 'https://github.com/woogooree/KEPSI',
          demo: '',
        },
      },
      // ========================================================
      // ========================================================
      {
        title: 'WPF TCP통신 채팅프로그램 개인프로젝트',
        description:
          '2024.06 비주얼스튜디오 환경에서 WPF로 MVVM 패턴을 적용하고, Xaml 디자인을 구현하고, TCP를 사용하는 채팅앱을 서버-클라이언트 구조로 개발한 개인프로젝트',
        techStack: ['WPF', 'Firebase', 'datNet'],
        thumbnailUrl: 'TCPchat.png',
        links: {
          post: '/projectT_01',
          github: 'https://github.com/woogooree/WpfChat',
          demo: '',
        },
      },
    ],
  },
};
