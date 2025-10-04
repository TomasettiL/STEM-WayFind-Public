// Haversine function implementation

export function distance(lat1, lon1, lat2, lon2){
    const R = 6371 * (10 ** 3); // radius of the earth
    const latDif = toRad(lat1 - lat2);
    const lonDif = toRad (lon1 - lon2);

    const a =
    Math.sin(latDif / 2) * Math.sin(latDif / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(lonDif / 2) * Math.sin(lonDif / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
}

export function toRad(degrees){
    // convert coordinate difference to degrees
    return degrees * (Math.PI/180);
}