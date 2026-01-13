import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Pagination } from "@mui/material";
import ContentWrapper from "@/components/Layout/AdminLayout/ContentWrapper";
import { Button } from "@/components/Elements";
import { Table } from "@/components/Elements/Table/Table";
import { Spinner } from "@/components/Elements/Spinner";
import { useContents, useDeleteContent } from "../hooks/useContent";
import { Content } from "../api/content";

export const ContentList = () => {
    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [searchInput, setSearchInput] = useState("");
    const [deletingId, setDeletingId] = useState<string | null>(null);

    // React Query hooks
    const { data, isLoading, isError } = useContents({ page, limit: 10, search });
    const deleteContentMutation = useDeleteContent();
    console.log(data,'data')
    const contents = data?.data?.data || [];
    const pagination = data?.data?.pagination || { page: 1, limit: 10, total: 0, totalPages: 0 };

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSearch(searchInput);
        setPage(1);
    };

    const handlePageChange = (_: React.ChangeEvent<unknown>, newPage: number) => {
        setPage(newPage);
    };

    const handleDelete = async (id: string) => {
        if (window.confirm("Are you sure you want to delete this content?")) {
            setDeletingId(id);
            try {
                await deleteContentMutation.mutateAsync(id);
            } finally {
                setDeletingId(null);
            }
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    // Table columns configuration
    const columns = [
        { header: "Sr. No.", field: "srNo" },
        { header: "Name", field: "name" },
        { header: "Description", field: "description" },
        { header: "Created At", field: "createdAt" },
        { header: "Actions", field: "actions" },
    ];

    // Transform content data for table rows
    const rows = contents.map((content: Content, index: number) => ({
        srNo: (pagination.page - 1) * 10 + index + 1,
        name: content.name,
        description:
            content.description.length > 50
                ? `${content.description.substring(0, 50)}...`
                : content.description,
        createdAt: formatDate(content.createdAt),
        actions: (
            <div className="action-buttons d-flex gap-2 align-items-center">
                <button
                    className="view-btn bg-transparent p-0 border-0"
                    onClick={() => navigate(`/admin/content/view/${content._id}`)}
                    title="View"
                >
                    <i className="fa-solid fa-eye lighttxt"></i>
                </button>
                <button
                    className="edit-btn bg-transparent p-0 border-0"
                    onClick={() => navigate(`/admin/content/edit/${content._id}`)}
                    title="Edit"
                >
                    <i className="fa-solid fa-pen lighttxt"></i>
                </button>
                <button
                    className="delete-btn bg-transparent p-0 border-0"
                    onClick={() => handleDelete(content._id)}
                    disabled={deleteContentMutation.isLoading && deletingId === content._id}
                    title="Delete"
                >
                    {deleteContentMutation.isLoading && deletingId === content._id ? (
                        <Spinner size="sm" />
                    ) : (
                        <i className="fa-solid fa-trash lighttxt"></i>
                    )}
                </button>
            </div>
        ),
    }));

    return (
        <ContentWrapper title="Content Management">
            <div className="content-management">
                {/* Header Section */}
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2 className="text-white f-24 semi-bold mb-0">Content Management</h2>
                    <Button
                        variant="primary"
                        onClick={() => navigate("/admin/content/add")}
                        startIcon={<i className="fa-solid fa-plus"></i>}
                    >
                        Add New Content
                    </Button>
                </div>

                {/* Content Table Card */}
                <div className="admin-table table-card cardbg rounded-lg overflow-hidden">
                    {/* Table Header with Search */}
                    <div className="table-header border-btm p-3 d-flex justify-content-between align-items-center">
                        <h3 className="text-white f-16 font-medium mb-0">All Content</h3>
                        <form onSubmit={handleSearchSubmit} className="d-flex gap-2">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search content..."
                                value={searchInput}
                                onChange={(e) => setSearchInput(e.target.value)}
                                style={{ width: "250px" }}
                            />
                            <Button type="submit" variant="primary">
                                Search
                            </Button>
                        </form>
                    </div>

                    {/* Table Content */}
                    <div className="admin-user">
                        {isLoading ? (
                            <div className="d-flex justify-content-center align-items-center p-5">
                                <Spinner size="lg" />
                            </div>
                        ) : isError ? (
                            <div className="text-center p-5 text-white">
                                <i className="fa-solid fa-exclamation-circle fa-3x mb-3 text-danger"></i>
                                <p className="lighttxt">Failed to load content</p>
                            </div>
                        ) : rows.length === 0 ? (
                            <div className="text-center p-5 text-white">
                                <i className="fa-solid fa-inbox fa-3x mb-3 lighttxt"></i>
                                <p className="lighttxt">No content found</p>
                            </div>
                        ) : (
                            <>
                                <Table pagination={false} columns={columns} rows={rows} />
                                {/* Custom Pagination */}
                                <div className="d-flex justify-content-between pagination align-items-center p-3 border-top">
                                    <span className="lighttxt">
                                        Showing {(pagination.page - 1) * 10 + 1} to{" "}
                                        {Math.min(pagination.page * 10, pagination.total)} of{" "}
                                        {pagination.total} entries
                                    </span>
                                    <Pagination
                                        color="primary"
                                        count={pagination.totalPages}
                                        page={pagination.page}
                                        onChange={handlePageChange}
                                        variant="outlined"
                                        shape="rounded"
                                    />
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </ContentWrapper>
    );
};
