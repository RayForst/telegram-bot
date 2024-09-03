// Constants for time intervals (in seconds)
const MIN_INTERVAL = 3; // Minimum delay time in seconds
const MAX_INTERVAL = 9; // Maximum delay time in seconds

// Constants for different responses and song lyrics
const responses = [
    'huh?', 
    'what?', 
    'are you talking to me?', 
    'don\'t be rude to me?', 
    'can\'t hear you', 
    'Paulina?', 
    'speak more clearly!', 
    'me?', 
    'or maybe you?', 
    'is this normal?'
];

const songLyrics = [
    'Everything is wrong, everything is not right',
    'You are my friend, I am your enemy',
    'How did everything go wrong between us?',
    'It was April, and in love',
    'We swore, but alas',
    'The yellow leaf flew by',
    'Along the boulevards of Moscow',
    'September 3rd — day of farewell',
    'The day when the rowan bonfires burn',
    'Like bonfires, promises burn',
    'On the day when I am all alone',
    'I will turn the calendar, and again it is September 3rd',
    'I will look at your photo, and again it is September 3rd',
    'But why, oh why did we have to part?',
    'After all, everything was serious between us on September 2nd',
    'But why, oh why did we have to part?',
    'After all, everything was serious between us on September 2nd',
    'A flock of white cranes',
    'Your daughter and my son',
    'All want warmth and affection',
    'We fell in love, like a game',
    'In the cold wind',
    'Played with you',
    'But came by itself',
    'September 3rd — day of farewell',
    'The day when the rowan bonfires burn',
    'Like bonfires, promises burn',
    'On the day when I am all alone',
    'I will turn the calendar, and again it is September 3rd',
    'I will look at your photo, and again it is September 3rd',
    'But why, oh why did we have to part?',
    'After all, everything was serious between us on September 2nd',
    'But why, oh why did we have to part?',
    'After all, everything was serious between us on September 2nd',
    'I will turn the calendar, and again it is September 3rd',
    'I will look at your photo, and again it is September 3rd',
    'But why, oh why did we have to part?',
    'After all, everything was serious between us on September 2nd',
    'But why, oh why did we have to part?',
    'After all, everything was serious between us on September 2nd'
];

// Variable to store a reference to the user input field
let userInput;

// Array to store IDs of messages that have already been replied to
const processedMessageIds = [];

// Flag to control message sending
let canSendMessage = true;

// Function to create and center control elements on the screen
function createCenteredElements() {
    // Create input for entering the username
    userInput = document.createElement('input');
    userInput.type = 'text';
    userInput.placeholder = 'Enter the username';
    userInput.style.position = 'absolute';
    userInput.style.top = '30%';
    userInput.style.left = '50%';
    userInput.style.zIndex = '1000';
    userInput.style.transform = 'translate(-50%, -50%)';
    
    // Create select for choosing the response mode
    const modeSelect = document.createElement('select');
    modeSelect.style.position = 'absolute';
    modeSelect.style.top = '40%';
    modeSelect.style.left = '50%';
    modeSelect.style.zIndex = '1000';
    modeSelect.style.transform = 'translate(-50%, -50%)';

    // Options for the select
    const option1 = document.createElement('option');
    option1.value = 'random';
    option1.textContent = 'Reply from list';
    
    const option2 = document.createElement('option');
    option2.value = 'sing';
    option2.textContent = 'Sing a song';
    
    modeSelect.appendChild(option1);
    modeSelect.appendChild(option2);

    // Create a button to start/stop the loop
    const loopButton = document.createElement('button');
    loopButton.textContent = 'Start Loop';
    loopButton.style.position = 'absolute';
    loopButton.style.top = '50%';
    loopButton.style.left = '50%';
    loopButton.style.zIndex = '1000';
    loopButton.style.transform = 'translate(-50%, -50%)';
    loopButton.style.backgroundColor = 'green';
    loopButton.style.color = 'white';

    // Add input, select, and button to the document body
    document.body.appendChild(userInput);
    document.body.appendChild(modeSelect);
    document.body.appendChild(loopButton);

    // Click handler to start/stop the loop
    loopButton.addEventListener('click', function() {
        if (loopButton.textContent === 'Start Loop') {
            startLoop(modeSelect.value);
            loopButton.textContent = 'Stop Loop';
            loopButton.style.backgroundColor = 'red';
        } else {
            stopLoop();
            loopButton.textContent = 'Start Loop';
            loopButton.style.backgroundColor = 'green';
        }
    });
}

