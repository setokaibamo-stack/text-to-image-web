import type { Locale } from "./config";

export type Dict = {
  brand: { name: string; tagline: string };
  nav: {
    home: string;
    about: string;
    blog: string;
    dashboard: string;
    startProject: string;
    menu: string;
    close: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
    promptPlaceholder: string;
    promptHelper: string;
    promptSubmit: string;
    promptAttach: string;
    forPlatform: string;
  };
  why: {
    eyebrow: string;
    title: string;
    subtitle: string;
    items: { title: string; body: string }[];
  };
  launch: {
    tagline: string;
    loadingLabel: string;
    continueLabel: string;
  };
  dashboard: {
    eyebrow: string;
    welcomeTitle: string;
    welcomeSubtitle: string;
    stats: { label: string; value: string; hint: string }[];
    promptTitle: string;
    promptSubtitle: string;
    promptPlaceholder: string;
    promptHelper: string;
    promptSubmit: string;
    promptSending: string;
    promptSuccess: string;
    promptAttach: string;
    aspectLabel: string;
    aspects: { value: string; label: string }[];
    styleLabel: string;
    styles: { value: string; label: string }[];
    recentTitle: string;
    recentEmpty: string;
    recentItems: { prompt: string; time: string; style: string }[];
    tipsTitle: string;
    tips: string[];
  };
  about: {
    eyebrow: string;
    title: string;
    body: string;
    visionTitle: string;
    visionBody: string;
    missionTitle: string;
    missionBody: string;
    philosophyTitle: string;
    philosophyBody: string;
    methodTitle: string;
    methodBody: string;
    statsTitle: string;
    stats: { value: string; label: string }[];
    teamTitle: string;
    team: { name: string; role: string }[];
  };
  process: {
    eyebrow: string;
    title: string;
    subtitle: string;
    steps: { n: string; title: string; body: string }[];
  };
  testimonials: {
    eyebrow: string;
    title: string;
    subtitle: string;
    items: { quote: string; name: string; role: string; rating: number }[];
  };
  faq: {
    eyebrow: string;
    title: string;
    subtitle: string;
    items: { q: string; a: string }[];
  };
  social: { twitter: string; linkedin: string; github: string; instagram: string };
  blog: {
    eyebrow: string;
    title: string;
    subtitle: string;
    readMore: string;
    backToBlog: string;
    minutes: string;
    posts: {
      slug: string;
      title: string;
      excerpt: string;
      date: string;
      author: string;
      minutes: number;
      body: string;
    }[];
  };
  legal: {
    privacy: {
      title: string;
      updated: string;
      sections: { h: string; p: string }[];
    };
    terms: {
      title: string;
      updated: string;
      sections: { h: string; p: string }[];
    };
  };
  notFound: {
    code: string;
    title: string;
    body: string;
    cta: string;
    secondary: string;
  };
  footer: {
    madeWith: string;
    rights: string;
    product: string;
    company: string;
    resources: string;
    legal: string;
    subscribe: string;
    subscribeCta: string;
    subscribePh: string;
  };
  common: {
    learnMore: string;
    seeAll: string;
    readMore: string;
    loading: string;
    empty: string;
    emptyHint: string;
    retry: string;
    error: string;
    openInNew: string;
  };
  cta: {
    title: string;
    body: string;
    primary: string;
    secondary: string;
  };
};

