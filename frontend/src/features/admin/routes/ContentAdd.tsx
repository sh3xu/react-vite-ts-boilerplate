import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ContentWrapper from "@/components/Layout/AdminLayout/ContentWrapper";
import { Button } from "@/components/Elements";
import { useCreateContent } from "../hooks/useContent";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export const ContentAdd = () => {
    const navigate = useNavigate();
    const createContentMutation = useCreateContent();

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        content: "",
    });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};

        if (!formData.name.trim()) {
            newErrors.name = "Name is required";
        }
        if (!formData.description.trim()) {
            newErrors.description = "Description is required";
        }
        if (!formData.content.trim()) {
            newErrors.content = "Content is required";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        try {
            await createContentMutation.mutateAsync(formData);
            navigate("/admin/content");
        } catch (error) {
            // Error is handled in hook
        }
    };

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: "" }));
        }
    };

    const handleEditorChange = (_event: any, editor: any) => {
        const data = editor.getData();
        setFormData((prev) => ({ ...prev, content: data }));
        if (errors.content) {
            setErrors((prev) => ({ ...prev, content: "" }));
        }
    };

    return (
        <ContentWrapper title="Add Content">
            <div className="content-add">
                {/* Header Section */}
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <div className="d-flex align-items-center gap-3">
                        <button
                            className="btn btn-outline-secondary btn-sm"
                            onClick={() => navigate("/admin/content")}
                        >
                            <i className="fa-solid fa-arrow-left"></i>
                        </button>
                        <h2 className="text-white f-24 semi-bold mb-0">Add New Content</h2>
                    </div>
                </div>

                {/* Form Card */}
                <div className="cardbg rounded-lg p-4">
                    <form onSubmit={handleSubmit}>
                        {/* Name Field */}
                        <div className="mb-4">
                            <label className="form-label text-white">
                                Name <span className="text-danger">*</span>
                            </label>
                            <input
                                type="text"
                                className={`form-control ${errors.name ? "is-invalid" : ""}`}
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                placeholder="Enter content name"
                            />
                            {errors.name && (
                                <div className="invalid-feedback">{errors.name}</div>
                            )}
                        </div>

                        {/* Description Field */}
                        <div className="mb-4">
                            <label className="form-label text-white">
                                Description <span className="text-danger">*</span>
                            </label>
                            <textarea
                                className={`form-control ${errors.description ? "is-invalid" : ""}`}
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                placeholder="Enter content description"
                                rows={3}
                            />
                            {errors.description && (
                                <div className="invalid-feedback">{errors.description}</div>
                            )}
                        </div>

                        {/* Content Field with CKEditor */}
                        <div className="mb-4">
                            <label className="form-label text-white">
                                Content <span className="text-danger">*</span>
                            </label>
                            <div
                                className={`ckeditor-wrapper ${errors.content ? "is-invalid-editor" : ""}`}
                            >
                                <CKEditor
                                    editor={ClassicEditor}
                                    data={formData.content}
                                    onChange={handleEditorChange}
                                    config={{
                                        placeholder: "Enter your content here...",
                                        toolbar: [
                                            "heading",
                                            "|",
                                            "bold",
                                            "italic",
                                            "link",
                                            "bulletedList",
                                            "numberedList",
                                            "|",
                                            "blockQuote",
                                            "insertTable",
                                            "|",
                                            "undo",
                                            "redo",
                                        ],
                                    }}
                                />
                            </div>
                            {errors.content && (
                                <div className="text-danger small mt-1">{errors.content}</div>
                            )}
                        </div>

                        {/* Action Buttons */}
                        <div className="d-flex gap-3 justify-content-end mt-4">
                            <Button
                                variant="outline"
                                type="button"
                                onClick={() => navigate("/admin/content")}
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="primary"
                                type="submit"
                                isLoading={createContentMutation.isLoading}
                            >
                                Create Content
                            </Button>
                        </div>
                    </form>
                </div>
            </div>

            {/* CKEditor Custom Styles */}
            <style>{`
        .ck-editor__editable {
          min-height: 300px;
          background: var(--bs-body-bg) !important;
          color: #fff !important;
        }
        .ck.ck-editor__main>.ck-editor__editable:not(.ck-focused) {
          border-color: var(--bs-border-color) !important;
        }
        .ck.ck-toolbar {
          background: var(--bs-secondary-bg) !important;
          border-color: var(--bs-border-color) !important;
        }
        .ck.ck-button:not(.ck-disabled):hover {
          background: var(--bs-tertiary-bg) !important;
        }
        .is-invalid-editor .ck-editor__editable {
          border-color: var(--bs-danger) !important;
        }
      `}</style>
        </ContentWrapper>
    );
};
