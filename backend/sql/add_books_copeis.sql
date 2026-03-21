
-- This SQL script is designed to populate the "Books" table with 200 randomly generated records. Each record includes a title, description, price, author_id (which should correspond to existing authors in the Authors table), ISBN, publication year, language, publisher, page count, cover image URL, edition information, and timestamps for creation and update.
DO $$
DECLARE
    i INT;
    random_author_id INT;
    random_year INT;
    random_price DECIMAL(10,2);
BEGIN
    -- Loop to generate 200 records
    FOR i IN 1..200 LOOP
        
        -- Generate a random author_id between 1 and 100
        -- Note: Ensure these IDs exist in the Authors table to avoid Foreign Key errors
        random_author_id := floor(random() * 100 + 1)::int;
        
        -- Generate a random publication year between 1900 and 2024
        random_year := floor(random() * (2024 - 1900 + 1) + 1900)::int;
        
        -- Generate a random price between 10.00 and 150.00
        random_price := (random() * (150 - 10) + 10)::numeric(10,2);

        INSERT INTO "Books" (
            title, 
            description, 
            price, 
            author_id, 
            isbn, 
            publication_year, 
            language, 
            publisher, 
            pages, 
            cover_image_url, 
            edition, 
            "createdAt", 
            "updatedAt"
        ) 
        VALUES (
            'Exploring Science Vol. ' || i,                 -- Dynamic title
            'Automated description for book number ' || i,  -- Description
            random_price,                                   -- Random price
            random_author_id,                               -- Random author FK
            '978-' || floor(random()*10)::int || '-' || (100000 + i), -- Unique ISBN format
            random_year,                                    -- Random year
            CASE WHEN i % 2 = 0 THEN 'English' ELSE 'Arabic' END, -- Alternate languages
            'Academic Press ' || (i % 5 + 1),               -- Publisher name
            (120 + (i * 3)),                                -- Dynamic page count
            'https://images.library.com/b' || i || '.jpg',  -- Mock image URL
            'Revised Edition ' || (i % 3 + 1),              -- Edition info
            NOW(),                                          -- Timestamp
            NOW()                                           -- Timestamp
        );
    END LOOP;
END $$;



-- This SQL script creates multiple copies of each book in the "Books" table and populates the "book_copies" table. Each book will have 3 copies with randomly assigned statuses (AVAILABLE or BORROWED) to simulate a realistic library inventory. The script also generates unique barcodes for each copy and includes shelf location and notes for internal use. The ON CONFLICT clause ensures that if the script is run multiple times, it won't create duplicate entries based on the unique barcode constraint.
DO $$
DECLARE
    book_record RECORD;
    i INT;
    copy_status TEXT;
BEGIN
    -- Loop through all existing books in the database
    FOR book_record IN SELECT id FROM "Books" LOOP
        
        -- Create 3 copies for each book found
        FOR i IN 1..3 LOOP
            
            -- Randomly assign status to make the data look realistic
            -- 80% chance of being AVAILABLE, 20% chance of being BORROWED
            IF random() < 0.8 THEN
                copy_status := 'AVAILABLE';
            ELSE
                copy_status := 'BORROWED';
            END IF;

            INSERT INTO "book_copies" (
                book_id, 
                status, 
                "shelfLocation", 
                notes, 
                barcode, 
                "createdAt", 
                "updatedAt"
            ) 
            VALUES (
                book_record.id,                               -- Link to the book
                copy_status::"enum_book_copies_status",       -- Casting to your ENUM type
                'Floor-' || (1 + (book_record.id % 3)) || '/Sec-' || chr(65 + (i % 4)), -- e.g., Floor-1/Sec-B
                'Bulk generated copy ' || i,                 -- Internal notes
                'BC-' || book_record.id || '-' || LPAD(i::text, 3, '0'), -- Unique Barcode: BC-[BookID]-001
                NOW(), 
                NOW()
            )
            -- Prevent errors if you run the script twice
            ON CONFLICT (barcode) DO NOTHING; 

        END LOOP;
    END LOOP;
END $$;