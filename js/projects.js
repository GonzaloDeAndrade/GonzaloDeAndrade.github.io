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
    cover: 'assets/projects/prende/grid.webp',
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
        { src: 'assets/projects/prende/grid.webp', alt: 'Grid review mode with clip cards', caption: 'Grid mode: each candidate shows its hook type, duration and the AI’s reason for keeping or rejecting it.' },
        { src: 'assets/projects/prende/grid2.webp', alt: 'Clip editing controls: edit rhythm, subtitle color, filmstrip trim and detected pauses', caption: 'Per-clip editing: rhythm, subtitle color, filmstrip trim and a list of detected pauses you can restore.' },
        { src: 'assets/projects/prende/card.webp', alt: 'Single clip card close-up', caption: 'A single clip card, flagged as one of the most replayed parts of the source video.' },
        { src: 'assets/projects/prende/empty.webp', alt: 'Prende main toolbar', caption: 'Main toolbar: video source, content category, number of clips, analysis speed and an optional request to the AI.' },
      ],
      note: 'Screenshots are from the real app running locally. The source videos in them are third-party test content and are not part of the project.',
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
  {
    id: 'stripe-zoho',
    name: 'Stripe → Zoho CRM',
    tagline: 'Payment data integration and analytics',
    summary:
      'Stripe integrated with Zoho CRM through a Deluge function exposed as a webhook endpoint. The data was then analyzed in Zoho Analytics with SQL queries, reports and charts.',
    status: 'pending',
    statusLabel: 'Case study coming soon',
    area: 'Integrations · Analytics',
    tags: ['Stripe', 'Zoho CRM', 'Deluge', 'Webhooks', 'Zoho Analytics', 'SQL'],
  },
  {
    id: 'sin-collar',
    name: 'Sin Collar',
    tagline: 'Pet adoption website',
    summary: 'A pet adoption website developed with Angular.',
    status: 'pending',
    statusLabel: 'Case study coming soon',
    area: 'Frontend',
    tags: ['Angular'],
    repo: 'https://github.com/GonzaloDeAndrade/Proyecto-sin-collar',
  },
];
