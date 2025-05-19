import { DialogTypes } from './dialogTypes.js';
import { createFocusTrap } from './utils.js';
import { eventEmitter } from './dialogEvents.js';

/**
 * Dialog Class - A beautiful, accessible dialog component
 */
export class Dialog {
  static activeDialog = null;
  static initialized = false;

  /**
   * Initialize the Dialog system
   */
  static init() {
    if (Dialog.initialized) return;
    
    // Listen for escape key to close dialogs
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && Dialog.activeDialog) {
        Dialog.activeDialog.close(false);
      }
    });
    
    Dialog.initialized = true;
    eventEmitter.emit('dialog:initialized');
  }

  /**
   * Create an alert dialog
   * @param {Object} options - Alert options
   * @returns {Promise} Resolves when the dialog is closed
   */
  static alert(options) {
    const dialog = new Dialog({
      type: DialogTypes.ALERT,
      title: options.title || 'Alert',
      message: options.message,
      confirmText: options.confirmText || 'OK',
      animationDuration: options.animationDuration
    });
    
    return dialog.open();
  }

  /**
   * Create a confirm dialog
   * @param {Object} options - Confirm options
   * @returns {Promise<boolean>} Resolves with true if confirmed, false otherwise
   */
  static confirm(options) {
    const dialog = new Dialog({
      type: DialogTypes.CONFIRM,
      title: options.title || 'Confirm',
      message: options.message,
      confirmText: options.confirmText || 'OK',
      cancelText: options.cancelText || 'Cancel',
      animationDuration: options.animationDuration
    });
    
    return dialog.open();
  }

  /**
   * Create a prompt dialog
   * @param {Object} options - Prompt options
   * @returns {Promise<string|null>} Resolves with the input value or null if cancelled
   */
  static prompt(options) {
    const dialog = new Dialog({
      type: DialogTypes.PROMPT,
      title: options.title || 'Prompt',
      message: options.message,
      confirmText: options.confirmText || 'OK',
      cancelText: options.cancelText || 'Cancel',
      placeholder: options.placeholder || '',
      initialValue: options.initialValue || '',
      animationDuration: options.animationDuration
    });
    
    return dialog.open();
  }

  /**
   * Dialog constructor
   * @param {Object} options - Dialog options
   */
  constructor(options) {
    this.options = options;
    this.type = options.type;
    this.title = options.title || '';
    this.message = options.message || '';
    this.content = options.content || null;
    this.confirmText = options.confirmText || 'OK';
    this.cancelText = options.cancelText || 'Cancel';
    this.placeholder = options.placeholder || '';
    this.initialValue = options.initialValue || '';
    this.buttons = options.buttons || [];
    this.animationDuration = options.animationDuration || 250;
    
    this.element = null;
    this.backdropElement = null;
    this.dialogElement = null;
    this.inputElement = null;
    this.focusTrap = null;
    this.resolvePromise = null;
    this.isClosing = false;
  }

  /**
   * Create the dialog DOM elements
   * @private
   */
  _createElements() {
    // Create backdrop
    this.backdropElement = document.createElement('div');
    this.backdropElement.className = 'dialog-backdrop';
    
    // Create dialog container
    this.dialogElement = document.createElement('div');
    this.dialogElement.className = 'dialog';
    this.dialogElement.setAttribute('role', 'dialog');
    this.dialogElement.setAttribute('aria-modal', 'true');
    this.dialogElement.setAttribute('aria-labelledby', 'dialog-title');
    this.dialogElement.setAttribute('aria-describedby', 'dialog-message');
    
    // Create dialog header
    const header = document.createElement('div');
    header.className = 'dialog-header';
    
    const title = document.createElement('h2');
    title.className = 'dialog-title';
    title.id = 'dialog-title';
    title.textContent = this.title;
    
    const closeButton = document.createElement('button');
    closeButton.className = 'dialog-close';
    closeButton.setAttribute('aria-label', 'Close dialog');
    closeButton.innerHTML = '<span class="dialog-close-icon"></span>';
    closeButton.addEventListener('click', () => this.close(false));
    
    header.appendChild(title);
    header.appendChild(closeButton);
    
    // Create dialog content
    const content = document.createElement('div');
    content.className = 'dialog-content';
    
    if (this.content) {
      // For custom content
      content.innerHTML = this.content;
    } else {
      // For standard dialogs with message
      const message = document.createElement('p');
      message.className = 'dialog-message';
      message.id = 'dialog-message';
      message.textContent = this.message;
      content.appendChild(message);
      
      // Add input for prompt dialogs
      if (this.type === DialogTypes.PROMPT) {
        const inputContainer = document.createElement('div');
        inputContainer.className = 'dialog-input-container';
        
        this.inputElement = document.createElement('input');
        this.inputElement.className = 'dialog-input';
        this.inputElement.type = 'text';
        this.inputElement.placeholder = this.placeholder;
        this.inputElement.value = this.initialValue;
        
        inputContainer.appendChild(this.inputElement);
        content.appendChild(inputContainer);
      }
    }
    
    // Create dialog footer with buttons
    const footer = document.createElement('div');
    footer.className = 'dialog-footer';
    
    if (this.buttons.length > 0) {
      // For custom buttons
      this.buttons.forEach(button => {
        const buttonElement = document.createElement('button');
        buttonElement.className = `dialog-btn dialog-btn-${button.type}`;
        buttonElement.textContent = button.text;
        buttonElement.addEventListener('click', button.onClick);
        footer.appendChild(buttonElement);
      });
    } else {
      // For standard dialogs
      if (this.type !== DialogTypes.ALERT) {
        const cancelButton = document.createElement('button');
        cancelButton.className = 'dialog-btn dialog-btn-cancel';
        cancelButton.textContent = this.cancelText;
        cancelButton.addEventListener('click', () => this.close(false));
        footer.appendChild(cancelButton);
      }
      
      const confirmButton = document.createElement('button');
      confirmButton.className = 'dialog-btn dialog-btn-confirm';
      confirmButton.textContent = this.confirmText;
      confirmButton.addEventListener('click', () => {
        if (this.type === DialogTypes.PROMPT) {
          this.close(this.inputElement.value);
        } else {
          this.close(true);
        }
      });
      footer.appendChild(confirmButton);
    }
    
    // Assemble dialog
    this.dialogElement.appendChild(header);
    this.dialogElement.appendChild(content);
    this.dialogElement.appendChild(footer);
    
    // Add backdrop click handler to close dialog
    this.backdropElement.addEventListener('click', (e) => {
      if (e.target === this.backdropElement) {
        this.close(false);
      }
    });
    
    // Add dialog to backdrop
    this.backdropElement.appendChild(this.dialogElement);
    
    // Add to document
    document.body.appendChild(this.backdropElement);
    
    // Setup focus trap
    this.focusTrap = createFocusTrap(this.dialogElement);
  }

  /**
   * Show the dialog
   * @returns {Promise} Resolves when the dialog is closed with the result
   */
  open() {
    return new Promise((resolve) => {
      // Store the resolve function to call it later when the dialog is closed
      this.resolvePromise = resolve;
      
      // Create dialog elements if not already created
      if (!this.backdropElement) {
        this._createElements();
      }
      
      // Set as active dialog
      if (Dialog.activeDialog) {
        Dialog.activeDialog.close(false);
      }
      Dialog.activeDialog = this;
      
      // Prevent body scrolling
      document.body.style.overflow = 'hidden';
      
      // Show dialog with animation
      requestAnimationFrame(() => {
        this.backdropElement.classList.add('visible');
        this.dialogElement.classList.add('visible');
        
        // Focus the input in prompt dialogs or the first focusable element
        setTimeout(() => {
          if (this.type === DialogTypes.PROMPT && this.inputElement) {
            this.inputElement.focus();
            this.inputElement.select();
          } else {
            this.focusTrap.activate();
          }
          
          eventEmitter.emit('dialog:opened', this);
        }, this.animationDuration);
      });
    });
  }

  /**
   * Close the dialog
   * @param {*} result - Result to pass to the promise
   */
  close(result) {
    if (this.isClosing) return;
    this.isClosing = true;
    
    // Hide with animation
    this.backdropElement.classList.remove('visible');
    this.dialogElement.classList.remove('visible');
    
    // Clean up after animation
    setTimeout(() => {
      // Remove from DOM
      if (this.backdropElement && this.backdropElement.parentNode) {
        document.body.removeChild(this.backdropElement);
      }
      
      // Reset active dialog
      if (Dialog.activeDialog === this) {
        Dialog.activeDialog = null;
      }
      
      // Restore body scrolling if no other dialogs are open
      if (!Dialog.activeDialog) {
        document.body.style.overflow = '';
      }
      
      // Deactivate focus trap
      if (this.focusTrap) {
        this.focusTrap.deactivate();
      }
      
      // Resolve the promise with the result
      if (this.resolvePromise) {
        this.resolvePromise(result);
      }
      
      // Clean up references
      this.backdropElement = null;
      this.dialogElement = null;
      this.inputElement = null;
      this.focusTrap = null;
      this.isClosing = false;
      
      eventEmitter.emit('dialog:closed', { dialog: this, result });
    }, this.animationDuration);
  }
}