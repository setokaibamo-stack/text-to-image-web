import type { Locale } from "./config";

export type Dict = {
  brand: { name: string; tagline: string };
  nav: {
    home: string;
    services: string;
    portfolio: string;
    about: string;
    blog: string;
    contact: string;
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
  services: {
    eyebrow: string;
    title: string;
    subtitle: string;
    viewAll: string;
    viewDetails: string;
    cta: string;
    detail: {
      deliverables: string;
      timeline: string;
      stack: string;
      nextStep: string;
    };
    items: {
      slug: string;
      title: string;
      tagline: string;
      body: string;
      deliverables: string[];
      timeline: string;
      stack: string[];
    }[];
  };
  portfolio: {
    eyebrow: string;
    title: string;
    subtitle: string;
    viewAll: string;
    viewCase: string;
    categoryLabel: string;
    allCategories: string;
    overview: string;
    highlights: string;
    outcomes: string;
    stack: string;
    nextProject: string;
    items: {
      slug: string;
      name: string;
      category: string;
      tagline: string;
      body: string;
      highlights: string[];
      outcomes: string[];
      stack: string[];
      color: string;
    }[];
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
  contact: {
    eyebrow: string;
    title: string;
    subtitle: string;
    form: {
      name: string;
      namePh: string;
      email: string;
      emailPh: string;
      phone: string;
      phonePh: string;
      service: string;
      servicePlaceholder: string;
      description: string;
      descriptionPh: string;
      submit: string;
      sending: string;
      success: string;
      error: string;
      required: string;
      invalidEmail: string;
    };
    info: {
      email: string;
      phone: string;
      address: string;
      hours: string;
      emailLabel: string;
      phoneLabel: string;
      addressLabel: string;
      hoursLabel: string;
    };
    social: { twitter: string; linkedin: string; github: string; instagram: string };
  };
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
    services: "Services",
    portfolio: "Portfolio",
    about: "About",
    blog: "Blog",
    contact: "Contact",
    startProject: "Start your project",
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
  services: {
    eyebrow: "What we build",
    title: "Services",
    subtitle: "Everything you need to ship a modern AI product.",
    viewAll: "All services",
    viewDetails: "View details",
    cta: "Talk to an engineer",
    detail: {
      deliverables: "Deliverables",
      timeline: "Typical timeline",
      stack: "Preferred stack",
      nextStep: "Start a conversation",
    },
    items: [
      {
        slug: "ai-product-engineering",
        title: "AI product engineering",
        tagline: "End-to-end builds — from prompt to production.",
        body: "We design, build and operate text-to-image products from the model layer up. Pollinations, SDXL, Flux, proprietary — we pick what fits.",
        deliverables: [
          "Prompt pipeline architecture",
          "Moderation + safety layer",
          "Generation cache + storage",
          "Usage metering and billing hooks",
        ],
        timeline: "6–10 weeks",
        stack: ["TypeScript", "Next.js", "Python", "Postgres", "Redis"],
      },
      {
        slug: "mobile-apps",
        title: "Mobile apps",
        tagline: "Flutter and native iOS / Android, done properly.",
        body: "Production-grade mobile clients with offline galleries, push, widgets, and camera-roll integration. Published to the stores, not just the simulator.",
        deliverables: [
          "Flutter or native client",
          "Store submission + review support",
          "Crashlytics + analytics",
          "Offline-first local store",
        ],
        timeline: "8–12 weeks",
        stack: ["Flutter", "Swift", "Kotlin", "Riverpod", "GoRouter"],
      },
      {
        slug: "design-systems",
        title: "Design systems",
        tagline: "Tokens, components, docs — ready for your team.",
        body: "A product-grade design system with Figma libraries, React primitives, and a governance model so your team stays on-brand at speed.",
        deliverables: [
          "Figma component library",
          "Code tokens + primitives",
          "Storybook + docs site",
          "Contribution guidelines",
        ],
        timeline: "4–6 weeks",
        stack: ["Figma", "React", "Tailwind", "Storybook"],
      },
      {
        slug: "marketing-sites",
        title: "Marketing sites",
        tagline: "High-converting sites that load in under a second.",
        body: "Editor-friendly marketing sites built on Next.js with a headless CMS — indexed, accessible, and RTL-ready on day one.",
        deliverables: [
          "Next.js + MDX setup",
          "CMS integration",
          "SEO + analytics",
          "Arabic / English RTL support",
        ],
        timeline: "3–5 weeks",
        stack: ["Next.js", "Sanity", "Tailwind", "Vercel"],
      },
      {
        slug: "scale-and-devops",
        title: "Scale & DevOps",
        tagline: "Ship to millions without waking up at 3am.",
        body: "Infra, CI/CD, observability and cost controls for teams crossing the 100k-user mark.",
        deliverables: [
          "Infrastructure as code",
          "CI/CD pipelines",
          "Monitoring + alerting",
          "Cost dashboards",
        ],
        timeline: "Ongoing retainer",
        stack: ["Terraform", "GitHub Actions", "Grafana", "Cloudflare"],
      },
      {
        slug: "support-retainers",
        title: "Support retainers",
        tagline: "A senior team on call, month to month.",
        body: "Fractional engineering for companies who need steady momentum without hiring full-time.",
        deliverables: [
          "Weekly planning rituals",
          "Shared Slack channel",
          "24h response SLA",
          "Quarterly architecture review",
        ],
        timeline: "Rolling monthly",
        stack: ["Your stack"],
      },
    ],
  },
  portfolio: {
    eyebrow: "Selected work",
    title: "Portfolio",
    subtitle: "A few recent builds — app stores, agencies, indie founders.",
    viewAll: "View all work",
    viewCase: "Open case study",
    categoryLabel: "Category",
    allCategories: "All",
    overview: "Overview",
    highlights: "Highlights",
    outcomes: "Outcomes",
    stack: "Stack",
    nextProject: "Next project",
    items: [
      {
        slug: "pollinate",
        name: "Pollinate",
        category: "Mobile app",
        tagline: "On-device prompt-to-picture, powered by Pollinations.",
        body: "A Flutter client with offline gallery, secure API keys, and a 500-entry local store. Arabic and English, fully RTL.",
        highlights: [
          "Sub-2s generation time",
          "500-entry local gallery",
          "Hardware-backed secret storage",
          "Full RTL Arabic support",
        ],
        outcomes: [
          "4.8★ average on TestFlight",
          "30% week-over-week retention",
        ],
        stack: ["Flutter", "Riverpod", "GoRouter", "Pollinations API"],
        color: "#1b1b1f",
      },
      {
        slug: "studio-cloud",
        name: "Studio Cloud",
        category: "Web platform",
        tagline: "Creative team workspace with shared boards and billing.",
        body: "A multi-tenant workspace for agencies to brief, generate and ship brand imagery — with approval flows and usage-based billing.",
        highlights: [
          "Multi-tenant workspaces",
          "Role-based approval flows",
          "Stripe metered billing",
          "Realtime collaboration",
        ],
        outcomes: [
          "$1.2M ARR in year one",
          "12 agency tenants onboarded",
        ],
        stack: ["Next.js", "Postgres", "Stripe", "tRPC"],
        color: "#0e1a2b",
      },
      {
        slug: "halo-brand",
        name: "Halo Brand",
        category: "Design system",
        tagline: "Figma + React system for a regional e-commerce group.",
        body: "A token-first design system with Arabic / English glyphs, governance docs, and a Storybook that doubles as product training material.",
        highlights: [
          "180+ Figma components",
          "Tokens in CSS, Swift, Kotlin",
          "Bilingual typographic scale",
        ],
        outcomes: [
          "70% faster screen delivery",
          "3 product teams unified",
        ],
        stack: ["Figma", "Storybook", "Tailwind"],
        color: "#24212b",
      },
      {
        slug: "lumen-lab",
        name: "Lumen Lab",
        category: "Marketing site",
        tagline: "Editor-friendly marketing site for an AI research lab.",
        body: "Next.js + Sanity site with MDX docs, RTL landing pages, and sub-second LCP across the catalogue.",
        highlights: [
          "0.9s LCP on 3G",
          "Sanity-powered authoring",
          "Full Arabic translations",
        ],
        outcomes: [
          "+220% organic signups",
          "Lighthouse 100 across the board",
        ],
        stack: ["Next.js", "Sanity", "Vercel"],
        color: "#151515",
      },
      {
        slug: "caravan-ops",
        name: "Caravan Ops",
        category: "Internal tools",
        tagline: "A logistics dashboard for a regional delivery network.",
        body: "An internal ops tool replacing seven spreadsheets — live fleet map, SLA monitoring and a driver mobile companion.",
        highlights: [
          "Live fleet map",
          "Custom SLA engine",
          "Driver companion app",
        ],
        outcomes: [
          "25% fewer missed SLAs",
          "4h/day saved per ops lead",
        ],
        stack: ["Next.js", "Postgres", "Flutter"],
        color: "#1a1f1a",
      },
      {
        slug: "inkwell",
        name: "Inkwell",
        category: "Mobile app",
        tagline: "An AI storybook generator for bilingual kids.",
        body: "A tablet-first reader that generates illustrated storybooks in Arabic and English, with parental controls and offline packs.",
        highlights: [
          "Bilingual on-device generation",
          "Offline packs under 50MB",
          "Parental content controls",
        ],
        outcomes: [
          "Featured by App Store MENA",
          "60k downloads in 8 weeks",
        ],
        stack: ["Flutter", "On-device ML", "Firebase"],
        color: "#1f1b14",
      },
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
  contact: {
    eyebrow: "Contact",
    title: "Tell us about your project.",
    subtitle:
      "A principal replies within one business day. No pitch decks required.",
    form: {
      name: "Your name",
      namePh: "Jane Appleseed",
      email: "Email",
      emailPh: "jane@company.com",
      phone: "Phone (optional)",
      phonePh: "+1 555 010 2030",
      service: "Service",
      servicePlaceholder: "Pick a service",
      description: "Project description",
      descriptionPh: "A few sentences on the problem, the audience, and any deadlines.",
      submit: "Send message",
      sending: "Sending...",
      success: "Thanks — we'll be in touch within one business day.",
      error: "Something went wrong. Please email us at hello@texttoimage.studio.",
      required: "Required",
      invalidEmail: "Enter a valid email.",
    },
    info: {
      email: "hello@texttoimage.studio",
      phone: "+44 20 4586 2100",
      address: "London · Dubai · Riyadh",
      hours: "Mon–Fri · 09:00–18:00 GMT",
      emailLabel: "Email",
      phoneLabel: "Phone",
      addressLabel: "Office",
      hoursLabel: "Hours",
    },
    social: {
      twitter: "Twitter",
      linkedin: "LinkedIn",
      github: "GitHub",
      instagram: "Instagram",
    },
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
          p: "We collect only what's needed to operate the site and respond to enquiries — the name, email and project description you submit through the contact form, and standard server logs.",
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
    services: "الخدمات",
    portfolio: "الأعمال",
    about: "من نحن",
    blog: "المقالات",
    contact: "تواصل",
    startProject: "ابدأ مشروعك",
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
  services: {
    eyebrow: "ما نبنيه",
    title: "الخدمات",
    subtitle: "كل ما تحتاجه لإطلاق منتج ذكاء اصطناعي حديث.",
    viewAll: "كل الخدمات",
    viewDetails: "عرض التفاصيل",
    cta: "تحدّث مع مهندس",
    detail: {
      deliverables: "المخرجات",
      timeline: "الجدول الزمني المعتاد",
      stack: "التقنيات المفضّلة",
      nextStep: "ابدأ المحادثة",
    },
    items: [
      {
        slug: "ai-product-engineering",
        title: "هندسة منتجات الذكاء الاصطناعي",
        tagline: "بناء شامل — من المحرر إلى الإنتاج.",
        body: "نصمم، نبني، ونشغّل منتجات تحويل النص إلى صورة من طبقة النموذج إلى واجهة المستخدم. نختار من بين Pollinations وSDXL وFlux والنماذج الخاصة بما يناسبك.",
        deliverables: [
          "بنية خط معالجة المحررات",
          "طبقة الفلترة والسلامة",
          "تخزين وذاكرة نتائج التوليد",
          "قياس الاستخدام وخطافات الفوترة",
        ],
        timeline: "٦–١٠ أسابيع",
        stack: ["TypeScript", "Next.js", "Python", "Postgres", "Redis"],
      },
      {
        slug: "mobile-apps",
        title: "تطبيقات الجوال",
        tagline: "Flutter وiOS/Android الأصلية، بإتقان.",
        body: "عملاء جوال بمستوى الإنتاج، مع معرض غير متصل، إشعارات، ودجت، وتكامل مع ذاكرة الصور. منشورة في المتاجر لا في المحاكي فقط.",
        deliverables: [
          "عميل Flutter أو أصلي",
          "تقديم للمتاجر ودعم المراجعة",
          "تحليلات وتقارير أعطال",
          "متجر محلي يعمل دون اتصال",
        ],
        timeline: "٨–١٢ أسبوعًا",
        stack: ["Flutter", "Swift", "Kotlin", "Riverpod", "GoRouter"],
      },
      {
        slug: "design-systems",
        title: "أنظمة التصميم",
        tagline: "رموز، مكونات، توثيق — جاهزة لفريقك.",
        body: "نظام تصميم بجودة منتج، مع مكتبة Figma، أساسيات React، ونموذج حوكمة يبقي فريقك على هوية موحدة بسرعة.",
        deliverables: [
          "مكتبة مكونات Figma",
          "رموز وأساسيات في الكود",
          "موقع توثيق Storybook",
          "دليل المساهمة",
        ],
        timeline: "٤–٦ أسابيع",
        stack: ["Figma", "React", "Tailwind", "Storybook"],
      },
      {
        slug: "marketing-sites",
        title: "مواقع تسويقية",
        tagline: "مواقع عالية التحويل تعمل في أقل من ثانية.",
        body: "مواقع تسويقية سهلة التحرير على Next.js مع نظام محتوى headless — مفهرسة، متاحة للجميع، وداعمة للعربية من اليوم الأول.",
        deliverables: [
          "إعداد Next.js + MDX",
          "تكامل مع CMS",
          "SEO وتحليلات",
          "دعم كامل للعربية والإنجليزية",
        ],
        timeline: "٣–٥ أسابيع",
        stack: ["Next.js", "Sanity", "Tailwind", "Vercel"],
      },
      {
        slug: "scale-and-devops",
        title: "التوسع وDevOps",
        tagline: "اشحن إلى الملايين دون سهر الليالي.",
        body: "بنية تحتية، خطوط CI/CD، مراقبة، وضبط للتكاليف للفرق التي تتجاوز مئة ألف مستخدم.",
        deliverables: [
          "بنية تحتية ككود",
          "خطوط CI/CD",
          "مراقبة وتنبيهات",
          "لوحات تحكم للتكاليف",
        ],
        timeline: "عقد شهري متجدد",
        stack: ["Terraform", "GitHub Actions", "Grafana", "Cloudflare"],
      },
      {
        slug: "support-retainers",
        title: "عقود دعم شهرية",
        tagline: "فريق أول بطلب — شهرًا فشهر.",
        body: "هندسة بدوام جزئي للشركات التي تحتاج زخمًا مستمرًا دون توظيف دائم.",
        deliverables: [
          "اجتماعات تخطيط أسبوعية",
          "قناة سلاك مشتركة",
          "استجابة خلال ٢٤ ساعة",
          "مراجعة معمارية كل ربع",
        ],
        timeline: "شهري متجدد",
        stack: ["حزمتك التقنية"],
      },
    ],
  },
  portfolio: {
    eyebrow: "أعمال مختارة",
    title: "الأعمال",
    subtitle: "أحدث ما أطلقناه — متاجر تطبيقات، وكالات، ومؤسسون مستقلون.",
    viewAll: "كل الأعمال",
    viewCase: "افتح دراسة الحالة",
    categoryLabel: "الفئة",
    allCategories: "الكل",
    overview: "نظرة عامة",
    highlights: "أبرز ما فيه",
    outcomes: "النتائج",
    stack: "التقنيات",
    nextProject: "المشروع التالي",
    items: [
      {
        slug: "pollinate",
        name: "Pollinate",
        category: "تطبيق جوال",
        tagline: "تحويل النص إلى صورة على الجهاز، بتقنية Pollinations.",
        body: "عميل Flutter بمعرض يعمل دون اتصال، تخزين آمن للمفاتيح، ومخزن محلي بسعة ٥٠٠ عنصر. إنجليزي وعربي، بدعم RTL كامل.",
        highlights: [
          "زمن توليد أقل من ثانيتين",
          "معرض محلي بسعة ٥٠٠ عنصر",
          "تخزين أسرار بدعم العتاد",
          "دعم عربي RTL كامل",
        ],
        outcomes: [
          "متوسط ٤٫٨ نجوم في TestFlight",
          "معدل احتفاظ أسبوعي ٣٠٪",
        ],
        stack: ["Flutter", "Riverpod", "GoRouter", "Pollinations API"],
        color: "#1b1b1f",
      },
      {
        slug: "studio-cloud",
        name: "Studio Cloud",
        category: "منصة ويب",
        tagline: "مساحة عمل للفرق الإبداعية مع لوحات مشتركة وفوترة.",
        body: "مساحة عمل متعددة المستأجرين للوكالات لإعداد الإيجازات، التوليد، وتسليم صور العلامة — مع مسارات موافقة وفوترة حسب الاستخدام.",
        highlights: [
          "مساحات عمل متعددة المستأجرين",
          "مسارات موافقة حسب الدور",
          "فوترة مقيسة عبر Stripe",
          "تعاون فوري",
        ],
        outcomes: [
          "١٫٢ مليون دولار إيرادات سنوية في العام الأول",
          "١٢ وكالة منضمّة",
        ],
        stack: ["Next.js", "Postgres", "Stripe", "tRPC"],
        color: "#0e1a2b",
      },
      {
        slug: "halo-brand",
        name: "Halo Brand",
        category: "نظام تصميم",
        tagline: "نظام Figma + React لمجموعة تجارة إلكترونية إقليمية.",
        body: "نظام تصميم قائم على الرموز، يدعم الحروف العربية والإنجليزية، بتوثيق حوكمة وStorybook يعمل كمواد تدريب للفرق.",
        highlights: [
          "أكثر من ١٨٠ مكونًا في Figma",
          "رموز في CSS وSwift وKotlin",
          "سلم طباعي ثنائي اللغة",
        ],
        outcomes: [
          "تسريع تسليم الشاشات ٧٠٪",
          "توحيد ثلاث فرق منتج",
        ],
        stack: ["Figma", "Storybook", "Tailwind"],
        color: "#24212b",
      },
      {
        slug: "lumen-lab",
        name: "Lumen Lab",
        category: "موقع تسويقي",
        tagline: "موقع تسويقي سهل التحرير لمختبر أبحاث ذكاء اصطناعي.",
        body: "موقع Next.js + Sanity بصفحات هبوط عربية، ومستندات MDX، وLCP أقل من ثانية عبر الكاتالوج.",
        highlights: [
          "LCP ٠٫٩ ثانية على شبكة 3G",
          "تحرير مدعوم بـ Sanity",
          "ترجمات عربية كاملة",
        ],
        outcomes: [
          "زيادة ٢٢٠٪ في التسجيلات العضوية",
          "١٠٠ على مؤشرات Lighthouse",
        ],
        stack: ["Next.js", "Sanity", "Vercel"],
        color: "#151515",
      },
      {
        slug: "caravan-ops",
        name: "Caravan Ops",
        category: "أدوات داخلية",
        tagline: "لوحة لوجستية لشبكة توصيل إقليمية.",
        body: "أداة عمليات داخلية تستبدل سبع جداول بيانات — خريطة أسطول فورية، مراقبة SLA، وتطبيق مرافق للسائقين.",
        highlights: [
          "خريطة أسطول حيّة",
          "محرك SLA مخصص",
          "تطبيق مرافق للسائقين",
        ],
        outcomes: [
          "انخفاض ٢٥٪ في SLA الفائتة",
          "توفير ٤ ساعات يوميًا لقائد العمليات",
        ],
        stack: ["Next.js", "Postgres", "Flutter"],
        color: "#1a1f1a",
      },
      {
        slug: "inkwell",
        name: "Inkwell",
        category: "تطبيق جوال",
        tagline: "مولّد قصص مصوّرة بالذكاء الاصطناعي للأطفال ثنائيي اللغة.",
        body: "قارئ بصيغة الجهاز اللوحي يولّد قصصًا مصوّرة بالعربية والإنجليزية، مع رقابة أبوية وحزم تعمل دون اتصال.",
        highlights: [
          "توليد ثنائي اللغة على الجهاز",
          "حزم دون اتصال أقل من ٥٠ ميغابايت",
          "رقابة أبوية للمحتوى",
        ],
        outcomes: [
          "تم عرضه في متجر تطبيقات MENA",
          "٦٠ ألف تنزيل في ٨ أسابيع",
        ],
        stack: ["Flutter", "ML على الجهاز", "Firebase"],
        color: "#1f1b14",
      },
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
  contact: {
    eyebrow: "تواصل",
    title: "حدّثنا عن مشروعك.",
    subtitle:
      "يردّ أحد المؤسسين خلال يوم عمل واحد. لا حاجة لعروض تقديمية.",
    form: {
      name: "اسمك",
      namePh: "مثلاً: سارة أحمد",
      email: "البريد الإلكتروني",
      emailPh: "sara@company.com",
      phone: "الهاتف (اختياري)",
      phonePh: "٠٥٠ ١٢٣ ٤٥٦٧",
      service: "الخدمة",
      servicePlaceholder: "اختر خدمة",
      description: "وصف المشروع",
      descriptionPh: "جمل قليلة عن المشكلة، الجمهور، وأي مواعيد نهائية.",
      submit: "أرسل الرسالة",
      sending: "جارٍ الإرسال...",
      success: "شكراً — سنتواصل خلال يوم عمل واحد.",
      error: "حدث خطأ ما. راسلنا على hello@texttoimage.studio.",
      required: "حقل مطلوب",
      invalidEmail: "أدخل بريدًا إلكترونيًا صالحًا.",
    },
    info: {
      email: "hello@texttoimage.studio",
      phone: "+44 20 4586 2100",
      address: "لندن · دبي · الرياض",
      hours: "الاثنين–الجمعة · ٠٩:٠٠–١٨:٠٠ غرينتش",
      emailLabel: "البريد",
      phoneLabel: "الهاتف",
      addressLabel: "المكتب",
      hoursLabel: "أوقات العمل",
    },
    social: {
      twitter: "تويتر",
      linkedin: "لينكدإن",
      github: "جيت هاب",
      instagram: "إنستغرام",
    },
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
