import { BusinessProfile, CustomerJourneyMap, JourneyStageData, JourneyStageId, Persona } from '../types';

export interface SampleBusinessPreset {
  id: string;
  name: string;
  category: string;
  description: string;
  pricingTier: BusinessProfile['pricingTier'];
  marketReach: BusinessProfile['marketReach'];
  distributionChannel: BusinessProfile['distributionChannel'];
}

export const SAMPLE_PRESETS: SampleBusinessPreset[] = [
  {
    id: 'b2b-saas',
    name: 'B2B Flow Automation',
    category: 'SaaS / Enterprise',
    description: 'An AI-powered client onboarding and workflow orchestration platform for mid-sized creative and tech agencies. We cut client ramp-up time from 3 weeks to 48 hours by synchronizing contracts, assets, and project boards.',
    pricingTier: 'mid',
    marketReach: 'global',
    distributionChannel: 'b2b_sales',
  },
  {
    id: 'eco-apparel',
    name: 'Loom & Earth',
    category: 'E-Commerce / DTC',
    description: 'A circular sustainable activewear brand crafting regenerative merino wool and ocean-recycled nylon garments for conscious runners and outdoor enthusiasts. Each purchase includes lifetime repair and free recycling trade-ins.',
    pricingTier: 'premium',
    marketReach: 'national',
    distributionChannel: 'direct_ecom',
  },
  {
    id: 'fintech-app',
    name: 'LedgerCraft',
    category: 'FinTech / Solopreneur',
    description: 'A mobile-first expense tracking and automated tax reserving app built specifically for independent creators and freelance consultants. We automate quarterly estimated tax filings and client invoicing in under 60 seconds.',
    pricingTier: 'budget',
    marketReach: 'national',
    distributionChannel: 'app_store',
  },
  {
    id: 'artisan-roastery',
    name: 'Altitude Coffee Guild',
    category: 'Omnichannel / Food & Bev',
    description: 'A single-origin specialty coffee subscription and micro-roaster partnership delivering fresh farm-traceable whole beans roasted within 24 hours of shipment, alongside regional sensory cafe tasting clubs.',
    pricingTier: 'mid',
    marketReach: 'national',
    distributionChannel: 'omnichannel',
  },
];

