/*
 * Demo backend logic for the Atelier Asakusa landing page.
 *
 * This file does not start a real server.
 * It only illustrates how reservation and contact data could be handled
 * on the backend in a portfolio project.
 *
 * In a real application, the frontend would send a POST request such as:
 *   fetch("/api/reservations", { method: "POST", body: JSON.stringify(data) })
 *
 * A real server would then:
 * 1. receive the JSON payload
 * 2. validate required fields
 * 3. save the data to a database or send an email
 * 4. return a JSON response to the frontend
 */

function getMissingFields(data, requiredFields) {
    return requiredFields.filter((field) => {
        const value = data[field];

        if (typeof value === "string") {
            return value.trim() === "";
        }

        return value === undefined || value === null;
    });
}

function createReservation(data) {
    const requiredFields = ["name", "email", "date", "guests", "plan"];
    const missingFields = getMissingFields(data, requiredFields);

    if (missingFields.length > 0) {
        return {
            success: false,
            message: `Missing required fields: ${missingFields.join(", ")}`,
        };
    }

    const reservation = {
        name: data.name,
        email: data.email,
        date: data.date,
        guests: data.guests,
        plan: data.plan,
        message: data.message || "",
        receivedAt: new Date().toISOString(),
    };

    /*
     * With a real backend, this is where you would:
     * - insert the reservation into a database
     * - send a confirmation email
     * - notify the workshop staff
     */
    console.log("Reservation received:", reservation);

    return {
        success: true,
        message: "Reservation received",
        data: reservation,
    };
}

function sendContactMessage(data) {
    const requiredFields = ["name", "email", "message"];
    const missingFields = getMissingFields(data, requiredFields);

    if (missingFields.length > 0) {
        return {
            success: false,
            message: `Missing required fields: ${missingFields.join(", ")}`,
        };
    }

    const contactMessage = {
        name: data.name,
        email: data.email,
        message: data.message,
        receivedAt: new Date().toISOString(),
    };

    /*
     * With a real backend, this is where you would:
     * - store the message
     * - forward it by email
     * - create a support ticket or admin notification
     */
    console.log("Contact message received:", contactMessage);

    return {
        success: true,
        message: "Contact message received",
        data: contactMessage,
    };
}

/*
 * Example usage for documentation purposes only:
 *
 * const reservationResult = createReservation({
 *   name: "Alice Martin",
 *   email: "alice@example.com",
 *   date: "2026-04-20",
 *   guests: 2,
 *   plan: "Couple Session",
 *   message: "We would like a late afternoon slot."
 * });
 *
 * const contactResult = sendContactMessage({
 *   name: "Alice Martin",
 *   email: "alice@example.com",
 *   message: "Can I book for three guests?"
 * });
 */

module.exports = {
    createReservation,
    sendContactMessage,
};
