import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';
import { logError, logInfo } from '@/lib/auto-debug';

interface AnalysisSummary {
  id: string;
  filename: string;
  status: string;
  summary: {
    rent: string;
    deposit: string;
    term: string;
    keyClauses: string[];
    redFlags: string[];
    recommendations: string[];
  };
}

export async function POST(request: NextRequest) {
  try {
    logInfo('api-upload', 'Upload API called - NEW VERSION');
    
    const formData = await request.formData();
    const file = formData.get('file');
    logInfo('api-upload', 'File received', { 
      name: (file as File)?.name, 
      type: (file as File)?.type, 
      size: (file as File)?.size 
    });

    if (!file || typeof file === 'string') {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const allowedTypes = ['application/pdf'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: 'Invalid file type' }, { status: 400 });
    }

    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json({ error: 'File too large' }, { status: 400 });
    }

    logInfo('api-upload', 'Creating uploads directory...');
    const uploadsDir = join(process.cwd(), 'Uploads');
    if (!existsSync(uploadsDir)) {
      await mkdir(uploadsDir, { recursive: true });
      logInfo('api-upload', 'Created uploads directory', { path: uploadsDir });
    }
    logInfo('api-upload', 'Uploads directory ready', { path: uploadsDir });

    const timestamp = Date.now();
    const extension = file.name?.split('.').pop() || 'pdf';
    const filename = `lease_${timestamp}.${extension}`;
    const filepath = join(uploadsDir, filename);
    logInfo('api-upload', 'Saving file', { path: filepath });

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    await writeFile(filepath, buffer);
    logInfo('api-upload', 'File saved successfully');

    logInfo('api-upload', 'Generating mock analysis...');
    
    // Create mock analysis data
    const aiSummary: AnalysisSummary = {
      id: `analysis_${timestamp}`,
      filename: (file as File).name || filename,
      status: 'completed',
      summary: {
        rent: '$2,400/month',
        deposit: '$2,400',
        term: '12 months',
        keyClauses: [
          'Rent payment terms and due dates',
          'Security deposit requirements',
          'Maintenance responsibilities',
          'Pet policy restrictions',
          'Subletting and assignment clauses'
        ],
        redFlags: [
          'High late fee ($75)',
          'No pet policy',
          'Limited subletting rights',
          'Tenant responsible for repairs under $100'
        ],
        recommendations: [
          'Consider negotiating the late fee amount',
          'Ask about pet policy exceptions if needed',
          'Review subletting terms carefully',
          'Document all maintenance requests'
        ],
      },
    };

    logInfo('api-upload', 'Analysis completed successfully');

    return NextResponse.json({
      success: true,
      message: 'File uploaded and analyzed successfully',
      analysis: aiSummary,
      fileUrl: `/uploads/${filename}`,
    });
  } catch (error) {
    // Use auto-debug system to handle and potentially fix the error
    const result = await logError(error as Error, { component: 'api-upload' });
    
    // Return more specific error messages based on the error type
    if (error instanceof Error) {
      if (error.message.includes('ENOENT') || error.message.includes('permission')) {
        return NextResponse.json({ 
          error: 'File system error. Check directory permissions.' 
        }, { status: 500 });
      }
      
      return NextResponse.json({ 
        error: `Upload failed: ${error.message}` 
      }, { status: 500 });
    }
    
    return NextResponse.json({ 
      error: 'An unexpected error occurred during upload' 
    }, { status: 500 });
  }
} 