# Card Optimization Performance Monitoring Guide

## Overview

This guide provides comprehensive monitoring strategies for the Card component optimization project. It covers metrics collection, analysis tools, and alerting systems to ensure the optimization delivers expected performance improvements.

## Key Performance Indicators (KPIs)

### Primary Metrics

#### Bundle Size Metrics
- **Total Card Bundle Size**: Sum of all card variant chunks
- **Individual Variant Size**: Size of each card variant chunk
- **Reduction Percentage**: Compared to original monolithic card
- **Gzip Compression Ratio**: Effectiveness of compression per variant

#### Load Performance Metrics
- **Time to Interactive (TTI)**: When page becomes fully interactive
- **First Contentful Paint (FCP)**: When first card content appears
- **Largest Contentful Paint (LCP)**: When main card content loads
- **Cumulative Layout Shift (CLS)**: Layout stability during card loading

#### Runtime Performance Metrics
- **Chunk Load Time**: Time to load each card variant
- **Component Mount Time**: Time from download to render
- **Memory Usage**: Peak memory consumption per variant
- **Cache Hit Rate**: Percentage of cached variant loads

### Secondary Metrics

#### Developer Experience
- **Build Time**: Time to compile all card variants
- **Development Server Start**: Cold start time with variants
- **Hot Reload Performance**: Update speed during development
- **Bundle Analysis Time**: Time to analyze variant chunks

#### Business Metrics
- **Bounce Rate**: User engagement with faster cards
- **Conversion Rate**: Impact on user actions
- **Page Views**: Effect on user navigation
- **Time on Page**: User engagement duration

## Monitoring Setup

### 1. Bundle Analysis Configuration

**webpack-bundle-analyzer Setup**
```javascript
// next.config.js
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
});

module.exports = withBundleAnalyzer({
  webpack: (config, { isServer, webpack }) => {
    if (!isServer) {
      // Custom chunk naming for card variants
      config.optimization.splitChunks.cacheGroups.cardVariants = {
        test: /[\\/]Card[\\/]variants[\\/]/,
        name(module, chunks, cacheGroupKey) {
          const match = module.context.match(/variants[\\/]([^\\/]+)/);
          const variantName = match ? match[1].toLowerCase() : 'unknown';
          return `card-${variantName}`;
        },
        priority: 20,
        reuseExistingChunk: true,
        minSize: 0,
        enforce: true
      };

      // Bundle analysis plugin
      if (process.env.NODE_ENV === 'production' && process.env.ANALYZE) {
        config.plugins.push(
          new webpack.DefinePlugin({
            'process.env.BUNDLE_ANALYZE': JSON.stringify('true')
          })
        );
      }
    }

    return config;
  }
});
```

