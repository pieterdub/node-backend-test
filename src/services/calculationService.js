import pool from '../config/db.js';
import * as math from 'mathjs';

export const evaluateCalculationService = async (id) => {
    const calcResult = await pool.query('SELECT expression FROM calculations WHERE id = $1', [id]);
    if (calcResult.rows.length === 0) throw new Error('Calculation not found');

    let expression = calcResult.rows[0].expression;
    const match = expression.match(/\{.*?\}/);
    if (!match) throw new Error('Invalid expression format');

    const variableJSON = JSON.parse(match[0]);
    const variableResult = await pool.query('SELECT value FROM variables WHERE id = $1', [variableJSON.id]);
    if (variableResult.rows.length === 0) throw new Error('Variable not found');

    const variableValue = variableResult.rows[0].value;
    expression = expression.replace(match[0], variableValue);

    const calculatedValue = math.evaluate(expression);
    await pool.query('UPDATE calculations SET calculated_value = $1 WHERE id = $2', [calculatedValue, id]);

    return calculatedValue;
};

export async function recalculate(variableId) {
    try {
      // Get the new value of the variable
      const variableRes = await pool.query(
        'SELECT value FROM variables WHERE id = $1',
        [variableId]
      );
  
      if (variableRes.rows.length === 0) {
        throw new Error(`Variable with id ${variableId} not found.`);
      }
  
      const newValue = variableRes.rows[0].value;
  
      // Find all calculations that reference this variable
      const calcRes = await pool.query(
        'SELECT id, expression FROM calculations'
      );
  
      const updatedCalculations = [];
  
      for (let row of calcRes.rows) {
        const match = row.expression.match(/\{\s*"id"\s*:\s*(\d+),[^}]+\}/);
        if (match && parseInt(match[1]) === variableId) {
          // Replace variable reference with new value

          const updatedExpression = row.expression.replace(match[0], newValue);
          
          // Evaluate the new expression
          const calculatedValue = math.evaluate(updatedExpression);
          
          // Update the database
          await pool.query(
            'UPDATE calculations SET calculated_value = $1 WHERE id = $2',
            [calculatedValue, row.id]
          );
  
          updatedCalculations.push({ id: row.id, new_value: calculatedValue });
        }
      }
  
      return updatedCalculations;
    } catch (error) {
      console.error('Error recalculating expressions:', error);
      throw error;
    }
  }