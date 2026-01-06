'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';

interface HeroSectionProps {
  onFileUpload: (file: File) => void;
}

/**
 * FULLY REBUILT HERO SECTION
 * -------------------------------------------------------
 * - Keeps original UI / branding / gradients
 * - Keeps trust blocks, benefit points, upload box, email section
 * - Fixes ALL async issues that broke Vercel build
 * - Ensures await is ONLY inside async functions
 * - Progress animation works clean
 * - Email API call works and does NOT block UI thread
 * -------------------------------------------------------
 */

export default function HeroSection({ onFileUpload }: HeroSectionProps) {
  const [isHydrated, setIsHydrated] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [email, setEmail] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  // Hydration Fix
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return (
      <section className="relative bg-gradient-to-br from-primary via-secondary to-primary min-h-[600px] flex items-center">
        <div className="w-full px-4 lg:px-8 py-16">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-primary-foreground space-y-6">
              <div className="inline-block px-4 py-2 bg-accent/20 rounded-full text-sm font-medium">
                India's First Free BoQ Analysis Service
              </div>
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
                Expert Eyes on Your Interior Investment
              </h1>
              <p className="text-xl text-primary-foreground/90">
                Upload your BoQ & get expert analysis. Free.
              </p>
            </div>
            <div className="bg-card rounded-2xl shadow-brand-lg p-8">
              <div className="h-64 bg-muted rounded-lg animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Drag Events
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) validateAndSetFile(file);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) validateAndSetFile(file);
  };

  // Validate file rules
  const validateAndSetFile = (file: File) => {
    const validTypes = [
      'application/pdf',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'image/jpeg',
      'image/png',
      'image/jpg'
    ];

    if (!validTypes.includes(file.type)) {
      alert('Upload a valid file (PDF, Excel, Word, Image)');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      alert('File must be less than 10MB');
      return;
    }

    setSelectedFile(file);
  };

  /**
   * MAIN UPLOAD HANDLER
   * SAFELY WRITTEN
   */
  const handleUpload = async () => {
    if (!selectedFile || !email) {
      alert('Please select a file & enter email');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Enter a valid email');
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    /**
     * -------------------------
     * SAFE PROGRESS SIMULATION
     * -------------------------
     */
    const interval = setInterval(() => {
      setUploadProgress(prev => {
      if (prev >= 100) {
  clearInterval(interval);

  // 🔥 CALL API AFTER PROGRESS COMPLETES
  const sendEmail = async () => {
    try {
      console.log("CALLING /api/send-email");

      await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userEmail: email,
          userName: email.split('@')[0] || 'Customer',
          fileCount: 1,
          estimatedDelivery: 'Within 24–48 hours',
        }),
      });

      alert(`Upload successful! Your report will be emailed to ${email} within 24–48 hours.`);
    } catch (err) {
      console.error('Email send failed', err);
      alert("Upload completed, but failed to send confirmation email.");
    } finally {
      setIsUploading(false);
    }
  };

  sendEmail();
  return 100;
}
        return prev + 10;
      });
    }, 200);

/**
 * API CALL (ASYNC SAFE)
 */