const en: Dict = {
  brand: {
    name: "text to image",
    tagline: "Turn words into worlds.",
  },
  nav: {
    home: "Home",
    about: "About",
    blog: "Blog",
    dashboard: "Dashboard",
    startProject: "Launch app",
    menu: "Menu",
    close: "Close",
  },
  hero: {
    eyebrow: "AI image studio · built for creators",
    title: "Generate cinematic imagery from a single sentence.",
    subtitle:
      "text to image is a software studio shipping the mobile-first AI creative stack — prompt-to-picture apps, brand pipelines, and on-device workflows for teams that move fast.",
    primaryCta: "Start your project",
    secondaryCta: "See our work",
    promptPlaceholder:
      "Describe your next campaign — e.g. 'a neon-lit cyberpunk street at midnight, cinematic, 35mm'",
    promptHelper: "Press ⏎ to generate · Max 10MB · Upgrade for up to 5GB uploads",
    promptSubmit: "Generate",
    promptAttach: "Attach reference image",
    forPlatform: "For iPhone",
  },
  why: {
    eyebrow: "Why teams pick us",
    title: "Boutique craft. Production speed.",
    subtitle:
      "We are a small senior team. You get the attention of a studio with the pace of a product squad.",
    items: [
      {
        title: "Ship in weeks, not quarters",
        body: "Clear scopes, weekly demos, production-grade code from day one.",
      },
      {
        title: "Engineering quality",
        body: "Typed codebases, tested flows, observability baked in — no duct tape.",
      },
      {
        title: "Security by default",
        body: "Secrets in vaults, least-privilege auth, hardened pipelines.",
      },
      {
        title: "Scales with you",
        body: "Architected for 10× growth — from MVP to multi-region.",
      },
      {
        title: "Design that converts",
        body: "Interfaces users actually finish — not just screenshots.",
      },
      {
        title: "Always-on support",
        body: "A named engineer on Slack, SLAs in writing.",
      },
      {
        title: "Custom, not templated",
        body: "No clone kits. Every build is measured against your metrics.",
      },
      {
        title: "Tight product fit",
        body: "We kill features that do not move the needle for your users.",
      },
    ],
  },
  launch: {
    tagline: "AI image studio",
    loadingLabel: "Warming up the canvas",
    continueLabel: "Enter",
  },
  dashboard: {
    eyebrow: "Workspace",
    welcomeTitle: "Welcome back, creator.",
    welcomeSubtitle:
      "Your studio at a glance — generate new imagery, review your latest runs, and track the creative budget.",
    stats: [
      { label: "Images generated", value: "127", hint: "+18 this week" },
      { label: "Credits remaining", value: "373", hint: "of 500 monthly" },
      { label: "Avg. quality", value: "4.8★", hint: "across 42 runs" },
      { label: "Streak", value: "6 days", hint: "keep it going" },
    ],
    promptTitle: "Generate an image",
    promptSubtitle:
      "Describe what you want to see. Be specific about mood, lighting, framing, and medium.",
    promptPlaceholder:
      "e.g. 'a neon-lit cyberpunk street at midnight, cinematic wide shot, 35mm film grain, rain on asphalt'",
    promptHelper: "Press ⏎ to generate · 1 credit per image · Upgrade for priority queue",
    promptSubmit: "Generate",
    promptSending: "Generating…",
    promptSuccess: "Queued. We'll surface it in Recent runs.",
    promptAttach: "Attach reference image",
    aspectLabel: "Aspect",
    aspects: [
      { value: "1:1", label: "Square 1:1" },
      { value: "3:2", label: "Landscape 3:2" },
      { value: "2:3", label: "Portrait 2:3" },
      { value: "16:9", label: "Widescreen 16:9" },
    ],
    styleLabel: "Style",
    styles: [
      { value: "cinematic", label: "Cinematic" },
      { value: "photoreal", label: "Photoreal" },
      { value: "editorial", label: "Editorial" },
      { value: "illustration", label: "Illustration" },
    ],
    recentTitle: "Recent runs",
    recentEmpty: "Nothing here yet. Your generated images will show up here.",
    recentItems: [
      {
        prompt: "A neon-lit cyberpunk street at midnight, cinematic wide shot",
        time: "2 min ago",
        style: "Cinematic · 16:9",
      },
      {
        prompt: "Editorial portrait of a chef in soft morning light, 50mm",
        time: "1 h ago",
        style: "Editorial · 2:3",
      },
      {
        prompt: "Isometric illustration of a tiny greenhouse, pastel palette",
        time: "Yesterday",
        style: "Illustration · 1:1",
      },
    ],
    tipsTitle: "Pro tips",
    tips: [
      "Name the medium — '35mm film', 'oil on canvas', 'isometric vector' — to nudge the model hard.",
      "Lighting words like 'rim light', 'golden hour', 'chiaroscuro' change the whole mood.",
      "Save strong prompts to your library so you can rerun them with variations.",
    ],
  },
  about: {
    eyebrow: "About",
    title: "A senior team that builds like a product company.",
    body: "text to image is a studio of engineers and designers shipping AI-first software for teams who refuse to compromise. We sit between a boutique agency and an in-house team — close enough to care, independent enough to tell you the truth.",
    visionTitle: "Vision",
    visionBody:
      "To make creative work feel like a conversation — where a sentence becomes a product, a campaign, a brand.",
    missionTitle: "Mission",
    missionBody:
      "We partner with ambitious founders and teams to turn AI ideas into shipped, scalable products — in English and Arabic, on phones and browsers.",
    philosophyTitle: "Philosophy",
    philosophyBody:
      "We believe software is a craft. We keep teams small, write code we want to read in two years, and measure every feature against the user's job to be done.",
    methodTitle: "How we turn ideas into products",
    methodBody:
      "A disciplined 8-step method — from first sketch to launch and beyond — designed to de-risk ambitious builds.",
    statsTitle: "By the numbers",
    stats: [
      { value: "40+", label: "Products shipped" },
      { value: "8y", label: "Average engineer tenure" },
      { value: "12", label: "Countries served" },
      { value: "4.9★", label: "Average client rating" },
    ],
    teamTitle: "The team",
    team: [
      { name: "Seto Kaiba", role: "Founder & Principal Engineer" },
      { name: "Lina Haddad", role: "Design Director" },
      { name: "Omar Farouk", role: "Staff Engineer" },
      { name: "Maya Ito", role: "Product Lead" },
    ],
  },
  process: {
    eyebrow: "How we work",
    title: "From a sentence to a shipped product.",
    subtitle:
      "Eight focused stages. No handovers. The team that designs it is the team that ships it.",
    steps: [
      {
        n: "01",
        title: "Understand the idea",
        body: "We sit with the problem, the users, and the constraints before writing a single line.",
      },
      {
        n: "02",
        title: "Analyse",
        body: "We audit data, markets and existing systems so the plan is grounded, not a guess.",
      },
      {
        n: "03",
        title: "Plan",
        body: "A scoped roadmap with clear milestones, risks and success metrics.",
      },
      {
        n: "04",
        title: "Design",
        body: "High-fidelity flows in Figma — interaction, motion, and RTL considered from day one.",
      },
      {
        n: "05",
        title: "Build",
        body: "Typed code, tested flows, weekly demos in your staging environment.",
      },
      {
        n: "06",
        title: "Test",
        body: "Automated + human QA across devices, including accessibility and performance budgets.",
      },
      {
        n: "07",
        title: "Launch",
        body: "Store submission, marketing-site go-live, internal training — we own the ship day.",
      },
      {
        n: "08",
        title: "Support & improve",
        body: "Ongoing retainer with monthly reviews, dashboards, and a shared backlog.",
      },
    ],
  },
  testimonials: {
    eyebrow: "Clients",
    title: "Loved by the teams we partner with.",
    subtitle:
      "A few words from the founders, product leads and agency owners we build alongside.",
    items: [
      {
        quote:
          "They shipped in six weeks what our previous vendor couldn't in six months — and it's the cleanest codebase we've ever inherited.",
        name: "Noor El-Sayed",
        role: "Co-founder, Pollinate",
        rating: 5,
      },
      {
        quote:
          "A senior team that actually says no when something is a bad idea. That honesty saved us a quarter of runway.",
        name: "David Chen",
        role: "CTO, Studio Cloud",
        rating: 5,
      },
      {
        quote:
          "The Arabic support is first-class, not an afterthought. Our MENA launch was our strongest market on day one.",
        name: "Fatima Al-Rashid",
        role: "Head of Product, Halo",
        rating: 5,
      },
      {
        quote:
          "Weekly demos, clear budgets, zero drama. They feel like our own product team.",
        name: "Marta Novak",
        role: "Founder, Lumen Lab",
        rating: 5,
      },
    ],
  },
  faq: {
    eyebrow: "FAQ",
    title: "Questions, answered.",
    subtitle:
      "If yours isn't here, email us and a principal will reply within 24 hours.",
    items: [
      {
        q: "How do engagements typically start?",
        a: "We start with a free 45-minute discovery call. If there's a fit, we write a scoped proposal within a week — fixed fee or retainer, your pick.",
      },
      {
        q: "Do you work in Arabic?",
        a: "Yes. Our team speaks Arabic and English natively, and every product we ship supports full RTL — typography, layout, and content authoring.",
      },
      {
        q: "Can you take over an existing codebase?",
        a: "Often. We run a two-week audit first: architecture, dependencies, tests. After that, you get a plain-English report and a migration plan.",
      },
      {
        q: "How do you price?",
        a: "Fixed fee for defined scopes, monthly retainer for ongoing work. No hourly billing — we align incentives on outcomes.",
      },
      {
        q: "Who owns the IP?",
        a: "You do. Code, designs, and brand assets transfer on final payment — no strings, no vendor lock-in.",
      },
      {
        q: "Do you offer a guarantee?",
        a: "Yes. If you're not happy in the first two weeks, we part ways and invoice only time delivered.",
      },
    ],
  },
  social: {
    twitter: "Twitter",
    linkedin: "LinkedIn",
    github: "GitHub",
    instagram: "Instagram",
  },
  blog: {
    eyebrow: "Writing",
    title: "Field notes on AI, design, and shipping.",
    subtitle:
      "Short essays from the team — no thought leadership, just what we learned this week.",
    readMore: "Read article",
    backToBlog: "Back to writing",
    minutes: "min read",
    posts: [
      {
        slug: "shipping-rtl-first",
        title: "Shipping RTL-first: the small decisions that compound.",
        excerpt:
          "Arabic isn't a translation project — it's a design system decision. Here's how we bake it in from day one.",
        date: "2026-04-20",
        author: "Lina Haddad",
        minutes: 6,
        body: "Every team says they support Arabic. Few actually ship it on day one. In this piece we walk through the twenty small choices — logical properties, bidi isolation, numeral shaping, icon mirroring — that compound into a product that feels native in both directions.",
      },
      {
        slug: "prompt-caches-that-scale",
        title: "Prompt caches that scale — without becoming a liability.",
        excerpt:
          "A pattern for deterministic generation, safe reuse, and cost control in text-to-image products.",
        date: "2026-04-12",
        author: "Omar Farouk",
        minutes: 8,
        body: "Caching AI generations sounds simple until your first legal review. We share the schema we use in production — signed URLs, content-addressable storage, per-tenant scoping — and the mistakes we'd rather you avoid.",
      },
      {
        slug: "small-teams-big-products",
        title: "Small teams, big products: the 8-person studio playbook.",
        excerpt:
          "How we ship software that punches above its weight — and why we will never be 50 people.",
        date: "2026-03-30",
        author: "Seto Kaiba",
        minutes: 5,
        body: "We capped the studio at eight people on purpose. This is the operating system — rituals, roles, and the one thing we refuse to delegate — that lets a small team deliver like a much larger one.",
      },
      {
        slug: "designing-the-prompt-box",
        title: "Designing the prompt box as the product.",
        excerpt:
          "The input is the interface. Here's how we design it like a first-class surface.",
        date: "2026-03-18",
        author: "Lina Haddad",
        minutes: 7,
        body: "If your users spend 70% of their session in a text area, that text area is the product. We break down the five states of a great prompt input — empty, typing, submitting, error, and returning — and the details that make each one feel premium.",
      },
      {
        slug: "fluttering-toward-50",
        title: "Fluttering toward 50 million renders a month.",
        excerpt:
          "Operational lessons from running a Flutter client at serious scale.",
        date: "2026-03-05",
        author: "Omar Farouk",
        minutes: 9,
        body: "Shipping Flutter to the App Store is easy. Running it at tens of millions of renders without melting your support queue is not. Here's the telemetry, the crash-loop patterns, and the rollout strategy we use.",
      },
      {
        slug: "pricing-without-guilt",
        title: "Pricing without guilt: how we quote boutique engineering.",
        excerpt:
          "A framework for pricing that aligns incentives — and keeps the conversation honest.",
        date: "2026-02-22",
        author: "Maya Ito",
        minutes: 4,
        body: "We don't bill hourly and we never discount. In this post we share the pricing framework — fixed scopes, outcome bonuses, rolling retainers — and why it's the single biggest driver of client satisfaction.",
      },
    ],
  },
  legal: {
    privacy: {
      title: "Privacy policy",
      updated: "Last updated: 20 April 2026",
      sections: [
        {
          h: "What we collect",
          p: "We collect only what's needed to operate the product — the name, email and prompts you submit through the app, and standard server logs.",
        },
        {
          h: "How we use it",
          p: "To reply to you, to keep the site secure, and to improve the product. We don't sell data and we don't run third-party ad trackers.",
        },
        {
          h: "Where it lives",
          p: "Data is stored in EU-West-1 with a 30-day retention window for operational logs and a 24-month window for customer records.",
        },
        {
          h: "Your rights",
          p: "You can request access, export, or deletion at any time by emailing hello@texttoimage.studio. We reply within 72 hours.",
        },
        {
          h: "Cookies",
          p: "Essential cookies only. We don't set marketing or analytics cookies without explicit consent.",
        },
      ],
    },
    terms: {
      title: "Terms of service",
      updated: "Last updated: 20 April 2026",
      sections: [
        {
          h: "Agreement",
          p: "By engaging text to image, you agree to these terms alongside the specific statement of work signed for your project.",
        },
        {
          h: "Deliverables & IP",
          p: "All work product transfers to the client on final payment, except for reusable internal tooling and prior-art libraries.",
        },
        {
          h: "Payment",
          p: "50% on kick-off, 50% on delivery for fixed-fee work. Retainers are billed monthly in advance.",
        },
        {
          h: "Confidentiality",
          p: "We treat everything shared with us as confidential. Mutual NDAs are available on request.",
        },
        {
          h: "Liability",
          p: "Our liability is capped at the fees paid for the engagement giving rise to the claim. We carry professional indemnity insurance.",
        },
        {
          h: "Termination",
          p: "Either party may terminate with 14 days' notice. Work in progress is invoiced up to the termination date.",
        },
      ],
    },
  },
  notFound: {
    code: "404",
    title: "This page went off-prompt.",
    body: "The page you're looking for doesn't exist — maybe a stale link, maybe a typo. Let's get you back on track.",
    cta: "Back to home",
    secondary: "Browse our work",
  },
  footer: {
    madeWith: "Made with ❤️ in London, Dubai and Riyadh.",
    rights: "All rights reserved.",
    product: "Product",
    company: "Company",
    resources: "Resources",
    legal: "Legal",
    subscribe: "Get field notes in your inbox",
    subscribeCta: "Subscribe",
    subscribePh: "you@company.com",
  },
  common: {
    learnMore: "Learn more",
    seeAll: "See all",
    readMore: "Read more",
    loading: "Loading...",
    empty: "Nothing here yet.",
    emptyHint: "Check back soon — new work ships every month.",
    retry: "Retry",
    error: "Something went wrong.",
    openInNew: "Opens in a new tab",
  },
  cta: {
    title: "Have an idea? Let's make it.",
    body: "A 45-minute call with a principal is the fastest way to find out if we're a fit.",
    primary: "Start your project",
    secondary: "Read FAQ",
  },
};