**Automated Bundle Analysis Script**
```javascript
// scripts/analyze-card-performance.js
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

async function analyzeCardBundles() {
  console.log(chalk.blue('🔍 Analyzing Card Bundle Performance...\n'));

  // Read build stats
  const statsFile = path.join(__dirname, '../.next/stats.json');
  if (!fs.existsSync(statsFile)) {
    console.log(chalk.red('❌ No stats.json found. Run build with ANALYZE=true first.'));
    return;
  }

  const stats = JSON.parse(fs.readFileSync(statsFile, 'utf8'));
  
  // Extract card-related chunks
  const cardChunks = Object.entries(stats.namedChunkGroups)
    .filter(([name]) => name.includes('card-'))
    .map(([name, data]) => {
      const variant = name.replace('card-', '');
      const size = data.assets.reduce((sum, asset) => sum + asset.size, 0);
      const gzipSize = data.assets.reduce((sum, asset) => sum + (asset.compressedSize || asset.size * 0.3), 0);
      
      return {
        variant: variant.charAt(0).toUpperCase() + variant.slice(1),
        size: size,
        sizeKB: Math.round(size / 1024 * 100) / 100,
        gzipKB: Math.round(gzipSize / 1024 * 100) / 100,
        files: data.assets.map(a => a.name),
        compression: Math.round((1 - gzipSize / size) * 100)
      };
    })
    .sort((a, b) => b.size - a.size);

  if (cardChunks.length === 0) {
    console.log(chalk.yellow('⚠️  No card variant chunks found.'));
    return;
  }

  // Display results
  console.log(chalk.green('📊 Card Variant Analysis:\n'));
  console.table(cardChunks.map(chunk => ({
    Variant: chunk.variant,
    'Size (KB)': chunk.sizeKB,
    'Gzipped (KB)': chunk.gzipKB,
    'Compression': `${chunk.compression}%`,
    'Files': chunk.files.length
  })));

  // Calculate totals and savings
  const totalSize = cardChunks.reduce((sum, chunk) => sum + chunk.size, 0);
  const totalGzipSize = cardChunks.reduce((sum, chunk) => sum + chunk.gzipKB * 1024, 0);
  const baseline = 150000; // Original card bundle size (estimate)
  const savings = baseline - totalSize;
  const savingsPercent = Math.round((savings / baseline) * 100);

  console.log(chalk.cyan('\n📈 Performance Summary:'));
  console.log(`• Total variants size: ${Math.round(totalSize / 1024 * 100) / 100}KB`);
  console.log(`• Total gzipped size: ${Math.round(totalGzipSize / 1024 * 100) / 100}KB`);
  console.log(`• Estimated savings: ${Math.round(savings / 1024 * 100) / 100}KB (${savingsPercent}%)`);
  console.log(`• Average variant size: ${Math.round(totalSize / cardChunks.length / 1024 * 100) / 100}KB`);

  // Performance recommendations
  console.log(chalk.magenta('\n💡 Recommendations:'));
  cardChunks.forEach(chunk => {
    if (chunk.sizeKB > 30) {
      console.log(`• ${chunk.variant} is large (${chunk.sizeKB}KB) - consider splitting further`);
    }
    if (chunk.compression < 70) {
      console.log(`• ${chunk.variant} has low compression (${chunk.compression}%) - check for optimization opportunities`);
    }
  });

  // Save analysis to file
  const report = {
    timestamp: new Date().toISOString(),
    chunks: cardChunks,
    summary: {
      totalSize: Math.round(totalSize / 1024 * 100) / 100,
      totalGzipSize: Math.round(totalGzipSize / 1024 * 100) / 100,
      estimatedSavings: Math.round(savings / 1024 * 100) / 100,
      savingsPercent,
      variantCount: cardChunks.length
    }
  };

  fs.writeFileSync(
    path.join(__dirname, '../reports/card-bundle-analysis.json'),
    JSON.stringify(report, null, 2)
  );

  console.log(chalk.gray('\n📝 Report saved to reports/card-bundle-analysis.json'));
}

if (require.main === module) {
  analyzeCardBundles().catch(console.error);
}

module.exports = { analyzeCardBundles };
```

### 2. Runtime Performance Monitoring

