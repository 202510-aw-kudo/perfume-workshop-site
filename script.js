function createAccordion(root) {
    const items = Array.from(root.querySelectorAll(".faq-item"));

    if (!items.length) {
        return;
    }

    function setExpanded(item, expanded) {
        const button = item.querySelector(".faq-question");
        const panel = item.querySelector(".faq-answer");

        if (!button || !panel) {
            return;
        }

        item.classList.toggle("active", expanded);
        button.setAttribute("aria-expanded", String(expanded));
        panel.hidden = !expanded;
    }

    function closeOthers(currentItem) {
        items.forEach((item) => {
            if (item !== currentItem) {
                setExpanded(item, false);
            }
        });
    }

    items.forEach((item) => {
        setExpanded(item, false);

        const button = item.querySelector(".faq-question");

        if (!button) {
            return;
        }

        button.addEventListener("click", () => {
            const isExpanded = button.getAttribute("aria-expanded") === "true";

            if (isExpanded) {
                setExpanded(item, false);
                return;
            }

            closeOthers(item);
            setExpanded(item, true);
        });
    });
}

document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("[data-accordion]").forEach(createAccordion);
});
