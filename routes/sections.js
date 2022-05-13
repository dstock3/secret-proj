var express = require('express');
var router = express.Router();

// GET request for creating a section. 
router.get('/section/create', section_controller.section_create_get);

//POST request for creating section.
router.post('/section/create', section_controller.section_create_post);

// GET request to delete section.
router.get('/section/:id/delete', section_controller.section_delete_get);

// POST request to delete section.
router.post('/section/:id/delete', section_controller.section_delete_post);

// GET request to update section.
router.get('/section/:id/update', section_controller.section_update_get);

// POST request to update section.
router.post('/section/:id/update', section_controller.section_update_post);

// GET request for one section.
router.get('/section/:id', section_controller.section_detail);

// GET request for list of all sections.
router.get('/sections', section_controller.section_list);

module.exports = router;