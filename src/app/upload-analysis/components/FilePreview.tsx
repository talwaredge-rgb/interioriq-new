'use client';

import Icon from '@/components/ui/AppIcon';

interface FilePreviewProps {
  files: File[];
  onRemove: (index: number) => void;
}

const FilePreview = ({ files, onRemove }: FilePreviewProps) => {
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const getFileIcon = (fileName: string): string => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    switch (extension) {
      case 'pdf':
        return 'DocumentTextIcon';
      case 'xlsx': case'xls':
        return 'TableCellsIcon';
      case 'docx': case'doc':
        return 'DocumentIcon';
      case 'jpg': case'jpeg': case'png':
        return 'PhotoIcon';
      default:
        return 'DocumentIcon';
    }
  };

  if (files.length === 0) return null;

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-text-primary">
        Selected Files ({files.length})
      </h3>
      <div className="space-y-2">
        {files.map((file, index) => (
          <div
            key={`${file.name}-${index}`}
            className="flex items-center justify-between p-4 bg-card border border-border rounded-lg hover:border-accent/50 transition-brand group"
          >
            <div className="flex items-center space-x-3 flex-1 min-w-0">
              <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon name={getFileIcon(file.name)} size={20} variant="outline" className="text-accent" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-text-primary truncate">
                  {file.name}
                </p>
                <p className="text-xs text-text-secondary">
                  {formatFileSize(file.size)}
                </p>
              </div>
            </div>
            <button
              onClick={() => onRemove(index)}
              className="p-2 text-text-secondary hover:text-destructive hover:bg-destructive/10 rounded-lg transition-brand flex-shrink-0"
              aria-label={`Remove ${file.name}`}
            >
              <Icon name="XMarkIcon" size={20} variant="outline" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilePreview;