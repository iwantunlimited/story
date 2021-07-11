export const getRandomColor = () => {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

export const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1
};