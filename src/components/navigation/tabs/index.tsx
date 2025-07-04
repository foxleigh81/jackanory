import React, { useState, useEffect } from 'react';
/* Import Stylesheet */
import styles from './styles.module.scss';

export type Tab = {
  /**
   * The label on the tab.
   */
  label: string;
  /**
   * The ID of the corresponding content container.
   */
  contentId: string;
};

export type TabsType = {
  /**
   * The index of the currently selected tab.
   * Used to control the component externally.
   * @default 0
   */
  selectedTab?: number;
  /**
   * The tabs to display;
   */
  tabs: Tab[];
  /**
   * Handler called when the tab is changed.
   */
  handleChange?: (tabIndex: number) => void;
};

export interface Props extends React.HTMLAttributes<HTMLElement>, TabsType {}

/**
 * The tabs component provides tabbed navigation with clean link-style tab buttons.
 */
const Tabs: React.FC<Props> = ({
  tabs,
  selectedTab = 0,
  handleChange,
  className,
  ...props
}: Props) => {
  const [activeTab, setActiveTab] = useState(selectedTab);

  const handleTabChange = (tabIndex: number) => {
    setActiveTab(tabIndex);
    if (handleChange) handleChange(tabIndex);
  };

  useEffect(() => {
    setActiveTab(selectedTab);
  }, [selectedTab]);

  return (
    <div
      className={[styles['tabs'], className || ''].filter(Boolean).join(' ')}
      role="tablist"
      {...props}
    >
      {tabs.map((tab, index) => {
        const isActive = index === activeTab;
        return (
          <button
            className={[styles['tab'], isActive ? styles['active'] : '']
              .filter(Boolean)
              .join(' ')}
            key={tab.contentId}
            role="tab"
            onClick={() => handleTabChange(index)}
            aria-selected={isActive}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
};

Tabs.displayName = 'Tabs';

export default Tabs;
