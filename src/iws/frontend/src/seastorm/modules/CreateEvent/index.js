import React, { useEffect, useRef, useState } from 'react';
import { Button, Container, Form, Alert } from 'react-bootstrap';
import { Formik } from 'formik';
import { useCreateEventMutation, useLazyGetOriginsQuery } from '../../../services/seastorm';
import FormTextField from '../../../components/FormTextField';
import SelectField from '../../../components/SelectField';
import CheckField from '../../../components/CheckField';
import { useNavigate, useParams } from 'react-router-dom';
import DateField from '../../../components/DateField';

const FORM_VALIDATION = values => {
    const errors = {}
    console.log(values);
    console.log('here');
    if (values && !values.date_start) {
        errors.date_start = 'Required'
    }
    if (values && values.origins.length === 0) {
        errors.origins = 'Required'
    }
    return errors
}


export default function CreateEvent() {
    const [create, { isLoading, isSuccess, isError, reset, error, data }] = useCreateEventMutation();
    const navigate = useNavigate();
    const { id } = useParams()

    // const [searchTools] = useLazyGetToolsOptionsQuery();
    // const loadModules = async (search) => {
    //     const result = await searchTools({ group: 'module', search });
    //     return result.data.tools4_msp_options;
    // }

    // const [searchDomains] = useLazyGetDomainAreaQuery();
    // const loadDomains = async (search) => {
    //     const result = await searchDomains('');
    //     return result.data.data;
    // }

    const [searchOrigins] = useLazyGetOriginsQuery();
    const loadOrigins = async (search) => {
        const result = await searchOrigins(search ? `?filter{name.startswith}=${search}&page_size=250` : '?page_size=250');
        return result.data.origins;
    }


    async function runCreate(values, helpers) {
        console.log(values)
        try {
            const result = await create({ 
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

    console.log(error, isError)

    return (
        <Container>
            <h1 className=''>Create Event</h1>

            {error && error.data && (
                <Alert variant="danger" animation={null} show transition={null}>
                    <h3 className='fw-bold'>{error.data.code}</h3>
                    <div className="ps-5">
                        
                        {/* {error.data.error.details.filter(d => d.target).map(d => <li key={d.target}>{d.target}: {d.descriptions.join('')}</li>)} */}
                    </div>
                </Alert>
            )}
            <Formik
                initialValues={{
                    is_aggregated: false,
                    coastalsegment: id,
                    origins: [],
                }}
                onSubmit={runCreate}
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
                        getOptionLabel={v => v.name}
                        getOptionValue={v => v.id}
                        isMulti
                    />
                    
                    <div className="mt-5">
                        <Button type='submit' size="lg" disabled={isLoading || !isValid }>Create</Button>
                    </div>
                </Form>
                )}
            </Formik>
        </Container>
    )
}