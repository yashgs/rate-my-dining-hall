CREATE DATABASE restaurant_app;
\c restaurant_app;



CREATE TABLE University (
    uni_universityID SERIAL PRIMARY KEY, -- primary key
    uni_name VARCHAR(255) NOT NULL,
    latitude DOUBLE PRECISION NOT NULL,
    longitude DOUBLE PRECISION NOT NULL
);

--(user is a protected keyword so its users now)
CREATE TABLE Users (
    user_userID SERIAL PRIMARY KEY, -- primary key
    user_universityID INT,
    user_proximity_preference INT, -- max distance for restaurants
    user_price_range TEXT CHECK (user_price_range IN ('$', '$$', '$$$', '$$$$')),
    user_cuisine_preference TEXT,
    user_dietary_restriction TEXT,
    user_email VARCHAR(100) UNIQUE,
    user_last_name VARCHAR(100),
    user_first_name VARCHAR(100),
    FOREIGN KEY (user_universityID) REFERENCES University(uni_universityID) ON DELETE CASCADE -- foreign key to university
);
ALTER TABLE Users ADD COLUMN password VARCHAR(255) NOT NULL;

CREATE TABLE Restaurant (
    res_universityID INT,
    res_restaurantID SERIAL PRIMARY KEY, -- primary key
    res_menu TEXT, 
    latitude DOUBLE PRECISION NOT NULL,
    longitude DOUBLE PRECISION NOT NULL,
    res_price_range TEXT CHECK (res_price_range IN ('$', '$$', '$$$', '$$$$')), 
    res_cuisine TEXT,
    res_name TEXT NOT NULL,
    FOREIGN KEY (res_universityID) REFERENCES University(uni_universityID) ON DELETE CASCADE -- foreign key university
);


CREATE TABLE Review (
    rev_reviewID SERIAL PRIMARY KEY, -- primary key
    rev_content TEXT NOT NULL,
    rev_tags VARCHAR(100)[],
    rev_star_rating SMALLINT CHECK (rev_star_rating BETWEEN 1 AND 5),
    rev_title VARCHAR(255) NOT NULL,
    rev_userID INT,
    rev_restaurantID INT,
    FOREIGN KEY (rev_userID) REFERENCES Users(user_userID) ON DELETE CASCADE, -- foreign key to user
    FOREIGN KEY (rev_restaurantID) REFERENCES Restaurant(res_restaurantID) ON DELETE CASCADE -- foreign key restaurant
);





INSERT INTO University (uni_name, latitude, longitude) VALUES
    ('Harvard University', 42.3770, -71.1167),  -- Cambridge, MA
    ('Stanford University', 37.4275, -122.1697), -- Stanford, CA
    ('Massachusetts Institute of Technology', 42.3601, -71.0942), -- Cambridge, MA
    ('University of California, Berkeley', 37.8715, -122.2730), -- Berkeley, CA
    ('University of Michigan', 42.2780, -83.7382), -- Ann Arbor, MI
    ('University of Chicago', 41.7886, -87.5987), -- Chicago, IL
    ('Columbia University', 40.8075, -73.9626), -- New York, NY
    ('California Institute of Technology', 34.1478, -118.1445), -- Pasadena, CA
    ('Yale University', 41.3163, -72.9223), -- New Haven, CT
    ('University of Pennsylvania', 39.9522, -75.1932); -- Philadelphia, PA