// Variable to store the timer ID
let loopTimer;
let songLineIndex = 0; // Variable to track the current song line

// Function to generate a random response from the array
function getRandomResponse() {
    const randomIndex = Math.floor(Math.random() * responses.length);
    return responses[randomIndex];
}

// Function to generate a random interval from min to max seconds
function getRandomInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min) * 1000; // from min to max seconds in milliseconds
}

// Function to start the loop with a delay
function startLoop(mode) {
    console.log('Loop started');
    let counter = 0;

    const input = document.querySelector('#editable-message-text'); // Use the existing selector

    if (!input) {
        console.error('Message input field not found.');
        return;
    }

    console.log('INPUT:', input);

    function loopStep() {
        console.log(`Step: ${counter}`);
        counter++;

        const username = userInput.value.trim(); // Use reference to our input

        if (username) {
            // Check if the user is found and send a message depending on the mode
            if (mode === 'sing') {
                replyToUserWithSong(username);
            } else {
                replyToUser(username);
            }
        }

        // Generate a random interval for the next check
        const interval = getRandomInterval(MIN_INTERVAL, MAX_INTERVAL);
        console.log(`Next check in ${interval / 1000} seconds.`);

        // Schedule the next loop step after a random interval
        loopTimer = setTimeout(loopStep, interval);
    }

    // Start the first loop step
    loopStep();
}

// Function to stop the loop
function stopLoop() {
    if (loopTimer) {
        clearTimeout(loopTimer);
        loopTimer = null;
        songLineIndex = 0; // Reset the song line index when stopping
        canSendMessage = true; // Allow sending the next message
        console.log('Loop stopped.');
    }
}

// Function to send a random message in the chat (without a reply)
function sendRandomMessage() {
    const input = document.querySelector('#editable-message-text');

    if (!input) {
        console.error('Message input field not found.');
        return;
    }

    // Focus on the input field
    input.focus();

    // Get a random response from the array
    const randomResponse = getRandomResponse();

    // Use execCommand to insert random text
    document.execCommand('insertText', false, randomResponse);

    // Create a keyboard event object with the event type and parameters
    const enterEvent = new KeyboardEvent('keydown', {
        key: 'Enter',         // Key name
        code: 'Enter',        // Key code
        keyCode: 13,          // Key number (13 for Enter)
        which: 13,            // Duplicate key number (for compatibility)
        bubbles: true,        // Event should bubble up
        cancelable: true      // Event can be canceled
    });

    // Dispatch (trigger) the event on the selected element
    input.dispatchEvent(enterEvent);

    console.log('Random message sent in the chat.');

    // After sending a message, prohibit sending a new one until the interval expires
    canSendMessage = false;
    setTimeout(() => canSendMessage = true, getRandomInterval(MIN_INTERVAL, MAX_INTERVAL));
}

// Function to send a song line
function sendSongLine() {
    const input = document.querySelector('#editable-message-text');

    if (!input) {
        console.error('Message input field not found.');
        return;
    }

    // Focus on the input field
    input.focus();

    // Get the current song line
    const songLine = songLyrics[songLineIndex];

    // Use execCommand to insert song line text
    document.execCommand('insertText', false, songLine);

    // Create a keyboard event object with the event type and parameters
    const enterEvent = new KeyboardEvent('keydown', {
        key: 'Enter',         // Key name
        code: 'Enter',        // Key code
        keyCode: 13,          // Key number (13 for Enter)
        which: 13,            // Duplicate key number (for compatibility)
        bubbles: true,        // Event should bubble up
        cancelable: true      // Event can be canceled
    });

    // Dispatch (trigger) the event on the selected element
    input.dispatchEvent(enterEvent);

    console.log(`Song line sent: ${songLine}`);

    // Increment the song line index
    songLineIndex++;

    // After sending a message, prohibit sending a new one until the interval expires
    canSendMessage = false;
    setTimeout(() => canSendMessage = true, getRandomInterval(MIN_INTERVAL, MAX_INTERVAL));
}

