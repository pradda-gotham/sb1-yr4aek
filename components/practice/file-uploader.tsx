'use client';

import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { FileText, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FileUploaderProps {
  onUpload: (file: File) => void;
  isUploading?: boolean;
}

export function FileUploader({ onUpload, isUploading }: FileUploaderProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      onUpload(file);
    }
  }, [onUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
    },
    maxFiles: 1,
  });

  return (
    <div
      {...getRootProps()}
      className="border-2 border-dashed rounded-lg p-8 text-center hover:border-primary cursor-pointer"
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center space-y-4">
        <Upload className="h-8 w-8 text-muted-foreground" />
        {isDragActive ? (
          <p>Drop your file here...</p>
        ) : (
          <>
            <p className="text-lg font-medium">
              Drag & drop your file here or click to browse
            </p>
            <p className="text-sm text-muted-foreground">
              Supports PDF, DOC, and DOCX files
            </p>
          </>
        )}
      </div>
    </div>
  );
}