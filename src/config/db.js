import pkg from 'pg';
import dotenv from 'dotenv';

const { Pool } = pkg;

dotenv.config();

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
});

export const testDbConnection = async () => {
    try {
        const result = await pool.query('SELECT NOW()');
        console.log(`✅ PostgreSQL connected successfully at: ${result.rows[0].now}`);
    } catch (error) {
        console.error('❌ PostgreSQL connection failed:', error);
    }
};

export const checkDb = async () => {
    const result = await pool.query('SELECT current_database();');
    console.log(`Connected to DB: ${result.rows[0].current_database}`);
};

export default pool;