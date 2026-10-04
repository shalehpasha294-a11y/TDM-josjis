import React from 'react';

interface TdmLogoProps {
  className?: string;
  size?: number | string;
  showShadow?: boolean;
}

export const TdmLogo: React.FC<TdmLogoProps> = ({ 
  className = "w-10 h-10", 
  size,
  showShadow = true 
}) => {
  return (
    <div 
      className={`inline-flex items-center justify-center shrink-0 rounded-full select-none ${showShadow ? 'shadow-md shadow-blue-500/20' : ''} ${className}`}
      style={size ? { width: size, height: size } : undefined}
    >
      <img
        src="/logo-tdm.svg"
        alt="Logo Resmi Paguyuban Muda-Mudi Tri Dharma Manunggal RW 1 Desa Pojok"
        className="w-full h-full object-contain rounded-full"
      />
    </div>
  );
};
