import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, Type } from '@google/genai';
import { BusinessProfile, CustomerJourneyMap, Persona } from './src/types';
import { generateFallbackJourneyMap, generateFallbackPersonas } from './src/lib/templates';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const isProduction = process.env.NODE_ENV === 'production';

app.use(express.json({ limit: '10mb' }));

// Shared Gemini client helper
function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// Endpoint: Generate 3 Distinct Personas
app.post('/api/generate-personas', async (req, res) => {
  try {
    const business = req.body?.business as BusinessProfile;
    if (!business || !business.description) {
      return res.status(400).json({ error: 'Business description is required' });
    }

    const ai = getGeminiClient();
    if (!ai) {
      const personas = generateFallbackPersonas(business);
      return res.json({ personas });
    }

    const prompt = `You are a world-class consumer researcher, market strategist, and brand designer.
Given the following business profile:
- Description: "${business.description}"
- Pricing Tier: "${business.pricingTier}"
- Market Reach: "${business.marketReach}"
- Primary Distribution Channel: "${business.distributionChannel}"

Generate exactly 3 DISTINCT, realistic, and highly compelling ideal consumer personas who would buy or adopt this product/service.
Make sure the 3 personas represent different angles (e.g., pragmatic operational buyer, visionary founder/lifestyle consumer, grassroots champion/trend enthusiast).
Each persona must feel like an authentic living human with distinct demographic details, daily habits, real pain triggers, and honest quotes.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction: 'You generate highly realistic, nuanced customer personas in structured JSON. Never return generic filler.',
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            personas: {
              type: Type.ARRAY,
              description: 'Array of exactly 3 distinct consumer personas.',
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  name: { type: Type.STRING, description: 'Realistic full name' },
                  title: { type: Type.STRING, description: 'Evocative archetype title e.g. "The Time-Strapped Solo Founder"' },
                  archetypeBadge: { type: Type.STRING, description: 'Short 2-3 word archetype badge e.g. "Strategic Optimizer"' },
                  avatarColor: { type: Type.STRING, description: 'indigo, teal, amber, emerald, blue, or rose' },
                  quote: { type: Type.STRING, description: 'First-person candid quote revealing their core worldview or criteria' },
                  demographics: {
                    type: Type.OBJECT,
                    properties: {
                      age: { type: Type.STRING, description: 'e.g. 32 - 39 years old' },
                      role: { type: Type.STRING, description: 'Job title or primary life responsibility' },
                      incomeLevel: { type: Type.STRING, description: 'Annual household income or salary range' },
                      location: { type: Type.STRING, description: 'Geographic setting / living situation' },
                      educationTech: { type: Type.STRING, description: 'Tech literacy and key daily software/apps' },
                    },
                    required: ['age', 'role', 'incomeLevel', 'location', 'educationTech'],
                  },
                  lifestyle: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                    description: '3-4 realistic lifestyle bullet points, habits, and daily routines',
                  },
                  purchaseOccasion: { type: Type.STRING, description: 'The specific catalyst, urgency moment, or trigger that forces them to seek this solution' },
                  coreMotivations: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                    description: 'Top 3 core motivations or desired outcomes',
                  },
                  frustrations: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                    description: 'Top 3 frustrations, objections, or previous disappointments',
                  },
                  willingnessToPay: { type: Type.STRING, description: 'Expected budget, price sensitivity, or payback expectation' },
                  keyDecisionFactors: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                    description: 'Top 3 non-negotiable buying criteria',
                  },
                },
                required: [
                  'id',
                  'name',
                  'title',
                  'archetypeBadge',
                  'avatarColor',
                  'quote',
                  'demographics',
                  'lifestyle',
                  'purchaseOccasion',
                  'coreMotivations',
                  'frustrations',
                  'willingnessToPay',
                  'keyDecisionFactors',
                ],
              },
            },
          },
          required: ['personas'],
        },
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    if (parsed.personas && Array.isArray(parsed.personas) && parsed.personas.length >= 3) {
      return res.json({ personas: parsed.personas.slice(0, 3) });
    }

    const fallback = generateFallbackPersonas(business);
    return res.json({ personas: fallback });
  } catch (_error) {
    const fallback = generateFallbackPersonas(req.body?.business || {
      description: '',
      pricingTier: 'mid',
      marketReach: 'national',
      distributionChannel: 'b2b_sales',
    });
    return res.json({ personas: fallback });
  }
});

// Endpoint: Generate Customer Journey Map Matrix
app.post('/api/generate-journey', async (req, res) => {
  try {
    const business = req.body?.business as BusinessProfile;
    const persona = req.body?.persona as Persona;

    if (!business || !persona) {
      return res.status(400).json({ error: 'Business and Persona are required' });
    }

    const ai = getGeminiClient();
    if (!ai) {
      const journeyMap = generateFallbackJourneyMap(persona, business);
      return res.json({ journeyMap });
    }

    const prompt = `You are an elite customer experience (CX) and product strategy architect.
Map the complete 5-stage Customer Journey Matrix for the following selected persona and business:

BUSINESS:
- Description: "${business.description}"
- Pricing Tier: "${business.pricingTier}"
- Market Reach: "${business.marketReach}"
- Distribution Channel: "${business.distributionChannel}"

SELECTED PERSONA:
- Name: "${persona.name}" (${persona.title})
- Archetype: "${persona.archetypeBadge}"
- Demographic: ${persona.demographics.age}, ${persona.demographics.role}
- Core Quote: "${persona.quote}"
- Purchase Occasion / Trigger: "${persona.purchaseOccasion}"
- Core Motivations: ${persona.coreMotivations.join('; ')}
- Frustrations: ${persona.frustrations.join('; ')}

Generate a detailed 5-stage matrix across these exact 5 lifecycle stages:
1. "awareness" (Awareness: Problem Recognition & Discovery)
2. "consideration" (Consideration: Evaluation, Comparison & Validation)
3. "convert" (Convert: Decision, Transaction & Kickoff)
4. "loyalty" (Loyalty: Onboarding, Retention & Value Realization)
5. "advocacy" (Advocacy: Referral, Expansion & Evangelism)

For EACH of the 5 stages, you MUST provide explicit data for these required dimensions:
1. purchaseOccasion (String): How the purchase occasion or buying urgency manifests at this specific stage
2. customerActivities (Array of 3 strings): Specific actions the customer takes at this stage
3. customerGoals (Array of 3 strings): What the customer is striving to achieve or verify
4. touchpoints (Array of 3-4 strings): Channel interaction touchpoints
5. painPoints (Array of 3 strings): Friction points, fears, or anxieties at this stage
6. businessGoals (Array of 3 strings): The company's strategic priorities for this stage
7. sentiment: one of "neutral", "curious", "evaluating", "committed", "delighted", "advocate"
8. sentimentScore: integer from 1 to 5
9. keyMetric: Primary KPI to track (e.g. CTR, Demo booking rate, Churn, NPS)
10. strategicOpportunity: 1 actionable high-leverage growth or UX recommendation`;

    const stageSchema = {
      type: Type.OBJECT,
      properties: {
        stage: { type: Type.STRING },
        title: { type: Type.STRING },
        subtitle: { type: Type.STRING },
        purchaseOccasion: { type: Type.STRING },
        customerActivities: { type: Type.ARRAY, items: { type: Type.STRING } },
        customerGoals: { type: Type.ARRAY, items: { type: Type.STRING } },
        touchpoints: { type: Type.ARRAY, items: { type: Type.STRING } },
        painPoints: { type: Type.ARRAY, items: { type: Type.STRING } },
        businessGoals: { type: Type.ARRAY, items: { type: Type.STRING } },
        sentiment: { type: Type.STRING },
        sentimentScore: { type: Type.INTEGER },
        keyMetric: { type: Type.STRING },
        strategicOpportunity: { type: Type.STRING },
      },
      required: [
        'stage',
        'title',
        'subtitle',
        'purchaseOccasion',
        'customerActivities',
        'customerGoals',
        'touchpoints',
        'painPoints',
        'businessGoals',
        'sentiment',
        'sentimentScore',
        'keyMetric',
        'strategicOpportunity',
      ],
    };

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction: 'You generate actionable, real-world customer journey map data in clean JSON.',
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            stages: {
              type: Type.OBJECT,
              properties: {
                awareness: stageSchema,
                consideration: stageSchema,
                convert: stageSchema,
                loyalty: stageSchema,
                advocacy: stageSchema,
              },
              required: ['awareness', 'consideration', 'convert', 'loyalty', 'advocacy'],
            },
          },
          required: ['stages'],
        },
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    if (parsed.stages && parsed.stages.awareness && parsed.stages.convert) {
      const journeyMap: CustomerJourneyMap = {
        personaId: persona.id,
        personaName: persona.name,
        personaTitle: persona.title,
        businessSummary: business.description,
        stages: parsed.stages,
        generatedAt: new Date().toISOString(),
      };
      return res.json({ journeyMap });
    }

    const fallback = generateFallbackJourneyMap(persona, business);
    return res.json({ journeyMap: fallback });
  } catch (_error) {
    const fallback = generateFallbackJourneyMap(
      req.body?.persona,
      req.body?.business || {
        description: '',
        pricingTier: 'mid',
        marketReach: 'national',
        distributionChannel: 'b2b_sales',
      }
    );
    return res.json({ journeyMap: fallback });
  }
});

// Health check
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    hasGeminiKey: Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'MY_GEMINI_API_KEY'),
    time: new Date().toISOString(),
  });
});

// Setup Vite middleware in dev or static files in production
async function startServer() {
  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
