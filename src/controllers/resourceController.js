import { getResourceLineageService } from '../services/resourceService.js';

export const getResourceLineage = async (req, res) => {
    try {
        const { id } = req.params;
        const lineage = await getResourceLineageService(parseInt(id));
        res.json({ lineage });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
