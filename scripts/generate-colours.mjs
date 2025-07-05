#!/usr/bin/env node

/**
 * Color Processing Script
 * 
 * This script processes colors from SCSS to TypeScript and updates documentation:
 * 1. Parses colors from src/theme/colors.scss
 * 2. Generates TypeScript exports in src/theme/exports/colors.ts
 * 3. Updates docs/design-system/colors.md with current color values
 */

import {
  readFileSync,
  writeFileSync,
  existsSync
} from 'fs';
import * as path from 'path';

// Project root directory
const projectRoot = path.dirname(path.resolve('./package.json'));

// File paths
const SCSS_COLORS_PATH = path.join(projectRoot, 'src/theme/colors.scss');
const TS_EXPORTS_PATH = path.join(projectRoot, 'src/theme/exports/colors.ts');
const DOCS_PATH = path.join(projectRoot, 'docs/design-system/colors.md');
const TEMPLATE_PATH = path.join(projectRoot, 'scripts/templates/colors-template.md');

/**
 * Convert SCSS variable name to camelCase TypeScript variable name
 * @param {string} scssVar - SCSS variable name (e.g., '$primary-button', '$grey-100')
 * @returns {string} - camelCase name (e.g., 'primaryButton', 'grey100')
 */
function scssVarToCamelCase(scssVar) {
  return scssVar
    .replace(/^\$/, '') // Remove $ prefix
    .replace(/-([a-z0-9])/g, (match, letter) => letter.toUpperCase()) // Convert kebab-case to camelCase
    .replace(/-(\d)/g, '$1'); // Handle numbers after hyphens (grey-100 -> grey100)
}

/**
 * Parse SCSS colors file and extract color variables with sections
 * @param {string} scssContent - Content of the SCSS file
 * @returns {Array} - Array of {type: 'section'|'variable', content: string, name?: string, value?: string}
 */
function parseScssWithSections(scssContent) {
  const items = [];
  const variableReferences = {};
  const directColors = {};
  const lines = scssContent.split('\n');

  // First pass: collect all items (sections and variables)
  for (const line of lines) {
    const trimmedLine = line.trim();

    // Skip empty lines and single-line comments
    if (!trimmedLine || trimmedLine.startsWith('//') || trimmedLine.startsWith('@use')) {
      continue;
    }

    // Match section comments: /* Section Name */
    const sectionMatch = trimmedLine.match(/^\/\*\s*(.+?)\s*\*\/$/);
    if (sectionMatch) {
      items.push({
        type: 'comment',
        content: sectionMatch[1]
      });
      continue;
    }

    // Match SCSS variable declarations: $variable: value;
    const varMatch = trimmedLine.match(/^\$([a-zA-Z0-9-_]+):\s*([^;]+);/);
    if (varMatch) {
      const varName = varMatch[1];
      let value = varMatch[2].trim();

      // Skip complex functions
      if (value.includes('color.adjust') || value.includes('linear-gradient')) {
        continue;
      }

      if (value.startsWith('$')) {
        // Store variable reference for later resolution
        const referencedVar = value.substring(1);
        variableReferences[varName] = referencedVar;
      } else {
        // Direct color value
        directColors[varName] = value;
      }

      items.push({
        type: 'variable',
        name: varName,
        value: value // Will be resolved later
      });
    }
  }

  // Second pass: resolve variable references
  for (const item of items) {
    if (item.type === 'variable' && variableReferences[item.name]) {
      const referencedVar = variableReferences[item.name];
      if (directColors[referencedVar]) {
        item.value = directColors[referencedVar];
      }
    }
  }

  return items;
}

/**
 * Generate TypeScript exports content with sections
 * @param {Array} scssItems - Array of SCSS items with sections and variables
 * @returns {string} - TypeScript file content
 */
function generateTypeScriptExports(scssItems) {
  const exports = [];
  const defaultExportItems = [];

  // Generate exports with section comments
  for (const item of scssItems) {
    if (item.type === 'comment') {
      exports.push(`\n/* ${item.content} */`);
    } else if (item.type === 'variable' && item.value) {
      const tsVar = scssVarToCamelCase(item.name);
      exports.push(`export const ${tsVar} = '${item.value}'; // $${item.name}`);
      defaultExportItems.push(`  ${tsVar}`);
    }
  }

  const content = `/**
 * Color exports from SCSS variables
 *
 * This file provides TypeScript access to SCSS color variables.
 * Auto-generated from src/theme/colors.scss - DO NOT EDIT MANUALLY
 *
 * To update colors, modify colors.scss and run: npm run process-colors
 */
${exports.join('\n')}

// Default export with all colors
const colors = {
${defaultExportItems.join(',\n')}
} as const;

export default colors;
`;

  return content;
}

/**
 * Parse TypeScript file and group colors by section with comments
 * @param {string} tsContent - TypeScript file content
 * @returns {Object} - Sections with colors and comments
 */
