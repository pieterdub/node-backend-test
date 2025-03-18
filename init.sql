-- Create tables if they do not exist
CREATE TABLE IF NOT EXISTS singleresource (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    parentId INTEGER NULL
);

CREATE TABLE IF NOT EXISTS variables (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    value FLOAT NOT NULL
);

CREATE TABLE IF NOT EXISTS calculations (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    expression TEXT NOT NULL,
    calculated_value FLOAT
);

-- Insert sample data
INSERT INTO singleresource (name, parentId) VALUES
    ('Resource A', NULL),
    ('Resource B', 1),
    ('Resource C', 2)
ON CONFLICT DO NOTHING;

INSERT INTO variables (name, value) VALUES
    ('variable1', 2.5),
    ('variable2', 5.0)
ON CONFLICT DO NOTHING;

INSERT INTO calculations (name, expression) VALUES
    ('Calc1', '{"id": 1, "name": "variable1"} + 10 * 2'),
    ('Calc2', '{"id": 2, "name": "variable2"} / 2')
ON CONFLICT DO NOTHING;
