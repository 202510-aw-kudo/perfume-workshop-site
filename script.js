function createAccordion(root) {
    const items = Array.from(root.querySelectorAll(".faq-item"));

    if (!items.length) {
        return;
    }

    function openItem(item) {
        const button = item.querySelector(".faq-question");
        const panel = item.querySelector(".faq-answer");

        if (!button || !panel) {
            return;
        }

        item.classList.add("active");
        button.setAttribute("aria-expanded", "true");
        panel.hidden = false;
        panel.style.height = `${panel.scrollHeight}px`;

        const handleTransitionEnd = (event) => {
            if (event.propertyName !== "height") {
                return;
            }

            if (item.classList.contains("active")) {
                panel.style.height = "auto";
            }

            panel.removeEventListener("transitionend", handleTransitionEnd);
        };

        panel.addEventListener("transitionend", handleTransitionEnd);
    }

    function closeItem(item) {
        const button = item.querySelector(".faq-question");
        const panel = item.querySelector(".faq-answer");

        if (!button || !panel) {
            return;
        }

        panel.style.height = `${panel.scrollHeight}px`;
        panel.offsetHeight;

        item.classList.remove("active");
        button.setAttribute("aria-expanded", "false");
        panel.style.height = "0px";

        const handleTransitionEnd = (event) => {
            if (event.propertyName !== "height") {
                return;
            }

            if (!item.classList.contains("active")) {
                panel.hidden = true;
            }

            panel.removeEventListener("transitionend", handleTransitionEnd);
        };

        panel.addEventListener("transitionend", handleTransitionEnd);
    }

    function closeOthers(currentItem) {
        items.forEach((item) => {
            if (item !== currentItem) {
                closeItem(item);
            }
        });
    }

    items.forEach((item) => {
        const button = item.querySelector(".faq-question");
        const panel = item.querySelector(".faq-answer");

        if (!button || !panel) {
            return;
        }

        item.classList.remove("active");
        button.setAttribute("aria-expanded", "false");
        panel.hidden = true;
        panel.style.height = "0px";

        button.addEventListener("click", () => {
            const isExpanded = item.classList.contains("active");

            if (isExpanded) {
                closeItem(item);
                return;
            }

            closeOthers(item);
            openItem(item);
        });
    });
}

document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("[data-accordion]").forEach(createAccordion);
});
