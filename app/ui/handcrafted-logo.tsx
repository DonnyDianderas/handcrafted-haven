import { Hand } from 'lucide-react';
import { playfair } from '@/app/ui/fonts';
import Link from 'next/link'; 

export default function HandcraftedLogo() {
  return (
    <Link 
      href="/" 
      style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '8px', 
        flexShrink: 0, 
        textDecoration: 'none', 
        color: 'inherit',      
        cursor: 'pointer'       
      }}
    >
      {/* Circle of icon */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        borderRadius: '50%', 
        backgroundColor: 'var(--primary)', 
        width: '50px', 
        height:'50px', 
        flexShrink: 0 
      }}>
        <Hand 
          style={{ 
            width: '32px', 
            height: '32px', 
            color: 'white' 
          }} 
        />
      </div>

      {/* Text*/}
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        lineHeight: '1.1', 
        flexShrink: 0 
      }}>
        <span style={{ 
          fontSize: '36px', 
          fontWeight: '700', 
          color: 'var(--primary)',
          fontFamily: playfair.style.fontFamily 
        }}>
          Handcrafted
        </span>
        <span style={{ 
          fontSize: '24px', 
          color: 'var(--secondary)', 
          letterSpacing: '0.5px'
        }}>
          Haven
        </span>
      </div>
    </Link>
  );
}
