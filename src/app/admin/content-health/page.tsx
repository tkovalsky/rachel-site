"use client";

import { useState, useEffect } from 'react';
import { contentService, ContentError } from '@/lib/contentService';
import Link from 'next/link';

interface HealthStatus {
  totalFiles: number;
  errors: number;
  successRate: number;
  errorList: ContentError[];
}

export default function ContentHealthPage() {
  const [healthStatus, setHealthStatus] = useState<HealthStatus | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkHealth = async () => {
      const status = await contentService.getHealthStatus();
      setHealthStatus(status);
      setLoading(false);
    };

    void checkHealth();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-champagne mx-auto mb-4"></div>
          <p className="text-lg text-ink-soft">Checking content health...</p>
        </div>
      </div>
    );
  }

  if (!healthStatus) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="h1 text-deep mb-4">Health Check Failed</h1>
          <p className="lead text-ink-soft">Unable to check content health.</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white py-12">
      <div className="section">
        <div className="max-w-6xl mx-auto">
          <h1 className="h1 text-deep mb-8">Content Health Dashboard</h1>
          
          {/* Health Overview */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="card p-6 text-center">
              <h3 className="h3 text-deep mb-2">Total Files</h3>
              <p className="text-3xl font-bold text-champagne">{healthStatus.totalFiles}</p>
            </div>
            
            <div className="card p-6 text-center">
              <h3 className="h3 text-deep mb-2">Errors</h3>
              <p className={`text-3xl font-bold ${healthStatus.errors > 0 ? 'text-red-500' : 'text-green-500'}`}>
                {healthStatus.errors}
              </p>
            </div>
            
            <div className="card p-6 text-center">
              <h3 className="h3 text-deep mb-2">Success Rate</h3>
              <p className={`text-3xl font-bold ${healthStatus.successRate === 100 ? 'text-green-500' : 'text-yellow-500'}`}>
                {healthStatus.successRate}%
              </p>
            </div>
          </div>

          {/* Errors List */}
          {healthStatus.errorList.length > 0 ? (
            <div className="card p-6">
              <h2 className="h2 text-deep mb-6">Content Errors</h2>
              <div className="space-y-4">
                {healthStatus.errorList.map((error, index) => (
                  <div key={index} className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                        !
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-red-800 mb-1">
                          {error.file}
                        </h4>
                        <p className="text-red-700">{error.error}</p>
                        {error.line && (
                          <p className="text-sm text-red-600 mt-1">Line: {error.line}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="card p-6 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="h2 text-green-600 mb-2">All Content Healthy!</h2>
              <p className="text-green-600">No content parsing errors found.</p>
            </div>
          )}

          {/* Actions */}
          <div className="mt-8 flex gap-4">
            <button
              onClick={() => {
                window.location.reload();
              }}
              className="btn-primary"
            >
              Refresh Content
            </button>
            <Link
              href="/areas"
              className="btn-secondary"
            >
              View Areas Page
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
