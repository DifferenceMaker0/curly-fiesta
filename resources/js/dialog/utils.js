/**
 * Creates a focus trap within an element
 * @param {HTMLElement} element - The element to trap focus within
 * @returns {Object} The focus trap API
 */
export function createFocusTrap(element) {
  let active = false;
  let previouslyFocused = null;
  
  /**
   * Get all focusable elements within the trap container
   * @returns {Array} Array of focusable elements
   */
  const getFocusableElements = () => {
    return Array.from(element.querySelectorAll(
      'a[href], button:not([disabled]), input:not([disabled]), ' +
      'select:not([disabled]), textarea:not([disabled]), ' +
      '[tabindex]:not([tabindex="-1"])'
    )).filter(el => el.offsetParent !== null); // Filter out hidden elements
  };
  
  /**
   * Handle tab key press to keep focus within the trap
   * @param {Event} e - Keyboard event
   */
  const handleTabKey = (e) => {
    if (!active || e.key !== 'Tab') return;
    
    const focusableElements = getFocusableElements();
    if (focusableElements.length === 0) return;
    
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    
    // If shift+tab and on first element, wrap to last element
    if (e.shiftKey && document.activeElement === firstElement) {
      e.preventDefault();
      lastElement.focus();
    }
    // If tab and on last element, wrap to first element
    else if (!e.shiftKey && document.activeElement === lastElement) {
      e.preventDefault();
      firstElement.focus();
    }
  };
  
  /**
   * Activate the focus trap
   */
  const activate = () => {
    if (active) return;
    
    // Store currently focused element
    previouslyFocused = document.activeElement;
    
    // Focus first element in the trap
    const focusableElements = getFocusableElements();
    if (focusableElements.length > 0) {
      focusableElements[0].focus();
    } else {
      // If no focusable elements, focus the container itself
      element.setAttribute('tabindex', '-1');
      element.focus();
    }
    
    // Add event listener for tab key
    document.addEventListener('keydown', handleTabKey);
    
    active = true;
  };
  
  /**
   * Deactivate the focus trap
   */
  const deactivate = () => {
    if (!active) return;
    
    // Remove event listener
    document.removeEventListener('keydown', handleTabKey);
    
    // Restore focus to previously focused element
    if (previouslyFocused && previouslyFocused.focus) {
      previouslyFocused.focus();
    }
    
    active = false;
  };
  
  return {
    activate,
    deactivate,
    isActive: () => active
  };
}

/**
 * Debounce function to limit how often a function is called
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
export function debounce(func, wait) {
  let timeout;
  
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Generate a unique ID
 * @returns {string} Unique ID
 */
export function generateId() {
  return 'dialog-' + Math.random().toString(36).substring(2, 9);
}