// Project data. To add a project: append an object to PROJECTS.
// Only `id`, `name`, `summary`, `status` and `tags` are required —
// every case study section is optional and only renders when present.
//
// status: 'active' | 'deployed' | 'demo' | 'offline' | 'pending'
window.PROJECTS = [
  {
    id: 'prende',
    name: 'Prende',
    tagline: 'AI video clipping for Spanish-speaking creators',
    summary:
      'A web app that takes a long video (podcast, interview, live stream), finds the strongest moments and turns them into vertical 9:16 clips with burned-in subtitles, ready for TikTok, Reels and Shorts.',
    status: 'active',
    statusLabel: 'In active development · runs locally',
    area: 'Full-Stack · AI · Media processing',
    tags: ['Python', 'Flask', 'OpenAI API', 'faster-whisper', 'FFmpeg', 'yt-dlp', 'SQLite', 'JavaScript'],
    cover: 'assets/projects/prende/cover.webp',
    coverAlt: 'Prende review screen: clip cards with AI score, hook type, duration and the reason each clip was selected',
    repo: 'https://github.com/GonzaloDeAndrade/prende',
    caseStudy: {
      overview:
        'Prende is a clipping tool built for Latin American Spanish content. You upload a long video or paste a YouTube link, and the app transcribes it, analyzes audio and image, selects the best moments, and renders each one as a vertical clip with animated subtitles. The selection criteria are tuned for Latin American slang and humor instead of translated from English-language rules.',
      problem:
        'Cutting clips from a 1–2 hour stream by hand takes hours. Existing tools are designed around English content, so they often miss what is actually funny or interesting in Spanish, and they struggle with chaotic formats like group streams where several people talk at the same time.',
      solution: [
        'Transcription with faster-whisper, keeping word-level timestamps for precise cuts and subtitles.',
        'A two-pass LLM selection: the first pass proposes candidate moments (indices are validated against the real transcript to avoid hallucinated ranges); the second pass compares all candidates against each other and drops the weak ones.',
        'Extra signals that force candidates the LLM could miss: audio energy / laughter peaks, notable visual moments from frame analysis, and YouTube’s public “most replayed” heatmap when the video comes from YouTube.',
        'Six content categories (streaming, educational, comedy, motivation, reaction, opinion) that adjust the selection criteria, because a good clip looks different in each genre.',
        'FFmpeg rendering to 9:16 with zoom and karaoke-style subtitles (the current word is highlighted).',
        'Automatic removal of dead pauses inside each clip, with three editing rhythms and a per-pause checkbox to undo any cut.',
      ],
      features: [
        'Upload a file (chunked upload) or download from a YouTube link',
        'Three analysis speeds: audio only, light image analysis, or full audio + image',
        'Choose how many clips you want (5 / 10 / 20); the AI ranks and pre-selects the best ones',
        'Optional free-text request to the AI (e.g. “the moments where he laughs hard”)',
        'Two review modes: one-by-one (keep / discard) and a grid with all clips at once',
        'Trim each clip on a filmstrip of real thumbnails, and restore the original AI cut',
        'Subtitle highlight colors and batch actions for all clips',
        'Real API cost tracking per video',
        'Guided onboarding tutorial for first-time users',
      ],
      challenges: [
        {
          title: 'Clips that were “long enough” on paper but not in practice',
          text: 'The clip-fitting step measured duration from the first to the last transcript segment. When that window contained real silence, the clip looked like 10 seconds but ended up around 5 after pauses were removed. I changed it to measure actual speech content at the word level, so the window keeps extending until it has enough real material.',
        },
        {
          title: 'Pause removal that destroyed natural rhythm',
          text: 'I measured internal pauses in about 1,500 published short clips that performed well. The median pause was ~0.9 s, so the old 0.8 s cut threshold was removing normal speaking rhythm, not dead air. Raising it to 1.5 s fixed clips that felt choppy and robotic.',
        },
        {
          title: 'Visual highlights deleted as “silence”',
          text: 'Moments detected only from the image (no dialogue) had zero words, so the pause detector saw them as one huge gap and cut them out. The fix was small and early in the pipeline: give each visual moment a synthetic word spanning its time range, so it is no longer treated as silence.',
        },
        {
          title: 'Validating the criteria with real data',
          text: 'I built a research pipeline that downloads and analyzes a corpus of real long videos and published clips, stored in SQLite, to check the selection rules against data instead of intuition — for example duration and pause patterns per hook type.',
        },
      ],
      contribution:
        'Personal project. I defined the product, the selection approach and the evaluation method, and tested every change against real videos — tracing each missed moment back to the exact step where the pipeline failed. Development was AI-assisted (see the note in the About section).',
      gallery: [
        { src: 'assets/projects/prende/grid.webp', alt: 'Grid review mode: vertical clip previews with AI title, hook type, duration and reasoning', caption: 'Grid mode: every candidate clip rendered in 9:16, with its hook type, duration and the AI’s reason for keeping or rejecting it. Fire badges mark the recommended ones.' },
        { src: 'assets/projects/prende/deck.webp', alt: 'One-by-one review mode with a single recommended clip and keep/discard buttons', caption: 'One-by-one mode: review each clip and keep or discard it. This one is flagged as one of the most replayed parts of the source video (YouTube heatmap, 72%).' },
        { src: 'assets/projects/prende/editing.webp', alt: 'Clip editing controls: edit rhythm, subtitle color, filmstrip trim and detected pauses', caption: 'Per-clip editing: rhythm, subtitle color, filmstrip trim and the list of auto-removed pauses — uncheck one to bring it back.' },
        { src: 'assets/projects/prende/toolbar.webp', alt: 'Prende main toolbar', caption: 'Toolbar: video source, content category, number of clips, analysis speed and an optional request to the AI.' },
      ],
      note: 'Screenshots are from the real app running locally. The source videos in them are third-party test content and are not part of the project.',
    },
  },
  {
    id: 'vbagente',
    name: 'VB Agente',
    tagline: 'Marketing automation for Meta Ads — built at Vamos Bien',
    summary:
      'An internal tool for a digital marketing agency: it reads campaign metrics from the Meta Marketing API, flags performance problems with clear rules, and creates complete test campaigns (campaign, ad set, creative and ad) from a simple web form.',
    status: 'active',
    statusLabel: 'Internal tool · prototype',
    area: 'Backend · API Integrations · Automation',
    tags: ['Node.js', 'TypeScript', 'Express 5', 'Meta Marketing API', 'Multer'],
    cover: 'assets/projects/vbagente/cover.webp',
    coverAlt: 'VB Agente web form after creating a campaign: success message with the new campaign, ad set and ad IDs',
    repo: 'https://github.com/GonzaloDeAndrade/VBAgente',
    caseStudy: {
      overview:
        'VB Agente is a Node.js + TypeScript tool I developed at Vamos Bien, a digital marketing agency. It connects to the Meta Marketing API to do two things: review the performance of existing ad campaigns and suggest what to fix, and create new test campaigns end to end without going through Ads Manager.',
      problem:
        'Reviewing many campaigns by hand in Meta Ads Manager is slow, and the warning signs (low CTR, ad fatigue, money spent without conversions) are easy to miss. Creating a campaign also means repeating the same multi-step setup every time.',
      solution: [
        'Optimization agent (CLI): lists every ad account the token can access, fetches campaigns and last-30-day insights in parallel, and prints each campaign with spend, impressions, clicks, CTR, CPC, frequency and conversions.',
        'Rule-based suggestions (no AI): low CTR (under 1%), high frequency (over 3.5, risk of ad fatigue), spend with zero conversions, CPC more than 1.5× the average of the account’s own campaigns, and active campaigns with no spend or no impressions.',
        'Web interface (Express 5 + server-rendered HTML): a form to choose objective, daily budget, headline, copy and image, which then chains the API calls — campaign → ad set → image upload → ad creative → ad.',
        'Image upload handled in memory with Multer (PNG/JPG up to 8 MB), with drag-and-drop and preview.',
        'Table with the campaigns that already exist in the account and their status.',
      ],
      features: [
        'Five campaign objectives: traffic, engagement, leads, sales and awareness',
        'Optional ad: without an image it creates only the campaign and the ad set',
        'Clear success and error messages, keeping the form values after an error',
        'Interface styled with the agency’s brand colors',
      ],
      challenges: [
        {
          title: 'Working safely against a real advertising API',
          text: 'Mistakes here cost real money. The interface is locked to a single test ad account, everything it creates starts PAUSED, and a separate test script creates, activates and pauses a campaign that has no ad sets, so it can never deliver or spend.',
        },
        {
          title: 'Benchmarks that make sense for each account',
          text: 'A “high” CPC depends on the account and the market. Instead of a fixed number, each campaign’s CPC is compared with the average CPC of the other campaigns in the same account.',
        },
        {
          title: 'A chain of dependent API calls',
          text: 'Each step needs the ID returned by the previous one (campaign → ad set → image hash → creative → ad). Budgets are sent in minor currency units (ARS × 100), as the API expects.',
        },
      ],
      contribution:
        'Developed at Vamos Bien (digital marketing agency): API integration, the suggestion rules, the web interface and the safety measures for testing.',
      gallery: [
        { src: 'assets/projects/vbagente/cli.webp', alt: 'Terminal output of the optimization agent with metrics and suggestions per campaign', caption: 'Optimization agent: metrics per campaign and rule-based suggestions — low CTR, spend without conversions, CPC above the account average, ad fatigue.' },
        { src: 'assets/projects/vbagente/form.webp', alt: 'Campaign creation form with objective, budget, headline, copy and image preview', caption: 'Creating a campaign: objective, daily budget, ad headline, copy and image with preview.' },
        { src: 'assets/projects/vbagente/created.webp', alt: 'Success message listing the created campaign, ad set and ad', caption: 'After submitting: campaign, ad set and ad created, all PAUSED, and the new campaign listed in the account table.' },
      ],
      note: 'Screenshots are from the real interface and CLI running locally, with the Meta API replaced by sample data so no real account is shown. Campaign names, metrics and IDs are fictional.',
    },
  },
  {
    id: 'magicweb',
    name: 'MagicWeb',
    tagline: 'E-commerce for Magic: The Gathering cards',
    summary:
      'Full-stack e-commerce with a product catalog, admin panel, online payment checkout and integration with the Scryfall API.',
    status: 'pending',
    statusLabel: 'Case study coming soon',
    area: 'Full-Stack · E-commerce',
    tags: ['Angular 19', 'TypeScript', 'Node.js', 'Express 5', 'MongoDB Atlas', 'Scryfall API'],
    repo: 'https://github.com/GonzaloDeAndrade/magicWebV2',
  },
  {
    id: 'zoho-rental',
    name: 'Rental Management',
    tagline: 'Business app built with Zoho Creator',
    summary:
      'A rental management application demo developed with Zoho Creator.',
    status: 'demo',
    statusLabel: 'Demo · case study coming soon',
    area: 'Zoho · Business apps',
    tags: ['Zoho Creator', 'Deluge'],
    demo: 'https://gonzalodeandrade.github.io/zoho-rental-management/',
  },
];
