import { useCallback, useEffect, useRef, useState } from 'react';

interface SearchProps {
  value?: string;
  onChange: (value: string) => void;
  debounceDelay?: number;
}

export function Search({ value = '', onChange, debounceDelay = 1000 }: SearchProps) {
  const [inputValue, setInputValue] = useState(value);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  useEffect(() => {
    if (inputValue === value) return;

    debounceRef.current = setTimeout(() => {
      onChange(inputValue);
    }, debounceDelay);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [value, inputValue, onChange, debounceDelay]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' && inputValue !== value) {
        if (debounceRef.current) clearTimeout(debounceRef.current);
        onChange(inputValue);
      }
    },
    [value, inputValue, onChange],
  );

  const handleClear = useCallback(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    setInputValue('');
    onChange('');
  }, [onChange]);

  return (
    <div className="input-group position-relative">
      <input
        type="text"
        className="form-control pe-5"
        placeholder="Search..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      {inputValue && (
        <button
          type="button"
          aria-label="Clear search"
          className="btn position-absolute end-0 top-0 bottom-0 d-flex align-items-center px-3 border-0 bg-transparent"
          style={{ zIndex: 5 }}
          onClick={handleClear}
        >
          <i className="bi bi-x-lg text-secondary" />
        </button>
      )}
    </div>
  );
}