**Performance Observer Setup**
```typescript
// utils/card-performance-monitor.ts
interface CardPerformanceMetrics {
  variant: string;
  loadTime: number;
  mountTime: number;
  size: number;
  cached: boolean;
  timestamp: number;
}

class CardPerformanceMonitor {
  private metrics: CardPerformanceMetrics[] = [];
  private observer: PerformanceObserver | null = null;

  constructor() {
    this.initializeObserver();
  }

  private initializeObserver() {
    if (typeof window === 'undefined' || !('PerformanceObserver' in window)) {
      return;
    }

    this.observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.name.includes('card-') && entry.entryType === 'resource') {
          this.trackVariantLoad(entry as PerformanceResourceTiming);
        } else if (entry.entryType === 'measure' && entry.name.startsWith('card-mount-')) {
          this.trackVariantMount(entry);
        }
      }
    });

    this.observer.observe({ 
      entryTypes: ['resource', 'measure', 'navigation'] 
    });
  }

  private trackVariantLoad(entry: PerformanceResourceTiming) {
    const variantMatch = entry.name.match(/card-(\w+)/);
    if (!variantMatch) return;

    const variant = variantMatch[1];
    const metrics: CardPerformanceMetrics = {
      variant,
      loadTime: entry.duration,
      mountTime: 0, // Will be set later
      size: entry.transferSize || entry.encodedBodySize,
      cached: entry.transferSize === 0,
      timestamp: Date.now()
    };

    this.metrics.push(metrics);
    this.reportToAnalytics(metrics);
  }

  private trackVariantMount(entry: PerformanceEntry) {
    const variant = entry.name.replace('card-mount-', '');
    const metric = this.metrics.find(m => 
      m.variant === variant && 
      Math.abs(m.timestamp - Date.now()) < 5000
    );

    if (metric) {
      metric.mountTime = entry.duration;
    }
  }

  private reportToAnalytics(metrics: CardPerformanceMetrics) {
    // Send to your analytics service
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'card_variant_loaded', {
        variant: metrics.variant,
        load_time: Math.round(metrics.loadTime),
        size_kb: Math.round(metrics.size / 1024),
        cached: metrics.cached,
        custom_parameter_1: metrics.mountTime
      });
    }

    // Send to internal metrics
    if (process.env.NODE_ENV === 'development') {
      console.log(`📊 Card Performance: ${metrics.variant}`, {
        loadTime: `${metrics.loadTime.toFixed(2)}ms`,
        size: `${(metrics.size / 1024).toFixed(2)}KB`,
        cached: metrics.cached
      });
    }
  }

  public startMountTimer(variant: string) {
    if (typeof performance !== 'undefined') {
      performance.mark(`card-mount-start-${variant}`);
    }
  }

  public endMountTimer(variant: string) {
    if (typeof performance !== 'undefined') {
      performance.mark(`card-mount-end-${variant}`);
      performance.measure(
        `card-mount-${variant}`,
        `card-mount-start-${variant}`,
        `card-mount-end-${variant}`
      );
    }
  }

  public getMetrics(): CardPerformanceMetrics[] {
    return [...this.metrics];
  }

  public getAverageMetrics() {
    if (this.metrics.length === 0) return null;

    const byVariant = this.metrics.reduce((acc, metric) => {
      if (!acc[metric.variant]) {
        acc[metric.variant] = [];
      }
      acc[metric.variant].push(metric);
      return acc;
    }, {} as Record<string, CardPerformanceMetrics[]>);

    return Object.entries(byVariant).map(([variant, metrics]) => ({
      variant,
      avgLoadTime: metrics.reduce((sum, m) => sum + m.loadTime, 0) / metrics.length,
      avgMountTime: metrics.reduce((sum, m) => sum + m.mountTime, 0) / metrics.length,
      avgSize: metrics.reduce((sum, m) => sum + m.size, 0) / metrics.length,
      cacheHitRate: metrics.filter(m => m.cached).length / metrics.length,
      sampleSize: metrics.length
    }));
  }

  public reset() {
    this.metrics = [];
  }

  public destroy() {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
  }
}

// Export singleton instance
export const cardPerformanceMonitor = new CardPerformanceMonitor();

// Hook for React components
export function useCardPerformanceMonitor(variant: string) {
  React.useEffect(() => {
    cardPerformanceMonitor.startMountTimer(variant);
    return () => {
      cardPerformanceMonitor.endMountTimer(variant);
    };
  }, [variant]);
}
```

**Integration with Card Components**
```typescript
// In each card variant component
import { useCardPerformanceMonitor } from '../../../utils/card-performance-monitor';

const CardMedia: React.FC<CardProps> = (props) => {
  useCardPerformanceMonitor('media');
  
  // ... rest of component
};
```

### 3. Core Web Vitals Monitoring

