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
      description: ['기록을 좋아하는', '적극적으로 일하는', '성장하고 있는'],
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
        date: '2024.05',
        activity: '개인 블로그 운영 시작',
      },
      // ========================================================
      // ========================================================
      {
        date: '2024.06',
        activity: '정보처리기사 취득',
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
        title: '2024 ICT멘토링 한이음공모전',
        description:
          '2024.03 ~ 2024.11 전력관리 플랫폼 KEPSI 프로젝트',
        techStack: ['flutter', 'Firebase', 'Embedded'],
        thumbnailUrl: '',
        links: {
          post: '',
          github: '',
          demo: '',
        },
      },
    ],
  },
};
