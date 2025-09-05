import { registerAnalytics } from "@humansignal/core";
registerAnalytics();

// Global CSS override for red highlighting - must be first
import "./styles/red-highlight-override.css";

// JavaScript override to hide only red loaders (persimmon_400 color)
const hideRedLoaders = () => {
  // Hide only elements with red/orange colors (persimmon_400)
  const redElements = document.querySelectorAll('[style*="#FF7557"], [style*="persimmon"], [style*="255, 117, 87"]');
  
  redElements.forEach(element => {
    if (element instanceof HTMLElement) {
      element.style.setProperty('display', 'none', 'important');
      element.style.setProperty('visibility', 'hidden', 'important');
      element.style.setProperty('opacity', '0', 'important');
    }
  });
  
  // Also hide any spinner elements that use the persimmon color
  const spinners = document.querySelectorAll('.spinner-ls, .spinner');
  spinners.forEach(element => {
    if (element instanceof HTMLElement) {
      // Check if the spinner uses persimmon color
      const computedStyle = window.getComputedStyle(element);
      const hasPersimmonColor = computedStyle.getPropertyValue('--spinner-color').includes('persimmon') ||
                               computedStyle.getPropertyValue('--persimmon_400') ||
                               element.style.color.includes('#FF7557') ||
                               element.style.backgroundColor.includes('#FF7557');
      
      if (hasPersimmonColor) {
        element.style.setProperty('display', 'none', 'important');
        element.style.setProperty('visibility', 'hidden', 'important');
        element.style.setProperty('opacity', '0', 'important');
      }
    }
  });
};

// JavaScript override for red highlighting - ensures immediate effect
const overrideRedHighlighting = () => {
  // Override any elements with red highlighting
  const redElements = document.querySelectorAll('[class*="htx-highlight"], [class*="highlight"], .htx-highlight, .highlight, .state');
  
  redElements.forEach(element => {
    if (element instanceof HTMLElement) {
      element.style.setProperty('background-color', '#ed1c24', 'important');
      element.style.setProperty('color', 'white', 'important');
      element.style.setProperty('opacity', '0.9', 'important');
      element.style.setProperty('border-radius', '3px', 'important');
      element.style.setProperty('padding', '2px 4px', 'important');
      element.style.setProperty('transition', 'all 0.2s ease', 'important');
      element.style.setProperty('box-shadow', '0 2px 6px rgba(237, 28, 36, 0.3)', 'important');
      element.style.setProperty('font-weight', '500', 'important');
      element.style.setProperty('border', 'none', 'important');
    }
  });
};

// Force white background on droppable space elements
const forceWhiteBackgroundDroppable = () => {
  // Target the specific element with ID regions-relations_2-droppable-space
  const droppableElement = document.getElementById('regions-relations_2-droppable-space');
  if (droppableElement) {
    droppableElement.style.setProperty('background', '#ffffff', 'important');
    droppableElement.style.setProperty('background-color', '#ffffff', 'important');
    droppableElement.style.setProperty('color', '#000000', 'important');
    droppableElement.style.setProperty('border', '1px solid #e5e7eb', 'important');
    droppableElement.style.setProperty('border-radius', '8px', 'important');
    droppableElement.style.setProperty('padding', '8px 16px', 'important');
    droppableElement.style.setProperty('margin', '4px 0', 'important');
    droppableElement.style.setProperty('min-height', '40px', 'important');
  }
  
  // Target any elements with lsf-tabs_drop-space-after class
  const dropSpaceElements = document.querySelectorAll('.lsf-tabs_drop-space-after');
  dropSpaceElements.forEach(element => {
    if (element instanceof HTMLElement) {
      element.style.setProperty('background', '#ffffff', 'important');
      element.style.setProperty('background-color', '#ffffff', 'important');
      element.style.setProperty('color', '#000000', 'important');
      element.style.setProperty('border', '1px solid #e5e7eb', 'important');
      element.style.setProperty('border-radius', '8px', 'important');
      element.style.setProperty('padding', '8px 16px', 'important');
      element.style.setProperty('margin', '4px 0', 'important');
      element.style.setProperty('min-height', '40px', 'important');
    }
  });
  
  // Target any elements with regions-relations in ID and drop-space in class
  const regionsDropElements = document.querySelectorAll('[id*="regions-relations"][class*="drop-space"]');
  regionsDropElements.forEach(element => {
    if (element instanceof HTMLElement) {
      element.style.setProperty('background', '#ffffff', 'important');
      element.style.setProperty('background-color', '#ffffff', 'important');
      element.style.setProperty('color', '#000000', 'important');
      element.style.setProperty('border', '1px solid #e5e7eb', 'important');
      element.style.setProperty('border-radius', '8px', 'important');
      element.style.setProperty('padding', '8px 16px', 'important');
      element.style.setProperty('margin', '4px 0', 'important');
      element.style.setProperty('min-height', '40px', 'important');
    }
  });
  
  // Target the specific regions-relations element
  const regionsElement = document.getElementById('regions-relations');
  if (regionsElement) {
    regionsElement.style.setProperty('background', '#ffffff', 'important');
    regionsElement.style.setProperty('background-color', '#ffffff', 'important');
    regionsElement.style.setProperty('color', '#000000', 'important');
    regionsElement.style.setProperty('border', '1px solid #e5e7eb', 'important');
    regionsElement.style.setProperty('border-radius', '8px', 'important');
    regionsElement.style.setProperty('padding', '8px 16px', 'important');
    regionsElement.style.setProperty('margin', '4px 0', 'important');
  }
  
  // Target any elements with lsf-tabs-panel_header class
  const panelHeaderElements = document.querySelectorAll('.lsf-tabs-panel_header');
  panelHeaderElements.forEach(element => {
    if (element instanceof HTMLElement) {
      element.style.setProperty('background', '#ffffff', 'important');
      element.style.setProperty('background-color', '#ffffff', 'important');
      element.style.setProperty('color', '#000000', 'important');
      element.style.setProperty('border', '1px solid #e5e7eb', 'important');
      element.style.setProperty('border-radius', '8px', 'important');
      element.style.setProperty('padding', '8px 16px', 'important');
      element.style.setProperty('margin', '4px 0', 'important');
    }
  });
};

// Run immediately and also on DOM changes
hideRedLoaders();
overrideRedHighlighting();
forceWhiteBackgroundDroppable();
if (typeof window !== 'undefined') {
  window.addEventListener('DOMContentLoaded', () => {
    hideRedLoaders();
    overrideRedHighlighting();
    forceWhiteBackgroundDroppable();
  });
  window.addEventListener('load', () => {
    hideRedLoaders();
    overrideRedHighlighting();
    forceWhiteBackgroundDroppable();
  });
  
  // Also run periodically to catch dynamically added elements
  setInterval(() => {
    hideRedLoaders();
    overrideRedHighlighting();
    forceWhiteBackgroundDroppable();
  }, 1000);
}

import "./app/App";
import "./utils/service-worker";
