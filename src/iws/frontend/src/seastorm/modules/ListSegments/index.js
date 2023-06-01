import React, { useCallback, useEffect } from 'react'
import { Accordion, Badge, Button, Col, Container, Form, Pagination, Row, Spinner } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useSearchParams } from 'react-router-dom'
import AsyncSelect from 'react-select/async';

import { useGetSegmentsQuery } from '../../../services/seastorm'
import SegmentEntry from './segment'

export default function ListSegments() {
    const { data, error, isLoading, isError, isSuccess } = useGetSegmentsQuery('?page_size=100');

    return (
        <Container>
            <Row>
                <Col>
                    <div className='d-flex align-items-center justify-content-between'>
                        <h1 className=''>Explore Coastal Segments {isSuccess && <Badge pill>{data.total}</Badge>}</h1>
                    </div>
                    <div className='mt-3'>
                        {isLoading && <Spinner animation="border" role="status" />}
                        {isError && <p className='text-danger'>{error ? error.error.message : 'Error'}</p>}
                        <Row md={3}>
                            {isSuccess && data.coastal_segments.map(obj => <Col key={obj.id}><SegmentEntry {...obj} /></Col>)}
                        </Row>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}
