import { registerAnalytics } from "@humansignal/core";
registerAnalytics();

// Global CSS override for red highlighting - must be first
import "./styles/red-highlight-override.css";

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

// Run immediately and also on DOM changes
overrideRedHighlighting();
if (typeof window !== 'undefined') {
  window.addEventListener('DOMContentLoaded', overrideRedHighlighting);
  window.addEventListener('load', overrideRedHighlighting);
  
  // Also run periodically to catch dynamically added elements
  setInterval(overrideRedHighlighting, 1000);
}

import "./app/App";
import "./utils/service-worker";
