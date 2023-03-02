import React from "react"
import { Badge, Button, Card, Container, Spinner, Table } from "react-bootstrap";
import { Link, useParams, useSearchParams } from "react-router-dom";
import Swal from 'sweetalert2';
import { useAddDocumentMutation, useDeleteDocumentMutation, useDeleteEventMutation, useGetDocumentsQuery } from "../../../services/seastorm";
import { usePagination } from '../../../libs/usePagination';
import { useSelector } from "react-redux";
import { authSelectors } from "../../store/auth.slice";
import AddDocument from "../../../components/AddDocument";


export default function ListDocuments() {
    const { id, effectId } = useParams()
    let [searchParams, setSearchParams] = useSearchParams();
    const page = parseInt(searchParams.get('page')) || 1

    const isAuthenticated = useSelector(authSelectors.isAuthenticated)

    const { data, isLoading, isError, isSuccess } = useGetDocumentsQuery(`?page=${page}&filter{object_id}=${effectId}&page_size=30`);
    const [add] = useAddDocumentMutation();

    const pagination = usePagination({
        totPages: (data && Math.ceil(data.total / data.page_size)) || 1,
        page,
        loadPage: p => setSearchParams(`page=${p}`)
    })

    const [remove, { isLoading: isRemoving }] = useDeleteDocumentMutation();
    async function runRemove(id) {
        const res = await Swal.fire({
            title: 'Are you sure?',
            text: "This will delete the association between document and this storm effect",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Confirm'
        })

        if (res.isConfirmed) {
            const response = await remove({ id })
        }

    }

    async function addDocument(document) {
        console.log(document, effectId);
        const res = await add({ document, effect: effectId });
        console.log(res);
    }

    return (
        <Container>
            <div>
                <div className="d-flex align-items-center justify-content-between mb-2">
                    <h2>Documents {isSuccess && <Badge pill>{data.total}</Badge>}</h2>
                    <div className="d-flex align-items-center">
                        <Button as={Link} variant="default" to={`/sea_storm_atlas/events/${id}/`}>Back</Button>
                        {isAuthenticated && <Button as={Link} variant="primary" to={`/catalogue/#/upload/document`} target="_blank">Upload</Button>}
                    </div>
                </div>
                {isAuthenticated && (
                    <AddDocument add={addDocument} />
                )}
                {isLoading && <Spinner animation="border" />}
                {isError && <p className="text-danger">{data.error.message}</p>}
                {isSuccess && (
                    <>
                    {!data.total && <p>No documents found</p>}
                    {data.total ? data.document_resource_links.map(d => (
                        <Card key={d.id} className="mb-1">
                            <Card.Body className="d-flex justify-content-between align-items-center">
                                <span>{d.document.title}</span>
                                <div>
                                    <Button className="ms-2" download target="_blank" href={d.document.download_url}><i className="fa fa-download" /></Button>
                                    {isAuthenticated && <Button className="ms-1" variant="danger" disabled={isRemoving} onClick={() => runRemove(d.id)}><i className="fa fa-trash" /></Button>}
                                </div>
                            </Card.Body>
                        </Card>
                    )) : null}
                        {pagination}
                    </>
                )}
            </div>
        </Container>
    )
}