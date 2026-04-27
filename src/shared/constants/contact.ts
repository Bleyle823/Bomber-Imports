export const supportContact = {
    phoneDisplay: "+254 769 655561",
    whatsappNumber: "254769655561",
    email: "support@bomberimports.co.ke",
};

export const createWhatsAppLink = (message?: string) => {
    const baseUrl = `https://wa.me/${supportContact.whatsappNumber}`;

    if (!message) {
        return baseUrl;
    }

    return `${baseUrl}?text=${encodeURIComponent(message)}`;
};