function parseTypeScriptSections(tsContent) {
  const sections = {};
  let currentSection = null;
  let currentSectionData = null;
  const lines = tsContent.split('\n');

  for (const line of lines) {
    const trimmedLine = line.trim();

    // Match section comments: /* Section Name */
    const sectionMatch = trimmedLine.match(/^\/\*\s*(.+?)\s*\*\/$/);
    if (sectionMatch) {
      const commentText = sectionMatch[1];

      if (!currentSection) {
        // First comment becomes the section header
        currentSection = commentText;
        currentSectionData = {
          colors: {},
          comments: []
        };
        sections[currentSection] = currentSectionData;
      } else {
        // Additional comments become paragraph text
        currentSectionData.comments.push(commentText);
      }
      continue;
    }

    // Match export statements: export const varName = 'value'; // $scss-var
    const exportMatch = trimmedLine.match(/^export const (\w+) = '([^']+)'; \/\/ \$(.+)$/);
    if (exportMatch) {
      const [, , value, scssVar] = exportMatch;
      if (currentSectionData) {
        currentSectionData.colors[scssVar] = value;
      }
      continue;
    }

    // Empty line or other content - reset current section for next section
    if (!trimmedLine || !trimmedLine.startsWith('export')) {
      if (currentSection && Object.keys(currentSectionData.colors).length > 0) {
        currentSection = null;
        currentSectionData = null;
      }
    }
  }

  return sections;
}

/**
 * Convert color groups to display format for documentation
 * @param {Object} colorGroup - Group of colors
 * @returns {Object} - Colors formatted for display
 */
function formatColorsForDisplay(colorGroup) {
  const formatted = {};
  
  for (const [scssVar, value] of Object.entries(colorGroup)) {
    // Create a display name from the SCSS variable
    const displayName = scssVar
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    
    formatted[displayName] = value;
  }
  
  return formatted;
}





/**
 * Generate documentation from template using color sections
 * @param {Object} colorSections - Colors grouped by section
 * @returns {string} - Generated documentation content
 */
function generateDocumentationFromTemplate(colorSections) {
  // Generate content directly (template approach simplified)

  // Generate content for each section
  let content = '# Color System\n\n';
  content += 'The Jackanory design system provides a comprehensive color palette designed for accessibility, consistency, and brand alignment.\n\n';

  for (const [sectionName, sectionData] of Object.entries(colorSections)) {
    const colors = sectionData.colors || sectionData; // Handle both old and new format
    const comments = sectionData.comments || [];

    if (Object.keys(colors).length === 0) continue;

    // Create section header
    content += `## ${sectionName}\n\n`;

    // Add additional comments as paragraph text
    for (const comment of comments) {
      content += `${comment}\n\n`;
    }

    // Create color palette JSON block
    const formattedColors = formatColorsForDisplay(colors);
    content += `<!-- COLORPALETTE:${sectionName.toUpperCase()}\n`;
    content += JSON.stringify(formattedColors, null, 2) + '\n';
    content += '-->\n\n';

    // Create color list
    for (const [scssVar, value] of Object.entries(colors)) {
      const displayName = scssVar
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

      content += `- **${displayName}**: \`${value}\`\n`;
    }

    content += '\n';
  }

  return content;
}

/**
 * Main function to process colors
 */
function processColors() {
  try {
    console.log('🎨 Processing colors...');
    
    // Check if required files exist
    if (!existsSync(SCSS_COLORS_PATH)) {
      throw new Error(`SCSS colors file not found: ${SCSS_COLORS_PATH}`);
    }
    
    // Step 1: Read and parse SCSS colors with sections
    console.log('📖 Reading SCSS colors with sections...');
    const scssContent = readFileSync(SCSS_COLORS_PATH, 'utf8');
    const scssItems = parseScssWithSections(scssContent);

    const variableCount = scssItems.filter(item => item.type === 'variable').length;
    console.log(`✅ Found ${variableCount} color variables`);

    // Step 2: Generate TypeScript exports with section comments
    console.log('🔧 Generating TypeScript exports with sections...');
    const tsContent = generateTypeScriptExports(scssItems);
    writeFileSync(TS_EXPORTS_PATH, tsContent, 'utf8');
    console.log(`✅ Updated ${TS_EXPORTS_PATH}`);

    // Step 3: Parse TypeScript file to group colors by section
    console.log('📊 Grouping colors by section...');
    const colorSections = parseTypeScriptSections(tsContent);
    console.log(`✅ Grouped into ${Object.keys(colorSections).length} sections`);

    // Step 4: Generate documentation from template using grouped sections
    console.log('📝 Generating documentation from template...');
    const docsContent = generateDocumentationFromTemplate(colorSections);
    writeFileSync(DOCS_PATH, docsContent, 'utf8');
    console.log(`✅ Updated ${DOCS_PATH}`);
    
    console.log('🎉 Color processing complete!');
    
  } catch (error) {
    console.error('❌ Error processing colors:', error.message);
    process.exit(1);
  }
}

// Run the script
processColors();
