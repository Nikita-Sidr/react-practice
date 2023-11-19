import React, { useState } from 'react'

const Input = () => {
    const [value, setValue] = useState('Текст')
    return (
        <div>
            <div>
                <h1>{value}</h1>
                <input
                    type="text"
                    value={value}
                    onChange={event => setValue(event.target.value)}
                />
            </div>
        </div>
    )
}

export default Input


