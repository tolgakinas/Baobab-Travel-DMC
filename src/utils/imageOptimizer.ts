/**
 * Client-Side Web Image Optimizer & Compressor
 * Scales large camera/phone photos down to crisp, web-optimized WebP/JPEG formats.
 */

export interface OptimizedImageResult {
  dataUrl: string;
  base64: string;
  mimeType: string;
  originalName: string;
  originalSize: number;
  originalSizeFormatted: string;
  optimizedSize: number;
  optimizedSizeFormatted: string;
  compressionRatio: string;
  width: number;
  height: number;
  format: string;
}

export function formatBytes(bytes: number, decimals = 1): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

/**
 * Optimizes an uploaded File for web usage.
 * @param file The user uploaded File
 * @param maxDimension Max width or height in pixels (default 2048px)
 * @param quality Compression quality from 0.1 to 1.0 (default 0.85)
 */
export async function optimizeImageForWeb(
  file: File,
  maxDimension = 2048,
  quality = 0.85
): Promise<OptimizedImageResult> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onerror = () => reject(new Error('Failed to read photo file.'));

    reader.onload = (readerEvent) => {
      const img = new Image();
      img.onerror = () => reject(new Error('Failed to load image format.'));

      img.onload = () => {
        let width = img.width;
        let height = img.height;

        // Calculate proportional scale down if exceeding maxDimension
        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          } else {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Canvas context not available.'));
          return;
        }

        // Apply smooth resampling
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';

        // Draw image onto canvas
        ctx.drawImage(img, 0, 0, width, height);

        // Try WebP first, fallback to JPEG if browser does not support WebP export
        let outputMime = 'image/webp';
        let dataUrl = canvas.toDataURL(outputMime, quality);

        // If WebP is not supported or returned a PNG fallback
        if (!dataUrl.startsWith('data:image/webp')) {
          outputMime = 'image/jpeg';
          dataUrl = canvas.toDataURL(outputMime, quality);
        }

        // Extract raw base64 string
        const base64 = dataUrl.split(',')[1] || '';

        // Calculate approximate byte size from base64 length
        const optimizedBytes = Math.round((base64.length * 3) / 4);
        const originalBytes = file.size;

        const reduction = originalBytes > 0 
          ? Math.max(0, Math.round(((originalBytes - optimizedBytes) / originalBytes) * 100))
          : 0;

        resolve({
          dataUrl,
          base64,
          mimeType: outputMime,
          originalName: file.name,
          originalSize: originalBytes,
          originalSizeFormatted: formatBytes(originalBytes),
          optimizedSize: optimizedBytes,
          optimizedSizeFormatted: formatBytes(optimizedBytes),
          compressionRatio: `${reduction}% smaller`,
          width,
          height,
          format: outputMime.replace('image/', '').toUpperCase()
        });
      };

      if (typeof readerEvent.target?.result === 'string') {
        img.src = readerEvent.target.result;
      } else {
        reject(new Error('Invalid file reader result.'));
      }
    };

    reader.readAsDataURL(file);
  });
}
