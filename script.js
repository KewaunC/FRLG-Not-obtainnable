const alteringNames = [
    "Mareep", "Flaaffy", "Ampharos", "Pineco", "Forretress", 
    "Houndour", "Houndoom", "Teddiursa", "Aipom", "Shuckle", 
    "Stantler", "Smeargle"
];

// Add this call at the bottom of your script
fetchAndPopulate(alteringNames, 'altering-grid');

const johtoNames = [
    "Sentret", "Furret", "Spinarak", "Ariados", "Crobat", "Pichu", "Cleffa", "Igglybuff", 
    "Togepi", "Togetic", "Natu", "Xatu", "Bellossom", "Marill", "Azumarill", "Hoppip", 
    "Skiploom", "Jumpluff", "Yanma", "Wooper", "Quagsire", "Murkrow", "Slowking", 
    "Misdreavus", "Unown", "Wobbuffet", "Dunsparce", "Steelix", "Qwilfish", "Scizor", 
    "Heracross", "Sneasel", "Slugma", "Magcargo", "Swinub", "Piloswine", "Remoraid", 
    "Octillery", "Delibird", "Mantine", "Skarmory", "Phanpy", "Donphan", "Porygon2", 
    "Tyrogue", "Hitmontop", "Smoochum", "Elekid", "Magby", "Blissey", "Raikou", 
    "Entei", "Suicune", "Larvitar", "Pupitar", "Tyranitar", "Lugia", "Ho-oh"
];

const hoennNames = ["Azurill", "Wynaut", "Deoxys"];

async function fetchAndPopulate(nameList, containerId) {
    const container = document.getElementById(containerId);
    
    for (let name of nameList) {
        try {
            // PokéAPI formatting (Ho-oh needs to stay as-is, Deoxys needs -normal)
            let apiName = name.toLowerCase().trim();
            if (apiName === 'deoxys') apiName = 'deoxys-normal';

            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${apiName}`);
            const data = await response.json();

            // Target the specific FRLG Sprite path
            const sprite = data.sprites.versions['generation-iii']['firered-leafgreen'].front_default 
                           || data.sprites.front_default;

            const card = document.createElement('div');
            card.className = 'pkmn-card';
            card.innerHTML = `
                <span class="pkmn-id">#${data.id}</span>
                <img src="${sprite}" alt="${name}">
                <span class="pkmn-name">${name}</span>
            `;
            container.appendChild(card);
        } catch (error) {
            console.error(`Error loading ${name}:`, error);
        }
    }
}

// Run the loads
fetchAndPopulate(johtoNames, 'johto-grid');
fetchAndPopulate(hoennNames, 'hoenn-grid');