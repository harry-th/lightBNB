INSERT INTO
    users (NAME, email, password)
VALUES
    (
        'harry',
        'harry@h.com',
        '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'
    ),
    (
        'harry',
        'harry@h.com',
        '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'
    ),
    (
        'harry',
        'harry@h.com',
        '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'
    );
INSERT INTO
    properties(
        owner_id,
        title,
        description,
        thumbnail_photo_url,
        cover_photo_url,
        cost_per_night,
        parking_spaces,
        number_of_bathrooms,
        number_of_bedrooms,
        country,
        street,
        city,
        province,
        post_code,
        active
    ) VALUES (1,'grim bull','what a grim bull','imgur.com','imgur.com',0,0,0,0,'grimgow','grimbus','grimtown','groim','123grim',FALSE
    ),
    ( 2, 'grim fool', 'what a grim fool', 'imgur.com', 'imgur.com', 0, 0, 0, 0, 'grimgow', 'grumbly', 'grimtown', 'groim', '123grim', FALSE
    ),
    ( 3, 'grim gull', 'what a grim gull', 'imgur.com', 'imgur.com', 0, 0, 0, 0, 'grimgow', 'fool', 'grimtown', 'groim', '123grim', FALSE
    );
INSERT INTO
    reservations (start_date, end_date, property_id, guest_id)
VALUES
    ('2018-09-11', '2018-09-26', 1, 1),
    ('2019-01-04', '2019-02-01', 2, 2),
    ('2021-10-01', '2021-10-14', 3, 3);
INSERT INTO
    property_reviews (
        guest_id,
        property_id,
        reservation_id,
        rating,
        message
    )
VALUES
(1, 2, 1, 5, 'fool is grim'),
(1, 2, 1, 5, 'fool is grim'),
(1, 2, 1, 5, 'fool is grim');

