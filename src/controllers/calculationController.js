import { evaluateCalculationService, recalculate } from '../services/calculationService.js';

export const evaluateCalculation = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await evaluateCalculationService(parseInt(id));
        res.json({ calculatedValue: result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const recalculateExpressions = async (req, res) => {
    try {
        const { variableId } = req.params;
        const result = await recalculate(parseInt(variableId));
        res.json({ calculatedValue: result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
