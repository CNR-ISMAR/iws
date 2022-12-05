import React, { useEffect, useRef, useState } from 'react';
import { Button, Container, Form, Alert } from 'react-bootstrap';
import { Formik } from 'formik';
import { useGetEventQuery, useLazyGetOriginsQuery, useUpdateEventMutation } from '../../../services/seastorm';
import FormTextField from '../../../components/FormTextField';
import SelectField from '../../../components/SelectField';
import CheckField from '../../../components/CheckField';
import { Link, useNavigate, useParams } from 'react-router-dom';
import DateField from '../../../components/DateField';

const FORM_VALIDATION = values => {
    const errors = {}
    if (values && !values.date_start) {
        errors.date_start = 'Required'
    }
    if (values && values.origins.length === 0) {
        errors.origins = 'Required'
    }
    return errors
}


export default function EditEvent() {
    const { id } = useParams()
    const { data, isSuccess } = useGetEventQuery({ id, params: '?include[]=origins' });
    const [update, { isLoading, isError, error }] = useUpdateEventMutation();
    const navigate = useNavigate();

    const [searchOrigins] = useLazyGetOriginsQuery();
    const loadOrigins = async (search) => {
        const result = await searchOrigins(search ? `?filter{name.startswith}=${search}&page_size=250` : '?page_size=250');
        return result.data.origins;
    }

    async function runUpdate(values, helpers) {
        try {
            console.log(values)
            const result = await update({ 
                ...values,
                origins: values.origins.map(o => o.id)
            })
            console.log(result);
            if (result) {
                navigate(`/sea_storm_atlas/events/${result.data.storm_event_entry.id}/`);
            }
        } catch(e) {
            console.error(e)
        }
    }

    return (
        <Container>
            <h1 className=''>Edit Event</h1>

            {error && error.data && (
                <Alert variant="danger" animation={null} show transition={null}>
                    <h5 className='fw-bold'>{error.data.code}</h5>
                    <div className="ps-5"></div>
                </Alert>
            )}
            {isSuccess && (
                <Formik
                    initialValues={{
                        ...data.storm_event_entry,
                        coastalsegment: data.storm_event_entry.coastalsegment_id,
                    }}
                    onSubmit={runUpdate}
                    validate={FORM_VALIDATION}
                >
                    {({ handleSubmit, isValid }) => (
                    <Form noValidate onSubmit={handleSubmit}>
                        <FormTextField 
                            name="name"
                            label="Name"
                        />
                        <FormTextField 
                            name="description"
                            label="Description"
                            controlAs="textarea"
                        />
                        <DateField 
                            name="date_start"
                            label="Date start"
                        />
                        <DateField 
                            name="date_end"
                            label="Date end"
                        />
                        <CheckField 
                            name="is_aggregated"
                            label="Is aggregated"
                            type="checkbox"
                        />
                        <SelectField
                            name="origins"
                            label="Origins"
                            defaultOptions
                            loadOptions={loadOrigins}
                            getOptionLabel={v => `${v.name} - ${v.description}`}
                            getOptionValue={v => v.id}
                            isMulti
                        />
                        
                        <div className="mt-5">
                            <Button type='submit' disabled={isLoading || !isValid }>Edit</Button>
                            <Button as={Link} className="ms-1" to={`/sea_storm_atlas/events/${id}/`} variant="default">Back</Button>
                        </div>
                    </Form>
                    )}
                </Formik>
            )}
        </Container>
    )
}