export function generateFallbackPersonas(business: BusinessProfile): Persona[] {
  const desc = business.description.toLowerCase();
  const isB2B = business.distributionChannel === 'b2b_sales' || desc.includes('agency') || desc.includes('b2b') || desc.includes('enterprise') || desc.includes('team') || desc.includes('client');
  const isBudget = business.pricingTier === 'budget';
  const isPremium = business.pricingTier === 'premium' || business.pricingTier === 'enterprise';

  if (isB2B) {
    return [
      {
        id: 'persona-1',
        name: 'Jordan Rivera',
        title: 'The Overwhelmed Director of Operations',
        archetypeBadge: 'Strategic Optimizer',
        avatarColor: 'indigo',
        quote: 'If this tool takes longer than two days for my team to adopt, I will revert straight back to spreadsheets.',
        demographics: {
          age: '34 - 42 years old',
          role: 'Head of Operations / Managing Director',
          incomeLevel: '$135,000 - $175,000 / year',
          location: 'Metro Hub (Hybrid / Remote team)',
          educationTech: 'B.S. in Business or Comm; Advanced SaaS power user',
        },
        lifestyle: [
          'Juggles 14+ client stakeholders and internal delivery sprints',
          'Rallies team via Slack, Asana, and weekly operational standups',
          'Relies on asynchronous video briefings to protect focused maker time',
          'Strict about data security, SOC2 compliance, and audit trails',
        ],
        purchaseOccasion: 'Triggered when an onboarding breakdown causes a churned enterprise client or late deliverable.',
        coreMotivations: [
          'Eliminate manual handoffs between sales sign-off and kickoff',
          'Gain real-time executive visibility over account bottlenecks',
          'Prevent staff burnout and late-night emergency fire-drills',
        ],
        frustrations: [
          'Clunky enterprise software with steep learning curves',
          'Hidden per-seat cost spikes that blow through department budgets',
          'Tools that do not integrate cleanly into existing Slack/Google workspace',
        ],
        willingnessToPay: isPremium ? '$300 - $800 / month with dedicated onboarding support' : '$99 - $299 / month on annual billing',
        keyDecisionFactors: [
          'Time-to-value under 7 days',
          'Zero-friction team invitation flow',
          'SOC2 / GDPR compliance guarantee',
        ],
      },
      {
        id: 'persona-2',
        name: 'Marcus Chen',
        title: 'The Growth-Obsessed Agency Founder',
        archetypeBadge: 'High-Velocity Visionary',
        avatarColor: 'teal',
        quote: 'I care about billable margin and closing high-retainer contracts. Give me leverage, not admin chores.',
        demographics: {
          age: '28 - 36 years old',
          role: 'Founder & Principal Consultant',
          incomeLevel: '$160,000 - $240,000 / year',
          location: 'Tier 1 Startup City (San Francisco, NY, Austin, London)',
          educationTech: 'Tech-forward early adopter; automates with Zapier/Make',
        },
        lifestyle: [
          'Constantly networking on LinkedIn and hosting private roundtables',
          'Consumes startup growth podcasts during workouts and transit',
          'Measures operational success strictly by net profit margin and client retention',
          'Values white-label presentation materials that make his boutique agency look Fortune 500',
        ],
        purchaseOccasion: 'Triggered upon signing three new client retainers at once and realizing the current team cannot handle the load.',
        coreMotivations: [
          'Deliver a white-glove onboarding experience that justifies premium retainers',
          'Scale agency revenue without doubling back-office headcount',
          'Standardize operational quality across all junior account managers',
        ],
        frustrations: [
          'Unprofessional client-facing portals that hurt brand prestige',
          'Disjointed tools requiring fragile custom webhook integrations',
          'Customer support that takes 48 hours to answer ticket requests',
        ],
        willingnessToPay: isPremium ? '$500+ / month if it directly protects client retention' : '$150 - $350 / month',
        keyDecisionFactors: [
          'White-label branding and custom domain options',
          'Instant client-facing portal polish',
          'Fast human support via Slack connect or live chat',
        ],
      },
      {
        id: 'persona-3',
        name: 'Elena Rostova',
        title: 'The Tactical Project & Delivery Lead',
        archetypeBadge: 'Grassroots Champion',
        avatarColor: 'amber',
        quote: 'My team will use this 6 hours a day. The micro-interactions and keyboard shortcuts better be flawless.',
        demographics: {
          age: '26 - 32 years old',
          role: 'Senior Project Manager / Scrum Master',
          incomeLevel: '$90,000 - $120,000 / year',
          location: 'Distributed Remote / Suburban',
          educationTech: 'Power user of Figma, Notion, Jira, Linear, and Loom',
        },
        lifestyle: [
          'Runs daily scrum standups and manages cross-functional Gantt charts',
          'Values dark mode, clean typography, and fast shortcut-heavy interfaces',
          'Reviews software products on Twitter/Reddit tech communities',
          'Advocates bottom-up tool adoption within team Slack channels',
        ],
        purchaseOccasion: 'Triggered when a recurring administrative snag costs her 4 hours every Monday morning.',
        coreMotivations: [
          'Automate repetitive status pinging and file chasing',
          'Have a single clear source of truth for asset approvals',
          'Feel proud of the software environment used throughout the workday',
        ],
        frustrations: [
          'Overly rigid corporate workflows that prevent quick edits',
          'Slow page loads and sluggish desktop browser performance',
          'Lack of bulk editing or keyboard-friendly navigation',
        ],
        willingnessToPay: isBudget ? 'Free tier or $25 - $45 / seat / month' : '$40 - $80 / seat / month backed by department expense card',
        keyDecisionFactors: [
          'UI speed and keyboard ergonomics',
          'Automated reminders for pending client approvals',
          'Self-serve free trial with zero sales demo requirement',
        ],
      },
    ];
  }

  // Consumer / DTC / Lifestyle default
  return [
    {
      id: 'persona-1',
      name: 'Sophia Martinez',
      title: 'The Value-Driven Conscious Consumer',
      archetypeBadge: 'Intentional Minimalist',
      avatarColor: 'emerald',
      quote: 'I buy fewer things, but I expect total ingredient and production transparency from the brands I support.',
      demographics: {
        age: '27 - 35 years old',
        role: 'Marketing Strategist / Creative Lead',
        incomeLevel: '$85,000 - $115,000 / year',
        location: 'Urban Center (Seattle, Denver, Brooklyn, Toronto)',
        educationTech: 'B.A. Humanities / Design; Mobile-first shopper',
      },
      lifestyle: [
        'Researches brand sustainability claims and supply chain ethics before purchasing',
        'Active outdoors on weekends (hiking, trail running, farmers markets)',
        'Listens to daily wellness and investigative consumer podcasts',
        'Shares authentic lifestyle recommendations on Instagram Stories and Substack',
      ],
      purchaseOccasion: 'Triggered when an existing everyday item wears out or when seeking a gift with ethical provenance.',
      coreMotivations: [
        'Align daily purchases with personal environmental and ethical values',
        'Invest in durable, high-utility items that outlast disposable alternatives',
        'Experience hassle-free unboxing, responsive care, and clear circularity',
      ],
      frustrations: [
        'Corporate greenwashing and vague eco-buzzwords with no certification proof',
        'Excessive single-use plastic shipping packaging',
        'Opaque return policies or unhelpful automated chatbots',
      ],
      willingnessToPay: isPremium ? '25% - 40% premium above conventional alternatives for verified quality' : 'Moderate; seeks long-term cost-per-use value',
      keyDecisionFactors: [
        'Third-party certifications (B-Corp, Fair Trade, Climate Neutral)',
        'Detailed origin and material breakdown on product page',
        'Plastic-free, recyclable packaging guarantee',
      ],
    },
    {
      id: 'persona-2',
      name: 'David Becker',
      title: 'The Efficiency-First Tech Professional',
      archetypeBadge: 'Pragmatic Modernist',
      avatarColor: 'blue',
      quote: 'My schedule is packed. If I cannot order or manage this from my phone in two taps, I will find an alternative.',
      demographics: {
        age: '31 - 42 years old',
        role: 'Software Engineer / Product Architect',
        incomeLevel: '$140,000 - $210,000 / year',
        location: 'Suburban Tech Corridor',
        educationTech: 'M.S. Computer Science / Engineering; Apple ecosystem devotee',
      },
      lifestyle: [
        'Subscribes to automated essentials delivery to minimize cognitive load',
        'Prioritizes functional performance and ergonomic design in all daily gear',
        'Reads Wirecutter, Reddit r/BuyItForLife, and technical product tear-downs',
        'Values seamless Apple Pay / 1-click checkout and instant package tracking',
      ],
      purchaseOccasion: 'Triggered when a pain point interrupts daily routine or when upgrading to an engineered best-in-class standard.',
      coreMotivations: [
        'Save precious personal time through dependable consistency',
        'Own items that require minimal maintenance or fuss',
        'Enjoy frictionless digital experiences from ordering to delivery',
      ],
      frustrations: [
        'Slow checkout funnels that force account creation before purchasing',
        'Delayed shipments without automated SMS updates',
        'Products that fail prematurely after moderate usage',
      ],
      willingnessToPay: isPremium ? 'Comfortably pays $100 - $250+ for proven performance' : 'Fair price for measurable convenience',
      keyDecisionFactors: [
        '1-click checkout with Apple Pay / Shop Pay',
        'Real user reviews with verified purchase badges and photos',
        'Clear warranty and rapid replacement policy',
      ],
    },
    {
      id: 'persona-3',
      name: 'Chloe Tremblay',
      title: 'The Trend-Forward Discovery Enthusiast',
      archetypeBadge: 'Aesthetic Trendsetter',
      avatarColor: 'rose',
      quote: 'I love finding emerging indie brands before anyone else and sharing the story behind the founder.',
      demographics: {
        age: '22 - 29 years old',
        role: 'Content Creator & Freelance Designer',
        incomeLevel: '$55,000 - $80,000 / year',
        location: 'Vibrant Cultural District (Montreal, Austin, Berlin)',
        educationTech: 'Art & Design background; TikTok & Pinterest native',
      },
      lifestyle: [
        'Discovers 80% of new brands through TikTok creator curations and curated newsletters',
        'Values distinctive visual identity, bespoke packaging, and community storytelling',
        'Attends pop-up markets, indie craft fairs, and local design exhibitions',
        'Enjoys unboxing rituals and sharing aesthetic flat-lays with followers',
      ],
      purchaseOccasion: 'Triggered by seeing a compelling founder story or aesthetic aesthetic review on social feeds.',
      coreMotivations: [
        'Express personal taste and individuality through curated belongings',
        'Be part of an intimate, mission-driven brand community',
        'Get early access to limited edition drops and collaborations',
      ],
      frustrations: [
        'Generic, uninspired corporate branding and stock photography',
        'Hidden shipping fees revealed only at the final checkout step',
        'Brands that ignore comments or direct messages on social channels',
      ],
      willingnessToPay: isBudget ? 'Values bundle discounts, student perks, and introductory trial promos' : 'Willing to splurge on limited drops that spark joy',
      keyDecisionFactors: [
        'High aesthetic standards and founder narrative video',
        'Transparent all-in pricing with free shipping thresholds',
        'Active, responsive brand presence on social media',
      ],
    },
  ];
}

