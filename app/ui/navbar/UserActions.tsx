'use client';

import React from 'react';
import Link from 'next/link';
import Button from '../button';
import CartIcon from '../cart/CartIcon';
import styles from '../navbar.module.css';

interface UserActionsProps {
  user: any;
  dashboardHref: string;
  onLogout: () => void;
}

const UserActions: React.FC<UserActionsProps> = ({ user, dashboardHref, onLogout }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      {/* Cart Icon - always visible */}
      <CartIcon />

      {user ? (
        <>
          {/* Show the user's name so they know they are logged in */}
          <Link href={dashboardHref} style={{ textDecoration: 'none' }}>
            <span className={styles.artistName}>
              {user.name}
            </span>
          </Link>

          {/* Sign Out button */}
          <button
            type="button"
            onClick={onLogout}
            style={{
              background: 'none',
              border: '1px solid #1E4D4F',
              borderRadius: '6px',
              padding: '6px 14px',
              cursor: 'pointer',
              color: '#1E4D4F',
              fontWeight: 600,
              fontSize: '14px',
            }}
          >
            Sign Out
          </button>
        </>
      ) : (
        // Not logged in -> show the Sign In button
        <Button href="/signin" variant="outline">Sign In</Button>
      )}
    </div>
  );
};

export default UserActions;
