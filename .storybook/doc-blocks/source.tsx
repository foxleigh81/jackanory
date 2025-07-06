import React, { useEffect, useRef } from 'react';
import Prism from 'prismjs';

// Import core Prism
import 'prismjs/themes/prism-tomorrow.css';

// Import custom styles
import './source.css';

// Import language components for all likely formats in this project
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-scss';
import 'prismjs/components/prism-sass';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-yaml';
import 'prismjs/components/prism-markdown';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-shell-session';
import 'prismjs/components/prism-diff';
import 'prismjs/components/prism-git';

// Import plugins
import 'prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard';
import 'prismjs/plugins/line-numbers/prism-line-numbers.css';
import 'prismjs/plugins/line-numbers/prism-line-numbers';

import type { SourceProps } from './types';

const languageMap: Record<string, string> = {
  js: 'javascript',
  ts: 'typescript',
  jsx: 'jsx',
  tsx: 'tsx',
  css: 'css',
  scss: 'scss',
  sass: 'sass',
  json: 'json',
  yaml: 'yaml',
  yml: 'yaml',
  md: 'markdown',
  markdown: 'markdown',
  bash: 'bash',
  sh: 'bash',
  shell: 'shell-session',
  diff: 'diff',
  git: 'git',
  text: 'none',
  txt: 'none'
};

export const Source: React.FC<SourceProps> = ({
  language,
  code,
  showLineNumbers = false,
  className = ''
}) => {
  const codeRef = useRef<HTMLElement>(null);

  // Map language to Prism language identifier
  const prismLanguage =
    languageMap[language.toLowerCase()] || language.toLowerCase();

  useEffect(() => {
    if (codeRef.current) {
      // Clear any existing highlighting
      codeRef.current.innerHTML = code;

      // Apply Prism highlighting
      if (prismLanguage !== 'none' && Prism.languages[prismLanguage]) {
        Prism.highlightElement(codeRef.current);
      }
    }
  }, [code, prismLanguage]);

  const containerClasses = [
    'source-block',
    showLineNumbers ? 'line-numbers' : '',
    className
  ]
    .filter(Boolean)
    .join(' ');

  const codeClasses = [
    `language-${prismLanguage}`,
    showLineNumbers ? 'line-numbers' : ''
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      className={containerClasses}
      style={{
        marginBottom: '1.5rem',
        border: '1px solid #e1e5e9',
        borderRadius: '8px',
        overflow: 'hidden'
      }}
    >
      <pre
        style={{
          margin: 0,
          padding: '1rem',
          overflow: 'auto',
          fontSize: '14px',
          lineHeight: '1.5',
          background: '#2d2d2d', // Tomorrow Night theme background
          color: '#cccccc'
        }}
      >
        <code
          ref={codeRef}
          className={codeClasses}
          style={{
            fontFamily: 'Monaco, Menlo, "Ubuntu Mono", "Fira Code", monospace',
            whiteSpace: 'pre',
            background: 'transparent',
            color: 'inherit'
          }}
        >
          {code}
        </code>
      </pre>
    </div>
  );
};

export default Source;