export function generateFallbackJourneyMap(persona: Persona, business: BusinessProfile): CustomerJourneyMap {
  const isB2B = business.distributionChannel === 'b2b_sales' || business.description.toLowerCase().includes('agency') || business.description.toLowerCase().includes('b2b');

  const stages: Record<JourneyStageId, JourneyStageData> = {
    awareness: {
      stage: 'awareness',
      title: '1. Awareness',
      subtitle: 'Problem Recognition & Discovery',
      purchaseOccasion: `Trigger: ${persona.purchaseOccasion}`,
      customerActivities: [
        'Notices bottlenecks or deficiencies during a critical routine moment',
        'Searches specific keywords on Google, Reddit, and LinkedIn peer groups',
        'Consumes educational breakdown posts and industry benchmark reports',
      ],
      customerGoals: [
        'Understand whether peers have solved this exact headache',
        'Assess whether current pain warrants budget or immediate change',
        'Identify 2-3 credible market leaders or modern alternative contenders',
      ],
      touchpoints: isB2B
        ? ['Industry LinkedIn thought leadership', 'Targeted search engine queries', 'Peer Slack community recommendations', 'B2B podcast sponsorship']
        : ['Instagram/TikTok algorithmic feed', 'Curated lifestyle newsletter', 'Google search for best alternatives', 'Word-of-mouth friend recommendation'],
      painPoints: [
        'Overwhelmed by marketing jargon and conflicting vendor claims',
        'Skeptical of exaggerated promotional promises',
        'Lacks clarity on standard pricing benchmarks',
      ],
      businessGoals: [
        'Capture qualified search intent and organic discovery',
        'Drive high-intent visits to dedicated, high-converting problem-solution landing pages',
        'Achieve initial brand impression with memorable, differentiated messaging',
      ],
      sentiment: 'curious',
      sentimentScore: 3,
      keyMetric: 'Organic Search Impressions, Click-Through Rate (CTR), Social Referral Traffic',
      strategicOpportunity: 'Publish ungated case studies and interactive problem-diagnostic calculators to build immediate authority.',
    },
    consideration: {
      stage: 'consideration',
      title: '2. Consideration',
      subtitle: 'Evaluation, Comparison & Validation',
      purchaseOccasion: 'Actively comparing alternatives against budget and workflow fit.',
      customerActivities: [
        'Reviews product demo videos, feature breakdowns, and pricing tables',
        'Scours unedited customer reviews (G2, Trustpilot, Reddit, YouTube)',
        isB2B ? 'Shares candidate shortlist with internal teammates for input' : 'Compares ingredient/material specs and sizing/care guides',
      ],
      customerGoals: [
        `Verify alignment with primary motivation: ${persona.coreMotivations[0] || 'High efficiency'}`,
        'Ensure there are no hidden costs, locks-ins, or adoption traps',
        'Validate reliability, warranty, or customer support responsiveness',
      ],
      touchpoints: isB2B
        ? ['Interactive product tour / interactive demo', 'Transparent pricing calculator', 'Customer case studies & ROI models', 'Live chat with technical specialist']
        : ['Detailed product detail page (PDP)', 'Customer photo review gallery', 'Unboxing videos & FAQs', 'Live chat or direct message response'],
      painPoints: [
        'Fear of choosing wrong and wasting time or hard-earned budget',
        `Anxiety around top objection: ${persona.frustrations[0] || 'Complicated setup'}`,
        'Vague timelines or unclear delivery / implementation expectations',
      ],
      businessGoals: [
        'Capture contact leads via self-serve trial or interactive demo initiation',
        'Demonstrate clear competitive differentiation vs legacy alternatives',
        'Address top 3 objections head-on before sales friction occurs',
      ],
      sentiment: 'evaluating',
      sentimentScore: 3,
      keyMetric: 'Demo Completion Rate, Pricing Page Time-on-Page, Trial Sign-Ups',
      strategicOpportunity: 'Offer an instant interactive preview (no credit card required) that demonstrates time-to-value within 60 seconds.',
    },
    convert: {
      stage: 'convert',
      title: '3. Convert',
      subtitle: 'Decision, Transaction & Kickoff',
      purchaseOccasion: 'Final decision point: committing budget to eliminate ongoing friction.',
      customerActivities: [
        'Selects tier/variant best matched to budget and immediate scope',
        'Enters billing details through frictionless payment portal',
        isB2B ? 'Receives procurement invoice and confirms workspace access' : 'Receives order confirmation email with instant order tracking',
      ],
      customerGoals: [
        'Complete transaction in under 2 minutes without unexpected friction',
        'Receive immediate confirmation of order status and next steps',
        'Feel validated that this decision will deliver on promised outcomes',
      ],
      touchpoints: [
        'Streamlined 1-page checkout funnel (Apple Pay / Stripe / Invoice)',
        'Order confirmation screen with immediate next steps checklist',
        'Automated welcome email with personalized orientation link',
      ],
      painPoints: [
        'Surprise taxes, hidden shipping fees, or unexpected contract terms',
        'Sluggish checkout loading or form validation errors',
        'Post-purchase buyer remorse if immediate feedback is absent',
      ],
      businessGoals: [
        'Maximize checkout completion rate and minimize cart abandonment',
        'Deliver frictionless payment processing across modern payment rails',
        'Trigger instant onboarding automation within 30 seconds of receipt',
      ],
      sentiment: 'committed',
      sentimentScore: 4,
      keyMetric: 'Checkout Conversion Rate, Cart Abandonment Rate, CAC (Customer Acquisition Cost)',
      strategicOpportunity: 'Provide instant gratification on confirmation screen: a tailored quick-start video and immediate setup roadmap.',
    },
    loyalty: {
      stage: 'loyalty',
      title: '4. Loyalty',
      subtitle: 'Onboarding, Habituation & Value Realization',
      purchaseOccasion: 'Daily or weekly utilization; embedding into core habits and operations.',
      customerActivities: [
        isB2B ? 'Onboards core team members and sets up recurring workflows' : 'Unboxes shipment and incorporates product into everyday routine',
        'Explores secondary features and shortcuts as confidence grows',
        'Contacts support or consults knowledge base for best-practice tips',
      ],
      customerGoals: [
        'Achieve the primary promised outcome without technical snags',
        'Experience effortless ongoing reliability and fast support when needed',
        'Confirm that value delivered comfortably exceeds ongoing cost',
      ],
      touchpoints: [
        'Personalized onboarding milestone checklist or unboxing card',
        'Proactive automated check-in email on Day 3 and Day 14',
        'In-app helper tips or concierge support desk',
      ],
      painPoints: [
        'Early confusion if initial onboarding guide is disjointed',
        'Feeling abandoned after the initial payment is taken',
        'Lack of easy access to knowledgeable human assistance',
      ],
      businessGoals: [
        'Drive 90%+ 30-day activation and repeat usage retention',
        'Prevent early churn by proactively identifying inactive users',
        'Establish product as the indispensable daily default',
      ],
      sentiment: 'delighted',
      sentimentScore: 5,
      keyMetric: '30-Day Retention / Churn Rate, Activation Rate, Customer Satisfaction (CSAT)',
      strategicOpportunity: 'Send an automated "Value Milestone" recap after 14 days highlighting quantifiable hours saved or milestones unlocked.',
    },
    advocacy: {
      stage: 'advocacy',
      title: '5. Advocacy',
      subtitle: 'Referral, Expansion & Evangelism',
      purchaseOccasion: 'Natural desire to recommend a beloved solution to peers and colleagues.',
      customerActivities: [
        'Recommends brand organically in peer group chats and professional Slack channels',
        'Leaves glowing 5-star review or publishes unprompted social shoutout',
        isB2B ? 'Upgrades to higher volume tier or introduces company sister divisions' : 'Reorders seasonal releases and purchases gift bundles for friends',
      ],
      customerGoals: [
        'Look knowledgeable and generous by sharing a genuine gem with peers',
        'Earn community recognition or referral perks/credits',
        'Help shape future brand roadmap via feedback channels',
      ],
      touchpoints: [
        'Delightful 1-click referral link with reciprocal bonus credit',
        'Exclusive VIP beta tester community or early access drop invite',
        'Annual impact recap ("Year in Review") shareable visual asset',
      ],
      painPoints: [
        'Clunky referral programs that require complex coupon code copy-pasting',
        'Feeling taken for granted after becoming a long-term customer',
        'Brand deteriorating quality or raising prices without notice',
      ],
      businessGoals: [
        'Generate organic viral loops and low-CAC referral pipeline',
        'Build a library of authentic social proof and video testimonials',
        'Expand Customer Lifetime Value (LTV) through upsells and repeat cycles',
      ],
      sentiment: 'advocate',
      sentimentScore: 5,
      keyMetric: 'Net Promoter Score (NPS), Viral Referral Coefficient, Customer Lifetime Value (LTV)',
      strategicOpportunity: 'Launch a private "Founders Circle" or community advisory board offering exclusive perks and direct roadmap voting.',
    },
  };

  return {
    personaId: persona.id,
    personaName: persona.name,
    personaTitle: persona.title,
    businessSummary: business.description,
    stages,
    generatedAt: new Date().toISOString(),
  };
}

