'use client';


import Icon from '@/components/ui/AppIcon';

interface SuccessModalProps {
  isOpen: boolean;
  email: string;
  estimatedDelivery: string;
  onClose: () => void;
}

const SuccessModal = ({ isOpen, email, estimatedDelivery, onClose }: SuccessModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="fixed inset-0 bg-black/50 transition-opacity" onClick={onClose} />
        
        <div className="relative bg-card border border-border rounded-xl shadow-brand max-w-md w-full p-6 md:p-8">
          <div className="text-center">
            {/* Success Icon */}
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <Icon name="CheckCircleIcon" size={40} variant="solid" className="text-green-600" />
            </div>

            {/* Title */}
            <h3 className="text-2xl font-bold text-text-primary mb-2">
              Upload Successful! 🎉
            </h3>

            {/* Confirmation Message */}
            <p className="text-text-secondary mb-6">
              Your BoQ documents have been successfully uploaded and queued for expert analysis.
            </p>

            {/* Email Confirmation Notice */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 text-left">
              <div className="flex items-start">
                <Icon name="EnvelopeIcon" size={20} variant="solid" className="text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-blue-900 mb-1">
                    Confirmation Email Sent
                  </p>
                  <p className="text-sm text-blue-700">
                    We've sent a confirmation email to <strong>{email}</strong> with all the details about your upload and what happens next.
                  </p>
                  <p className="text-xs text-blue-600 mt-2">
                    💡 Check your spam folder if you don't see it in your inbox
                  </p>
                </div>
              </div>
            </div>

            {/* Details */}
            <div className="bg-background border border-border rounded-lg p-4 mb-6 text-left space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-text-secondary">Estimated Delivery:</span>
                <span className="text-sm font-semibold text-text-primary">{estimatedDelivery}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-text-secondary">Notification Email:</span>
                <span className="text-sm font-semibold text-text-primary truncate ml-2">{email}</span>
              </div>
            </div>

            {/* What's Next */}
            <div className="text-left mb-6">
              <h4 className="text-sm font-semibold text-text-primary mb-3 flex items-center">
                <Icon name="ClockIcon" size={16} variant="outline" className="mr-2" />
                What Happens Next
              </h4>
              <ul className="space-y-2 text-sm text-text-secondary">
                <li className="flex items-start">
                  <Icon name="CheckIcon" size={16} variant="outline" className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Your documents are being analyzed by expert professionals</span>
                </li>
                <li className="flex items-start">
                  <Icon name="CheckIcon" size={16} variant="outline" className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>You'll receive progress updates via email</span>
                </li>
                <li className="flex items-start">
                  <Icon name="CheckIcon" size={16} variant="outline" className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Final analysis report will be delivered to your email with a secure download link</span>
                </li>
              </ul>
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="w-full px-6 py-3 bg-cta text-white rounded-lg font-semibold hover:bg-cta-hover transition-brand"
            >
              Got it, Thanks!
            </button>

            {/* Security Note */}
            <p className="text-xs text-text-secondary mt-4 flex items-center justify-center">
              <Icon name="ShieldCheckIcon" size={14} variant="solid" className="text-green-600 mr-1" />
              Your files are encrypted and will be deleted after analysis
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;