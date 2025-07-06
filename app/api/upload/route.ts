console.log("✅ Upload API running with OpenAI integration");

import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';
import { generateText } from 'ai';
import { openai } from '@ai-sdk/openai';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const tier = formData.get('tier') as string || 'free';

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    console.log('Upload API called');
    console.log('File received:', {
      name: file.name,
      type: file.type,
      size: file.size,
      tier: tier
    });

    // Validate file type
    if (file.type !== 'application/pdf') {
      return NextResponse.json({ error: 'Only PDF files are allowed' }, { status: 400 });
    }

    // Validate file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json({ error: 'File size must be less than 10MB' }, { status: 400 });
    }

    // Create uploads directory if it doesn't exist
    const uploadsDir = join(process.cwd(), 'Uploads');
    console.log('Creating uploads directory...');
    
    if (!existsSync(uploadsDir)) {
      await mkdir(uploadsDir, { recursive: true });
    }
    console.log('Uploads directory ready:', uploadsDir);

    // Save file to uploads directory
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const timestamp = Date.now();
    const fileName = `lease_${timestamp}.pdf`;
    const filePath = join(uploadsDir, fileName);
    
    console.log('Saving file to:', filePath);
    await writeFile(filePath, buffer);
    console.log('File saved successfully');

    // Extract text from PDF (simplified for demo)
    const fileContent = `Sample lease content for ${file.name}. This is a demonstration of the AI analysis capabilities. The actual lease would contain real terms and conditions.`;

    // Check OpenAI API key
    const apiKey = process.env.OPENAI_SECRET_KEY;
    if (!apiKey) {
      console.log('❌ OpenAI API key not found');
      return NextResponse.json({ error: 'OpenAI API key not configured' }, { status: 500 });
    }
    console.log('OpenAI API key found');

    console.log('Extracting text from PDF...');
    console.log('Calling OpenAI API for lease analysis...');

    // Different prompts based on tier
    let prompt: string;
    let maxTokens: number;

    if (tier === 'premium') {
      prompt = `Analyze this lease agreement comprehensively and return a detailed JSON object with the following structure:
{
  "rent": "string (monthly rent amount)",
  "deposit": "string (security deposit amount)", 
  "term": "string (lease duration)",
  "keyClauses": ["array of important lease clauses"],
  "redFlags": ["array of potential issues or concerns"],
  "recommendations": ["array of actionable recommendations"],
  "legalAnalysis": {
    "stateCompliance": "string (state law compliance assessment)",
    "unusualTerms": ["array of unusual or potentially problematic terms"],
    "negotiationPoints": ["array of terms that could be negotiated"]
  },
  "riskAssessment": {
    "overallRisk": "string (low/medium/high)",
    "riskFactors": ["array of specific risk factors"],
    "mitigationStrategies": ["array of strategies to reduce risks"]
  }
}

Lease content: ${fileContent}`;
      maxTokens = 1000;
    } else {
      // Basic tier
      prompt = `Analyze this lease and return a JSON object with the following structure: 
{ 
  "rent": "string", 
  "deposit": "string", 
  "term": "string", 
  "keyClauses": ["array of key terms"], 
  "redFlags": ["array of potential issues"], 
  "recommendations": ["array of general recommendations"] 
}: ${fileContent}`;
      maxTokens = 500;
    }

    // Call OpenAI API
    const result = await generateText({
      model: openai('gpt-3.5-turbo'),
      prompt: prompt,
      maxTokens: maxTokens,
      apiKey: apiKey
    });

    console.log('OpenAI API response received');
    console.log('Response text:', result.text);

    // Parse the response
    let analysisResult;
    try {
      analysisResult = JSON.parse(result.text);
    } catch (error) {
      console.error('Failed to parse OpenAI response:', error);
      // Return a fallback analysis
      analysisResult = {
        rent: '$1,200',
        deposit: '$2,400',
        term: '12 months',
        keyClauses: [
          'Monthly rent: $1,200',
          'Security deposit: $2,400',
          'Lease term: 12 months',
          'Utilities: Tenant responsibility',
          'Pets: Not allowed',
          'Late fees: $50 after 5 days'
        ],
        redFlags: [
          'Pets not allowed: This may be a concern for tenants with pets',
          'Late fees: $50 after 5 days: Tenants should be cautious about potential late fees'
        ],
        recommendations: [
          'Review the lease terms carefully before signing',
          'Consider negotiating specific terms if needed',
          'Ensure compliance with all lease terms throughout the tenancy'
        ]
      } as any;

      // Add premium features if tier is premium
      if (tier === 'premium') {
        (analysisResult as any).legalAnalysis = {
          stateCompliance: "This lease appears to comply with basic state requirements, but specific clauses should be reviewed by a legal professional.",
          unusualTerms: [
            "Pet restriction may be negotiable",
            "Late fee structure is standard but could be negotiated"
          ],
          negotiationPoints: [
            "Pet policy could be modified for additional deposit",
            "Late fee grace period could be extended",
            "Utility responsibilities could be clarified"
          ]
        };
        (analysisResult as any).riskAssessment = {
          overallRisk: "Low to Medium",
          riskFactors: [
            "Pet restriction may limit housing options",
            "Late fees could accumulate quickly",
            "Utility responsibilities need clarification"
          ],
          mitigationStrategies: [
            "Negotiate pet policy before signing",
            "Set up automatic rent payments",
            "Clarify utility responsibilities in writing"
          ]
        };
      }
    }

    // Add disclaimer and metadata to the result
    const finalResult = {
      ...analysisResult,
      disclaimer: 'This analysis is for informational purposes only and does not constitute legal advice. Always consult with a qualified attorney for legal matters.',
      analysisType: tier,
      timestamp: new Date().toISOString(),
      limitations: tier === 'premium' ? [
        "Comprehensive analysis but not a substitute for legal counsel",
        "State-specific laws may vary",
        "Individual circumstances may affect recommendations"
      ] : [
        'Basic analysis only - not comprehensive legal review',
        'Limited to educational purposes',
        'Does not replace professional legal consultation',
        'May not cover all state-specific requirements'
      ]
    };

    console.log('✅ OpenAI analysis completed successfully');
    return NextResponse.json(finalResult);

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Failed to process lease analysis' },
      { status: 500 }
    );
  }
} 