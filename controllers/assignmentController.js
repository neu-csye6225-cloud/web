import * as assignmentService from "../services/assignmentService.js";
import { getCredentials } from "../services/auth.js";
//get all
import logger from "../logger.cjs"

export const getAllAssignments = async (req, res) => {
  try {
    // Fetch all assignments
    const assignments = await assignmentService.getAllAssignments();

    // Return a 200 OK response with the assignments
    logger.info("Retrieved all the assignments")
    res.status(200).json(assignments);
  } catch (error) {
    // Handle any other errors and return a 403 Forbidden or 500 Internal Server Error response
    if (error.message === "Forbidden") {
      res.status(403).json({ error: "Forbidden" });
    } else {
      res.status(400).json({ error: error.message });
    }
  }
};

export const createAssignment = async (req, res) => {
  const assignmentData = req.body;

  try {
    assignmentData.createdBy = getCredentials(req)[0];

    // Create the assignment
    const assignment = await assignmentService.createAssignment(assignmentData);
    logger.info("Created the assignments in DB")
    // Return a 201 Created response with the created assignment
    res.status(201).json(assignment);
  } catch (error) {
    // Handle any other errors and return a 500 Internal Server Error response
    logger.error("Assignments are not created in DB")
    res.status(400).json({ error: error.message });
  }
};



export const getAssignmentById = async (req, res) => {
  try {
    const { id } = req.params;
    const assignment = await assignmentService.getAssignmentById(id);

    if (!assignment) {
      // If assignment is not found, return a 404 Not Found response
      res.status(404).json({ error: "Assignment not found" });
      logger.error("Assignment is not found")
      return;
    }

    // If the assignment was successfully retrieved and the user is authorized, return a 200 OK response with the assignment data
    res.status(200).json(assignment);
    logger.info("Retrieved Assignment")
  } catch (error) {
    // Handle any other errors and return a 500 Internal Server Error response
    res.status(400).json({ error: error.message });
  }
};

export const deleteAssignment = async (req, res) => {
  const { id } = req.params;

  const email = getCredentials(req)[0];
  try {
    if (await assignmentService.deleteAssignmentById(id, email)) {
      res.status(204).send();
      logger.info("Assignment Deleted");
    } else {
      res.status(403).send();
      logger.warn("ERROR! Assignment not found");
    }
    // If the assignment was successfully deleted, return a 204 No Content response
  } catch (error) {
    // Handle any other errors and return a 500 Internal Server Error response
    res.status(400).json({ error: error.message });
  }
};

export const updateAssignment = async (req, res) => {
  const { id } = req.params;
  const assignmentData = req.body;
  const email = getCredentials(req)[0];
  try {
    if (await assignmentService.updateAssignmentById(id, assignmentData, email)) {
      res.status(204).send();
      logger.info("Assignment updated")
    } else {
      res.status(403).send();
      logger.info("Assignment not updated")
    }
  } catch (error) {
    // Handle any other errors and return a 500 Internal Server Error response
    res.status(400).json({ error: error.message });
  }
};

export const createSubmission = async (req,res) => {
  const ass_id = req.params.id;
  const sub_url = req.body;
  try{
    const assignment = await assignmentService.createSubmission(ass_id,sub_url);
    res.status(201).json(assignment);
  }
  catch(error){
    res.status(400).json({error:error.message})
  }
};