INSERT INTO Users (user_universityID, user_proximity_preference, user_price_range, user_cuisine_preference, user_dietary_restriction, user_email, user_last_name, user_first_name,password) VALUES
    (1, 1, '$$', 'Italian', 'Vegetarian', 'alice.jones@example.com', 'Jones', 'Alice', '1'),
    (1, 2, '$', 'Mexican', 'None', 'bob.brown@example.com', 'Brown', 'Bob', '1'),
    (2, 3, '$$$$', 'Chinese', 'Vegan', 'charlie.smith@example.com', 'Smith', 'Charlie', '1'),
    (2, 1, '$$', 'American', 'None', 'david.williams@example.com', 'Williams', 'David', '1'),
    (3, 1, '$$', 'Indian', 'Gluten-Free', 'emily.johnson@example.com', 'Johnson', 'Emily', '1'),
    (3, 2, '$', 'Thai', 'None', 'frank.miller@example.com', 'Miller', 'Frank', '1'),
    (4, 3, '$$$$', 'Mediterranean', 'Vegan', 'grace.davis@example.com', 'Davis', 'Grace', '1'),
    (4, 1, '$$', 'Italian', 'None', 'henry.garcia@example.com', 'Garcia', 'Henry', '1'),
    (5, 1, '$', 'Chinese', 'None', 'irene.martinez@example.com', 'Martinez', 'Irene', '1'),
    (5, 3, '$$$$', 'American', 'Vegetarian', 'jack.taylor@example.com', 'Taylor', 'Jack', '1'),
    (6, 1, '$$', 'Indian', 'None', 'kelly.thomas@example.com', 'Thomas', 'Kelly', '1'),
    (6, 2, '$$', 'Mexican', 'None', 'luke.hall@example.com', 'Hall', 'Luke', '1'),
    (7, 1, '$$', 'Thai', 'Gluten-Free', 'mike.anderson@example.com', 'Anderson', 'Mike', '1'),
    (7, 2, '$$', 'Italian', 'None', 'nina.robinson@example.com', 'Robinson', 'Nina', '1'),
    (8, 3, '$$', 'Mexican', 'Vegan', 'oliver.harris@example.com', 'Harris', 'Oliver', '1'),
    (8, 1, '$$', 'American', 'None', 'paul.clark@example.com', 'Clark', 'Paul', '1'),
    (9, 1, '$$', 'Indian', 'Vegetarian', 'quinn.lewis@example.com', 'Lewis', 'Quinn', '1'),
    (9, 2, '$$', 'Mediterranean', 'None', 'rachel.walker@example.com', 'Walker', 'Rachel', '1'),
    (10, 3, '$$', 'Chinese', 'None', 'sarah.young@example.com', 'Young', 'Sarah', '1'),

INSERT INTO Restaurant (res_universityID, res_menu, latitude, longitude, res_cuisine, res_price_range, res_name) VALUES
    (1, 'Pasta, Pizza, Salad', 42.3749, -71.1187, 'Italian', '$$', 'Ciao Bella'),  -- Harvard Square, Cambridge
    (1, 'Tacos, Burritos', 42.3736, -71.1171, 'Mexican', '$', 'Burrito Express'), -- Main St, Cambridge
    (2, 'Noodles, Dumplings', 37.4270, -122.1705, 'Chinese', '$$$$', 'Golden Dragon'), -- El Camino Real, Stanford
    (2, 'Burgers, Fries', 37.4274, -122.1659, 'American', '$$', 'Stanford Grill'), -- Stanford Shopping Center
    (3, 'Butter Chicken, Biryani', 42.3600, -71.0940, 'Indian', '$$$$', 'Spice of India'), -- Mass Ave, Cambridge
    (3, 'Pad Thai, Curry', 37.8715, -122.2728, 'Thai', '$$', 'Thai Paradise'), -- Main St, Berkeley
    (4, 'Falafel, Hummus', 37.8733, -122.2711, 'Mediterranean', '$$$$', 'Mediterranean Delight'), -- Berkeley Ave, Berkeley
    (4, 'Lasagna, Gelato', 37.8732, -122.2675, 'Italian', '$$', 'Pasta Pronto'), -- Southside, Berkeley
    (5, 'Sweet and Sour, Fried Rice', 42.2781, -83.7405, 'Chinese', '$', 'Wok This Way'), -- Ann Arbor Downtown
    (5, 'Brisket, Ribs', 42.2785, -83.7335, 'American', '$$$$', 'BBQ Kings'), -- Michigan Ave, Ann Arbor
    (6, 'Chicken Tikka, Naan', 41.7892, -87.6010, 'Indian', '$$', 'Delhi Grill'), -- Hyde Park, Chicago
    (6, 'Enchiladas, Quesadillas', 41.7865, -87.6269, 'Mexican', '$$', 'Taco Fiesta'), -- Downtown, Chicago
    (7, 'Tom Yum, Pad See Ew', 34.1491, -118.1448, 'Thai', '$$', 'Taste of Thailand'), -- Pasadena Blvd, Pasadena
    (7, 'Pasta Primavera, Fettuccine', 34.1475, -118.1451, 'Italian', '$$', 'Italian Bistro'), -- Lake Ave, Pasadena
    (8, 'Fajitas, Salsa', 41.3119, -72.9250, 'Mexican', '$$', 'Fiesta Mexicana'), -- New Haven St, New Haven
    (8, 'Clam Chowder, Lobster Roll', 41.3138, -72.9262, 'American', '$$$$', 'New Haven Seafood'), -- College St, New Haven
    (9, 'Samosas, Chaat', 41.3170, -72.9259, 'Indian', '$$', 'Bollywood Bites'), -- Yale Ave, New Haven
    (9, 'Shawarma, Kebabs', 41.3155, -72.9204, 'Mediterranean', '$$', 'Mediterranean Oasis'), -- Yale St, New Haven
    (10, 'Kung Pao Chicken, Dumplings', 39.9524, -75.1928, 'Chinese', '$', 'Chinatown Noodles'), -- University Ave, Philadelphia
    (10, 'Green Curry, Tom Kha', 39.9533, -75.1938, 'Thai', '$$$$', 'Bangkok Kitchen'); -- Campus Square, Philadelphia