**Web Vitals Setup**
```typescript
// utils/web-vitals.ts
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

interface VitalMetric {
  name: string;
  value: number;
  delta: number;
  id: string;
  rating: 'good' | 'needs-improvement' | 'poor';
}

function sendToAnalytics({ name, value, id, rating }: VitalMetric) {
  // Send to Google Analytics
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', name, {
      value: Math.round(name === 'CLS' ? value * 1000 : value),
      metric_id: id,
      metric_rating: rating,
      custom_parameter_1: 'card_optimization'
    });
  }

  // Send to custom analytics
  fetch('/api/analytics/web-vitals', {
    method: 'POST',
    body: JSON.stringify({
      name,
      value,
      id,
      rating,
      timestamp: Date.now(),
      url: window.location.href,
      userAgent: navigator.userAgent
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  }).catch(console.error);
}

export function initWebVitals() {
  getCLS(sendToAnalytics);
  getFID(sendToAnalytics);
  getFCP(sendToAnalytics);
  getLCP(sendToAnalytics);
  getTTFB(sendToAnalytics);
}

// Card-specific Web Vitals tracking
export function trackCardPageVitals(cardVariants: string[]) {
  // Add metadata about which card variants are on the page
  const vitalsHandler = (metric: VitalMetric) => {
    sendToAnalytics({
      ...metric,
      // Add custom properties
      custom_parameter_2: cardVariants.join(','),
      custom_parameter_3: cardVariants.length.toString()
    } as any);
  };

  getCLS(vitalsHandler);
  getFID(vitalsHandler);
  getFCP(vitalsHandler);
  getLCP(vitalsHandler);
  getTTFB(vitalsHandler);
}
```

### 4. Build Performance Monitoring

**Build Time Tracking**
```javascript
// scripts/build-performance.js
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

class BuildPerformanceTracker {
  constructor() {
    this.startTime = Date.now();
    this.phases = {};
  }

  startPhase(name) {
    this.phases[name] = { start: Date.now() };
    console.log(chalk.blue(`⏱️  Starting ${name}...`));
  }

  endPhase(name) {
    if (this.phases[name]) {
      this.phases[name].end = Date.now();
      this.phases[name].duration = this.phases[name].end - this.phases[name].start;
      console.log(chalk.green(`✅ ${name} completed in ${this.phases[name].duration}ms`));
    }
  }

  generateReport() {
    const totalTime = Date.now() - this.startTime;
    
    console.log(chalk.cyan('\n📊 Build Performance Report:'));
    console.table(Object.entries(this.phases).map(([name, data]) => ({
      Phase: name,
      'Duration (ms)': data.duration,
      'Duration (s)': (data.duration / 1000).toFixed(2),
      'Percentage': `${((data.duration / totalTime) * 100).toFixed(1)}%`
    })));

    console.log(`\n⏱️  Total build time: ${totalTime}ms (${(totalTime / 1000).toFixed(2)}s)`);

    // Save report
    const report = {
      timestamp: new Date().toISOString(),
      totalTime,
      phases: this.phases
    };

    const reportsDir = path.join(__dirname, '../reports');
    if (!fs.existsSync(reportsDir)) {
      fs.mkdirSync(reportsDir, { recursive: true });
    }

    fs.writeFileSync(
      path.join(reportsDir, 'build-performance.json'),
      JSON.stringify(report, null, 2)
    );

    return report;
  }
}

// Usage in build scripts
const tracker = new BuildPerformanceTracker();

// In next.config.js or build scripts
tracker.startPhase('webpack-compilation');
// ... webpack compilation
tracker.endPhase('webpack-compilation');

tracker.startPhase('card-variant-splitting');
// ... card variant processing
tracker.endPhase('card-variant-splitting');

tracker.generateReport();
```

### 5. Alerting and Notifications

