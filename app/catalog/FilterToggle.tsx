'use client';

import React, { useState, useEffect } from 'react';
import styles from "./catalog.module.css";

interface FilterToggleProps {
  children: React.ReactNode;
}

const FilterToggle: React.FC<FilterToggleProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleResetClick = () => {
      const resetButton = document.querySelector(`.${styles.resetButton}`);
      if (resetButton) {
        resetButton.addEventListener('click', () => {
          window.location.href = '/catalog';
        });
      }
    };

    if (isOpen) {
      handleResetClick();
    }
  }, [isOpen]);

  return (
    <div>
      <button 
        className={styles.toggleButton}
        onClick={() => setIsOpen(!isOpen)}
        type="button"
      >
        {isOpen ? 'Hide Filters' : 'Show Filters'}
      </button>
      
      <div className={`${styles.filterForm} ${isOpen ? styles.filterFormOpen : styles.filterFormClosed}`}>
        {children}
      </div>
    </div>
  );
};

export default FilterToggle;
