SELECT
    properties.id,
    properties.title,
    cost_per_night,
    start_date,
    AVG(rating)
FROM
    users
    JOIN reservations ON users.id = guest_id
    JOIN properties ON properties.id = property_id
    JOIN property_reviews ON users.id = property_reviews.guest_id
WHERE
    users.id = 1
GROUP BY
    users.id,
    properties.id,
    start_date
ORDER BY
    start_date
LIMIT
    10