**Performance Alert System**
```typescript
// utils/performance-alerts.ts
interface AlertThreshold {
  metric: string;
  threshold: number;
  comparison: 'gt' | 'lt' | 'eq';
  severity: 'warning' | 'error' | 'critical';
}

const ALERT_THRESHOLDS: AlertThreshold[] = [
  { metric: 'bundleSize', threshold: 50000, comparison: 'gt', severity: 'warning' },
  { metric: 'loadTime', threshold: 3000, comparison: 'gt', severity: 'error' },
  { metric: 'buildTime', threshold: 300000, comparison: 'gt', severity: 'warning' },
  { metric: 'cacheHitRate', threshold: 0.8, comparison: 'lt', severity: 'warning' },
  { metric: 'cls', threshold: 0.1, comparison: 'gt', severity: 'error' },
  { metric: 'lcp', threshold: 2500, comparison: 'gt', severity: 'error' }
];

export class PerformanceAlerter {
  private notifications: Array<{ message: string; severity: string; timestamp: number }> = [];

  checkMetric(metric: string, value: number) {
    const threshold = ALERT_THRESHOLDS.find(t => t.metric === metric);
    if (!threshold) return;

    let triggered = false;
    switch (threshold.comparison) {
      case 'gt':
        triggered = value > threshold.threshold;
        break;
      case 'lt':
        triggered = value < threshold.threshold;
        break;
      case 'eq':
        triggered = value === threshold.threshold;
        break;
    }

    if (triggered) {
      this.sendAlert(metric, value, threshold);
    }
  }

  private sendAlert(metric: string, value: number, threshold: AlertThreshold) {
    const message = `Performance Alert: ${metric} is ${value} (threshold: ${threshold.threshold})`;
    
    console.warn(`⚠️  ${message}`);
    
    this.notifications.push({
      message,
      severity: threshold.severity,
      timestamp: Date.now()
    });

    // Send to monitoring service
    this.sendToMonitoring(metric, value, threshold);
    
    // Send to Slack/Teams if critical
    if (threshold.severity === 'critical') {
      this.sendToSlack(message);
    }
  }

  private sendToMonitoring(metric: string, value: number, threshold: AlertThreshold) {
    // Send to DataDog, New Relic, etc.
    fetch('/api/monitoring/alert', {
      method: 'POST',
      body: JSON.stringify({
        metric,
        value,
        threshold: threshold.threshold,
        severity: threshold.severity,
        timestamp: Date.now()
      }),
      headers: { 'Content-Type': 'application/json' }
    }).catch(console.error);
  }

  private sendToSlack(message: string) {
    const webhookUrl = process.env.SLACK_WEBHOOK_URL;
    if (!webhookUrl) return;

    fetch(webhookUrl, {
      method: 'POST',
      body: JSON.stringify({
        text: `🚨 Card Optimization Performance Alert`,
        attachments: [{
          color: 'danger',
          text: message,
          ts: Math.floor(Date.now() / 1000)
        }]
      }),
      headers: { 'Content-Type': 'application/json' }
    }).catch(console.error);
  }

  getRecentAlerts(hours = 24) {
    const cutoff = Date.now() - (hours * 60 * 60 * 1000);
    return this.notifications.filter(n => n.timestamp > cutoff);
  }
}

export const performanceAlerter = new PerformanceAlerter();
```

## Monitoring Dashboard