INSERT INTO Review (rev_content, rev_tags, rev_star_rating, rev_title, rev_userID, rev_restaurantID) VALUES
    ('Terrible service, waited over an hour for my food.', '{Italian, Disappointed}', 1, 'Never Coming Back', 1, 1),
    ('The food was cold and lacked flavor.', '{Chinese, Disappointed}', 1, 'Disappointing Experience', 2, 10),
    ('Awful! I found a hair in my soup.', '{American, Disgusting}', 1, 'Never Again', 3, 5),
    ('One of the worst meals I have ever had.', '{Mexican, Disappointed}', 1, 'Horrible Meal', 4, 2),
    ('The steak was overcooked and not edible.', '{American, Disappointed}', 1, 'Overcooked Steak', 5, 8),
    ('Terrible experience! They messed up my order.', '{Thai, Disappointed}', 1, 'Order Mishap', 6, 6),
    ('Food was bland, and the service was slow.', '{Indian, Disappointed}', 2, 'Bland and Slow', 7, 5),
    ('Great sushi, but the wait time was unbearable.', '{Japanese, Mixed}', 2, 'Good but Slow', 8, 12),
    ('Nice atmosphere but food was overpriced.', '{Mediterranean, Mixed}', 2, 'Overpriced', 9, 7),
    ('The burgers are decent but have had better elsewhere.', '{American, Mixed}', 2, 'Decent Burgers', 10, 4),
    ('The food was okay, nothing special.', '{Mexican, Mixed}', 2, 'Just Okay', 1, 2),
    ('The steak was perfectly cooked, but the sides were lacking.', '{American, Mixed}', 3, 'Steak was Good', 2, 8),
    ('Inconsistent food quality, it was better last time.', '{Italian, Mixed}', 3, 'Inconsistent Quality', 3, 1),
    ('Good location, but the food was just average.', '{American, Mixed}', 3, 'Average Food', 4, 3),
    ('The service was quick, but the food was bland.', '{Italian, Mixed}', 3, 'Quick Service', 5, 1),
    ('The ambiance was great, but the meal was just okay.', '{Mediterranean, Mixed}', 3, 'Nice Ambiance', 6, 7),
    ('The ambiance is lovely, perfect for a date night.', '{Mediterranean, Romantic}', 4, 'Perfect Date Spot', 7, 5),
    ('Had a great experience, staff was very friendly!', '{American, Service}', 4, 'Friendly Staff', 8, 4),
    ('Fabulous brunch spot! The pancakes are to die for.', '{American, Brunch}', 4, 'Brunch Delight', 9, 12),
    ('A hidden gem with fantastic desserts!', '{Mediterranean, Favorite}', 4, 'Dessert Heaven', 10, 3),
    ('Absolutely loved the vegan tacos! Will come back.', '{Vegan, Favorite}', 5, 'Best Vegan Tacos', 1, 3),
    ('The food was amazing, and the staff was superb!', '{Italian, Favorite}', 5, 'Amazing Experience', 2, 1),
    ('This place has the best pizza in town!', '{Italian, Favorite}', 5, 'Best Pizza Ever', 3, 4),
    ('The sushi is always fresh and beautifully presented!', '{Japanese, Favorite}', 5, 'Fresh Sushi', 4, 12),
    ('Perfect place for family gatherings!', '{American, Family}', 5, 'Family Friendly', 5, 4);
