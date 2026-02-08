let menu = [
    {
        "id": 1,
        "image": "SmokeBurger.jpg",
        "name": "Classic Burger",
        "price": 5.99,
        "Beschreibung": "Saftiger Rindfleisch-Patty mit frischem Salat,<br> Tomate, Zwiebeln und unserer speziellen Sauce."
    },
    {
        "id": 2,
        "image": "CheeseBurger.jpg",
        "name": "Cheese Burger",
        "price": 6.49,
        "Beschreibung": "Köstlicher Burger mit geschmolzenem Cheddar Käse, Salat, Tomate und Zwiebeln."
    },
    {
        "id": 3,
        "image": "BaconBurger.jpg",
        "name": "Bacon Burger",
        "price": 6.99,
        "Beschreibung": "Leckerer Burger mit knusprigem Bacon,<br> Salat, Tomate, Zwiebeln und BBQ-Sauce."
    },
    {
        "id": 4,
        "image": "DoubleBurger.jpg",
        "name": "Double Burger",
        "price": 7.49,
        "Beschreibung": "Doppelter Genuss mit zwei Rindfleisch-Patties,<br> Salat, Tomate, Zwiebeln und<br> unserer speziellen Sauce."
    },
    {
        "id": 5,
        "image": "Margherita.jpg",
        "name": "Margherita",
        "price": 4.99,
        "Beschreibung": "Klassische Pizza mit<br> Tomatensauce und Mozzarella."
    },
    {
        "id": 6,
        "image": "Pepperoni.jpg",
        "name": "Pepperoni",
        "price": 5.99,
        "Beschreibung": "Würzige Pepperoni-Scheiben<br> auf Tomatensauce und Käse."
    },
    {
        "id": 7,
        "image": "Vegetarian.jpg",
        "name": "Vegetarian",
        "price": 5.49,
        "Beschreibung": "Bunte Auswahl an frischem Gemüse <br>auf Tomatensauce und Käse."
    },
    {
        "id": 8,
        "image": "BBQChicken.png",
        "name": "BBQ Chicken",
        "price": 6.49,
        "Beschreibung": "Gegrilltes Hähnchen mit BBQ-Sauce,<br> Zwiebeln und Käse."
    },
    {
        "id": 9,
        "image": "CaesarSalad.jpg",
        "name": "Caesar Salat",
        "price": 4.99,
        "Beschreibung": "Frischer Römersalat mit Caesar-Dressing,<br> Croutons und Parmesan."
    },
    {
        "id": 10,
        "image": "GreekSalad.jpg",
        "name": "Griechischer Salat",
        "price": 5.49,
        "Beschreibung": "Tomaten, Gurken, Oliven, Feta-Käse und<br> rote Zwiebeln mit Olivenöl-Dressing."
    },
    {
        "id": 11,
        "image": "GardenSalad.jpg",
        "name": "Garten Salat",
        "price": 4.49,
        "Beschreibung": "Gemischter Salat mit frischem Gemüse und<br> einem leichten Vinaigrette-Dressing."
    },
    {
        "id": 12,
        "image": "CornSalad.jpg",
        "name": "Corn Salat",
        "price": 6.99,
        "Beschreibung": "Salat mit frischem Mais, schwarzen Bohnen,<br> Paprika und einem würzigen Dressing."
    }
];
let menuItems = JSON.parse(localStorage.getItem("MenuItems")) || menu;// Menü aus localStorage oder Standardmenü
let id = 0;// ID-Variable für die Generierung von eindeutigen IDs für neue Menüelemente
let imagePath = "./assets/image/";
let headline = [
    { name: "Burger", id: 0, image: "BurgerIcon.png" },
    { name: "Pizza", id: 4, image: "PizzaIcon.png" },
    { name: "Salat", id: 8, image: "SaladIcon.png" }
];

let cart = [];// Warenkorb-Array, um die hinzugefügten Artikel zu speichern
let menuCount = [];// Array, um die Anzahl der Artikel im Menü zu speichern