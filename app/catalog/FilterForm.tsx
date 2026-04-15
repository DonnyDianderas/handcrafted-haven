'use client';

import React from 'react';
import styles from "./catalog.module.css";

interface FilterFormProps {
  children: React.ReactNode;
}

const FilterForm: React.FC<FilterFormProps> = ({ children }) => {
  const handleReset = () => {
    window.location.href = '/catalog';
  };

  return (
    <form method="get" className={styles.filterForm}>
      {children}
      <button type="submit" className={styles.filterButton}>Apply Filters</button>
      <button type="button" className={styles.resetButton} onClick={handleReset}>
        Reset
      </button>
    </form>
  );
};

export default FilterForm;
