'use client';

import { useState, useEffect } from 'react';
import UploadZone from './UploadZone';
import FilePreview from './FilePreview';
import ContactForm, { ContactFormData } from './ContactForm';
import UploadProgress from './UploadProgress';
import FormatGuidance from './FormatGuidance';
import SuccessModal from './SuccessModal';
import Icon from '@/components/ui/AppIcon';
import { trackBoQUploadStart, trackBoQUploadComplete, trackBoQUploadError, trackFileRemove, trackGuidelineView, trackFormStart } from '@/lib/analytics-events';
import { sendUploadConfirmationEmail } from '@/services/emailService';

const UploadAnalysisInteractive = () => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [currentStage, setCurrentStage] = useState('');
  const [estimatedTime, setEstimatedTime] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [deliveryTime, setDeliveryTime] = useState('');
  const [showGuidance, setShowGuidance] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const acceptedFormats = ['.pdf', '.xlsx', '.xls', '.docx', '.doc', '.jpg', '.jpeg', '.png'];
  const maxFileSize = 10 * 1024 * 1024; // 10MB

  const handleFileSelect = (files: File[]) => {
    setSelectedFiles(prev => {
      const newFiles = [...prev, ...files];
      
      // Track file upload start
      const totalSizeMB = newFiles.reduce((sum, file) => sum + file.size, 0) / (1024 * 1024);
      const fileTypes = [...new Set(newFiles.map(f => f.name.split('.').pop() || 'unknown'))];
      
      trackBoQUploadStart({
        file_count: newFiles.length,
        total_size_mb: parseFloat(totalSizeMB.toFixed(2)),
        file_types: fileTypes
      });
      
      return newFiles;
    });
  };

  const handleRemoveFile = (index: number) => {
    const fileToRemove = selectedFiles[index];
    
    // Track file removal
    trackFileRemove({
      file_name: fileToRemove.name,
      file_type: fileToRemove.name.split('.').pop() || 'unknown',
      remaining_files: selectedFiles.length - 1
    });
    
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleGuidelineToggle = () => {
    const newShowGuidance = !showGuidance;
    setShowGuidance(newShowGuidance);
    
    if (newShowGuidance) {
      trackGuidelineView({ page: 'upload_analysis' });
    }
  };

  const simulateUpload = async (contactData: ContactFormData) => {
    setIsUploading(true);
    setUserEmail(contactData.email);
    setUserName(contactData.name);
    setEmailError(null);

    const stages = [
      { name: 'Uploading Files', duration: 2000 },
      { name: 'Scanning for Security', duration: 1500 },
      { name: 'Processing Documents', duration: 2000 },
      { name: 'Queuing for Analysis', duration: 1500 }
    ];

    let totalProgress = 0;

    try {
      for (const stage of stages) {
        setCurrentStage(stage.name);
        const increment = 100 / stages.length;
        const steps = 20;
        const stepDuration = stage.duration / steps;

        for (let i = 0; i < steps; i++) {
          await new Promise(resolve => setTimeout(resolve, stepDuration));
          totalProgress += increment / steps;
          setUploadProgress(Math.min(Math.round(totalProgress), 100));
          
          if (isHydrated) {
            const remainingTime = Math.ceil((stage.duration * (steps - i)) / 1000);
            setEstimatedTime(`${remainingTime} seconds`);
          }
        }
      }

      let estimatedDeliveryHours = 36;
      let formattedDeliveryTime = '';
      
      if (isHydrated) {
        const now = new Date();
        now.setHours(now.getHours() + estimatedDeliveryHours);
        formattedDeliveryTime = now.toLocaleString('en-IN', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        });
        setDeliveryTime(formattedDeliveryTime);
      } else {
        formattedDeliveryTime = 'Within 24-48 hours';
        setDeliveryTime(formattedDeliveryTime);
      }

      // Send upload confirmation email
      const emailResponse = await sendUploadConfirmationEmail(
        contactData.email,
        contactData.name,
        selectedFiles.length,
        formattedDeliveryTime
      );

      if (!emailResponse.success) {
        console.warn('Email sending failed:', emailResponse.error);
        setEmailError('Upload successful, but confirmation email could not be sent. Please check your email address.');
      }

      // Track successful upload completion
      const totalSizeMB = selectedFiles.reduce((sum, file) => sum + file.size, 0) / (1024 * 1024);
      trackBoQUploadComplete({
        file_count: selectedFiles.length,
        total_size_mb: parseFloat(totalSizeMB.toFixed(2)),
        user_email: contactData.email,
        estimated_delivery_hours: estimatedDeliveryHours
      });

      setIsUploading(false);
      setShowSuccess(true);
    } catch (error) {
      // Track upload error
      trackBoQUploadError({
        error_type: 'upload_failed',
        error_message: error instanceof Error ? error.message : 'Unknown error',
        file_count: selectedFiles.length
      });
      
      setIsUploading(false);
      setEmailError('Upload failed. Please try again.');
    }
  };

  const handleFormSubmit = (contactData: ContactFormData) => {
    simulateUpload(contactData);
  };

  const handleSuccessClose = () => {
    setShowSuccess(false);
    setSelectedFiles([]);
    setUploadProgress(0);
    setCurrentStage('');
    setEstimatedTime('');
  };

  // Track when contact form is shown
  useEffect(() => {
    if (selectedFiles.length > 0) {
      trackFormStart('boq_contact_form');
    }
  }, [selectedFiles.length]);

  return (
    <>
      <div className="min-h-screen bg-background">
        {/* Show email error banner if present */}
        {emailError && (
          <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 max-w-md">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 shadow-lg">
              <div className="flex items-start">
                <Icon name="ExclamationTriangleIcon" size={20} variant="solid" className="text-yellow-600 mt-0.5 mr-3 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm text-yellow-800">{emailError}</p>
                  <button
                    onClick={() => setEmailError(null)}
                    className="mt-2 text-xs text-yellow-600 hover:text-yellow-800 font-medium"
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-medium mb-4">
              <Icon name="SparklesIcon" size={16} variant="solid" />
              <span>Free Expert Analysis</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
              Upload Your BoQ for Expert Review
            </h1>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              Get a comprehensive analysis from seasoned interior professionals. Identify overpricing, quality issues, and potential savings—completely free.
            </p>
          </div>

          <div className="max-w-4xl mx-auto mb-12">
            <div className="space-y-8">
              <div className="bg-card border border-border rounded-xl p-6 md:p-8 shadow-brand">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-text-primary">
                    Upload Your Documents
                  </h2>
                  <button
                    onClick={handleGuidelineToggle}
                    className="flex items-center space-x-2 text-sm text-accent hover:text-cta transition-brand"
                  >
                    <Icon name="QuestionMarkCircleIcon" size={20} variant="outline" />
                    <span>{showGuidance ? 'Hide' : 'Show'} Guidelines</span>
                  </button>
                </div>

                {showGuidance && (
                  <div className="mb-6">
                    <FormatGuidance />
                  </div>
                )}

                <div className="space-y-6">
                  <UploadZone
                    onFileSelect={handleFileSelect}
                    acceptedFormats={acceptedFormats}
                    maxFileSize={maxFileSize}
                  />

                  <FilePreview
                    files={selectedFiles}
                    onRemove={handleRemoveFile}
                  />

                  {selectedFiles.length > 0 && (
                    <div className="pt-6 border-t border-border">
                      <h3 className="text-lg font-semibold text-text-primary mb-4">
                        Your Contact Information
                      </h3>
                      <ContactForm
                        onSubmit={handleFormSubmit}
                        isSubmitting={isUploading}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/10 rounded-xl p-8 text-center">
            <div className="max-w-2xl mx-auto space-y-4">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto">
                <Icon name="ShieldCheckIcon" size={32} variant="solid" className="text-accent" />
              </div>
              <h3 className="text-2xl font-bold text-text-primary">
                Your Data is Safe With Us
              </h3>
              <p className="text-text-secondary">
                We use bank-level SSL encryption and never share your information with third parties. All uploaded files are automatically deleted after analysis completion.
              </p>
              <div className="flex flex-wrap justify-center gap-4 pt-4">
                {['SSL Encrypted', 'GDPR Compliant', 'ISO Certified', 'Privacy First'].map(badge => (
                  <div
                    key={badge}
                    className="px-4 py-2 bg-card border border-border rounded-lg text-sm font-medium text-text-primary"
                  >
                    {badge}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <UploadProgress
        isUploading={isUploading}
        progress={uploadProgress}
        currentStage={currentStage}
        estimatedTime={estimatedTime}
      />

      <SuccessModal
        isOpen={showSuccess}
        email={userEmail}
        estimatedDelivery={deliveryTime}
        onClose={handleSuccessClose}
      />
    </>
  );
};

export default UploadAnalysisInteractive;