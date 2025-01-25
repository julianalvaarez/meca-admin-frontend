import { Select, Space } from "antd"


const options = ['gimnasio', 'academia_futbol', 'boxeo', 'academia_padel'].map(item => ({ value: item, label: item }));

export const SelectActivities = ({ setNewActivities, defaultActivities, newCategoryPadel, setNewCategoryPadel }) => {
    const handleChangeActivities = (value) => {
        setNewActivities([...value]);
    };

    return (
        <>
            <Space
                style={{
                    width: '100%',
                }}
                direction="vertical"
            >
                <Select
                    mode="multiple"
                    allowClear
                    style={{
                        width: '100%',
                    }}
                    placeholder="Actividades"
                    onChange={handleChangeActivities}
                    options={options}
                    value={defaultActivities}
                    defaultValue={defaultActivities}
                />

            </Space>
            <Space style={{ width: '100%' }} direction="vertical">
                <Select
                    value={newCategoryPadel}
                    defaultValue={newCategoryPadel}
                    onChange={(value) => setNewCategoryPadel(value)}
                    style={{ width: '100%', marginBottom: '10px' }}
                    options={[
                        { value: 'octava', label: '8va' },
                        { value: 'septima', label: '7ma' },
                        { value: 'sexta', label: '6ta' },
                        { value: 'quinta', label: '5ta' },
                        { value: 'cuarta', label: '4ta' },
                        { value: 'tercera', label: '3ra' },
                        { value: 'segunda', label: '2da' },
                        { value: 'primera', label: '1ra' },
                    ]}
                />
            </Space>
        </>
    )
}
