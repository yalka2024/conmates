import { writeFile, readFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

// Types for the auto-debug system
interface DebugLog {
  timestamp: string;
  level: 'info' | 'warning' | 'error' | 'critical';
  component: string;
  message: string;
  details?: unknown;
  stack?: string;
  autoFixed?: boolean;
}

interface HealthCheck {
  component: string;
  status: 'healthy' | 'degraded' | 'unhealthy';
  lastCheck: string;
  issues: string[];
  autoFixes: string[];
}

interface AutoFixAction {
  id: string;
  description: string;
  condition: (context: Record<string, unknown>) => boolean;
  action: (context: Record<string, unknown>) => Promise<boolean>;
  priority: 'low' | 'medium' | 'high' | 'critical';
}

class AutoDebugSystem {
  private logs: DebugLog[] = [];
  private healthChecks: Map<string, HealthCheck> = new Map();
  private autoFixes: AutoFixAction[] = [];
  private isMonitoring = false;
  private logFile: string;
  private healthFile: string;

  constructor() {
    this.logFile = join(process.cwd(), 'logs', 'auto-debug.log');
    this.healthFile = join(process.cwd(), 'logs', 'health-status.json');
    this.initializeSystem();
  }

  private async initializeSystem() {
    try {
      // Create logs directory
      const logsDir = join(process.cwd(), 'logs');
      if (!existsSync(logsDir)) {
        await mkdir(logsDir, { recursive: true });
      }

      // Initialize auto-fixes
      this.initializeAutoFixes();
      
      // Start monitoring
      this.startMonitoring();
      
      this.log('info', 'system', 'Auto-debug system initialized successfully');
    } catch (error) {
      console.error('Failed to initialize auto-debug system:', error);
    }
  }

  private initializeAutoFixes() {
    // API Key Issues
    this.autoFixes.push({
      id: 'fix-openai-api-key',
      description: 'Fix OpenAI API key configuration issues',
      condition: (context) => {
        const err = (typeof context === 'object' && context && '_error' in context && typeof context._error === 'object') ? context._error as { message?: string } : undefined;
        return err?.message?.includes('OpenAI API key') || err?.message?.includes('AI_LoadAPIKeyError');
      },
      action: async (context) => {
        try {
          // Check if OPENAI_SECRET_KEY exists and set OPENAI_API_KEY
          if (process.env.OPENAI_SECRET_KEY && !process.env.OPENAI_API_KEY) {
            process.env.OPENAI_API_KEY = process.env.OPENAI_SECRET_KEY;
            this.log('info', 'auto-fix', 'Set OPENAI_API_KEY from OPENAI_SECRET_KEY');
            return true;
          }
          return false;
        } catch (error) {
          this.log('error', 'auto-fix', 'Failed to fix OpenAI API key', error);
          return false;
        }
      },
      priority: 'critical'
    });

    // File Upload Issues
    this.autoFixes.push({
      id: 'fix-upload-directory',
      description: 'Create missing upload directory',
      condition: (context) => {
        const err = (typeof context === 'object' && context && '_error' in context && typeof context._error === 'object') ? context._error as { message?: string } : undefined;
        return err?.message?.includes('ENOENT') || err?.message?.includes('permission');
      },
      action: async (context) => {
        try {
          const uploadsDir = join(process.cwd(), 'Uploads');
          if (!existsSync(uploadsDir)) {
            await mkdir(uploadsDir, { recursive: true });
            this.log('info', 'auto-fix', 'Created missing uploads directory');
            return true;
          }
          return false;
        } catch (error) {
          this.log('error', 'auto-fix', 'Failed to create upload directory', error);
          return false;
        }
      },
      priority: 'high'
    });

    // Cache Issues
    this.autoFixes.push({
      id: 'fix-cache-issues',
      description: 'Clear corrupted cache files',
      condition: (context) => {
        const err = (typeof context === 'object' && context && '_error' in context && typeof context._error === 'object') ? context._error as { message?: string } : undefined;
        return err?.message?.includes('cache') || err?.message?.includes('compilation') || context.component === 'nextjs';
      },
      action: async (context) => {
        try {
          // This would require restarting the dev server
          this.log('warning', 'auto-fix', 'Cache issue detected - manual restart recommended');
          return false; // Can't auto-fix without restart
        } catch (error) {
          this.log('error', 'auto-fix', 'Failed to handle cache issue', error);
          return false;
        }
      },
      priority: 'medium'
    });

    // Memory Issues
    this.autoFixes.push({
      id: 'fix-memory-issues',
      description: 'Handle memory-related issues',
      condition: (context) => {
        const err = (typeof context === 'object' && context && '_error' in context && typeof context._error === 'object') ? context._error as { message?: string } : undefined;
        return err?.message?.includes('memory') || err?.message?.includes('heap') || process.memoryUsage().heapUsed > 500 * 1024 * 1024; // 500MB
      },
      action: async (context) => {
        try {
          // Force garbage collection if available
          if (global.gc) {
            global.gc();
            this.log('info', 'auto-fix', 'Forced garbage collection');
            return true;
          }
          return false;
        } catch (error) {
          this.log('error', 'auto-fix', 'Failed to handle memory issue', error);
          return false;
        }
      },
      priority: 'medium'
    });

    // File Input Issues
    this.autoFixes.push({
      id: 'fix-file-input-double-trigger',
      description: 'Prevent file input double triggering',
      condition: (context) => {
        const err = (typeof context === 'object' && context && '_error' in context && typeof context._error === 'object') ? context._error as { message?: string } : undefined;
        const details = (typeof context === 'object' && context && 'details' in context && typeof context.details === 'object') ? context.details as { doubleTrigger?: boolean } : undefined;
        return context.component === 'file-input' && err?.message?.includes('double') || details?.doubleTrigger;
      },
      action: async (context) => {
        try {
          // This is handled in the frontend component
          this.log('info', 'auto-fix', 'File input double trigger detected - handled by component');
          return true;
        } catch (error) {
          this.log('error', 'auto-fix', 'Failed to handle file input issue', error);
          return false;
        }
      },
      priority: 'low'
    });
  }

  public log(level: DebugLog['level'], component: string, message: string, details?: unknown) {
    const logEntry: DebugLog = {
      timestamp: new Date().toISOString(),
      level,
      component,
      message,
      details,
      stack: level === 'error' || level === 'critical' ? new Error().stack : undefined
    };

    this.logs.push(logEntry);
    
    // Keep only last 1000 logs
    if (this.logs.length > 1000) {
      this.logs = this.logs.slice(-1000);
    }

    // Console output for immediate visibility
    const prefix = `[${logEntry.timestamp}] [${level.toUpperCase()}] [${component}]`;
    console.log(`${prefix}: ${message}`);
    
    if (details) {
      console.log(`${prefix} Details:`, details);
    }

    // Save to file
    this.saveLogs();
  }

  public async handleError(error: Error, context: Record<string, unknown> = {}) {
    this.log('error', (context.component as string) || 'unknown', error.message, {
      ...context,
      stack: error.stack
    });

    // Try auto-fixes
    const applicableFixes = this.autoFixes
      .filter(fix => fix.condition({ error, ...context }))
      .sort((a, b) => this.getPriorityScore(b.priority) - this.getPriorityScore(a.priority));

    for (const fix of applicableFixes) {
      try {
        this.log('info', 'auto-fix', `Attempting auto-fix: ${fix.description}`);
        const success = await fix.action({ error, ...context });
        
        if (success) {
          this.log('info', 'auto-fix', `Auto-fix successful: ${fix.description}`);
          return { fixed: true, fix: fix.description };
        }
      } catch (fixError) {
        this.log('error', 'auto-fix', `Auto-fix failed: ${fix.description}`, fixError);
      }
    }

    return { fixed: false, fixesAttempted: applicableFixes.length };
  }

  public async performHealthCheck(component: string): Promise<HealthCheck> {
    const check: HealthCheck = {
      component,
      status: 'healthy',
      lastCheck: new Date().toISOString(),
      issues: [],
      autoFixes: []
    };

    try {
      switch (component) {
        case 'api-upload':
          // Check if upload directory exists
          const uploadsDir = join(process.cwd(), 'Uploads');
          if (!existsSync(uploadsDir)) {
            check.status = 'degraded';
            check.issues.push('Upload directory missing');
          }
          break;

        case 'environment':
          // Check environment variables
          const requiredVars = ['OPENAI_SECRET_KEY'];
          for (const varName of requiredVars) {
            if (!process.env[varName]) {
              check.status = 'unhealthy';
              check.issues.push(`Missing environment variable: ${varName}`);
            }
          }
          break;

        case 'file-system':
          // Check file system permissions
          try {
            const testFile = join(process.cwd(), 'logs', 'test-write.tmp');
            await writeFile(testFile, 'test');
            await readFile(testFile);
            // Clean up
            // await unlink(testFile);
          } catch (error) {
            check.status = 'unhealthy';
            check.issues.push('File system write permission issues');
          }
          break;

        case 'memory':
          const memUsage = process.memoryUsage();
          const heapUsedMB = memUsage.heapUsed / 1024 / 1024;
          if (heapUsedMB > 500) {
            check.status = 'degraded';
            check.issues.push(`High memory usage: ${Math.round(heapUsedMB)}MB`);
          }
          break;
      }
    } catch (error) {
      check.status = 'unhealthy';
      check.issues.push(`Health check failed: ${error.message}`);
    }

    this.healthChecks.set(component, check);
    await this.saveHealthStatus();
    
    return check;
  }

  public async getSystemHealth(): Promise<HealthCheck[]> {
    const components = ['api-upload', 'environment', 'file-system', 'memory'];
    const checks = await Promise.all(
      components.map(comp => this.performHealthCheck(comp))
    );
    return checks;
  }

  public getRecentLogs(limit: number = 50): DebugLog[] {
    return this.logs.slice(-limit);
  }

  public getLogsByLevel(level: DebugLog['level']): DebugLog[] {
    return this.logs.filter(log => log.level === level);
  }

  public getLogsByComponent(component: string): DebugLog[] {
    return this.logs.filter(log => log.component === component);
  }

  private async saveLogs() {
    try {
      await writeFile(this.logFile, JSON.stringify(this.logs, null, 2));
    } catch (error) {
      console.error('Failed to save logs:', error);
    }
  }

  private async saveHealthStatus() {
    try {
      const healthData = Object.fromEntries(this.healthChecks);
      await writeFile(this.healthFile, JSON.stringify(healthData, null, 2));
    } catch (error) {
      console.error('Failed to save health status:', error);
    }
  }

  private getPriorityScore(priority: AutoFixAction['priority']): number {
    const scores = { low: 1, medium: 2, high: 3, critical: 4 };
    return scores[priority] || 0;
  }

  private startMonitoring() {
    if (this.isMonitoring) return;
    
    this.isMonitoring = true;
    
    // Periodic health checks
    setInterval(async () => {
      await this.getSystemHealth();
    }, 30000); // Every 30 seconds

    // Memory monitoring
    setInterval(() => {
      const memUsage = process.memoryUsage();
      const heapUsedMB = memUsage.heapUsed / 1024 / 1024;
      
      if (heapUsedMB > 400) {
        this.log('warning', 'memory', `High memory usage: ${Math.round(heapUsedMB)}MB`);
      }
    }, 60000); // Every minute

    // Log rotation
    setInterval(() => {
      if (this.logs.length > 1000) {
        this.logs = this.logs.slice(-500);
        this.saveLogs();
      }
    }, 300000); // Every 5 minutes

    this.log('info', 'monitoring', 'Auto-debug monitoring started');
  }

  public stopMonitoring() {
    this.isMonitoring = false;
    this.log('info', 'monitoring', 'Auto-debug monitoring stopped');
  }
}

// Global instance
export const autoDebug = new AutoDebugSystem();

// Utility functions for easy use
export const logError = (error: Error, context?: Record<string, unknown>) => autoDebug.handleError(error, context);
export const logInfo = (component: string, message: string, details?: unknown) => autoDebug.log('info', component, message, details);
export const logWarning = (component: string, message: string, details?: unknown) => autoDebug.log('warning', component, message, details);
export const getSystemHealth = () => autoDebug.getSystemHealth();
export const getRecentLogs = (limit?: number) => autoDebug.getRecentLogs(limit); 