export function exportMatrixAsMarkdown(journeyMap: CustomerJourneyMap, persona: Persona): string {
  const stageKeys: JourneyStageId[] = ['awareness', 'consideration', 'convert', 'loyalty', 'advocacy'];
  const stageHeaders = stageKeys.map(k => journeyMap.stages[k].title).join(' | ');

  let md = `# Customer Journey Map: ${persona.name} (${persona.title})\n\n`;
  md += `**Business Profile:** ${journeyMap.businessSummary}\n`;
  md += `**Persona Archetype:** ${persona.archetypeBadge} | **Age:** ${persona.demographics.age} | **Role:** ${persona.demographics.role}\n`;
  md += `**Core Quote:** "${persona.quote}"\n\n`;
  md += `---\n\n`;

  md += `| Lifecycle Stage Attribute | ${stageHeaders} |\n`;
  md += `| :--- | :--- | :--- | :--- | :--- | :--- |\n`;

  // Row 1: Purchase Occasion
  const purchaseOccasions = stageKeys.map(k => journeyMap.stages[k].purchaseOccasion.replace(/\|/g, '-')).join(' | ');
  md += `| **Purchase Occasion** | ${purchaseOccasions} |\n`;

  // Row 2: Customer Activities
  const activities = stageKeys.map(k => journeyMap.stages[k].customerActivities.map(a => `• ${a}`).join('<br>').replace(/\|/g, '-')).join(' | ');
  md += `| **Customer Activities** | ${activities} |\n`;

  // Row 3: Customer Goals
  const goals = stageKeys.map(k => journeyMap.stages[k].customerGoals.map(g => `• ${g}`).join('<br>').replace(/\|/g, '-')).join(' | ');
  md += `| **Customer Goals** | ${goals} |\n`;

  // Row 4: Touchpoints
  const touchpoints = stageKeys.map(k => journeyMap.stages[k].touchpoints.map(t => `• ${t}`).join('<br>').replace(/\|/g, '-')).join(' | ');
  md += `| **Touchpoints** | ${touchpoints} |\n`;

  // Row 5: Pain Points
  const painPoints = stageKeys.map(k => journeyMap.stages[k].painPoints.map(p => `• ${p}`).join('<br>').replace(/\|/g, '-')).join(' | ');
  md += `| **Pain Points** | ${painPoints} |\n`;

  // Row 6: Business Goals
  const businessGoals = stageKeys.map(k => journeyMap.stages[k].businessGoals.map(b => `• ${b}`).join('<br>').replace(/\|/g, '-')).join(' | ');
  md += `| **Business Goals** | ${businessGoals} |\n`;

  // Key Metrics
  const keyMetrics = stageKeys.map(k => journeyMap.stages[k].keyMetric.replace(/\|/g, '-')).join(' | ');
  md += `| **Key Performance Indicator (KPI)** | ${keyMetrics} |\n`;

  // Strategic Opportunity
  const opps = stageKeys.map(k => journeyMap.stages[k].strategicOpportunity.replace(/\|/g, '-')).join(' | ');
  md += `| **Strategic Opportunity** | ${opps} |\n\n`;

  md += `*Generated via Persona & Journey Map Generator on ${new Date().toLocaleDateString()}*\n`;

  return md;
}

