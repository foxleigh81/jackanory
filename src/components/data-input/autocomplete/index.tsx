import React, { useState, useEffect, useId } from 'react';
import { changeCase } from '@/libs/helpers/change-case';

// REFACTOR: This component was written in a rush and needs to be refactored and properly documented

/* Import Stylesheet */
import styles from './styles.module.scss';

/** Import components */
import { Text } from '../../data-input/text';

/* Prop Types */
import { InputValue } from '@/libs/types/input-value';

/* Import helpers */
import fakeEvent from '@/libs/helpers/fake-event';

/** Import custom types */
import InputComponent from '@/libs/types/input-component';

interface Props extends InputComponent {
  /**
   * A list of options to pass to the autocomplete
   */
  options: string[];
}

/**
 * The `Autocomplete` component is a wrapper around the input-text component that provides autocomplete functionality.
 */
export const Autocomplete: React.FC<Props> = ({
  options,
  className,
  onChange,
  status,
  value = '',
  name,
  id,
  ...props
}: Props) => {
  // Generate unique IDs for ARIA combobox pattern
  const listboxId = useId();

  const [selectedOption, setSelectedOption] = useState(value);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const updateSelections = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!value.length) {
      setSelectedOption('');
      setSuggestions([]);
      setHighlightedIndex(-1);
      return handleSelect('');
    }
    const filteredOptions = options.filter((option) =>
      option.toLowerCase().includes(value.toLowerCase())
    );
    setSelectedOption(value);
    setHighlightedIndex(-1);
    if (!filteredOptions.length) {
      return handleSelect(value);
    }
    return setSuggestions(filteredOptions);
  };

  const handleSelect = (suggestion: InputValue) => {
    const cleanSuggestion = suggestion?.toString().trim();
    setSelectedOption(suggestion || '');
    setSuggestions([]);
    setHighlightedIndex(-1);
    if (onChange) onChange(fakeEvent(cleanSuggestion));
  };

  const navigateSuggestions = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const { key } = e;
    if (!['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(key)) return;
    if (!suggestions.length) return;

    e.preventDefault();

    if (key === 'ArrowDown') {
      setHighlightedIndex((prevIndex) => {
        if (prevIndex >= suggestions.length - 1) {
          return 0;
        }
        return prevIndex + 1;
      });
    }
    if (key === 'ArrowUp') {
      setHighlightedIndex((prevIndex) => {
        if (prevIndex <= 0) {
          return suggestions.length - 1;
        }
        return prevIndex - 1;
      });
    }
    if (key === 'Home') {
      setHighlightedIndex(0);
    }
    if (key === 'End') {
      setHighlightedIndex(suggestions.length - 1);
    }
  };

  const handleEnterKey = () => {
    if (!suggestions.length && selectedOption) {
      return onChange && onChange(fakeEvent(selectedOption));
    }
    if (highlightedIndex >= 0 && suggestions[highlightedIndex]) {
      return handleSelect(suggestions[highlightedIndex]);
    }
    return handleSelect(selectedOption);
  };

  useEffect(() => {
    setSelectedOption(value);
  }, [value]);

  // Calculate ARIA attributes
  const showSuggestions = suggestions.length > 0;
  const activeOptionId =
    highlightedIndex >= 0
      ? `${listboxId}-option-${highlightedIndex}`
      : undefined;

  return (
    <div
      className={[styles['input-autocomplete'], className || '']
        .filter(Boolean)
        .join(' ')}
    >
      <Text
        id={id || changeCase(name, 'kebab')}
        data-testid={id || changeCase(name, 'kebab')}
        name={name}
        // Disable browsers own autocomplete
        autoComplete="off"
        status={status}
        value={selectedOption}
        onChange={updateSelections}
        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
          if (e.key === 'Enter') handleEnterKey();
          if (e.key === 'Escape') {
            setSuggestions([]);
            setHighlightedIndex(-1);
          }
          navigateSuggestions(e);
        }}
        {...props}
        // ARIA combobox attributes
        role="combobox"
        aria-autocomplete="list"
        aria-expanded={showSuggestions}
        aria-controls={showSuggestions ? listboxId : undefined}
        aria-activedescendant={activeOptionId}
        aria-haspopup="listbox"
      />
      {suggestions.length > 0 && (
        <ul
          className={styles['suggestions']}
          role="listbox"
          id={listboxId}
          aria-label="Suggestions"
        >
          {suggestions.map((suggestion, index) => (
            <li
              key={suggestion}
              className={[
                styles['suggestion'],
                index === highlightedIndex ? styles['selected'] : ''
              ]
                .filter(Boolean)
                .join(' ')}
              onClick={() => handleSelect(suggestion)}
              onMouseOver={() => setHighlightedIndex(index)}
              role="option"
              id={`${listboxId}-option-${index}`}
              aria-selected={index === highlightedIndex}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
Autocomplete.displayName = 'Autocomplete';
export default Autocomplete;
