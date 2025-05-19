/**
 * Simple event emitter for dialog events
 */
class EventEmitter {
  constructor() {
    this.events = {};
  }
  
  /**
   * Subscribe to an event
   * @param {string} event - Event name
   * @param {function} callback - Event callback
   * @returns {function} Unsubscribe function
   */
  on(event, callback) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    
    this.events[event].push(callback);
    
    return () => {
      this.events[event] = this.events[event].filter(cb => cb !== callback);
    };
  }
  
  /**
   * Emit an event
   * @param {string} event - Event name
   * @param {*} data - Event data
   */
  emit(event, data) {
    if (this.events[event]) {
      this.events[event].forEach(callback => {
        callback(data);
      });
    }
  }
  
  /**
   * Remove all event listeners
   */
  clear() {
    this.events = {};
  }
}

// Create and export the event emitter instance
export const eventEmitter = new EventEmitter();

// Event listeners can be added like this:
// 
// import { eventEmitter } from './dialogEvents.js';
// 
// // Listen for dialog opened event
// eventEmitter.on('dialog:opened', (dialog) => {
//   console.log('Dialog opened:', dialog);
// });
// 
// // Listen for dialog closed event
// eventEmitter.on('dialog:closed', ({ dialog, result }) => {
//   console.log('Dialog closed with result:', result);
// });