import React from 'react';
import { Button, Container, Form, Alert } from 'react-bootstrap';
import { Formik } from 'formik';
import { useCreateEffectMutation, useGetEventQuery, useLazyGetCategoriesQuery } from '../../../services/seastorm';
import FormTextField from '../../../components/FormTextField';
import SelectField from '../../../components/SelectField';
import { Link, useNavigate, useParams } from 'react-router-dom';
import DateField from '../../../components/DateField';
import EffectMapField from '../../../components/EffectMapField';

var countDecimals = function (value) { 
    if ((value % 1) != 0) 
        return value.toString().split(".")[1].length;  
    return 0;
};

const FORM_VALIDATION = values => {
    const errors = {}
    if (values && !values.geom) {
        errors.geom = 'Required'
    }
    if (values && values.flooding_level) {
        if (values.flooding_level >= 100) {
            errors.flooding_level = 'Must be lower than 100'
        }

        if (countDecimals(values.flooding_level) > 2) {
            errors.flooding_level = 'Max 2 decimals'
        }
    }
    return errors
}


export default function CreateEffect() {
    const [create, { isLoading: isCreating, error }] = useCreateEffectMutation();
    const navigate = useNavigate();
    const { id } = useParams();
    const { data, isLoading } = useGetEventQuery({ id, params: '?include[]=coastalsegment.geom' });


    const [searchCategories] = useLazyGetCategoriesQuery();
    const loadCategories = async (search) => {
        const result = await searchCategories(search ? `?filter{name.startswith}=${search}&page_size=250` : '?page_size=250');
        return result.data.damage_categories;
    }


    async function runCreate(values, helpers) {
        console.log(values)
        try {
            const result = await create({ 
                ...values,
                damage_categories: values.damage_categories.map(o => o.id)
            })
            console.log(result)
            if (result.data) {
                navigate(`/sea_storm_atlas/events/${id}/`);
            }
        } catch(e) {
            console.error(e)
        }
    }

    return (
        <Container>
            <h1 className=''>Create Effect</h1>

            {error && error.data && (
                <Alert variant="danger" animation={null} show transition={null}>
                    <h5 className='fw-bold'>{error.data.code}</h5>
                    <div className="ps-5">
                        <ul>
                            {error.data.errors.map(e => <li>{e}</li>)}
                        </ul>
                    </div>
                </Alert>
            )}
            {!isLoading && (
                <Formik
                    initialValues={{
                        event: id,
                        damage_categories: [],
                        date: data.storm_event_entry.date_start,
                    }}
                    onSubmit={runCreate}
                    validate={FORM_VALIDATION}
                >
                    {({ handleSubmit, isValid }) => (
                    <Form noValidate onSubmit={handleSubmit}>
                        <EffectMapField
                            name="geom"
                            label="Position"
                            segment={data.storm_event_entry.coastalsegment.geom}
                            extent={data.storm_event_entry.coastalsegment.geom.bbox}
                        />
                        <FormTextField 
                            name="description"
                            label="Description"
                            controlAs="textarea"
                        />
                        <FormTextField 
                            name="flooding_level"
                            label="Flooding level"
                            type="number"
                        />
                        <FormTextField 
                            name="damage"
                            label="Damage (€)"
                            type="number"
                        />
                        <DateField 
                            name="date"
                            label="Date"
                        />
                        <SelectField
                            name="damage_categories"
                            label="Damage Categories"
                            defaultOptions
                            loadOptions={loadCategories}
                            getOptionLabel={v => v.name}
                            getOptionValue={v => v.id}
                            isMulti
                        />
                        <div className="mt-5">
                            <Button type='submit'disabled={isCreating || !isValid }>Create</Button>
                            <Button as={Link} to={`/sea_storm_atlas/events/${id}/`} className="ms-2" variant="default">Back</Button>
                        </div>
                    </Form>
                    )}
                </Formik>
            )}
        </Container>
    )
}