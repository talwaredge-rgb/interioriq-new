'use client';

import { useState, useCallback, useRef } from 'react';
import Icon from '@/components/ui/AppIcon';

interface UploadZoneProps {
  onFileSelect: (files: File[]) => void;
  acceptedFormats: string[];
  maxFileSize: number;
}

const UploadZone = ({ onFileSelect, acceptedFormats, maxFileSize }: UploadZoneProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const validateFiles = (files: File[]): { valid: File[]; errors: string[] } => {
    const valid: File[] = [];
    const errors: string[] = [];

    files.forEach(file => {
      const fileExtension = `.${file.name.split('.').pop()?.toLowerCase()}`;
      
      if (!acceptedFormats.includes(fileExtension)) {
        errors.push(`${file.name}: Unsupported format. Please upload ${acceptedFormats.join(', ')} files only.`);
        return;
      }

      if (file.size > maxFileSize) {
        errors.push(`${file.name}: File size exceeds ${maxFileSize / (1024 * 1024)}MB limit.`);
        return;
      }

      valid.push(file);
    });

    return { valid, errors };
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    const { valid, errors } = validateFiles(files);

    if (errors.length > 0) {
      alert(errors.join('\n'));
    }

    if (valid.length > 0) {
      onFileSelect(valid);
    }
  }, [onFileSelect, acceptedFormats, maxFileSize]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const { valid, errors } = validateFiles(files);

      if (errors.length > 0) {
        alert(errors.join('\n'));
      }

      if (valid.length > 0) {
        onFileSelect(valid);
      }
    }
  }, [onFileSelect, acceptedFormats, maxFileSize]);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleClick}
      className={`relative border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-brand ${
        isDragging
          ? 'border-accent bg-accent/5 scale-[1.02]'
          : 'border-border hover:border-accent/50 hover:bg-muted/50'
      }`}
    >
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept={acceptedFormats.join(',')}
        onChange={handleFileInput}
        className="hidden"
        aria-label="File upload input"
      />

      <div className="flex flex-col items-center space-y-4">
        <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-brand ${
          isDragging ? 'bg-accent text-accent-foreground' : 'bg-muted text-text-secondary'
        }`}>
          <Icon name="CloudArrowUpIcon" size={32} variant="outline" />
        </div>

        <div className="space-y-2">
          <p className="text-lg font-semibold text-text-primary">
            {isDragging ? 'Drop your files here' : 'Drag & drop your BoQ files here'}
          </p>
          <p className="text-sm text-text-secondary">
            or click to browse from your device
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 text-xs text-text-secondary">
          {acceptedFormats.map(format => (
            <span key={format} className="px-3 py-1 bg-muted rounded-full">
              {format.toUpperCase()}
            </span>
          ))}
        </div>

        <p className="text-xs text-text-secondary">
          Maximum file size: {maxFileSize / (1024 * 1024)}MB per file
        </p>
      </div>
    </div>
  );
};

export default UploadZone;