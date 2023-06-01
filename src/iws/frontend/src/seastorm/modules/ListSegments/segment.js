import moment from "moment"
import React from "react"
import { Badge, Button, Card, Ratio } from "react-bootstrap"
import { Link } from "react-router-dom"

export default function SegmentEntry({ id, code, subregion, sea }) {
    return (
        <Card className="mb-3">
            <Card.Body className="">
                <h3>{code} - {subregion}</h3>
                <p>{sea.label}</p>
                <Button className="mt-4" as={Link} to={`/sea_storm_atlas/segments/${id}/`}>Open</Button>
            </Card.Body>
        </Card>
    )
}