'use client';

import { useState, useEffect } from 'react';

import Icon from '@/components/ui/AppIcon';

interface HeroSectionProps {
  onFileUpload: (file: File) => void;
}

export default function HeroSection({ onFileUpload }: HeroSectionProps) {
  const [isHydrated, setIsHydrated] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [email, setEmail] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

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
                Upload your Bill of Quantities and get professional analysis from experts with decades of experience. Completely free.
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

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      validateAndSetFile(file);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      validateAndSetFile(file);
    }
  };

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
      alert('Please upload a valid file format (PDF, Excel, Word, or Image)');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      alert('File size must be less than 10MB');
      return;
    }

    setSelectedFile(file);
  };

 const handleUpload = async () => {
  if (!selectedFile || !email) {
    alert('Please select a file and enter your email!');
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert('Please enter a valid email address');
    return;
  }

  setIsUploading(true);
  setUploadProgress(0);

  const interval = setInterval(() => {
    setUploadProgress((prev) => {
      if (prev >= 100) {
        clearInterval(interval);

        setTimeout(async () => {
          setIsUploading(false);

          alert(`Upload successful! You will receive your analysis report within 24-48 hours at ${email}`);

          try {
            await fetch("/api/send-email", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                userEmail: email,
                userName: email.split("@")[0] || "Customer",
                fileCount: 1,
                estimatedDelivery: "Within 24–48 hours",
              }),
            });
          } catch (err) {
            console.error("Email send failed", err);
          }

          setSelectedFile(null);
          setEmail('');

        }, 500);

        return 100;
      }

      return prev + 10;
    });
  }, 200);

  onFileUpload(selectedFile);
};


  return (
    <section className="relative bg-gradient-to-br from-primary via-secondary to-primary min-h-[600px] flex items-center overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-accent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent rounded-full blur-3xl"></div>
      </div>

      <div className="relative w-full px-4 lg:px-8 py-16">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-primary-foreground space-y-6">
            <div className="inline-block px-4 py-2 bg-accent/20 rounded-full text-sm font-medium backdrop-blur-sm text-left">
              India's First Free BoQ Analysis Service
            </div>
            
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight text-white">
              Smart, Accurate Interior Cost Insights — Completely Free
            </h1>
            
            <p className="text-xl text-primary-foreground/90 leading-relaxed">
              Upload your Bill of Quantities (BoQ) and get a professional cost analysis within 24–48 hours.
            </p>

            {/* Trust Signals */}
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
                <div className="text-3xl font-bold text-accent">₹45Crore+</div>
                <div className="text-sm text-primary-foreground/80">Saved for Clients</div>
              </div>
            </div>

            {/* Key Benefits */}
            <div className="space-y-3 pt-4">
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
                  <Icon name="CheckIcon" size={16} variant="solid" className="text-accent-foreground" />
                </div>
                <span className="text-primary-foreground/90">Free professional analysis within 24-48 hours</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
                  <Icon name="CheckIcon" size={16} variant="solid" className="text-accent-foreground" />
                </div>
                <span className="text-primary-foreground/90">Identify hidden costs and overpricing</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
                  <Icon name="CheckIcon" size={16} variant="solid" className="text-accent-foreground" />
                </div>
                <span className="text-primary-foreground/90">Expert recommendations for cost optimization</span>
              </div>
            </div>
          </div>

          {/* Right Upload Card */}
          <div className="bg-card rounded-2xl shadow-brand-lg p-8 space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-text-primary">Upload Your BoQ</h2>
              <p className="text-text-secondary text-sm">Get expert analysis in 24-48 hours</p>
            </div>

            {/* Upload Area */}
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-xl p-8 text-center transition-brand ${
                isDragging
                  ? 'border-accent bg-accent/5' :'border-border hover:border-accent/50'
              }`}
            >
              <input
                type="file"
                id="file-upload"
                className="hidden"
                accept=".pdf,.xls,.xlsx,.doc,.docx,.jpg,.jpeg,.png"
                onChange={handleFileSelect}
              />
              
              {selectedFile ? (
                <div className="space-y-4">
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto">
                    <Icon name="DocumentTextIcon" size={32} variant="solid" className="text-accent" />
                  </div>
                  <div>
                    <p className="font-medium text-text-primary">{selectedFile.name}</p>
                    <p className="text-sm text-text-secondary">
                      {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedFile(null)}
                    className="text-sm text-accent hover:text-cta transition-brand"
                  >
                    Remove file
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
                    <Icon name="CloudArrowUpIcon" size={32} variant="outline" className="text-text-secondary" />
                  </div>
                  <div>
                    <p className="text-text-primary font-medium">
                      Drag and drop your file here
                    </p>
                    <p className="text-sm text-text-secondary mt-1">or</p>
                  </div>
                  <label
                    htmlFor="file-upload"
                    className="inline-block px-6 py-2.5 bg-accent text-accent-foreground font-semibold rounded-lg hover:bg-cta transition-brand cursor-pointer"
                  >
                    Browse Files
                  </label>
                  <p className="text-xs text-text-secondary">
                    Supports PDF, Excel, Word, Images (Max 10MB)
                  </p>
                </div>
              )}
            </div>

            {/* Email Input */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-text-primary">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@example.com"
                className="w-full px-4 py-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring bg-background text-text-primary"
              />
              <p className="text-xs text-text-secondary">
                We'll send your analysis report to this email
              </p>
            </div>

            {/* Upload Progress */}
            {isUploading && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-text-secondary">Uploading...</span>
                  <span className="text-accent font-medium">{uploadProgress}%</span>
                </div>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-accent transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              onClick={handleUpload}
              disabled={!selectedFile || !email || isUploading}
              className="w-full px-6 py-3.5 bg-accent text-accent-foreground font-semibold rounded-lg hover:bg-cta transition-brand shadow-brand-sm hover:shadow-brand disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isUploading ? 'Uploading...' : 'Get Free Analysis'}
            </button>

            {/* Security Note */}
            <div className="flex items-start space-x-2 text-xs text-text-secondary">
              <Icon name="LockClosedIcon" size={16} variant="solid" className="text-success flex-shrink-0 mt-0.5" />
              <p>Your data is encrypted and secure. We never share your information.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
