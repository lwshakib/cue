import { Request, Response } from "express";
import { postgresService } from "../services/postgres.services.js";
import logger from "../logger/winston.logger.js";

export const createWorkflow = async (req: any, res: Response) => {
  const userId = req.user.id;
  const baseName = typeof req.body?.name === "string" && req.body.name.trim()
    ? req.body.name.trim()
    : "My Workflow";

  try {
    const workflow = await postgresService.createWorkflowWithAutoName(userId, baseName, {});
    res.status(201).json({
      success: true,
      workflow,
    });
  } catch (error: any) {
    logger.error(`[WorkflowController] Create workflow failed: ${error.message}`);
    res.status(500).json({ success: false, message: "Failed to create workflow." });
  }
};

export const listWorkflows = async (req: any, res: Response) => {
  const userId = req.user.id;
  try {
    const workflows = await postgresService.findWorkflowsByUserId(userId);
    res.json({
      success: true,
      workflows,
    });
  } catch (error: any) {
    logger.error(`[WorkflowController] List workflows failed: ${error.message}`);
    res.status(500).json({ success: false, message: "Failed to load workflows." });
  }
};

export const deleteWorkflow = async (req: any, res: Response) => {
  const userId = req.user.id;
  const workflowId = req.params.id;

  try {
    const deleted = await postgresService.deleteWorkflowForUser(workflowId, userId);
    if (!deleted) {
      return res.status(404).json({ success: false, message: "Workflow not found." });
    }

    res.json({
      success: true,
      message: "Workflow deleted successfully.",
    });
  } catch (error: any) {
    logger.error(`[WorkflowController] Delete workflow failed: ${error.message}`);
    res.status(500).json({ success: false, message: "Failed to delete workflow." });
  }
};
