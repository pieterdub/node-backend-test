import pool from '../config/db.js';

export const getResourceLineageService = async (id) => {
    const client = await pool.connect();
    try {
        const query = `
          WITH RECURSIVE lineage AS (
            SELECT id, parentId FROM singleresource WHERE id = $1
            UNION ALL
            SELECT sr.id, sr.parentId FROM singleresource sr
            INNER JOIN lineage l ON sr.id = l.parentId
          )
          SELECT id FROM lineage WHERE id != $1 ORDER BY id ASC;
        `;
        const result = await client.query(query, [id]);
        return result.rows.map(row => row.id);
      } finally {
        client.release();
      }
};