### Real-time Dashboard Component
```typescript
// components/PerformanceDashboard.tsx
import React, { useEffect, useState } from 'react';
import { cardPerformanceMonitor } from '../utils/card-performance-monitor';

interface DashboardData {
  bundleSizes: Record<string, number>;
  loadTimes: Record<string, number>;
  cacheHitRates: Record<string, number>;
  alerts: Array<{ message: string; severity: string; timestamp: number }>;
}

export const PerformanceDashboard: React.FC = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/performance/dashboard');
        const dashboardData = await response.json();
        setData(dashboardData);
      } catch (error) {
        console.error('Failed to load dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  if (loading) return <div>Loading dashboard...</div>;
  if (!data) return <div>Failed to load dashboard</div>;

  return (
    <div className="performance-dashboard">
      <h2>Card Optimization Performance Dashboard</h2>
      
      <div className="metrics-grid">
        <div className="metric-card">
          <h3>Bundle Sizes</h3>
          {Object.entries(data.bundleSizes).map(([variant, size]) => (
            <div key={variant} className="metric-row">
              <span>{variant}:</span>
              <span>{(size / 1024).toFixed(2)}KB</span>
            </div>
          ))}
        </div>

        <div className="metric-card">
          <h3>Load Times</h3>
          {Object.entries(data.loadTimes).map(([variant, time]) => (
            <div key={variant} className="metric-row">
              <span>{variant}:</span>
              <span>{time.toFixed(2)}ms</span>
            </div>
          ))}
        </div>

        <div className="metric-card">
          <h3>Cache Hit Rates</h3>
          {Object.entries(data.cacheHitRates).map(([variant, rate]) => (
            <div key={variant} className="metric-row">
              <span>{variant}:</span>
              <span>{(rate * 100).toFixed(1)}%</span>
            </div>
          ))}
        </div>

        <div className="metric-card">
          <h3>Recent Alerts</h3>
          {data.alerts.length === 0 ? (
            <div className="no-alerts">✅ No recent alerts</div>
          ) : (
            data.alerts.map((alert, index) => (
              <div key={index} className={`alert alert-${alert.severity}`}>
                {alert.message}
                <span className="alert-time">
                  {new Date(alert.timestamp).toLocaleTimeString()}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
```

## Automated Reporting

### Daily Performance Report
```javascript
// scripts/daily-performance-report.js
const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');

async function generateDailyReport() {
  const today = new Date().toISOString().split('T')[0];
  
  // Collect data from various sources
  const bundleData = JSON.parse(fs.readFileSync('./reports/card-bundle-analysis.json', 'utf8'));
  const buildData = JSON.parse(fs.readFileSync('./reports/build-performance.json', 'utf8'));
  const webVitalsData = await fetchWebVitalsData();
  
  const report = {
    date: today,
    bundle: {
      totalSize: bundleData.summary.totalSize,
      savingsPercent: bundleData.summary.savingsPercent,
      variantCount: bundleData.summary.variantCount
    },
    build: {
      totalTime: buildData.totalTime,
      phases: Object.keys(buildData.phases).length
    },
    webVitals: webVitalsData,
    recommendations: generateRecommendations(bundleData, buildData, webVitalsData)
  };

  // Generate HTML report
  const htmlReport = generateHTMLReport(report);
  
  // Save to file
  fs.writeFileSync(`./reports/daily-report-${today}.html`, htmlReport);
  
  // Send email
  await sendEmailReport(htmlReport, today);
  
  console.log(`📧 Daily report generated and sent for ${today}`);
}

function generateRecommendations(bundleData, buildData, webVitalsData) {
  const recommendations = [];
  
  // Bundle size recommendations
  bundleData.chunks.forEach(chunk => {
    if (chunk.sizeKB > 30) {
      recommendations.push(`Consider optimizing ${chunk.variant} variant (${chunk.sizeKB}KB)`);
    }
  });
  
  // Build time recommendations
  if (buildData.totalTime > 300000) {
    recommendations.push('Build time is over 5 minutes - consider optimizing webpack config');
  }
  
  // Web Vitals recommendations
  if (webVitalsData.lcp > 2500) {
    recommendations.push(`LCP is ${webVitalsData.lcp}ms - optimize critical resources`);
  }
  
  return recommendations;
}

// Run daily at 9 AM
if (require.main === module) {
  generateDailyReport().catch(console.error);
}
```

This comprehensive monitoring setup provides visibility into all aspects of the Card optimization performance, from bundle sizes to user experience metrics. The monitoring system will help validate that the optimization is working as expected and alert the team to any performance regressions.