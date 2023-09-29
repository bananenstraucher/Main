async function holeSprueche() {
    try {
        const response = await fetch('sprueche.txt');
        const text = await response.text();
        return text.split(';').filter(eintrag => eintrag.split('|').length === 3).map(eintrag => {
            const [spruch, iconText, link] = eintrag.split('|');
            return { 
                spruch: spruch.trim(), 
                iconText: iconText.trim(),
                link: link.trim() === "" ? "unbekannt" : link.trim()
            };
        });
    } catch (error) {
        console.error('Fehler beim Laden der Sprüche:', error);
    }
    return [];
}

async function neuerSpruch() {
    const sprueche = await holeSprueche();
    if (sprueche.length > 0) {
        const zufallIndex = Math.floor(Math.random() * sprueche.length);
        const ausgewaehlterSpruch = sprueche[zufallIndex];

        document.getElementById('spruchAnzeige').innerText = ausgewaehlterSpruch.spruch;

        // Update den Link und das Icon
        const linkElement = document.getElementById('spruchLink');
        const iconElement = document.getElementById('spruchIcon');
    
        if (ausgewaehlterSpruch.link !== "unbekannt") {
            linkElement.href = ausgewaehlterSpruch.link;

            // Setzen Sie das Icon-Bild basierend auf dem Icon-Text
            iconElement.src = `/icons_sprueche/${ausgewaehlterSpruch.iconText}.png`;
            iconElement.alt = ausgewaehlterSpruch.iconText;

        } else {
            linkElement.href = "#";
            iconElement.src = "";
            iconElement.alt = "";
        }
    }
}

// Lädt einen Spruch, sobald die Seite geladen ist
window.onload = neuerSpruch;



