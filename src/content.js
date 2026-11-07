export const ui = {
  "zh-Hans": { label: "简中", short: "简", code: "ZH" },
  "zh-Hant": { label: "繁中", short: "繁", code: "TC" },
  en: { label: "English", short: "EN", code: "EN" },
  ja: { label: "日本語", short: "JA", code: "JP" },
};

export const ORDER = ["zh-Hans", "zh-Hant", "en", "ja"];

export const langs = {
  "zh-Hans": {
    nav: [
      { id: "work", label: "工作" },
      { id: "stack", label: "技术版图" },
      { id: "path", label: "经历" },
      { id: "life", label: "技术之外" },
      { id: "contact", label: "联系" },
    ],
    navHint: "索引",

    hero: {
      role: "软硬通吃的全栈开发者",
      lines: ["从内核开发", "到产品设计。"],
      sub: "大四在读。产品设计、软件开发、UI 设计、硬件固件移植烧录、服务运维全干工程师",
      cta: "往下看看",
      status: "现在 · Anything 开发与 AI Agent",
      loc: "中国 · UTC+8",
      years: "2018 — 2026",
      motto: "永远相信美好的事情即将发生。",
      scroll: "SCROLL",
    },

    intro: {
      eyebrow: "一句话",
      quote:
        "我是 Seimo，大四在读。产品设计、软件开发、UI 设计、硬件固件移植烧录、服务运维全干工程师",
      facts: [
        { k: "坐标", v: "中国 · UTC+8" },
        { k: "状态", v: "大四在读" },
        { k: "方向", v: "设计 / 开发 / 产品" },
        { k: "呼号", v: "BI6PCR" },
      ],
    },

    work: {
      eyebrow: "我在做什么",
      title: "白天做一个 Agent，",
      titleAccent: "晚上做一些个人开发。",
      body: "在一家做 AI Agent 产品的公司，负责从产品设计到开发再到上线运维的全栈工作。日常主要用 TypeScript、Go、Python，配 SQLite 和 Docker。",
      body2:
        "工作之外，我大部分精力放在一些“看起来没什么用”的事情上。比如最近跟风把 iPadOS27 移植到了小米平板5上，还做了一个在 Windows 上面实现 MacOS 同款体验的窗口管理工具：WacOS。",
      tags: ["TypeScript", "Go", "Python", "PostgreSQL", "Docker"],
      cardLabel: "最近的项目",
      repositories: {
        hint: "个人与所拥有组织 · 最近推送的 5 个公开仓库",
        loading: "正在读取 GitHub 仓库…",
        error: "暂时无法更新仓库。",
        rateLimit: "GitHub 请求次数已达上限，请稍后再试。",
        networkError: "无法连接仓库服务，请检查网络后重试。",
        serviceUnavailable: "仓库服务尚未就绪，请稍后再试。",
        empty: "暂无公开仓库。",
        retry: "重试",
        previous: "上一个项目",
        next: "下一个项目",
        pause: "暂停轮播",
        play: "播放轮播",
        noDescription: "这个仓库还没有简介。",
        updated: "最近推送",
        personal: "个人",
        organization: "组织",
        stars: "星标",
      },
      marquee: [
        "内核移植",
        "KERNEL",
        "设备树",
        "DEVTREE",
        "中断",
        "IRQ",
        "块设备",
        "BLOCK",
        "文件系统",
        "VFS",
      ],
    },

    stack: {
      eyebrow: "技术版图",
      title: "从开发到产品，",
      titleAccent: "各个方向都可以沾一点都全沾开发者。",
      lead: "不是“了解”，是实际交付过。",
      layers: [
        {
          no: "01",
          name: "内核与驱动",
          en: "Kernel & Drivers",
          desc: "Linux 与 XNU 移植、设备树、中断、块设备与文件系统。在没有文档的地方，从日志里挖出每一步。",
          items: [
            "XNU / Darwin",
            "Linux Kernel",
            "Device Tree",
            "IRQ & DMA",
            "Block / VFS",
          ],
        },
        {
          no: "02",
          name: "系统与设备",
          en: "Systems & Devices",
          desc: "AOSP 设备树、Ubuntu 板级移植、嵌入式固件。让一块板子从点亮到真正可用。",
          items: [
            "AOSP Device Tree",
            "Ubuntu BSP",
            "Embedded FW",
            "ESP32 / RISC-V",
          ],
        },
        {
          no: "03",
          name: "应用与前端",
          en: "Apps & Frontend",
          desc: "Web 前端与跨端界面、Android 原生、桌面端。把抽象的接口变成能用的东西。",
          items: [
            "React / TypeScript",
            "Android Native",
            "Desktop",
            "Cross-platform",
          ],
        },
        {
          no: "04",
          name: "产品与运维",
          en: "Product & Ops",
          desc: "自己设计、自己写、自己部署、自己盯着跑。上线不是终点，是另一段工作的开始。",
          items: [
            "Product Design",
            "Docker / Deploy",
            "SQLite",
            "Observability",
          ],
        },
      ],
      langsTitle: "语言",
      langsNote: "哪个顺手用哪个，不太挑。",
      langsList: [
        "C / C++",
        "Rust",
        "Go",
        "Python",
        "TypeScript",
        "Kotlin / Java",
        "C#",
        "Shell",
      ],
    },

    path: {
      eyebrow: "经历主线",
      title: "看起来跨度很大，",
      titleAccent: "实际上也确实很大。",
      entries: [
        {
          year: "2018 — 2019",
          tag: "起点",
          title: "Android ROM",
          body: "起点是刷机。Redmi 6 Pro 那会儿，在酷安发布过给别人用的刷机包——移植、类原生、定制，都做过。那时候没有 AI，所有东西全部手搓。",
          meta: ["Redmi 6 Pro", "酷安", "移植 / 类原生 / 定制"],
        },
        {
          year: "2019 — 2023",
          tag: "站长",
          title: "资源分享站",
          body: "后来自己基于开源 Flarum 和 Cloudreve 开源项目做资源分享网站和带网盘。最高日 PV 一百万，累计用户一万多，一直做到 2023 年，因为要准备高考、没精力管就关掉了",
          meta: ["日 PV 1,000,000", "累计用户 10,000+", "2019 — 2023"],
        },
        {
          year: "现在",
          tag: "进行中",
          title: "万物开发与 AI Agent",
          body: "从 ROM 到内核，从网站到 Agent，表面跨度很大。对我来说是同一件事：把一层层抽象拆开，找到真正卡住的那一处。",
          meta: ["XNU / nabu", "AI Agent 全栈", "仍在继续"],
        },
      ],
    },

    method: {
      eyebrow: "我是怎么工作的",
      title: "先发散，再梳理，",
      titleAccent: "最后开干。",
      steps: [
        {
          no: "01",
          name: "发散",
          en: "Diverge",
          body: "面对一个想法，先把所有方向梳理开，想出所有的可能性。",
        },
        {
          no: "02",
          name: "梳理",
          en: "Converge",
          body: "砍掉大部分，留下真正值得做的部分，再把内容整理清楚。",
        },
        {
          no: "03",
          name: "开干",
          en: "Execute",
          body: "真正动手之后，我负责指明方向。Agent 改代码、读日志、分析输出，我看结果、决定下一步往哪走。",
        },
      ],
      aside:
        "AI 只是工具，不是神明。我现在做的事，某种程度上就是这条经验的延伸。",
    },

    life: {
      eyebrow: "技术之外",
      title: "技术之外，",
      titleAccent: "也在认真生活。",
      cards: [
        {
          img: "radio",
          name: "业余无线电",
          en: "Amateur Radio",
          body: "B 类操作证书，呼号 BI6PCR。平时主要玩中继通联，偶尔收 SSTV 图像。",
          meta: ["BI6PCR", "Class B", "SSTV"],
        },
        {
          img: "desk",
          name: "摄影与平面设计",
          en: "Photo & Graphic",
          body: "长期的放松方式，也是做产品时审美判断的来源。",
          meta: ["Photo", "Graphic", "Type"],
        },
        {
          img: "wave",
          name: "语言",
          en: "Languages",
          body: "中文、English，日本語刚入门。",
          meta: ["中文", "EN", "日本語"],
        },
      ],
    },

    contact: {
      eyebrow: "联系我",
      title: "有想法，",
      titleAccent: "就聊聊吧。",
      lead: "无论是内核、产品，还是“看起来没什么用”的项目，都可以直接找我。",
      links: [
        {
          label: "Blog",
          value: "blog.seimo.cn",
          href: "https://blog.seimo.cn",
        },
        {
          label: "GitHub",
          value: "@SeimoDev",
          href: "https://github.com/SeimoDev",
        },
        { label: "X", value: "@SeimoDev", href: "https://x.com/SeimoDev" },
        {
          label: "Telegram",
          value: "@seimo_dev",
          href: "https://t.me/seimo_dev",
        },
      ],
      motto: "永远相信美好的事情即将发生。",
      mottoEn: "Always believe that something wonderful is about to happen.",
      footer: "设计 · 开发 · 部署 · 运维 — 一个人 All in",
    },
  },

  "zh-Hant": {
    nav: [
      { id: "work", label: "工作" },
      { id: "stack", label: "技術版圖" },
      { id: "path", label: "經歷" },
      { id: "life", label: "技術之外" },
      { id: "contact", label: "聯繫" },
    ],
    navHint: "索引",

    hero: {
      role: "軟硬體全端開發者",
      lines: ["從核心", "到產品。"],
      sub: "大四在讀。產品設計、寫程式碼、部署上線之後的維運，一條線自己走完。",
      cta: "往下看看",
      status: "現在 · 核心移植與 AI Agent",
      loc: "中國 · UTC+8",
      years: "2018 — 2026",
      motto: "永遠相信美好的事情即將發生。",
      scroll: "SCROLL",
    },

    intro: {
      eyebrow: "一句話",
      quote:
        "我是 Seimo，大四在讀，軟硬體全端開發者——從產品設計、寫程式碼，到部署上線之後的維運，一條線自己走完。",
      facts: [
        { k: "座標", v: "中國 · UTC+8" },
        { k: "狀態", v: "大四在讀" },
        { k: "方向", v: "核心 / 系統 / 產品" },
        { k: "呼號", v: "BI6PCR" },
      ],
    },

    work: {
      eyebrow: "我在做什麼",
      title: "白天做一個 Agent，",
      titleAccent: "晚上移植一個核心。",
      body: "在一家做 AI Agent 產品的公司，負責從產品設計到開發再到上線維運的全端工作。日常主要用 TypeScript、Go、Python，配 SQLite 和 Docker。",
      body2:
        "工作之外，我大部分精力放在一些「看起來沒什麼用」的事情上。最近是把 XNU 移植到小米平板 5 上，跑原版 iPadOS 的使用者態。起點很單純：純粹因為好玩。",
      tags: ["TypeScript", "Go", "Python", "SQLite", "Docker"],
      cardLabel: "最近的專案",
      repositories: {
        hint: "個人與所擁有組織 · 最近推送的 5 個公開倉庫",
        loading: "正在讀取 GitHub 倉庫…",
        error: "暫時無法更新倉庫。",
        rateLimit: "GitHub 請求次數已達上限，請稍後再試。",
        networkError: "無法連線至倉庫服務，請檢查網路後重試。",
        serviceUnavailable: "倉庫服務尚未就緒，請稍後再試。",
        empty: "暫無公開倉庫。",
        retry: "重試",
        previous: "上一個專案",
        next: "下一個專案",
        pause: "暫停輪播",
        play: "播放輪播",
        noDescription: "這個倉庫還沒有簡介。",
        updated: "最近推送",
        personal: "個人",
        organization: "組織",
        stars: "星標",
      },
      marquee: [
        "核心移植",
        "KERNEL",
        "裝置樹",
        "DEVTREE",
        "中斷",
        "IRQ",
        "區塊裝置",
        "BLOCK",
        "檔案系統",
        "VFS",
      ],
    },

    stack: {
      eyebrow: "技術版圖",
      title: "從核心到產品，",
      titleAccent: "四層都實際做過。",
      lead: "不是「了解」，是實際交付過。",
      layers: [
        {
          no: "01",
          name: "核心與驅動",
          en: "Kernel & Drivers",
          desc: "Linux 與 XNU 移植、裝置樹、中斷、區塊裝置與檔案系統。在沒有文件的地方，從日誌裡挖出每一步。",
          items: [
            "XNU / Darwin",
            "Linux Kernel",
            "Device Tree",
            "IRQ & DMA",
            "Block / VFS",
          ],
        },
        {
          no: "02",
          name: "系統與裝置",
          en: "Systems & Devices",
          desc: "AOSP 裝置樹、Ubuntu 板級移植、嵌入式韌體。讓一塊板子從點亮到真正可用。",
          items: [
            "AOSP Device Tree",
            "Ubuntu BSP",
            "Embedded FW",
            "ESP32 / RISC-V",
          ],
        },
        {
          no: "03",
          name: "應用與前端",
          en: "Apps & Frontend",
          desc: "Web 前端與跨端介面、Android 原生、桌面端。把抽象的介面變成能用的東西。",
          items: [
            "React / TypeScript",
            "Android Native",
            "Desktop",
            "Cross-platform",
          ],
        },
        {
          no: "04",
          name: "產品與維運",
          en: "Product & Ops",
          desc: "自己設計、自己寫、自己部署、自己盯著跑。上線不是終點，是另一段工作的開始。",
          items: [
            "Product Design",
            "Docker / Deploy",
            "SQLite",
            "Observability",
          ],
        },
      ],
      langsTitle: "語言",
      langsNote: "哪個順手用哪個，不太挑。",
      langsList: [
        "C / C++",
        "Rust",
        "Go",
        "Python",
        "TypeScript",
        "Kotlin / Java",
        "C#",
        "Shell",
      ],
    },

    path: {
      eyebrow: "經歷主線",
      title: "看起來跨度很大，",
      titleAccent: "其實是同一件事。",
      entries: [
        {
          year: "2018 — 2019",
          tag: "起點",
          title: "Android ROM",
          body: "起點是刷機。Redmi 6 Pro 那會兒，在酷安發布過給別人用的刷機包——移植、類原生、客製化，都做過。那是我第一次意識到，一個系統從原始碼到能在別人手機上開機，中間每一步都得自己從日誌裡挖出來。",
          meta: ["Redmi 6 Pro", "酷安", "移植 / 類原生 / 客製化"],
        },
        {
          year: "2019 — 2023",
          tag: "站長",
          title: "資源分享站",
          body: "後來自己做了個資源分享網站，帶網盤。最高日 PV 一百萬，累計使用者一萬多，一直做到 2023 年，因為要準備高考、沒精力管就關掉了。這段教我的東西跟寫程式碼關係不大。",
          meta: ["日 PV 1,000,000", "累計使用者 10,000+", "2019 — 2023"],
        },
        {
          year: "現在",
          tag: "進行中",
          title: "核心移植與 AI Agent",
          body: "從 ROM 到核心，從網站到 Agent，表面跨度很大。對我來說是同一件事：把一層層抽象拆開，找到真正卡住的那一處。",
          meta: ["XNU / nabu", "AI Agent 全端", "仍在繼續"],
        },
      ],
    },

    method: {
      eyebrow: "我是怎麼工作的",
      title: "先發散，再梳理，",
      titleAccent: "最後開幹。",
      steps: [
        {
          no: "01",
          name: "發散",
          en: "Diverge",
          body: "面對一個想法，先把所有方向攤開。不急著判斷，也不急著收窄。",
        },
        {
          no: "02",
          name: "梳理",
          en: "Converge",
          body: "砍掉大部分，留下真能走的那條。判斷力比產出量更值錢。",
        },
        {
          no: "03",
          name: "開幹",
          en: "Execute",
          body: "真正動手之後，我更像那個定方向的人。Agent 改程式碼、讀日誌、分析輸出，我看結果、決定下一步往哪走。",
        },
      ],
      aside:
        "它跑得比我快，但方向得有人給。我現在做的事，某種程度上就是這條經驗的延伸。",
    },

    life: {
      eyebrow: "技術之外",
      title: "技術之外，",
      titleAccent: "也在認真生活。",
      cards: [
        {
          img: "radio",
          name: "業餘無線電",
          en: "Amateur Radio",
          body: "B 類操作證書，呼號 BI6PCR。平時主要玩中繼通聯，偶爾收 SSTV 圖像。",
          meta: ["BI6PCR", "Class B", "SSTV"],
        },
        {
          img: "desk",
          name: "攝影與平面設計",
          en: "Photo & Graphic",
          body: "長期的放鬆方式，也是做產品時審美判斷的來源。",
          meta: ["Photo", "Graphic", "Type"],
        },
        {
          img: "wave",
          name: "語言",
          en: "Languages",
          body: "中文、English，日本語剛入門。",
          meta: ["中文", "EN", "日本語"],
        },
      ],
    },

    contact: {
      eyebrow: "聯繫我",
      title: "有想法，",
      titleAccent: "就聊聊吧。",
      lead: "無論是核心、產品，還是「看起來沒什麼用」的專案，都可以直接找我。",
      links: [
        {
          label: "Blog",
          value: "blog.seimo.cn",
          href: "https://blog.seimo.cn",
        },
        {
          label: "GitHub",
          value: "@SeimoDev",
          href: "https://github.com/SeimoDev",
        },
        { label: "X", value: "@SeimoDev", href: "https://x.com/SeimoDev" },
        {
          label: "Telegram",
          value: "@seimo_dev",
          href: "https://t.me/seimo_dev",
        },
      ],
      motto: "永遠相信美好的事情即將發生。",
      mottoEn: "Always believe that something wonderful is about to happen.",
      footer: "設計 · 開發 · 部署 · 維運 — 全部自己來",
    },
  },

  en: {
    nav: [
      { id: "work", label: "Work" },
      { id: "stack", label: "Stack" },
      { id: "path", label: "Path" },
      { id: "life", label: "Beyond" },
      { id: "contact", label: "Contact" },
    ],
    navHint: "Index",

    hero: {
      role: "Full-stack, hardware to web",
      lines: ["From the kernel", "to the product."],
      sub: "Final-year undergrad. I design it, write it, ship it — and stay on call after it goes live.",
      cta: "Keep scrolling",
      status: "Now · Kernel ports & AI agents",
      loc: "China · UTC+8",
      years: "2018 — 2026",
      motto: "Always believe that something wonderful is about to happen.",
      scroll: "SCROLL",
    },

    intro: {
      eyebrow: "In one line",
      quote:
        "I’m Seimo, a final-year undergrad and full-stack developer working from hardware up to web — product design, code, deployment, and the ops that follow. One person, the whole line.",
      facts: [
        { k: "Based", v: "China · UTC+8" },
        { k: "Status", v: "Final-year undergrad" },
        { k: "Focus", v: "Kernel / Systems / Product" },
        { k: "Callsign", v: "BI6PCR" },
      ],
    },

    work: {
      eyebrow: "What I’m doing",
      title: "Building an agent by day,",
      titleAccent: "porting a kernel by night.",
      body: "I work at a company building AI agent products, owning the whole line from product design through development to deployment and operations. Day to day: TypeScript, Go, Python, with SQLite and Docker.",
      body2:
        "Outside work, most of my energy goes into things that look useless. Lately: porting XNU to the Xiaomi Pad 5 and booting the stock iPadOS userland. The reason is simple — it’s fun.",
      tags: ["TypeScript", "Go", "Python", "SQLite", "Docker"],
      cardLabel: "Recent projects",
      repositories: {
        hint: "Personal & owned organizations · 5 most recently pushed public repos",
        loading: "Loading GitHub repositories…",
        error: "Repositories could not be refreshed.",
        rateLimit: "GitHub's request limit has been reached. Please try again later.",
        networkError: "Cannot connect to the repository service. Check your connection and retry.",
        serviceUnavailable: "The repository service is not ready yet. Please try again later.",
        empty: "No public repositories yet.",
        retry: "Retry",
        previous: "Previous project",
        next: "Next project",
        pause: "Pause slideshow",
        play: "Play slideshow",
        noDescription: "No description provided yet.",
        updated: "Last pushed",
        personal: "Personal",
        organization: "Organization",
        stars: "Stars",
      },
      marquee: [
        "KERNEL PORT",
        "内核移植",
        "DEVICE TREE",
        "设备树",
        "INTERRUPTS",
        "中断",
        "BLOCK I/O",
        "块设备",
        "FILE SYSTEM",
        "VFS",
      ],
    },

    stack: {
      eyebrow: "The stack",
      title: "Four layers down,",
      titleAccent: "all of them shipped.",
      lead: "Not “familiar with” — actually delivered.",
      layers: [
        {
          no: "01",
          name: "Kernel & Drivers",
          en: "Kernel & Drivers",
          desc: "Linux and XNU ports, device trees, interrupts, block devices and filesystems. Where there’s no documentation, you dig each step out of the logs.",
          items: [
            "XNU / Darwin",
            "Linux Kernel",
            "Device Tree",
            "IRQ & DMA",
            "Block / VFS",
          ],
        },
        {
          no: "02",
          name: "Systems & Devices",
          en: "Systems & Devices",
          desc: "AOSP device trees, Ubuntu board bring-up, embedded firmware. Taking a board from “it lights up” to genuinely usable.",
          items: [
            "AOSP Device Tree",
            "Ubuntu BSP",
            "Embedded FW",
            "ESP32 / RISC-V",
          ],
        },
        {
          no: "03",
          name: "Apps & Frontend",
          en: "Apps & Frontend",
          desc: "Web frontends and cross-platform UI, native Android, desktop. Turning abstract interfaces into something people can hold.",
          items: [
            "React / TypeScript",
            "Android Native",
            "Desktop",
            "Cross-platform",
          ],
        },
        {
          no: "04",
          name: "Product & Ops",
          en: "Product & Ops",
          desc: "I design it, I write it, I deploy it, I watch it run. Shipping isn’t the finish line — it’s where the next stretch of work starts.",
          items: [
            "Product Design",
            "Docker / Deploy",
            "SQLite",
            "Observability",
          ],
        },
      ],
      langsTitle: "Languages",
      langsNote: "Whatever fits the job. I’m not picky.",
      langsList: [
        "C / C++",
        "Rust",
        "Go",
        "Python",
        "TypeScript",
        "Kotlin / Java",
        "C#",
        "Shell",
      ],
    },

    path: {
      eyebrow: "The path",
      title: "It looks like a wide jump,",
      titleAccent: "but it’s the same job.",
      entries: [
        {
          year: "2018 — 2019",
          tag: "Origin",
          title: "Android ROMs",
          body: "It started with flashing ROMs. Around the Redmi 6 Pro era I published builds for other people on Coolapk — ports, near-AOSP, custom work. That was the first time I understood that getting a system from source to booting on someone else’s phone means digging every step out of a log.",
          meta: ["Redmi 6 Pro", "Coolapk", "Port / near-AOSP / custom"],
        },
        {
          year: "2019 — 2023",
          tag: "Site owner",
          title: "A resource site",
          body: "Then I built a resource-sharing site with cloud storage attached. It peaked at a million page views a day and grew past ten thousand users, and ran until 2023 — I shut it down to prepare for the college entrance exam, with no time left to run it. What it taught me had little to do with writing code.",
          meta: ["1M daily PV", "10,000+ users", "2019 — 2023"],
        },
        {
          year: "Now",
          tag: "In progress",
          title: "Kernel ports & AI agents",
          body: "ROMs to kernels, websites to agents — a wide jump on the surface. To me it’s one thing: peeling back layer after layer of abstraction until you find the place that’s actually stuck.",
          meta: ["XNU / nabu", "AI agent, full stack", "Ongoing"],
        },
      ],
    },

    method: {
      eyebrow: "How I work",
      title: "Spread out, cut down,",
      titleAccent: "then build.",
      steps: [
        {
          no: "01",
          name: "Diverge",
          en: "Diverge",
          body: "Faced with an idea, I lay every direction on the table first. No rush to judge, no rush to narrow.",
        },
        {
          no: "02",
          name: "Converge",
          en: "Converge",
          body: "Cut most of it. Keep the one path that can actually be walked. Judgment is worth more than output.",
        },
        {
          no: "03",
          name: "Execute",
          en: "Execute",
          body: "Once the work starts, I’m the one setting direction. The agent edits code, reads logs, analyses output; I read results and decide where to go next.",
        },
      ],
      aside:
        "It runs faster than I do, but someone has to point it. A lot of what I do now is an extension of that.",
    },

    life: {
      eyebrow: "Beyond the screen",
      title: "Off the keyboard,",
      titleAccent: "still paying attention.",
      cards: [
        {
          img: "radio",
          name: "Amateur radio",
          en: "Amateur Radio",
          body: "Class B licence, callsign BI6PCR. Mostly repeater contacts, occasionally pulling SSTV images off the air.",
          meta: ["BI6PCR", "Class B", "SSTV"],
        },
        {
          img: "desk",
          name: "Photography & design",
          en: "Photo & Graphic",
          body: "A long-standing way to unwind — and where my taste in product work comes from.",
          meta: ["Photo", "Graphic", "Type"],
        },
        {
          img: "wave",
          name: "Languages",
          en: "Languages",
          body: "Chinese, English, and Japanese (just getting started).",
          meta: ["中文", "EN", "日本語"],
        },
      ],
    },

    contact: {
      eyebrow: "Contact",
      title: "Got an idea?",
      titleAccent: "Let’s talk.",
      lead: "Kernels, products, or something that looks useless — reach out directly.",
      links: [
        {
          label: "Blog",
          value: "blog.seimo.cn",
          href: "https://blog.seimo.cn",
        },
        {
          label: "GitHub",
          value: "@SeimoDev",
          href: "https://github.com/SeimoDev",
        },
        { label: "X", value: "@SeimoDev", href: "https://x.com/SeimoDev" },
        {
          label: "Telegram",
          value: "@seimo_dev",
          href: "https://t.me/seimo_dev",
        },
      ],
      motto: "Always believe that something wonderful is about to happen.",
      mottoEn: "永远相信美好的事情即将发生。",
      footer: "Design · Build · Deploy · Operate — all by one person",
    },
  },

  ja: {
    nav: [
      { id: "work", label: "仕事" },
      { id: "stack", label: "技術領域" },
      { id: "path", label: "経歴" },
      { id: "life", label: "日常" },
      { id: "contact", label: "連絡" },
    ],
    navHint: "インデックス",

    hero: {
      role: "ハードからWebまでのフルスタック開発者",
      lines: ["カーネルから", "プロダクトまで。"],
      sub: "大学4年。プロダクト設計、コーディング、公開後の運用まで、一人で最後まで走ります。",
      cta: "スクロールして見る",
      status: "現在 · カーネル移植と AI Agent",
      loc: "中国 · UTC+8",
      years: "2018 — 2026",
      motto: "きっといいことが起きると信じている。",
      scroll: "SCROLL",
    },

    intro: {
      eyebrow: "ひとことで",
      quote:
        "Seimoです。大学4年のフルスタック開発者で、ハードウェアからWebまで——プロダクト設計、実装、公開後の運用まで、一人で一続きに担当しています。",
      facts: [
        { k: "拠点", v: "中国 · UTC+8" },
        { k: "状況", v: "大学4年" },
        { k: "領域", v: "カーネル / システム / プロダクト" },
        { k: "コールサイン", v: "BI6PCR" },
      ],
    },

    work: {
      eyebrow: "いまやっていること",
      title: "昼はエージェントを、",
      titleAccent: "夜はカーネルを。",
      body: "AI Agent プロダクトの会社で、プロダクト設計から開発、公開後の運用までをフルスタックで担当しています。日常的に使うのは TypeScript、Go、Python、そして SQLite と Docker。",
      body2:
        "仕事の外では、一見「役に立たなさそう」なことにほとんどの時間を使っています。最近は XNU を Xiaomi Pad 5 に移植して、純正の iPadOS ユーザーランドを動かすこと。理由は単純に、面白いから。",
      tags: ["TypeScript", "Go", "Python", "SQLite", "Docker"],
      cardLabel: "最近のプロジェクト",
      repositories: {
        hint: "個人・所有組織の公開リポジトリ · 最終プッシュ順に5件",
        loading: "GitHub リポジトリを読み込み中…",
        error: "リポジトリを更新できませんでした。",
        rateLimit: "GitHub のリクエスト上限に達しました。しばらくしてから再試行してください。",
        networkError: "リポジトリサービスに接続できません。ネットワークを確認して再試行してください。",
        serviceUnavailable: "リポジトリサービスの準備ができていません。しばらくしてから再試行してください。",
        empty: "公開リポジトリはまだありません。",
        retry: "再試行",
        previous: "前のプロジェクト",
        next: "次のプロジェクト",
        pause: "自動再生を一時停止",
        play: "自動再生を開始",
        noDescription: "説明はまだありません。",
        updated: "最終プッシュ",
        personal: "個人",
        organization: "組織",
        stars: "スター",
      },
      marquee: [
        "カーネル移植",
        "KERNEL",
        "デバイスツリー",
        "DEVTREE",
        "割り込み",
        "IRQ",
        "ブロック I/O",
        "BLOCK",
        "ファイルシステム",
        "VFS",
      ],
    },

    stack: {
      eyebrow: "技術領域",
      title: "カーネルからプロダクトまで、",
      titleAccent: "四つの層を実際に。",
      lead: "「触ったことがある」ではなく、納品したことがあります。",
      layers: [
        {
          no: "01",
          name: "カーネルとドライバ",
          en: "Kernel & Drivers",
          desc: "Linux と XNU の移植、デバイスツリー、割り込み、ブロックデバイスとファイルシステム。ドキュメントがない場所では、ログから一歩ずつ掘り出します。",
          items: [
            "XNU / Darwin",
            "Linux Kernel",
            "Device Tree",
            "IRQ & DMA",
            "Block / VFS",
          ],
        },
        {
          no: "02",
          name: "システムとデバイス",
          en: "Systems & Devices",
          desc: "AOSP デバイスツリー、Ubuntu のボード移植、組み込みファームウェア。点灯するところから、本当に使える状態まで。",
          items: [
            "AOSP Device Tree",
            "Ubuntu BSP",
            "Embedded FW",
            "ESP32 / RISC-V",
          ],
        },
        {
          no: "03",
          name: "アプリとフロントエンド",
          en: "Apps & Frontend",
          desc: "Web フロントエンドとクロスプラットフォーム UI、Android ネイティブ、デスクトップ。抽象的なインターフェースを使える形に。",
          items: [
            "React / TypeScript",
            "Android Native",
            "Desktop",
            "Cross-platform",
          ],
        },
        {
          no: "04",
          name: "プロダクトと運用",
          en: "Product & Ops",
          desc: "設計も、実装も、デプロイも、監視も自分で。公開はゴールではなく、次の仕事の始まりです。",
          items: [
            "Product Design",
            "Docker / Deploy",
            "SQLite",
            "Observability",
          ],
        },
      ],
      langsTitle: "言語",
      langsNote: "そのとき扱いやすいものを使う。こだわりはありません。",
      langsList: [
        "C / C++",
        "Rust",
        "Go",
        "Python",
        "TypeScript",
        "Kotlin / Java",
        "C#",
        "Shell",
      ],
    },

    path: {
      eyebrow: "これまでの流れ",
      title: "表面上は大きく飛んでいる。",
      titleAccent: "でも、やっていることは同じ。",
      entries: [
        {
          year: "2018 — 2019",
          tag: "起点",
          title: "Android ROM",
          body: "始まりは ROM を焼くことでした。Redmi 6 Pro の頃、Coolapk で他の人向けのビルドを公開していました。移植、準 AOSP、カスタムまで。ソースから他人の端末で起動するまで、その一歩一歩をログから掘り出す必要がある——そう初めて理解した時期です。",
          meta: ["Redmi 6 Pro", "Coolapk", "移植 / 準 AOSP / カスタム"],
        },
        {
          year: "2019 — 2023",
          tag: "サイト運営",
          title: "リソース共有サイト",
          body: "その後、クラウドストレージ付きのリソース共有サイトを作りました。最大で1日100万PV、累計1万人以上。2023年まで運営し、大学入試の準備で手が回らなくなり閉鎖しました。ここで学んだことは、コードを書くこととはあまり関係がありません。",
          meta: ["1日 100万 PV", "累計 1万人以上", "2019 — 2023"],
        },
        {
          year: "現在",
          tag: "進行中",
          title: "カーネル移植と AI Agent",
          body: "ROM からカーネルへ、サイトからエージェントへ。表面上の隔たりは大きいけれど、自分にとっては同じことです。抽象の層を一枚ずつ剥がして、本当に詰まっている一点を見つける。",
          meta: ["XNU / nabu", "AI Agent フルスタック", "継続中"],
        },
      ],
    },

    method: {
      eyebrow: "仕事の進め方",
      title: "広げて、削って、",
      titleAccent: "それから作る。",
      steps: [
        {
          no: "01",
          name: "発散",
          en: "Diverge",
          body: "アイデアを前にしたら、まず全部の方向を並べます。判断も、絞り込みも急がない。",
        },
        {
          no: "02",
          name: "収束",
          en: "Converge",
          body: "ほとんどを捨てて、本当に進める一本だけを残す。判断力のほうが、量より価値があります。",
        },
        {
          no: "03",
          name: "実行",
          en: "Execute",
          body: "動き出した後は、方向を決める側になります。エージェントがコードを直し、ログを読み、出力を分析する。私は結果を見て、次にどこへ行くかを決めます。",
        },
      ],
      aside:
        "向こうのほうが速い。でも、方向を指す人が要る。いまやっていることの多くは、その延長線上にあります。",
    },

    life: {
      eyebrow: "画面の外",
      title: "キーボードの外でも、",
      titleAccent: "ちゃんと生きています。",
      cards: [
        {
          img: "radio",
          name: "アマチュア無線",
          en: "Amateur Radio",
          body: "第2級（B類）の免許、コールサインは BI6PCR。主にリピーターでの交信、ときどき SSTV 画像を受信しています。",
          meta: ["BI6PCR", "Class B", "SSTV"],
        },
        {
          img: "desk",
          name: "写真とグラフィック",
          en: "Photo & Graphic",
          body: "長く続けている息抜きであり、プロダクトを作るときの審美眼の出どころでもあります。",
          meta: ["Photo", "Graphic", "Type"],
        },
        {
          img: "wave",
          name: "言語",
          en: "Languages",
          body: "中国語、English、日本語は始めたばかり。",
          meta: ["中文", "EN", "日本語"],
        },
      ],
    },

    contact: {
      eyebrow: "連絡先",
      title: "アイデアがあるなら、",
      titleAccent: "話しましょう。",
      lead: "カーネルの話も、プロダクトの話も、「役に立たなさそう」なものも、直接どうぞ。",
      links: [
        {
          label: "Blog",
          value: "blog.seimo.cn",
          href: "https://blog.seimo.cn",
        },
        {
          label: "GitHub",
          value: "@SeimoDev",
          href: "https://github.com/SeimoDev",
        },
        { label: "X", value: "@SeimoDev", href: "https://x.com/SeimoDev" },
        {
          label: "Telegram",
          value: "@seimo_dev",
          href: "https://t.me/seimo_dev",
        },
      ],
      motto: "きっといいことが起きると信じている。",
      mottoEn: "Always believe that something wonderful is about to happen.",
      footer: "設計 · 開発 · デプロイ · 運用 — すべて一人で",
    },
  },
};
