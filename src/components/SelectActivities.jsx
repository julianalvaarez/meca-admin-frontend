import { Select, Space } from "antd"


const options = ['gimnasio', 'academia_futbol', 'boxeo', 'academia_padel'].map(item => ({ value: item, label: item }));

export const SelectActivities = ({ setNewActivities, defaultActivities }) => {
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
                        marginBottom: '20px',
                    }}
                    placeholder="Actividades"
                    onChange={handleChangeActivities}
                    options={options}
                    value={defaultActivities}
                    defaultValue={defaultActivities}
                />

            </Space>
        </>
    )
}
