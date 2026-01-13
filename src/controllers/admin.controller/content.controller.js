const httpStatus = require("http-status");
const catchAsync = require("../../utils/catchAsync");
const { paginate } = require("../../services/admin.service");
const { Content } = require("../../models/content.model");

// Create new content
const createContent = catchAsync(async (req, res) => {
    const { name, description, content } = req.body;
    const data = await Content.create({ name, description, content });
    res.status(httpStatus.CREATED).send({
        success: true,
        message: "Content created successfully",
        data
    });
});

// Get all content with pagination and search
const getContent = catchAsync(async (req, res) => {
    const { page = 1, limit = 10, search } = req.query;

    try {
        let query = { isDeleted: false };
        if (search) {
            query = {
                ...query,
                $or: [
                    { name: { $regex: search, $options: 'i' } },
                    { description: { $regex: search, $options: 'i' } }
                ]
            };
        }
        const { data, pagination } = await paginate(Content, query, page, limit);

        res.status(httpStatus.OK).send({
            success: true,
            message: search ? "Filtered Content Fetched Successfully" : "All Content Fetched Successfully",
            data,
            pagination
        });
    } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
            success: false,
            message: "An error occurred while fetching the Content",
            error: error.message
        });
    }
});

// Get single content by ID
const getContentById = catchAsync(async (req, res) => {
    const { id } = req.params;
    const data = await Content.findOne({ _id: id, isDeleted: false });

    if (!data) {
        return res.status(httpStatus.NOT_FOUND).send({
            success: false,
            message: "Content not found"
        });
    }

    res.status(httpStatus.OK).send({
        success: true,
        message: "Content fetched successfully",
        data
    });
});

// Update content
const editContent = catchAsync(async (req, res) => {
    const { name, description, content } = req.body;
    const { id } = req.params;

    const existingContent = await Content.findOne({ _id: id, isDeleted: false });

    if (!existingContent) {
        return res.status(httpStatus.NOT_FOUND).send({
            success: false,
            message: "Content not found"
        });
    }

    const data = await Content.findByIdAndUpdate(id, {
        $set: { name, description, content }
    }, { new: true });

    res.status(httpStatus.OK).send({
        success: true,
        message: "Content updated successfully",
        data
    });
});

// Soft delete content
const deleteContent = catchAsync(async (req, res) => {
    const { id } = req.query;

    if (!id) {
        return res.status(httpStatus.BAD_REQUEST).send({
            success: false,
            message: "Content ID is required"
        });
    }

    const existingContent = await Content.findOne({ _id: id, isDeleted: false });

    if (!existingContent) {
        return res.status(httpStatus.NOT_FOUND).send({
            success: false,
            message: "Content not found"
        });
    }

    await Content.findByIdAndUpdate(id, { $set: { isDeleted: true } });

    return res.status(httpStatus.OK).send({
        success: true,
        message: "Content deleted successfully"
    });
});

module.exports = { createContent, getContent, getContentById, editContent, deleteContent };