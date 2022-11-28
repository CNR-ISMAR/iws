import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import AsyncSelect from 'react-select/async';
import { useLazyGetGeonodeDocsQuery } from '../../services/geonode';

export default function AddDocument({ add }) {
    const [selected, setSelected] = useState(null);
    const [getDocs] = useLazyGetGeonodeDocsQuery()

    async function loadOptions(search) {
        try {
            const res = await getDocs(search ? `?filter{title.icontains}=${search}` : '' );
            return res.data.documents;
        } catch(e) {
            return [];
        }
    }

    return (
        <>
            <div className='d-flex mb-3'>
                <AsyncSelect
                    cacheOptions
                    loadOptions={loadOptions}
                    defaultOptions
                    styles={{ 
                        container: (provided) => ({ ...provided, width: '100%' }),
                    }}
                    value={selected}
                    onChange={setSelected}
                    getOptionLabel={d => d.title}
                    getOptionValue={d => d.id}
                    isClearable
                />
                <Button className="ms-3" disabled={!selected} onClick={() => add(selected.pk)}>
                    Add to effect
                </Button>
            </div>
            <hr />
        </>
    );
}