const ar: Dict = {
  brand: {
    name: "نص إلى صورة",
    tagline: "حوِّل الكلمات إلى عوالم.",
  },
  nav: {
    home: "الرئيسية",
    about: "من نحن",
    blog: "المقالات",
    dashboard: "لوحة التحكم",
    startProject: "افتح التطبيق",
    menu: "القائمة",
    close: "إغلاق",
  },
  hero: {
    eyebrow: "استوديو صور ذكي · لصنّاع المحتوى",
    title: "ولِّد صورًا سينمائية من جملة واحدة.",
    subtitle:
      "نص إلى صورة استوديو برمجي يبني حزمة إبداعية ذكية للأجهزة المحمولة — تطبيقات تحويل النص إلى صورة، خطوط إنتاج للعلامات، وتدفقات تعمل على الجهاز، لفرق تتحرك بسرعة.",
    primaryCta: "ابدأ مشروعك",
    secondaryCta: "شاهد أعمالنا",
    promptPlaceholder:
      "صف حملتك القادمة — مثال: «شارع سايبربانك بأضواء نيون عند منتصف الليل، سينمائي، ٣٥ ملم»",
    promptHelper: "اضغط ⏎ للتوليد · بحد أقصى ١٠ ميغابايت · ارفع الحد إلى ٥ غيغابايت بالترقية",
    promptSubmit: "ولِّد",
    promptAttach: "إرفاق صورة مرجعية",
    forPlatform: "لأجهزة iPhone",
  },
  why: {
    eyebrow: "لماذا تختارنا الفرق",
    title: "إتقان الاستوديو، بسرعة فريق المنتج.",
    subtitle:
      "فريق صغير من كبار المهندسين والمصممين. تحصل على عناية الاستوديو، وإيقاع فريق منتج.",
    items: [
      {
        title: "إطلاق خلال أسابيع لا أرباع",
        body: "نطاق واضح، عروض أسبوعية، وكود جاهز للإنتاج من اليوم الأول.",
      },
      {
        title: "جودة هندسية",
        body: "قواعد كود مُصنَّفة، اختبارات آلية، ومراقبة مدمجة — لا ترقيعات.",
      },
      {
        title: "الأمان أولًا",
        body: "أسرار محفوظة في خزائن، أقل الصلاحيات، وخطوط إنتاج محصّنة.",
      },
      {
        title: "يتوسع معك",
        body: "معمارية جاهزة لنمو عشرة أضعاف — من نسخة أولى إلى نشر متعدد المناطق.",
      },
      {
        title: "تصميم يحوّل",
        body: "واجهات يُكمل المستخدم فيها المهمة — لا مجرد لقطات جميلة.",
      },
      {
        title: "دعم دائم",
        body: "مهندس مخصص على سلاك، واتفاقيات خدمة مكتوبة.",
      },
      {
        title: "بناء مخصص",
        body: "لا قوالب جاهزة. كل مشروع يُقاس بمؤشراتك أنت.",
      },
      {
        title: "ملاءمة دقيقة للمنتج",
        body: "نتخلّى عن أي ميزة لا تحرك مؤشرات مستخدميك.",
      },
    ],
  },
  launch: {
    tagline: "استوديو الصور الذكي",
    loadingLabel: "جارٍ تجهيز اللوحة",
    continueLabel: "دخول",
  },
  dashboard: {
    eyebrow: "مساحة العمل",
    welcomeTitle: "أهلًا بعودتك.",
    welcomeSubtitle:
      "لوحة استوديوك في لمحة — ولِّد صورًا جديدة، راجع أحدث تشغيلاتك، وتابع رصيدك الإبداعي.",
    stats: [
      { label: "صور مولَّدة", value: "١٢٧", hint: "+١٨ هذا الأسبوع" },
      { label: "رصيد متبقٍّ", value: "٣٧٣", hint: "من أصل ٥٠٠ شهريًا" },
      { label: "متوسط الجودة", value: "٤٫٨★", hint: "عبر ٤٢ تشغيلًا" },
      { label: "سلسلة الاستخدام", value: "٦ أيام", hint: "حافظ عليها" },
    ],
    promptTitle: "ولِّد صورة",
    promptSubtitle:
      "صف ما تريد رؤيته. كن دقيقًا في المزاج، الإضاءة، الإطار، والأسلوب.",
    promptPlaceholder:
      "مثال: «شارع سايبربانك بأضواء نيون عند منتصف الليل، لقطة سينمائية عريضة، فيلم ٣٥ ملم، مطر على الإسفلت»",
    promptHelper: "اضغط ⏎ للتوليد · رصيد واحد لكل صورة · رقِّ اشتراكك للطابور المتقدم",
    promptSubmit: "ولِّد",
    promptSending: "جارٍ التوليد…",
    promptSuccess: "تمت الإضافة إلى الطابور. ستظهر في التشغيلات الأخيرة.",
    promptAttach: "إرفاق صورة مرجعية",
    aspectLabel: "نسبة الإطار",
    aspects: [
      { value: "1:1", label: "مربع ١:١" },
      { value: "3:2", label: "أفقي ٣:٢" },
      { value: "2:3", label: "عمودي ٢:٣" },
      { value: "16:9", label: "عريض ١٦:٩" },
    ],
    styleLabel: "الأسلوب",
    styles: [
      { value: "cinematic", label: "سينمائي" },
      { value: "photoreal", label: "واقعي فوتوغرافي" },
      { value: "editorial", label: "تحريري" },
      { value: "illustration", label: "رسم تصويري" },
    ],
    recentTitle: "التشغيلات الأخيرة",
    recentEmpty: "لا شيء هنا بعد. ستظهر صورك المولَّدة هنا.",
    recentItems: [
      {
        prompt: "شارع سايبربانك بأضواء نيون عند منتصف الليل، لقطة سينمائية عريضة",
        time: "قبل دقيقتين",
        style: "سينمائي · ١٦:٩",
      },
      {
        prompt: "بورتريه تحريري لطاهٍ في إضاءة صباحية ناعمة، ٥٠ ملم",
        time: "قبل ساعة",
        style: "تحريري · ٢:٣",
      },
      {
        prompt: "رسم إيزومتري لبيت زجاجي صغير، ألوان باستيل",
        time: "أمس",
        style: "رسم تصويري · ١:١",
      },
    ],
    tipsTitle: "نصائح",
    tips: [
      "سمِّ الوسيلة — «فيلم ٣٥ ملم»، «زيت على قماش»، «رسم متجهي إيزومتري» — لتوجيه النموذج بقوة.",
      "كلمات الإضاءة مثل «إضاءة خلفية»، «ساعة ذهبية»، «ظل وضوء»، تغيّر المزاج بالكامل.",
      "احفظ الموجهات القوية في مكتبتك لتعيد تشغيلها بتنويعات.",
    ],
  },
  about: {
    eyebrow: "من نحن",
    title: "فريق أول يبني كشركة منتج.",
    body: "نص إلى صورة استوديو من مهندسين ومصممين يشحنون برمجيات الذكاء الاصطناعي للفرق التي لا تقبل التنازل. نقف بين الوكالة البوتيك والفريق الداخلي — قريبون كفاية لنهتم، مستقلون كفاية لنقول الحقيقة.",
    visionTitle: "الرؤية",
    visionBody:
      "أن يصبح العمل الإبداعي محادثة — حيث تتحوّل الجملة إلى منتج، إلى حملة، إلى علامة.",
    missionTitle: "الرسالة",
    missionBody:
      "نرافق المؤسسين والفرق الطموحة لتحويل أفكار الذكاء الاصطناعي إلى منتجات مطلقة وقابلة للتوسع — بالعربية والإنجليزية، على الجوال والويب.",
    philosophyTitle: "الفلسفة",
    philosophyBody:
      "نؤمن أن البرمجيات حرفة. نُبقي الفرق صغيرة، ونكتب كودًا نريد قراءته بعد سنتين، ونقيس كل ميزة بمهمة المستخدم الحقيقية.",
    methodTitle: "كيف نحوّل الأفكار إلى منتجات",
    methodBody:
      "منهجية من ثماني مراحل — من الرسم الأول إلى الإطلاق وما بعده — مصمَّمة لتقليل المخاطر في المشاريع الطموحة.",
    statsTitle: "بالأرقام",
    stats: [
      { value: "+٤٠", label: "منتج مطلق" },
      { value: "٨ سنوات", label: "متوسط خبرة المهندس" },
      { value: "١٢", label: "دولة نخدمها" },
      { value: "٤٫٩★", label: "متوسط تقييم العملاء" },
    ],
    teamTitle: "الفريق",
    team: [
      { name: "سيتو كايبا", role: "المؤسس والمهندس الأول" },
      { name: "لينا حداد", role: "مديرة التصميم" },
      { name: "عمر فاروق", role: "مهندس رئيسي" },
      { name: "مايا إيتو", role: "قائدة المنتج" },
    ],
  },
  process: {
    eyebrow: "آلية العمل",
    title: "من جملة إلى منتج مُطلق.",
    subtitle:
      "ثماني مراحل مركّزة. دون تسليمات بين فرق. من يصمّم هو من يشحن.",
    steps: [
      {
        n: "٠١",
        title: "فهم الفكرة",
        body: "نجلس مع المشكلة، المستخدمين، والقيود قبل كتابة أي سطر.",
      },
      {
        n: "٠٢",
        title: "التحليل",
        body: "ندرس البيانات، الأسواق، والأنظمة القائمة ليكون القرار مبنيًّا لا تخمينًا.",
      },
      {
        n: "٠٣",
        title: "التخطيط",
        body: "خارطة طريق بنطاق واضح ومعالم ومخاطر ومؤشرات نجاح.",
      },
      {
        n: "٠٤",
        title: "التصميم",
        body: "تدفقات عالية الدقة في Figma — تفاعل، حركة، ودعم RTL من اليوم الأول.",
      },
      {
        n: "٠٥",
        title: "البرمجة",
        body: "كود مُصنَّف، تدفقات مختبرة، وعروض أسبوعية على بيئة التجريب عندك.",
      },
      {
        n: "٠٦",
        title: "الاختبار",
        body: "اختبارات آلية وبشرية عبر الأجهزة، تشمل الوصول وميزانية الأداء.",
      },
      {
        n: "٠٧",
        title: "الإطلاق",
        body: "تقديم للمتاجر، إطلاق الموقع، تدريب داخلي — نتولّى يوم الشحن.",
      },
      {
        n: "٠٨",
        title: "الدعم والتحسين",
        body: "عقد متجدد بمراجعات شهرية، لوحات بيانات، وقائمة تحسينات مشتركة.",
      },
    ],
  },
  testimonials: {
    eyebrow: "العملاء",
    title: "يثق بنا فرق نفخر بشراكتها.",
    subtitle:
      "كلمات من المؤسسين، قادة المنتج، وأصحاب الوكالات الذين نبني معهم.",
    items: [
      {
        quote:
          "أنجزوا في ستة أسابيع ما عجزت عنه شركتنا السابقة في ستة أشهر — وكان أنظف كود ورثناه.",
        name: "نور السيّد",
        role: "شريكة مؤسّسة، Pollinate",
        rating: 5,
      },
      {
        quote:
          "فريق أول يقول لا عندما تكون الفكرة سيئة. هذه الصراحة وفّرت علينا ربعًا ماليًا.",
        name: "ديفيد تشين",
        role: "المدير التقني، Studio Cloud",
        rating: 5,
      },
      {
        quote:
          "دعم اللغة العربية من الطراز الأول لا مجرد إضافة. إطلاقنا في MENA كان الأقوى منذ اليوم الأول.",
        name: "فاطمة الراشد",
        role: "مديرة المنتج، Halo",
        rating: 5,
      },
      {
        quote:
          "عروض أسبوعية، ميزانيات واضحة، وبلا دراما. يعملون كأنهم فريقنا الداخلي.",
        name: "مارتا نوفاك",
        role: "مؤسِّسة، Lumen Lab",
        rating: 5,
      },
    ],
  },
  faq: {
    eyebrow: "الأسئلة الشائعة",
    title: "إجابات مباشرة.",
    subtitle:
      "إن لم تجد سؤالك، راسلنا على البريد وسيردّ أحد المؤسسين خلال ٢٤ ساعة.",
    items: [
      {
        q: "كيف يبدأ التعاون عادةً؟",
        a: "نبدأ بمكالمة استكشاف مجانية مدتها ٤٥ دقيقة. إذا كان التوافق جيدًا، نرسل مقترحًا بنطاق واضح خلال أسبوع — برسوم ثابتة أو عقد شهري.",
      },
      {
        q: "هل تعملون بالعربية؟",
        a: "نعم. فريقنا ناطق بالعربية والإنجليزية، وكل ما نطلقه يدعم RTL بالكامل — طباعة وتخطيطًا وتحريرًا للمحتوى.",
      },
      {
        q: "هل يمكنكم استلام قاعدة كود قائمة؟",
        a: "في الغالب نعم. نبدأ بمراجعة أسبوعين: معمارية، تبعيات، اختبارات. وتحصل على تقرير مباشر وخارطة هجرة.",
      },
      {
        q: "كيف تسعّرون؟",
        a: "رسوم ثابتة للنطاقات المحددة، وعقد شهري للأعمال المستمرة. لا فوترة بالساعة — نُحاذي الحوافز مع النتائج.",
      },
      {
        q: "من يملك الملكية الفكرية؟",
        a: "أنت. الكود والتصاميم وأصول العلامة تنتقل لك عند السداد النهائي — دون قيود أو ارتهان للمورّد.",
      },
      {
        q: "هل هناك ضمان؟",
        a: "نعم. إذا لم ترضَ في أول أسبوعين نتوقف ونفوتر فقط ما سلّمناه.",
      },
    ],
  },
  social: {
    twitter: "تويتر",
    linkedin: "لينكدإن",
    github: "جيت هاب",
    instagram: "إنستغرام",
  },
  blog: {
    eyebrow: "مقالات",
    title: "ملاحظات ميدانية عن الذكاء الاصطناعي والتصميم والشحن.",
    subtitle:
      "مقالات قصيرة من الفريق — بلا أدبيات، فقط ما تعلّمناه هذا الأسبوع.",
    readMore: "اقرأ المقال",
    backToBlog: "عودة إلى المقالات",
    minutes: "دقيقة قراءة",
    posts: [
      {
        slug: "shipping-rtl-first",
        title: "الشحن بدعم RTL أولًا: قرارات صغيرة تتراكم.",
        excerpt:
          "العربية ليست مشروع ترجمة — بل قرار نظام تصميم. إليك كيف نبنيها من اليوم الأول.",
        date: "٢٠٢٦-٠٤-٢٠",
        author: "لينا حداد",
        minutes: 6,
        body: "كل فريق يقول إنه يدعم العربية. قليلون من يشحنونها فعلًا في اليوم الأول. في هذا المقال نستعرض العشرين قرارًا صغيرًا — الخصائص المنطقية، عزل الاتجاه، تشكيل الأرقام، عكس الأيقونات — التي تتراكم لتجعل المنتج محليًا في الاتجاهين.",
      },
      {
        slug: "prompt-caches-that-scale",
        title: "ذاكرة محررات قابلة للتوسع — دون أن تصبح عبئًا.",
        excerpt:
          "نمط للتوليد الحتمي، وإعادة الاستخدام الآمنة، وضبط التكلفة في منتجات تحويل النص إلى صورة.",
        date: "٢٠٢٦-٠٤-١٢",
        author: "عمر فاروق",
        minutes: 8,
        body: "تخزين نتائج توليد الذكاء الاصطناعي يبدو بسيطًا حتى أول مراجعة قانونية. نشارك المخطط الذي نستخدمه في الإنتاج — روابط موقّعة، تخزين معنون بالمحتوى، ونطاق لكل مستأجر — والأخطاء التي نفضل أن تتجنبها.",
      },
      {
        slug: "small-teams-big-products",
        title: "فِرق صغيرة، منتجات كبيرة: دليل استوديو من ٨ أشخاص.",
        excerpt:
          "كيف نشحن برمجيات فوق حجمنا — ولماذا لن نصبح ٥٠ شخصًا أبدًا.",
        date: "٢٠٢٦-٠٣-٣٠",
        author: "سيتو كايبا",
        minutes: 5,
        body: "حدّدنا حجم الاستوديو بثمانية أشخاص عن قصد. هذا هو نظام التشغيل — طقوس، أدوار، والشيء الوحيد الذي نرفض تفويضه — الذي يتيح لفريق صغير أن يؤدي كفريق أكبر بكثير.",
      },
      {
        slug: "designing-the-prompt-box",
        title: "تصميم صندوق المحرر بوصفه المنتج.",
        excerpt:
          "المدخل هو الواجهة. إليك كيف نصممه كسطح من الدرجة الأولى.",
        date: "٢٠٢٦-٠٣-١٨",
        author: "لينا حداد",
        minutes: 7,
        body: "إن كان المستخدم يقضي ٧٠٪ من جلسته في مربع نص، فهذا المربع هو المنتج. نفكّك حالات صندوق المحرر الخمس — فارغ، كتابة، إرسال، خطأ، وعودة — والتفاصيل التي تجعل كلًا منها يشعر بالفخامة.",
      },
      {
        slug: "fluttering-toward-50",
        title: "تحليق نحو ٥٠ مليون توليد شهريًا.",
        excerpt:
          "دروس تشغيلية من إدارة عميل Flutter على نطاق جاد.",
        date: "٢٠٢٦-٠٣-٠٥",
        author: "عمر فاروق",
        minutes: 9,
        body: "شحن Flutter إلى المتجر سهل. تشغيله عند عشرات الملايين من التوليدات دون أن تنهار قناة الدعم ليس كذلك. نشارك القياسات، أنماط التعطّل، واستراتيجية الإطلاق التي نتبعها.",
      },
      {
        slug: "pricing-without-guilt",
        title: "التسعير دون ذنب: كيف نسعّر هندسة بوتيك.",
        excerpt:
          "منهجية تسعير تُحاذي الحوافز — وتُبقي المحادثة صريحة.",
        date: "٢٠٢٦-٠٢-٢٢",
        author: "مايا إيتو",
        minutes: 4,
        body: "لا نفوتر بالساعة ولا نُخفّض. نشارك في هذا المقال منهجية التسعير — نطاقات ثابتة، مكافآت نتائج، عقود متجددة — ولماذا تعدّ أكبر محرّك لرضا العميل.",
      },
    ],
  },
  legal: {
    privacy: {
      title: "سياسة الخصوصية",
      updated: "آخر تحديث: ٢٠ أبريل ٢٠٢٦",
      sections: [
        {
          h: "ما نجمعه",
          p: "نجمع فقط ما يلزم لتشغيل الموقع والرد على استفساراتك — الاسم والبريد ووصف المشروع الذي تُرسله عبر نموذج التواصل، وسجلات الخادم القياسية.",
        },
        {
          h: "كيف نستخدمه",
          p: "للرد عليك، ولحماية الموقع، ولتحسين المنتج. لا نبيع البيانات ولا نستخدم متعقّبات إعلانات خارجية.",
        },
        {
          h: "أين تُخزَّن",
          p: "في منطقة EU-West-1 مع فترة احتفاظ ٣٠ يومًا للسجلات التشغيلية و٢٤ شهرًا لسجلات العملاء.",
        },
        {
          h: "حقوقك",
          p: "يمكنك طلب الوصول أو التصدير أو الحذف في أي وقت عبر hello@texttoimage.studio. نردّ خلال ٧٢ ساعة.",
        },
        {
          h: "ملفات تعريف الارتباط",
          p: "أساسية فقط. لا نضع كوكيز تسويق أو تحليلات دون موافقتك الصريحة.",
        },
      ],
    },
    terms: {
      title: "الشروط والأحكام",
      updated: "آخر تحديث: ٢٠ أبريل ٢٠٢٦",
      sections: [
        {
          h: "الاتفاقية",
          p: "بالتعاقد مع «نص إلى صورة» فأنت توافق على هذه الشروط إلى جانب عقد العمل الموقّع لمشروعك.",
        },
        {
          h: "التسليمات والملكية الفكرية",
          p: "تنتقل جميع المخرجات إلى العميل عند السداد النهائي، باستثناء الأدوات الداخلية القابلة لإعادة الاستخدام والمكتبات السابقة.",
        },
        {
          h: "الدفع",
          p: "٥٠٪ عند البدء و٥٠٪ عند التسليم للأعمال ذات الرسوم الثابتة. العقود الشهرية تُفوتَر مقدّمًا.",
        },
        {
          h: "السرية",
          p: "نعامل كل ما يُشارك معنا كسرّ مهني. اتفاقيات عدم الإفصاح المتبادلة متاحة عند الطلب.",
        },
        {
          h: "المسؤولية",
          p: "مسؤوليتنا محدودة بمبلغ الرسوم المدفوعة للمشروع محل المطالبة. نحمل تأمين مسؤولية مهنية.",
        },
        {
          h: "إنهاء التعاقد",
          p: "يمكن لأي طرف الإنهاء بإشعار ١٤ يومًا. يُفوتَر العمل الجاري حتى تاريخ الإنهاء.",
        },
      ],
    },
  },
  notFound: {
    code: "٤٠٤",
    title: "هذه الصفحة خرجت عن السياق.",
    body: "الصفحة التي تبحث عنها غير موجودة — ربما رابط قديم أو خطأ إملائي. لنعد بك إلى المسار.",
    cta: "عودة إلى الرئيسية",
    secondary: "تصفّح أعمالنا",
  },
  footer: {
    madeWith: "صُنع بـ ❤️ في لندن، دبي، والرياض.",
    rights: "جميع الحقوق محفوظة.",
    product: "المنتج",
    company: "الشركة",
    resources: "مصادر",
    legal: "قانوني",
    subscribe: "احصل على ملاحظاتنا الميدانية في بريدك",
    subscribeCta: "اشتراك",
    subscribePh: "you@company.com",
  },
  common: {
    learnMore: "اقرأ المزيد",
    seeAll: "عرض الكل",
    readMore: "اقرأ المزيد",
    loading: "جارٍ التحميل...",
    empty: "لا شيء هنا بعد.",
    emptyHint: "عُد قريبًا — أعمال جديدة كل شهر.",
    retry: "أعد المحاولة",
    error: "حدث خطأ ما.",
    openInNew: "يفتح في علامة تبويب جديدة",
  },
  cta: {
    title: "لديك فكرة؟ لنصنعها.",
    body: "مكالمة ٤٥ دقيقة مع أحد المؤسسين هي أسرع طريقة لمعرفة إن كنا الشريك المناسب.",
    primary: "ابدأ مشروعك",
    secondary: "اقرأ الأسئلة الشائعة",
  },
};

const dictionaries: Record<Locale, Dict> = {
  en,
  ar,
};

export function getDictionary(locale: Locale): Dict {
  return dictionaries[locale];
}
