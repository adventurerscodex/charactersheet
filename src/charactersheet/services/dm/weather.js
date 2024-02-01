const ALL_WEATHER = [

    // From Donjon
    'Light Wind',
    'Fog',
    'Hail',
    'Heavy Snow',
    'Rain',
    'Sleet',
    'Snow',
    'Cold',
    'Extreme Cold',
    'Extreme Heat',
    'Severe Cold',
    'Severe Heat',
    'Very Hot',
    'Hurricane',
    'Light Wind',
    'Moderate Wind',
    'Severe Wind',
    'Strong Wind',
    'Tornado',
    'Windstorm',
    'Blizzard',
    'Duststorm',
    'Greater Duststorm',
    'Hurricane',
    'Severe Thunderstorm',
    'Snowstorm',
    'Thunderstorm',
    'Aberrant Sky',
    'Acid Rain',
    'Animus Blizzard',
    'Arcane Tempest',
    'Blacksleet',
    'Indigo Fog',
    'Dire Hail',
    'Draconic Clouds',
    'Dragon\'s Breath',
    'Ethereal Fog',
    'Expeditious Tailwind',
    'Firestorm',
    'Gatestorm',
    'Ghoststorm',
    'Hallucinatory Stor',
    'Immuring Sleet',
    'Incendiary Clouds',
    'Ghostly Wind',
    'Luminous Clouds',
    'Prismatic Rain',
    'Skyquake',
    'Solid Fog',
    'Spiderweb Clouds',
    'Starfall Hail',
    'Temporal Wind',
    'Thunder Hail',
    'Whispering Wind',

    // GPT-Generated Mundane Outdoor Conditions
    'Clear Sky',
    'Sunny Day',
    'Partly Cloudy',
    'Cloudy Skies',
    'Overcast Day',
    'Foggy Morning',
    'Misty Weather',
    'Hazy Conditions',
    'Light Rain',
    'Steady Drizzle',
    'Heavy Rain',
    'Thunderstorms',
    'Showers Likely',
    'Scattered Showers',
    'Patchy Rain',
    'Rainy Afternoon',
    'Torrential Rain',
    'Rain And Snow',
    'Snowy Day',
    'Blizzard Conditions',
    'Freezing Rain',
    'Sleet Showers',
    'Ice Pellets',
    'Wintry Mix',
    'Cold And Dry',
    'Chilly Breeze',
    'Biting Cold',
    'Breezy Weather',
    'Windy Day',
    'Gusty Winds',
    'Strong Gusts',
    'Windstorm Alert',
    'Calm Conditions',
    'Stagnant Air',
    'Stifling Heat',
    'Hot And Humid',
    'Searing Heat',
    'Heatwave Warning',
    'Dry And Hot',
    'Sizzling Temperatures',
    'Mild Evening',
    'Cool Night',
    'Chilled Air',
    'Crisp Morning',
    'Pleasant Weather',
    'Gentle Breeze',
    'Balmy Day',
    'Warm Sunshine',
    'Sunset Glow',
    'Dusk Colors',
    'Dawn Awakening',
    'Early Morning Dew',
    'Frosty Morning',
    'Frozen Ground',
    'Icy Patches',
    'Slushy Roads',
    'Melting Snow',
    'Thawing Conditions',
    'Springtime Warmth',
    'Summer Heat',
    'Sweltering Day',
    'Hottest Day',
    'Dog Days',
    'Midsummer Sun',
    'Autumnal Breeze',
    'Fall Foliage',
    'Crisp Air',
    'Golden Hour Glow',
    'Dull And Gray',
    'Dim Sunlight',
    'Sunless Day',
    'Dreary Weather',
    'Gloomy Skies',
    'Murky Atmosphere',
    'Rainbow Sighting',
    'Meteor Shower Night',
    'Halos Around Sun',
    'Snow Flurries',
    'Whiteout Conditions',
    'Black Ice Warning',
    'Aurora Borealis',
    'Starry Night',
    'Moonlit Sky',
    'Lunar Eclipse',
    'Solar Eclipse',
];


/**
 * Return a random description of the weather.
 */
export const randomWeather = () => {
    return ALL_WEATHER[Math.floor(Math.random() * ALL_WEATHER.length)];
}
