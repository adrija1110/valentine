// Simple vanilla JS "app" that builds your Valentine page
// and sends a confirmation email via EmailJS when he answers.

// Fill these with your real EmailJS values and his email.
// You already configured these in your EmailJS dashboard.
const EMAILJS_SERVICE_ID = "service_63smbti";
const EMAILJS_TEMPLATE_ID = "template_ggciupa";
const EMAILJS_PUBLIC_KEY = "ld-bDkfYp3CBeGCkD";
const BOYFRIEND_EMAIL = "cadrija11@gmail.com"; // change to his email when you're ready

const EMAIL_MESSAGE = `Thank you for your response.
Please be ready, wear whatever outfit you are comfortable to wear and meet at Bidhannagar Station at 1pm sharp.
Thank you.`;

function createElement(tag, options = {}) {
    const el = document.createElement(tag);
    if (options.className) el.className = options.className;
    if (options.text) el.textContent = options.text;
    if (options.attrs) {
        Object.entries(options.attrs).forEach(([key, value]) => {
            el.setAttribute(key, value);
        });
    }
    if (options.children) {
        options.children.forEach((child) => {
            if (child) el.appendChild(child);
        });
    }
    return el;
}

function sendResponseEmail(answerLabel) {
    if (
        !window.emailjs ||
        !EMAILJS_SERVICE_ID ||
        !EMAILJS_TEMPLATE_ID ||
        !EMAILJS_PUBLIC_KEY ||
        !BOYFRIEND_EMAIL
    ) {
        console.error("EmailJS: missing configuration or SDK", {
            hasEmailJs: !!window.emailjs,
            EMAILJS_SERVICE_ID,
            EMAILJS_TEMPLATE_ID,
            EMAILJS_PUBLIC_KEY_PRESENT: !!EMAILJS_PUBLIC_KEY,
            BOYFRIEND_EMAIL_PRESENT: !!BOYFRIEND_EMAIL,
        });
        return;
    }

    window.emailjs
        .send(
            EMAILJS_SERVICE_ID,
            EMAILJS_TEMPLATE_ID,
            {
                to_email: BOYFRIEND_EMAIL,
                message: EMAIL_MESSAGE,
                answer: answerLabel,
            },
            {
                publicKey: EMAILJS_PUBLIC_KEY,
            }
        )
        .then(
            () => {
                console.log("EmailJS: email sent");
            },
            (error) => {
                console.error("EmailJS: failed to send email", error);
            }
        );
}

function buildApp(root) {
    // Main card container
    const card = createElement("main", { className: "card" });

    // Content grid
    const content = createElement("section", { className: "content" });

    // Left side: text and buttons
    const eyebrow = createElement("div", {
        className: "eyebrow",
        text: "For my favourite person",
    });

    const question = createElement("h1", { className: "big-question" });
    question.textContent = "Will you be my Valentine?";

    // Mini messages (you can customize these strings)
    const lines = [
        "I know I have troubled you a lot and I am trying to be better",
        "Being with you, has made me a better person and I am grateful for that",
        "Never hyped this day up but there is nobody else I would rather share this day with.",
    ];

    const miniMessages = createElement("div", { className: "mini-messages" });
    lines.forEach((text) => {
        const span = createElement("span", { text });
        miniMessages.appendChild(span);
    });

    // Buttons
    const yesBtn = createElement("button", {
        className: "btn btn-primary",
        text: "Yes",
        attrs: { id: "yesBtn", type: "button" },
    });

    const obviouslyBtn = createElement("button", {
        className: "btn btn-secondary",
        text: "Obviously yes",
        attrs: { id: "obviouslyBtn", type: "button" },
    });

    const buttons = createElement("div", {
        className: "buttons",
        children: [yesBtn, obviouslyBtn],
    });

    const note = createElement("p", {
        className: "note",
        text: '(There is no "no" button. That option is intentionally unavailable.)',
    });

    const answerText = createElement("p", {
        className: "answer-text",
        attrs: { id: "answerText" },
        text: "I am saving this moment forever in my memory. Thank you for saying yes.",
    });

    const headline = createElement("div", {
        className: "headline",
        children: [eyebrow, question, miniMessages, buttons, note, answerText],
    });

    // Right side: collage
    const gallery = createElement("div", { className: "gallery" });

    // Define your images here (update paths as needed)
    const images = [
        { src: "photos/photo1.jpg", alt: "Us together 1", big: true },
        { src: "photos/photo2.jpg", alt: "Us together 2" },
        { src: "photos/photo3.jpg", alt: "Us being silly" },
        { src: "photos/photo4.jpg", alt: "Us on a date", big: true },
        { src: "photos/photo5.jpg", alt: "A favourite memory" },
        { src: "photos/photo6.jpg", alt: "Another favourite moment" },
    ];

    images.forEach((imgInfo) => {
        const img = createElement("img", {
            attrs: {
                src: imgInfo.src,
                alt: imgInfo.alt,
            },
            className: imgInfo.big ? "gallery-item-big" : "",
        });
        gallery.appendChild(img);
    });

    const caption = createElement("div", {
        className: "caption",
        text: "A tiny collage of a very big love",
    });
    gallery.appendChild(caption);

    // Put both sides into content
    content.appendChild(headline);
    content.appendChild(gallery);
    card.appendChild(content);

    // Mount the card into the root
    root.appendChild(card);

    // Interactivity
    function showAnswer(line) {
        answerText.textContent = line;
        answerText.classList.add("show");
    }

    function setActiveButton(activeBtn) {
        [yesBtn, obviouslyBtn].forEach((btn) => {
            if (btn === activeBtn) {
                btn.classList.add("btn--filled");
            } else {
                btn.classList.remove("btn--filled");
            }
        });
    }

    yesBtn.addEventListener("click", () => {
        showAnswer("I am saving this moment forever in my memory. Thank you for saying yes.");
        setActiveButton(yesBtn);
        sendResponseEmail("Yes");
    });

    obviouslyBtn.addEventListener("click", () => {
        showAnswer("I knew it. You are officially my Valentine, forever if you will allow it.");
        setActiveButton(obviouslyBtn);
        sendResponseEmail("Obviously yes");
    });
}

document.addEventListener("DOMContentLoaded", () => {
    const appRoot = document.getElementById("app");
    if (appRoot) {
        buildApp(appRoot);
    }
});
