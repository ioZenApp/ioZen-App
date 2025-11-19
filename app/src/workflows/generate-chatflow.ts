import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY!,
});

interface ChatflowField {
    name: string;
    label: string;
    type: 'text' | 'number' | 'email' | 'date' | 'boolean';
    required: boolean;
    placeholder?: string;
}

interface ChatflowSchema {
    name: string;
    fields: ChatflowField[];
}

async function callAnthropicAPI(description: string) {
    'use step';

    const prompt = `You are a chatflow designer. Generate a structured chatflow based on this description:

"${description}"

Return ONLY a JSON object with this exact structure (no markdown, no explanation):
{
  "name": "Chatflow Name",
  "fields": [
    {
      "name": "fieldName",
      "label": "Field Label",
      "type": "text",
      "required": true,
      "placeholder": "Optional placeholder"
    }
  ]
}

Field types must be one of: text, number, email, date, boolean
Generate 5-15 fields that make sense for this use case.
Use camelCase for field names.
Make important fields required.`;

    const message = await anthropic.messages.create({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 2000,
        messages: [
            {
                role: 'user',
                content: prompt,
            },
        ],
    });

    const content = message.content[0];
    if (content.type !== 'text') {
        throw new Error('Unexpected response type from Claude');
    }

    // Parse the JSON response
    const jsonMatch = content.text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
        throw new Error('Failed to extract JSON from Claude response');
    }

    return JSON.parse(jsonMatch[0]);
}

export async function generateChatflowWorkflow(description: string): Promise<ChatflowSchema> {
    'use workflow';

    const schema = await callAnthropicAPI(description);

    // Validate the schema
    if (!schema.name || !Array.isArray(schema.fields) || schema.fields.length === 0) {
        throw new Error('Invalid chatflow schema generated');
    }

    return schema;
}