export function exportMatrixAsCSV(journeyMap: CustomerJourneyMap, persona: Persona): string {
  const stageKeys: JourneyStageId[] = ['awareness', 'consideration', 'convert', 'loyalty', 'advocacy'];
  const headers = ['Stage Attribute', ...stageKeys.map(k => `"${journeyMap.stages[k].title}"`)];

  const rows: string[][] = [];

  // Purchase Occasion
  rows.push(['Purchase Occasion', ...stageKeys.map(k => `"${journeyMap.stages[k].purchaseOccasion.replace(/"/g, '""')}"`)]);

  // Customer Activities
  rows.push(['Customer Activities', ...stageKeys.map(k => `"${journeyMap.stages[k].customerActivities.join('; ').replace(/"/g, '""')}"`)]);

  // Customer Goals
  rows.push(['Customer Goals', ...stageKeys.map(k => `"${journeyMap.stages[k].customerGoals.join('; ').replace(/"/g, '""')}"`)]);

  // Touchpoints
  rows.push(['Touchpoints', ...stageKeys.map(k => `"${journeyMap.stages[k].touchpoints.join('; ').replace(/"/g, '""')}"`)]);

  // Pain Points
  rows.push(['Pain Points', ...stageKeys.map(k => `"${journeyMap.stages[k].painPoints.join('; ').replace(/"/g, '""')}"`)]);

  // Business Goals
  rows.push(['Business Goals', ...stageKeys.map(k => `"${journeyMap.stages[k].businessGoals.join('; ').replace(/"/g, '""')}"`)]);

  // Key Metric
  rows.push(['Key Metric', ...stageKeys.map(k => `"${journeyMap.stages[k].keyMetric.replace(/"/g, '""')}"`)]);

  // Strategic Opportunity
  rows.push(['Strategic Opportunity', ...stageKeys.map(k => `"${journeyMap.stages[k].strategicOpportunity.replace(/"/g, '""')}"`)]);

  const csvContent = [
    `"Customer Journey Map - ${persona.name} (${persona.title})"`,
    `"Business Summary: ${journeyMap.businessSummary.replace(/"/g, '""')}"`,
    '',
    headers.join(','),
    ...rows.map(r => r.join(',')),
  ].join('\n');

  return csvContent;
}
