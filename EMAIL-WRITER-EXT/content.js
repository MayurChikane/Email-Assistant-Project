console.log("Email Writer Extension - Content Script Loaded");

function getEmailContent() {
    const selectors = ['.h7', '.a3s.aiL', '.gmail_quote', '[role="presentation"]'];

    for (const selector of selectors) {
        const content = document.querySelector(selector);
        if (content) return content.innerText.trim();
    }
    return ''; // Return empty if no content is found
}

function createAIButton() {
    const button = document.createElement('div');
    button.className = 'T-I J-J5-Ji aoO T-I-atl L3 ai-reply-button';
    button.style.marginRight = '8px';
    button.innerHTML = 'AI Reply';
    button.setAttribute('role', 'button');
    button.setAttribute('data-tooltip', 'Generate AI Reply');
    return button;
}

function findComposeToolbar() {
    const selectors = ['.aDh', '.btC', '[role="dialog"]', '.gU.Up'];

    for (const selector of selectors) {
        const toolbar = document.querySelector(selector);
        if (toolbar) return toolbar;
    }
    return null; // Return null if no toolbar is found
}

function injectButton() {
    const existingButton = document.querySelector('.ai-reply-button');
    if (existingButton) existingButton.remove();

    const toolbar = findComposeToolbar();
    if (!toolbar) {
        console.log("Toolbar not found");
        return;
    }

    console.log("Toolbar Found, creating AI button");

    const button = createAIButton();

    button.addEventListener('click', async () => {
        try {
            button.innerHTML = 'Generating...';
            button.disabled = true;

            const emailContent = getEmailContent();
            const response = await fetch('http://localhost:8080/api/email/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ emailContent, tone: "professional" })
            });

            if (!response.ok) throw new Error('Failed to generate AI reply');

            const generatedReply = await response.text();

            const composeBox = document.querySelector('[role="textbox"][contenteditable="true"]');

            if (composeBox) {
                composeBox.focus();
                document.execCommand('insertText', false, generatedReply);
            } else {
                console.error('Compose box not found');
            }
        } catch (error) {
            console.error(error);
        } finally {
            button.innerHTML = 'AI Reply';
            button.disabled = false;
        }
    });

    toolbar.insertBefore(button, toolbar.firstChild);
}

const observer = new MutationObserver((mutations) => {
    let hasComponentElements = false;

    for (const mutation of mutations) {
        const addedNotes = Array.from(mutation.addedNodes);
        if (addedNotes.some(node => 
            node.nodeType == Node.ELEMENT_NODE && (node.matches('.aDh, .btC, [role="dialog"]') 
            || node.querySelector('.aDh, .btC, [role="dialog"]'))
        )) {
            hasComponentElements = true;
            break; // Stop loop once found
        }
    }

    if (hasComponentElements) {
        console.log("Compose Window Detected");
        setTimeout(injectButton, 500);
    }
});

observer.observe(document.body, {
    childList: true,
    subtree: true
});