// Function to reply to a user's message from the list
function replyToUser(username) {
    const messagesContainer = document.querySelector('.messages-container');

    if (!messagesContainer) {
        console.error('Messages container not found.');
        return false;
    }

    // Find the last 5 elements with ids starting with "message-"
    const messageElements = Array.from(messagesContainer.querySelectorAll('[id^="message-"]')).slice(-5);

    if (messageElements.length === 0) {
        console.error('No messages found.');
        return false;
    }

    let found = false;
    let lastKnownAuthor = null;

    // Check the last 5 messages for the specified author
    messageElements.forEach(messageElement => {
        const authorElement = messageElement.querySelector('.message-title-name');
        const messageId = messageElement.getAttribute('data-message-id');

        // If we find an element with a nickname, update the author
        if (authorElement) {
            lastKnownAuthor = authorElement.textContent.trim();
        }

        // Check to avoid re-entering the loop and the message has not been processed yet
        if (!found && lastKnownAuthor === username && !processedMessageIds.includes(messageId)) {
            found = true;
            processedMessageIds.push(messageId); // Add the ID to the array of processed messages
            
            // Find the message control element inside the found element
            const messageControlElement = messageElement.querySelector('.message-select-control');

            if (messageControlElement && canSendMessage) {
                // Create a double-click event for the reply
                const dblClickEvent = new MouseEvent('dblclick', {
                    bubbles: true,
                    cancelable: true,
                    view: window
                });

                // Emulate a double click on the message control element
                messageControlElement.dispatchEvent(dblClickEvent);

                console.log('Double click on the message control element performed for reply.');

                // Send a random message after selection
                sendRandomMessage();
            } else if (!canSendMessage) {
                console.log('Message sending blocked until the interval expires.');
            } else {
                console.error('Message control element not found.');
            }
        }
    });

    if (!found && username) {
        console.log('No new messages found from the specified user.');
    }

    return found;
}

// Function to reply to a user's message with a song line
function replyToUserWithSong(username) {
    const messagesContainer = document.querySelector('.messages-container');

    if (!messagesContainer) {
        console.error('Messages container not found.');
        return false;
    }

    // Find the last 5 elements with ids starting with "message-"
    const messageElements = Array.from(messagesContainer.querySelectorAll('[id^="message-"]')).slice(-5);

    if (messageElements.length === 0) {
        console.error('No messages found.');
        return false;
    }

    let found = false;
    let lastKnownAuthor = null;

    // Check the last 5 messages for the specified author
    messageElements.forEach(messageElement => {
        const authorElement = messageElement.querySelector('.message-title-name');
        const messageId = messageElement.getAttribute('data-message-id');

        // If we find an element with a nickname, update the author
        if (authorElement) {
            lastKnownAuthor = authorElement.textContent.trim();
        }

        // Check to avoid re-entering the loop and the message has not been processed yet
        if (!found && lastKnownAuthor === username && !processedMessageIds.includes(messageId)) {
            found = true;
            processedMessageIds.push(messageId); // Add the ID to the array of processed messages
            
            // Find the message control element inside the found element
            const messageControlElement = messageElement.querySelector('.message-select-control');

            if (messageControlElement && canSendMessage) {
                // Create a double-click event for the reply
                const dblClickEvent = new MouseEvent('dblclick', {
                    bubbles: true,
                    cancelable: true,
                    view: window
                });

                // Emulate a double click on the message control element
                messageControlElement.dispatchEvent(dblClickEvent);

                console.log('Double click on the message control element performed for reply.');

                // Send the song line after selection
                sendSongLine();
            } else if (!canSendMessage) {
                console.log('Message sending blocked until the interval expires.');
            } else {
                console.error('Message control element not found.');
            }
        }
    });

    if (!found && username) {
        console.log('No new messages found from the specified user.');
    }

    return found;
}

// Start creating elements when the script loads
setTimeout(() => {
    createCenteredElements();
}, 2000);
