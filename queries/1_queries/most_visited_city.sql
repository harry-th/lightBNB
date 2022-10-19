SELECT
    city,
    COUNT(reservations. *) AS numOfRes
FROM
    properties
    JOIN reservations ON property_id = properties.id
GROUP BY
    city
ORDER BY
    numOfRes DESC