# Seimo 的个人主页

> 永远相信美好的事情即将发生。

一个用 React 写的个人主页。浅色纸感底、OC 插画和统一的间距，展示项目、技术、经历与兴趣，支持简中 / 繁中 / English / 日本語 四种语言。

博客：[blog.seimo.cn](https://blog.seimo.cn)

---

## 技术栈

| | |
|---|---|
| 框架 | React 19 |
| 构建 | Vite 8 |
| 交互 | 项目横向轮播、原生锚点滚动，适配减少动态效果 |
| 字体 | Inter Tight / Noto Sans SC / Instrument Serif / JetBrains Mono（自托管 woff2） |

没有 UI 框架，样式全部手写在一个设计 token 体系上（`src/styles/base.css` 定义变量，`sections.css` 写版式）。

---

## 本地运行

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # 产物在 dist/
npm run preview    # 预览构建结果，端口 4173
```

Node 版本需要 `^20.19.0` 或 `>=22.12.0`（Vite 8 的要求）。

---

## 目录结构

```
src/
├── main.jsx               入口，挂载 LangProvider
├── App.jsx                页面装配
├── content.js             四种语言的全部文案（唯一文案来源）
├── i18n.jsx               语言上下文、浏览器语言探测、localStorage 记忆
├── hooks/
│   └── useSmoothScroll.js 原生锚点滚动与键盘焦点处理
├── components/
│   ├── Nav.jsx            固定导航、移动端菜单与语言切换
│   ├── Hero.jsx           首屏介绍、人物与项目/联系入口
│   ├── Intro.jsx          关于我与四项个人资料
│   ├── Work.jsx           当前工作、项目与坐姿人物
│   ├── GitHubProjects.jsx  配置选定的 GitHub 仓库横向轮播
│   ├── Stack.jsx          四层技术版图 + 语言列表
│   ├── Path.jsx           经历时间线
│   ├── Method.jsx         方法论三步
│   ├── Life.jsx           技术之外的三张卡片
│   ├── Contact.jsx        联系方式 + 结语
│   ├── SectionHeading.jsx 统一的栏目编号与标题
│   ├── ImpactTitle.jsx    区块标题
│   ├── Icon.jsx           统一尺寸与笔画的线性图标
│   └── Reveal.jsx         语义容器与媒体查询 Hook
├── lib/
│   └── projects.js        配置解析、顺序与静态资料合并
├── data/
│   └── projects.json      构建时保存并嵌入页面的仓库资料
└── styles/
    ├── base.css           颜色、字重、缓动、间距等 token
    └── sections.css       各区块版式与响应式断点
```

---

## 改内容

**所有文案在 `src/content.js`**，按 `zh-Hans` / `zh-Hant` / `en` / `ja` 四个 key 组织。改文字只动这个文件，不用碰组件。

**换人物图**：放到 `public/media/`，文件名对应 `content.js` 里 `life.cards[].img`。图片要求透明底的 WebP。

**改配色**：`src/styles/base.css` 顶部的 `:root` 里有全部颜色变量，包括四种卡片底色（`--lav-wash` / `--sand-wash` / `--mint-wash` / `--red-wash`）。

### GitHub 项目配置

展示哪些项目由根目录的 `projects.config.json` 决定，`repositories` 填写 GitHub 仓库地址，`githubUrl` 是卡片区域右上角的个人 GitHub 链接。例如：

```json
{
  "githubUrl": "https://github.com/SeimoDev",
  "repositories": [
    "https://github.com/SeimoDev/Homepage",
    "https://github.com/WorkWorkLabs/your-repository"
  ]
}
```

按配置顺序展示，不自动选择最新五个，也没有五个的数量限制。修改配置后重新构建即可。

`npm run build` 会先获取配置中各仓库的公开简介、语言、星标和推送时间，保存到 `src/data/projects.json`，再将数据直接打包进页面 JavaScript。浏览器渲染时不调用 GitHub API 或站内仓库接口，Cloudflare Pages 可以按纯静态站点部署。

卡片简介优先使用仓库的 Description；为空时读取 README 的第一段有效正文，跳过标题、图片、徽章、语言导航、代码块、列表和表格。Markdown 与 HTML 格式会移除，链接只保留文字，HTML 实体会解码。API 限流时回退读取公开的 README 原文；原文也无法读取时保留已有简介。

GitHub 限流或网络失败时保留已有资料；新仓库没有缓存时仍展示名称和仓库链接，不伪造星标、推送时间或所有者类型。私有仓库资料不会写入静态文件。配置地址无效会在构建时提示错误。

可用 `npm run sync:projects` 单独更新资料。构建环境可以设置可选的 `GITHUB_TOKEN`，本地也可放在未跟踪的 `.env.local`，以提高请求额度；它只用于构建脚本，不会进入浏览器产物。不要使用 `VITE_GITHUB_TOKEN`。

卡片继续支持每 5 秒自动横向切换、左右按钮和触摸滑动。鼠标悬停、键盘聚焦或离开视口时暂停，开启减少动态效果时关闭自动播放。

---

## 多语言

- 首次访问按 `navigator.languages` 探测，繁体靠 `hant` / `tw` / `hk` / `mo` 判断
- 用户手动切换后写入 `localStorage`（key 为 `seimo.lang`）
- 切换时同步更新 `<html lang>`、页面标题和 meta description

新增语言需要：在 `content.js` 加一份文案、在 `i18n.jsx` 的 `TITLES` 加标题映射、在 `content.js` 的 `ORDER` 和 `ui` 里登记。

---

## 无障碍与动效

- 系统开启 `prefers-reduced-motion` 时关闭首屏入场、菜单过渡与轮播自动播放，锚点立即跳转
- 语言开关始终可用，移动端菜单支持 Escape，关闭后恢复页面滚动与键盘操作
- 导航、卡片和控件保留可见的键盘焦点，说明性人物图带本地化 `alt`
- 区块留白为桌面 96px、手机 64px，卡片内边距 24px；三个文字颜色角色保持可读的对比度

版式精修参考 [unslop](https://heydamir.design/unslop)，作者 Damir Sokolovsky（[@heydamir](https://x.com/heydamir)），CC BY 4.0。沿用站点的纸色、字体、OC 与栏目顺序。

---

## 关于素材

人物插画是 Seimo 的 OC，经生图模型生成后用色度抠图处理成透明底。抠图脚本要求在纯绿幕（`#00FF00`）背景下生成，否则深色细节（比如对讲机天线）会和深色背景混在一起被误删。

字体已全部自托管在 `public/fonts/`，不依赖 Google Fonts 的实时请求，也没有第三方追踪。

---

## 部署

### Cloudflare Pages

构建命令为 `npm run build`，输出目录为 `dist`。项目与仓库资料全部编译为静态资源，不需要 Pages Functions、运行时 Token 或额外数据库。使用 Git 集成部署仓库，或将构建后的 `dist/` 上传即可。

如需提高构建时同步 GitHub 数据的请求额度，可在 Pages 的构建环境设置 `GITHUB_TOKEN`，然后重新部署。即使没有 Token 或同步失败，也会使用已保存的仓库资料。

### 其他静态服务器

`npm run build` 后将 `dist/` 的内容放到任意静态服务器即可。

nginx 示例：

```nginx
server {
    listen 80;
    server_name seimo.cn;
    root /var/www/homepage;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location ~* \.(js|css|woff2|webp|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

**部署到子路径**（比如 GitHub Pages 的 `user.github.io/Homepage/`）时，资源引用的是绝对路径 `/assets/...`，需要先在 `vite.config.js` 里加 `base: '/Homepage/'` 再构建。

---

## 许可

GPL-3.0，见 [LICENSE](LICENSE)。

## 捐赠

XMR: `48sWvxkwuHo4Wg4Tc8fh4VeVsMzXPBCmAQEM9DVtr5nW8CUCmSHpt3iMZxom6aZdbxHJhYJtfZknLh3QJiDmsLMK39rGGAy`
