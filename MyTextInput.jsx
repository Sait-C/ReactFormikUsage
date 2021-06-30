import { useField } from 'formik'
import React from 'react'
import { FormField, Label } from 'semantic-ui-react'

export default function MyTextInput({...props}) {//name, placeholder etc.
    //console.log(props)
    //reflect api ile bunu yapar
    const [field, meta] = useField(props)    //ilgili input elemanınızla ilgili bilgi toplayabilmenizi saglar
    
    //console.log(field)
    //!! bu operator string bir ifadeyi true false boolean olarak kullanmayi saglar yani bos mu var mı
    return (
        <div>
            <FormField error={meta.touched && !!meta.error}> 
                <input {...field} {...props}/>
                {meta.touched && !!meta.error ? (
                    <Label pointing basic color="red" content={meta.error}></Label>
                ): null}
            </FormField>
        </div>
    )
}
