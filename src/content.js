export const ui = {
  "zh-Hans": { label: "简中", short: "简", code: "ZH" },
  "zh-Hant": { label: "繁中", short: "繁", code: "TC" },
  en: { label: "English", short: "EN", code: "EN" },
  ja: { label: "日本語", short: "JA", code: "JP" },
};

export const ORDER = ["zh-Hans", "zh-Hant", "en", "ja"];

export const langs = {
  "zh-Hans": {
    "nav": [
      {
        "id": "work",
        "label": "项目"
      },
      {
        "id": "stack",
        "label": "技术"
      },
      {
        "id": "path",
        "label": "经历"
      },
      {
        "id": "life",
        "label": "生活"
      },
      {
        "id": "contact",
        "label": "联系"
      }
    ],
    "hero": {
      "role": "Seimo · 全栈开发者",
      "lines": [
        "从内核开发",
        "到产品设计"
      ],
      "sub": "做 AI Agent 和开源项目，也折腾系统与硬件",
      "cta": "看看项目",
      "contact": "联系我",
      "imageAlt": "Seimo 的白帽红眼镜 OC"
    },
    "intro": {
      "eyebrow": "关于我",
      "quote": "Seimo，全栈开发者，大四在读。做 AI Agent、开源项目和系统移植。",
      "facts": [
        {
          "k": "坐标",
          "v": "中国 · UTC+8"
        },
        {
          "k": "状态",
          "v": "大四在读"
        },
        {
          "k": "方向",
          "v": "设计 / 开发 / 产品"
        },
        {
          "k": "呼号",
          "v": "BI6PCR"
        }
      ]
    },
    "work": {
      "title": "工作与项目",
      "body": "在一家 AI Agent 公司，负责产品设计、全栈开发和上线运维。",
      "body2": "业余时间做系统移植和开源项目。",
      "tags": [
        "TypeScript",
        "Go",
        "Python",
        "PostgreSQL",
        "Docker"
      ],
      "cardLabel": "开源项目",
      "repositories": {
        "empty": "暂无项目",
        "previous": "上一个项目",
        "next": "下一个项目",
        "pause": "暂停轮播",
        "play": "播放轮播",
        "noDescription": "暂无简介",
        "viewRepository": "在 GitHub 查看",
        "updated": "最近推送",
        "stars": "星标"
      },
      "imageAlt": "Seimo 的 OC 坐着使用笔记本电脑"
    },
    "stack": {
      "title": "技术与工具",
      "layers": [
        {
          "no": "01",
          "name": "内核与驱动",
          "items": [
            "XNU / Darwin",
            "Linux Kernel",
            "Device Tree",
            "IRQ & DMA",
            "Block / VFS"
          ]
        },
        {
          "no": "02",
          "name": "系统与设备",
          "items": [
            "AOSP Device Tree",
            "Ubuntu BSP",
            "Embedded FW",
            "ESP32 / RISC-V"
          ]
        },
        {
          "no": "03",
          "name": "应用与前端",
          "items": [
            "React / TypeScript",
            "Android Native",
            "Desktop",
            "Cross-platform"
          ]
        },
        {
          "no": "04",
          "name": "产品与运维",
          "items": [
            "Product Design",
            "Docker / Deploy",
            "SQLite",
            "Observability"
          ]
        }
      ],
      "langsTitle": "常用语言",
      "langsList": [
        "C / C++",
        "Rust",
        "Go",
        "Python",
        "TypeScript",
        "Kotlin / Java",
        "C#",
        "Shell"
      ]
    },
    "path": {
      "title": "从刷机开始",
      "entries": [
        {
          "year": "2018 — 2019",
          "title": "Android ROM",
          "body": "从 Redmi 6 Pro 开始，做 ROM 移植、类原生与定制刷机包，在酷安发布。",
          "meta": [
            "Redmi 6 Pro",
            "酷安"
          ]
        },
        {
          "year": "2019 — 2023",
          "title": "资源分享站",
          "body": "基于 Flarum 和 Cloudreve 搭建资源分享站与网盘，2023 年因备考关闭。",
          "meta": [
            "最高日 PV 100 万",
            "累计用户 1 万+"
          ]
        },
        {
          "year": "现在",
          "title": "AI Agent 与开源开发",
          "body": "从产品设计到开发、部署和运维，继续做完整的产品。",
          "meta": [
            "AI Agent",
            "开源项目",
            "系统移植"
          ]
        }
      ]
    },
    "method": {
      "title": "做事方式",
      "steps": [
        {
          "no": "01",
          "name": "发散",
          "body": "列出需求和可行的方向"
        },
        {
          "no": "02",
          "name": "梳理",
          "body": "确定范围、取舍和优先级"
        },
        {
          "no": "03",
          "name": "动手",
          "body": "借助 Agent 编写和验证代码，自己判断结果与下一步"
        }
      ]
    },
    "life": {
      "title": "技术之外",
      "cards": [
        {
          "img": "radio",
          "name": "业余无线电",
          "body": "B 类操作证，呼号 BI6PCR。中继通联，偶尔收 SSTV 图像。"
        },
        {
          "img": "desk",
          "name": "摄影与设计",
          "body": "拍照，也做一些平面设计"
        },
        {
          "img": "wave",
          "name": "语言",
          "body": "中文、英语，日语入门"
        }
      ]
    },
    "contact": {
      "title": "联系我",
      "links": [
        {
          "label": "Blog",
          "value": "blog.seimo.cn",
          "href": "https://blog.seimo.cn"
        },
        {
          "label": "GitHub",
          "value": "@SeimoDev",
          "href": "https://github.com/SeimoDev"
        },
        {
          "label": "X",
          "value": "@SeimoDev",
          "href": "https://x.com/SeimoDev"
        },
        {
          "label": "Telegram",
          "value": "@seimo_dev",
          "href": "https://t.me/seimo_dev"
        }
      ],
      "motto": "永远相信美好的事情即将发生",
      "imageAlt": "Seimo 的 OC 回头挥手"
    },
    "controls": {
      "language": "选择语言",
      "openMenu": "打开菜单",
      "closeMenu": "关闭菜单",
      "sections": "页面导航",
      "home": "Seimo 首页",
      "backToTop": "回到顶部"
    }
  },
  "zh-Hant": {
    "nav": [
      {
        "id": "work",
        "label": "專案"
      },
      {
        "id": "stack",
        "label": "技術"
      },
      {
        "id": "path",
        "label": "經歷"
      },
      {
        "id": "life",
        "label": "生活"
      },
      {
        "id": "contact",
        "label": "聯繫"
      }
    ],
    "hero": {
      "role": "Seimo · 全端開發者",
      "lines": [
        "從核心開發",
        "到產品設計"
      ],
      "sub": "做 AI Agent 和開源專案，也折騰系統與硬體",
      "cta": "看看專案",
      "contact": "聯繫我",
      "imageAlt": "Seimo 的白帽紅眼鏡 OC"
    },
    "intro": {
      "eyebrow": "關於我",
      "quote": "Seimo，全端開發者，大四在讀。做 AI Agent、開源專案和系統移植。",
      "facts": [
        {
          "k": "座標",
          "v": "中國 · UTC+8"
        },
        {
          "k": "狀態",
          "v": "大四在讀"
        },
        {
          "k": "方向",
          "v": "設計 / 開發 / 產品"
        },
        {
          "k": "呼號",
          "v": "BI6PCR"
        }
      ]
    },
    "work": {
      "title": "工作與專案",
      "body": "在一家 AI Agent 公司，負責產品設計、全端開發與上線維運。",
      "body2": "業餘時間做系統移植和開源專案。",
      "tags": [
        "TypeScript",
        "Go",
        "Python",
        "PostgreSQL",
        "Docker"
      ],
      "cardLabel": "開源專案",
      "repositories": {
        "empty": "暫無專案",
        "previous": "上一個專案",
        "next": "下一個專案",
        "pause": "暫停輪播",
        "play": "播放輪播",
        "noDescription": "暫無簡介",
        "viewRepository": "在 GitHub 查看",
        "updated": "最近推送",
        "stars": "星標"
      },
      "imageAlt": "Seimo 的 OC 坐著使用筆記型電腦"
    },
    "stack": {
      "title": "技術與工具",
      "layers": [
        {
          "no": "01",
          "name": "核心與驅動",
          "items": [
            "XNU / Darwin",
            "Linux Kernel",
            "Device Tree",
            "IRQ & DMA",
            "Block / VFS"
          ]
        },
        {
          "no": "02",
          "name": "系統與裝置",
          "items": [
            "AOSP Device Tree",
            "Ubuntu BSP",
            "Embedded FW",
            "ESP32 / RISC-V"
          ]
        },
        {
          "no": "03",
          "name": "應用與前端",
          "items": [
            "React / TypeScript",
            "Android Native",
            "Desktop",
            "Cross-platform"
          ]
        },
        {
          "no": "04",
          "name": "產品與維運",
          "items": [
            "Product Design",
            "Docker / Deploy",
            "SQLite",
            "Observability"
          ]
        }
      ],
      "langsTitle": "常用語言",
      "langsList": [
        "C / C++",
        "Rust",
        "Go",
        "Python",
        "TypeScript",
        "Kotlin / Java",
        "C#",
        "Shell"
      ]
    },
    "path": {
      "title": "從刷機開始",
      "entries": [
        {
          "year": "2018 — 2019",
          "title": "Android ROM",
          "body": "從 Redmi 6 Pro 開始，做 ROM 移植、類原生與客製化刷機包，在酷安發布。",
          "meta": [
            "Redmi 6 Pro",
            "酷安"
          ]
        },
        {
          "year": "2019 — 2023",
          "title": "資源分享站",
          "body": "以 Flarum 和 Cloudreve 搭建資源分享站與網盤，2023 年因備考關閉。",
          "meta": [
            "最高日 PV 100 萬",
            "累計使用者 1 萬+"
          ]
        },
        {
          "year": "現在",
          "title": "AI Agent 與開源開發",
          "body": "從產品設計到開發、部署與維運，繼續做完整的產品。",
          "meta": [
            "AI Agent",
            "開源專案",
            "系統移植"
          ]
        }
      ]
    },
    "method": {
      "title": "做事方式",
      "steps": [
        {
          "no": "01",
          "name": "發散",
          "body": "列出需求和可行的方向"
        },
        {
          "no": "02",
          "name": "整理",
          "body": "確定範圍、取捨和優先順序"
        },
        {
          "no": "03",
          "name": "動手",
          "body": "借助 Agent 編寫和驗證程式碼，自己判斷結果與下一步"
        }
      ]
    },
    "life": {
      "title": "技術之外",
      "cards": [
        {
          "img": "radio",
          "name": "業餘無線電",
          "body": "B 類操作證，呼號 BI6PCR。中繼通聯，偶爾收 SSTV 圖像。"
        },
        {
          "img": "desk",
          "name": "攝影與設計",
          "body": "拍照，也做一些平面設計"
        },
        {
          "img": "wave",
          "name": "語言",
          "body": "中文、英語，日語入門"
        }
      ]
    },
    "contact": {
      "title": "聯繫我",
      "links": [
        {
          "label": "Blog",
          "value": "blog.seimo.cn",
          "href": "https://blog.seimo.cn"
        },
        {
          "label": "GitHub",
          "value": "@SeimoDev",
          "href": "https://github.com/SeimoDev"
        },
        {
          "label": "X",
          "value": "@SeimoDev",
          "href": "https://x.com/SeimoDev"
        },
        {
          "label": "Telegram",
          "value": "@seimo_dev",
          "href": "https://t.me/seimo_dev"
        }
      ],
      "motto": "永遠相信美好的事情即將發生",
      "imageAlt": "Seimo 的 OC 回頭揮手"
    },
    "controls": {
      "language": "選擇語言",
      "openMenu": "開啟選單",
      "closeMenu": "關閉選單",
      "sections": "頁面導覽",
      "home": "Seimo 首頁",
      "backToTop": "回到頂部"
    }
  },
  "en": {
    "nav": [
      {
        "id": "work",
        "label": "Projects"
      },
      {
        "id": "stack",
        "label": "Tools"
      },
      {
        "id": "path",
        "label": "Timeline"
      },
      {
        "id": "life",
        "label": "Interests"
      },
      {
        "id": "contact",
        "label": "Contact"
      }
    ],
    "hero": {
      "role": "Seimo · Full-stack developer",
      "lines": [
        "From the kernel",
        "to the product"
      ],
      "sub": "AI agents, open-source tools, and systems from hardware to web",
      "cta": "See projects",
      "contact": "Get in touch",
      "imageAlt": "Seimo’s OC in a white cap and red glasses"
    },
    "intro": {
      "eyebrow": "About",
      "quote": "Seimo is a final-year undergraduate and full-stack developer working on AI agents, open-source projects and system ports.",
      "facts": [
        {
          "k": "Based",
          "v": "China · UTC+8"
        },
        {
          "k": "Status",
          "v": "Final-year undergrad"
        },
        {
          "k": "Focus",
          "v": "Design / Development / Product"
        },
        {
          "k": "Callsign",
          "v": "BI6PCR"
        }
      ]
    },
    "work": {
      "title": "Work & projects",
      "body": "At an AI agent company, I handle product design, full-stack development, deployment and operations.",
      "body2": "Outside work, I build open-source tools and port systems.",
      "tags": [
        "TypeScript",
        "Go",
        "Python",
        "PostgreSQL",
        "Docker"
      ],
      "cardLabel": "Open source",
      "repositories": {
        "empty": "No projects yet",
        "previous": "Previous project",
        "next": "Next project",
        "pause": "Pause slideshow",
        "play": "Play slideshow",
        "noDescription": "No description",
        "viewRepository": "View on GitHub",
        "updated": "Last pushed",
        "stars": "Stars"
      },
      "imageAlt": "Seimo’s OC sitting with a laptop"
    },
    "stack": {
      "title": "Tools & skills",
      "layers": [
        {
          "no": "01",
          "name": "Kernel & Drivers",
          "items": [
            "XNU / Darwin",
            "Linux Kernel",
            "Device Tree",
            "IRQ & DMA",
            "Block / VFS"
          ]
        },
        {
          "no": "02",
          "name": "Systems & Devices",
          "items": [
            "AOSP Device Tree",
            "Ubuntu BSP",
            "Embedded FW",
            "ESP32 / RISC-V"
          ]
        },
        {
          "no": "03",
          "name": "Apps & Frontend",
          "items": [
            "React / TypeScript",
            "Android Native",
            "Desktop",
            "Cross-platform"
          ]
        },
        {
          "no": "04",
          "name": "Product & Ops",
          "items": [
            "Product Design",
            "Docker / Deploy",
            "SQLite",
            "Observability"
          ]
        }
      ],
      "langsTitle": "Languages",
      "langsList": [
        "C / C++",
        "Rust",
        "Go",
        "Python",
        "TypeScript",
        "Kotlin / Java",
        "C#",
        "Shell"
      ]
    },
    "path": {
      "title": "From ROMs onward",
      "entries": [
        {
          "year": "2018 — 2019",
          "title": "Android ROMs",
          "body": "Started with Redmi 6 Pro ROM ports, near-AOSP builds and custom firmware, published on Coolapk.",
          "meta": [
            "Redmi 6 Pro",
            "Coolapk"
          ]
        },
        {
          "year": "2019 — 2023",
          "title": "Resource-sharing site",
          "body": "Built a resource-sharing site and cloud drive with Flarum and Cloudreve. Closed it in 2023 to prepare for university entrance exams.",
          "meta": [
            "Peak daily PV 1,000,000",
            "10,000+ users"
          ]
        },
        {
          "year": "Now",
          "title": "AI agents & open source",
          "body": "Product design, development, deployment and operations, working across the whole product.",
          "meta": [
            "AI agents",
            "Open source",
            "System ports"
          ]
        }
      ]
    },
    "method": {
      "title": "How I work",
      "steps": [
        {
          "no": "01",
          "name": "Explore",
          "body": "Lay out the needs and possible directions"
        },
        {
          "no": "02",
          "name": "Decide",
          "body": "Set the scope, tradeoffs and priorities"
        },
        {
          "no": "03",
          "name": "Build",
          "body": "Use agents to write and verify code, then judge the results and choose the next step"
        }
      ]
    },
    "life": {
      "title": "Outside work",
      "cards": [
        {
          "img": "radio",
          "name": "Amateur radio",
          "body": "Class B licence, callsign BI6PCR. Repeater contacts and occasional SSTV reception."
        },
        {
          "img": "desk",
          "name": "Photography & design",
          "body": "Photography and graphic design"
        },
        {
          "img": "wave",
          "name": "Languages",
          "body": "Chinese, English, and beginner Japanese"
        }
      ]
    },
    "contact": {
      "title": "Get in touch",
      "links": [
        {
          "label": "Blog",
          "value": "blog.seimo.cn",
          "href": "https://blog.seimo.cn"
        },
        {
          "label": "GitHub",
          "value": "@SeimoDev",
          "href": "https://github.com/SeimoDev"
        },
        {
          "label": "X",
          "value": "@SeimoDev",
          "href": "https://x.com/SeimoDev"
        },
        {
          "label": "Telegram",
          "value": "@seimo_dev",
          "href": "https://t.me/seimo_dev"
        }
      ],
      "motto": "Always believe that something wonderful is about to happen",
      "imageAlt": "Seimo’s OC turning to wave"
    },
    "controls": {
      "language": "Language",
      "openMenu": "Open menu",
      "closeMenu": "Close menu",
      "sections": "Sections",
      "home": "Seimo home",
      "backToTop": "Back to top"
    }
  },
  "ja": {
    "nav": [
      {
        "id": "work",
        "label": "プロジェクト"
      },
      {
        "id": "stack",
        "label": "技術"
      },
      {
        "id": "path",
        "label": "経歴"
      },
      {
        "id": "life",
        "label": "趣味"
      },
      {
        "id": "contact",
        "label": "連絡先"
      }
    ],
    "hero": {
      "role": "Seimo · フルスタック開発者",
      "lines": [
        "カーネルから",
        "プロダクトまで"
      ],
      "sub": "AI Agent、オープンソース、システムとハードウェア",
      "cta": "プロジェクトを見る",
      "contact": "連絡する",
      "imageAlt": "白い帽子と赤い眼鏡の Seimo の OC"
    },
    "intro": {
      "eyebrow": "プロフィール",
      "quote": "Seimo。大学4年のフルスタック開発者。AI Agent、オープンソース、システム移植に取り組んでいます。",
      "facts": [
        {
          "k": "拠点",
          "v": "中国 · UTC+8"
        },
        {
          "k": "状況",
          "v": "大学4年"
        },
        {
          "k": "領域",
          "v": "設計 / 開発 / プロダクト"
        },
        {
          "k": "コールサイン",
          "v": "BI6PCR"
        }
      ]
    },
    "work": {
      "title": "仕事とプロジェクト",
      "body": "AI Agent の会社で、プロダクト設計から開発、公開後の運用まで担当しています。",
      "body2": "仕事の外では、システム移植とオープンソースの開発をしています。",
      "tags": [
        "TypeScript",
        "Go",
        "Python",
        "PostgreSQL",
        "Docker"
      ],
      "cardLabel": "オープンソース",
      "repositories": {
        "empty": "プロジェクトはまだありません",
        "previous": "前のプロジェクト",
        "next": "次のプロジェクト",
        "pause": "自動再生を一時停止",
        "play": "自動再生を開始",
        "noDescription": "説明はまだありません",
        "viewRepository": "GitHub で見る",
        "updated": "最終プッシュ",
        "stars": "スター"
      },
      "imageAlt": "ノートパソコンを使う Seimo の OC"
    },
    "stack": {
      "title": "技術とツール",
      "layers": [
        {
          "no": "01",
          "name": "カーネルとドライバ",
          "items": [
            "XNU / Darwin",
            "Linux Kernel",
            "Device Tree",
            "IRQ & DMA",
            "Block / VFS"
          ]
        },
        {
          "no": "02",
          "name": "システムとデバイス",
          "items": [
            "AOSP Device Tree",
            "Ubuntu BSP",
            "Embedded FW",
            "ESP32 / RISC-V"
          ]
        },
        {
          "no": "03",
          "name": "アプリとフロントエンド",
          "items": [
            "React / TypeScript",
            "Android Native",
            "Desktop",
            "Cross-platform"
          ]
        },
        {
          "no": "04",
          "name": "プロダクトと運用",
          "items": [
            "Product Design",
            "Docker / Deploy",
            "SQLite",
            "Observability"
          ]
        }
      ],
      "langsTitle": "使用言語",
      "langsList": [
        "C / C++",
        "Rust",
        "Go",
        "Python",
        "TypeScript",
        "Kotlin / Java",
        "C#",
        "Shell"
      ]
    },
    "path": {
      "title": "ROM 開発から",
      "entries": [
        {
          "year": "2018 — 2019",
          "title": "Android ROM",
          "body": "Redmi 6 Pro の ROM 移植、準 AOSP、カスタムビルドから始め、Coolapk で公開。",
          "meta": [
            "Redmi 6 Pro",
            "Coolapk"
          ]
        },
        {
          "year": "2019 — 2023",
          "title": "リソース共有サイト",
          "body": "Flarum と Cloudreve で共有サイトとクラウドストレージを運営。受験準備のため 2023 年に終了。",
          "meta": [
            "最大日間 PV 100 万",
            "累計ユーザー 1 万+"
          ]
        },
        {
          "year": "現在",
          "title": "AI Agent とオープンソース",
          "body": "プロダクト設計から開発、デプロイ、運用まで一貫して担当。",
          "meta": [
            "AI Agent",
            "オープンソース",
            "システム移植"
          ]
        }
      ]
    },
    "method": {
      "title": "仕事の進め方",
      "steps": [
        {
          "no": "01",
          "name": "広げる",
          "body": "要件と考えられる方向を並べる"
        },
        {
          "no": "02",
          "name": "絞る",
          "body": "範囲、取捨選択、優先順位を決める"
        },
        {
          "no": "03",
          "name": "作る",
          "body": "Agent で実装と検証を進め、結果を見て次の一手を決める"
        }
      ]
    },
    "life": {
      "title": "技術の外で",
      "cards": [
        {
          "img": "radio",
          "name": "アマチュア無線",
          "body": "B 類操作資格、コールサイン BI6PCR。中継局での交信と、ときどき SSTV 受信。"
        },
        {
          "img": "desk",
          "name": "写真とデザイン",
          "body": "写真撮影とグラフィックデザイン"
        },
        {
          "img": "wave",
          "name": "言語",
          "body": "中国語、英語、日本語は入門中"
        }
      ]
    },
    "contact": {
      "title": "連絡先",
      "links": [
        {
          "label": "Blog",
          "value": "blog.seimo.cn",
          "href": "https://blog.seimo.cn"
        },
        {
          "label": "GitHub",
          "value": "@SeimoDev",
          "href": "https://github.com/SeimoDev"
        },
        {
          "label": "X",
          "value": "@SeimoDev",
          "href": "https://x.com/SeimoDev"
        },
        {
          "label": "Telegram",
          "value": "@seimo_dev",
          "href": "https://t.me/seimo_dev"
        }
      ],
      "motto": "きっといいことが起きると信じている",
      "imageAlt": "振り返って手を振る Seimo の OC"
    },
    "controls": {
      "language": "言語",
      "openMenu": "メニューを開く",
      "closeMenu": "メニューを閉じる",
      "sections": "ページ内ナビゲーション",
      "home": "Seimo ホーム",
      "backToTop": "トップへ戻る"
    }
  }
};
