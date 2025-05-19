import { Dialog } from './dialog.js';
import { DialogTypes } from './dialogTypes.js';
import './dialogEvents.js';
import '../../css/dialog/dialog.css';

// Get button elements
const alertBtn = document.getElementById('alertBtn');
const confirmBtn = document.getElementById('confirmBtn');
const promptBtn = document.getElementById('promptBtn');
const customBtn = document.getElementById('customBtn');

// Show an alert dialog when the alert button is clicked
alertBtn.addEventListener('click', () => {
  Dialog.alert({
    title: 'Information',
    message: 'This is a simple alert dialog with a single button.',
    confirmText: 'Got it'
  }).then(() => {
    console.log('Alert dialog closed');
  });
});

// Show a confirm dialog when the confirm button is clicked
confirmBtn.addEventListener('click', () => {
  Dialog.confirm({
    title: 'Confirm Action',
    message: 'Are you sure you want to proceed with this action?',
    confirmText: 'Yes, proceed',
    cancelText: 'Cancel'
  }).then(result => {
    if (result) {
      console.log('User confirmed the action');
    } else {
      console.log('User cancelled the action');
    }
  });
});

// Show a prompt dialog when the prompt button is clicked
promptBtn.addEventListener('click', () => {
  Dialog.prompt({
    title: 'Enter your name',
    message: 'Please enter your full name below:',
    confirmText: 'Submit',
    cancelText: 'Cancel',
    placeholder: 'Your name',
    initialValue: ''
  }).then(result => {
    if (result !== null) {
      console.log('User entered:', result);
    } else {
      console.log('User cancelled the prompt');
    }
  });
});

// Show a custom dialog when the custom button is clicked
customBtn.addEventListener('click', () => {
  const dialog = new Dialog({
    type: DialogTypes.CUSTOM,
    title: 'Custom Dialog',
    content: `
      <div style="text-align: center;">
        <p class="dialog-message">This is a custom dialog with custom content and buttons.</p>
        <div style="margin-top: 16px;">
          <div style="width: 64px; height: 64px; background-color: var(--color-primary-500); border-radius: 50%; margin: 0 auto;"></div>
        </div>
      </div>
    `,
    buttons: [
      {
        text: 'Cancel',
        type: 'cancel',
        onClick: () => {
          dialog.close(false);
          console.log('Custom cancel clicked');
        }
      },
      {
        text: 'Option 1',
        type: 'secondary',
        onClick: () => {
          dialog.close('option1');
          console.log('Option 1 clicked');
        }
      },
      {
        text: 'Option 2',
        type: 'confirm',
        onClick: () => {
          dialog.close('option2');
          console.log('Option 2 clicked');
        }
      }
    ]
  });

  dialog.open().then(result => {
    console.log('Custom dialog result:', result);
  });
});

// Initialize the Dialog system
Dialog.init();

// Display a welcome dialog when the page loads
window.addEventListener('load', () => {
  setTimeout(() => {
    Dialog.alert({
      title: 'Welcome',
      message: 'Welcome to the Beautiful Dialog Component! Click the buttons below to test different dialog types.',
      confirmText: 'Let\'s Start'
    });
  }, 500);
});