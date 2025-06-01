// Product data
const products = [
    {
        id: 1,
        name: "Air Jordan x Travis Scott",
        description: "OG Retro Lows Olive Pair",
        price: 1250.00,
        image: "https://sneakerbardetroit.com/wp-content/uploads/2019/06/Travis-Scott-Air-Jordan-1-Low-CQ4277-001-2019-Release-Date.jpg"
    },
    {
        id: 2,
        name: "Nike SB Dunk Low",
        description: "The Ben & Jerry's \"Chunky Dunky\"",
        price: 1800.00,
        image: "https://sneakernews.com/wp-content/uploads/2020/05/nike-sb-chunky-dunky-CU3244-100-6.jpg?w=1140"
    },
    {
        id: 3,
        name: "Nike Blue Lobster",
        description: "Blue Nike SB Dunk Low Blue Lobster",
        price: 2250.00,
        image: "https://sneakerbardetroit.com/wp-content/uploads/2021/07/Nike-SB-Dunk-Low-Blue-Lobster-313170-342-Release-Date-1.jpg"
    },
    {
        id: 4,
        name: "Nike Air Jordan 1 Dior",
        description: "Air Jordan 1 High/Nike Air Jordan 1 Dior",
        price: 7500.00,
        image: "https://kingwalk.com/wp-content/uploads/2020/06/Nike-Air-Jordan-1-Dior-1.jpg"
    }
];

// Export products
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { products };
}