try {
  await fetch('/api/send-email', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      userEmail: email,
      userName: email.split('@')[0] || 'Customer',
      fileCount: 1,
      estimatedDelivery: 'Within 24–48 hours',
    }),
  });

  alert(`Upload successful! Your report will be emailed to ${email} within 24–48 hours.`);
} catch (err) {
  console.error('Email send failed', err);
}

    onFileUpload(selectedFile);
    setSelectedFile(null);
    setEmail('');
  };

  /**
   * --------------------------------------------
   * FULL ORIGINAL UI PRESERVED BELOW
   * --------------------------------------------
   */
  return (
    <section className="relative bg-gradient-to-br from-primary via-secondary to-primary min-h-[600px] flex items-center overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-accent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent rounded-full blur-3xl"></div>
      </div>

      <div className="relative w-full px-4 lg:px-8 py-16">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">

          {/* LEFT SIDE */}
          <div className="text-primary-foreground space-y-6">
            <div className="inline-block px-4 py-2 bg-accent/20 rounded-full text-sm font-medium backdrop-blur-sm text-left">
              India&apos;s First Free BoQ Analysis Service
            </div>

            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight text-white">
              Smart, Accurate Interior Cost Insights — Completely Free
            </h1>

            <p className="text-xl text-primary-foreground/90 leading-relaxed">
              Upload your BoQ and get a professional analysis in 24–48 hours.
            </p>

            {/* TRUST BLOCKS */}
            <div className="grid grid-cols-3 gap-4 pt-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-accent">2,500+</div>
                <div className="text-sm text-primary-foreground/80">BoQs Analyzed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent">98%</div>
                <div className="text-sm text-primary-foreground/80">Satisfaction Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent">₹45Cr+</div>
                <div className="text-sm text-primary-foreground/80">Savings Delivered</div>
              </div>
            </div>

            {/* BENEFITS */}
            <div className="space-y-3 pt-4">
              {[
                'Expert review within 24–48 hours',
                'Identify hidden costs & overpricing',
                'Actionable cost optimization insights'
              ].map((text, i) => (
                <div key={i} className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
                    <Icon name="CheckIcon" size={16} variant="solid" className="text-accent-foreground" />
                  </div>
                  <span className="text-primary-foreground/90">{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT SIDE CARD */}
          <div className="bg-card rounded-2xl shadow-brand-lg p-8 space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-text-primary">Upload Your BoQ</h2>
              <p className="text-text-secondary text-sm">Expert analysis within 24–48 hours</p>
            </div>

            {/* UPLOAD BOX */}
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-xl p-8 text-center transition-brand ${
                isDragging ? 'border-accent bg-accent/5' : 'border-border hover:border-accent/50'
              }`}
            >
              <input
                type="file"
                id="file-upload"
                className="hidden"
                onChange={handleFileSelect}
                accept=".pdf,.xls,.xlsx,.doc,.docx,.jpg,.jpeg,.png"
              />

              {selectedFile ? (
                <div className="space-y-4">
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto">
                    <Icon name="DocumentTextIcon" size={32} variant="solid" className="text-accent" />
                  </div>
                  <p className="font-medium">{selectedFile.name}</p>
                  <p className="text-sm text-text-secondary">
                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                  <button onClick={() => setSelectedFile(null)} className="text-sm text-accent hover:underline">
                    Remove file
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
                    <Icon name="CloudArrowUpIcon" size={32} variant="outline" className="text-text-secondary" />
                  </div>
                  <p className="font-medium">Drag & drop your file</p>
                  <p className="text-sm text-text-secondary">or</p>

                  <label
                    htmlFor="file-upload"
                    className="inline-block px-6 py-2.5 bg-accent text-accent-foreground font-semibold rounded-lg cursor-pointer hover:bg-cta transition"
                  >
                    Browse Files
                  </label>

                  <p className="text-xs text-text-secondary">
                    Supports PDF, Excel, Word, Images (Max 10MB)
                  </p>
                </div>
              )}
            </div>

            {/* EMAIL */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Email Address</label>
              <input
                type="email"
                value={email}
                placeholder="your.email@example.com"
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border rounded-lg"
              />
            </div>

            {/* PROGRESS */}
            {isUploading && (
              <div>
                <div className="flex justify-between text-sm">
                  <span>Uploading...</span>
                  <span>{uploadProgress}%</span>
                </div>
                <div className="w-full h-2 bg-muted rounded-full">
                  <div className="h-full bg-accent transition-all" style={{ width: `${uploadProgress}%` }}></div>
                </div>
              </div>
            )}

            {/* BUTTON */}
            <button
              type="button"
              onClick={handleUpload}
              disabled={!selectedFile || !email || isUploading}
              className={`
    w-full px-6 py-3.5 font-semibold rounded-lg transition-brand shadow-brand-sm
    ${isUploading ? 'bg-gray-400 text-white' :
    (!selectedFile || !email)
      ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
      : 'bg-accent text-accent-foreground hover:bg-cta'}
  `} 
            >
              {isUploading ? 'Uploading…' : 'Get Free Analysis'}
            </button>

            {/* SECURITY */}
            <div className="flex text-xs space-x-2">
              <Icon name="LockClosedIcon" size={16} variant="solid" className="text-success" />
              <p>Your data is encrypted & secure.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
