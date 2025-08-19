"use client";

import { useState, useEffect } from "react";
import { CldUploadWidget } from 'next-cloudinary';
import Image from "next/image";
import { ImagePlayIcon, TrashIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
 

interface ImageUploadProps {
  value: string[];
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  disabled?: boolean;
}


export const ImageUpload: React.FC<ImageUploadProps> = ({
  value,
  onChange,
  onRemove,
  disabled
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onUpload =(result: any) => {
    onChange(result.info.secure_url)
  };
  
  if (!isMounted) {
    return null;
  }

  return (
    <div>
      <div className="mb-4 flex items-center gap-4">
        {value.map((url) => (
          <div key={url} className="relative w-[200px] h-[200px] rounded-md overflow-hidden">
            <div className="z-10 absolute top-2 right-2">
              <Button variant="destructive" size="icon" type="button" onClick={() => onRemove(url)}>
                <TrashIcon className="w-4 h-4"/>
              </Button>
            </div>
            <Image
              className="object-cover"
              alt="Image"
              src={url}
              fill
            />
          </div>
        ))}
      </div>
      <CldUploadWidget onSuccess={onUpload} uploadPreset="dvl5zbh8w">
          {({ open }) => {

            return (
              <Button
                onClick={() => open()}
                type="button"
                disabled={disabled}
                variant="secondary"
              >
                <ImagePlayIcon className="w-4 h-4 mr-2"/>
                Upload an Image
              </Button>
            );
          }}
      </CldUploadWidget>
    </div>
  );
};
