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

  const handleKeyDown = (event: React.KeyboardEvent, index: number) => {
    let newIndex = index;

    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault();
        newIndex = index > 0 ? index - 1 : tabs.length - 1;
        break;
      case 'ArrowRight':
        event.preventDefault();
        newIndex = index < tabs.length - 1 ? index + 1 : 0;
        break;
      case 'Home':
        event.preventDefault();
        newIndex = 0;
        break;
      case 'End':
        event.preventDefault();
        newIndex = tabs.length - 1;
        break;
      default:
        return;
    }

    handleTabChange(newIndex);
    // Focus the newly selected tab
    const newTab = document.getElementById(`tab-${tabs[newIndex].contentId}`);
    newTab?.focus();
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
            onKeyDown={(event) => handleKeyDown(event, index)}
            aria-selected={isActive}
            aria-controls={tab.contentId}
            tabIndex={isActive ? 0 : -1}
            id={`tab-${tab.contentId}`}
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
