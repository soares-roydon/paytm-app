import React from 'react'

const InputBox = ({type, placeholder, onChange}: {
    type: string,
    placeholder: string,
    onChange: (e: any) => void
}) => {
  return (
    <input type={type} placeholder={placeholder} className="border rounded-md border-zinc-300 px-2 py-2 text-sm outline-zinc-500" onChange={onChange}/>
)
}

export default InputBox