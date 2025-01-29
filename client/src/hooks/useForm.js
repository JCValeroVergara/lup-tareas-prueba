
import { useEffect, useMemo, useState } from 'react';

export const useForm = (initialForm = {}, formValidations={} ) => {
    
    const [formState, setFormState] = useState(initialForm);
    const [formValidation, setFormValidation] = useState({});

    useEffect(() => {
        createValidators();
    }, [formState]);

    useEffect(() => {
        setFormState(initialForm);
    }, [initialForm]);

    const isFormValid = useMemo(() => {
        for (const formValue of Object.values(formValidation)) {
            if (formValue !== null) return false;
        }
        return true;

    }, [formValidation]);

    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setFormState((prev) => ({
            ...prev,
            [name]: value,
        }));

    };

    const onResetForm = () => {
        setFormState(initialForm);
        createValidators();
    };

    const createValidators = () => {

        const formCheckedValues = {};
        for (const formField of Object.keys(formValidations)) {
            const [fn, errorMesssage] = formValidations[formField];
            
            formCheckedValues[`${formField}Valid`] = fn(formState[formField]) ? null : errorMesssage;
        }

        setFormValidation(formCheckedValues);

    }

    return {
        ...formState,
        formState,
        onInputChange,
        onResetForm,

        ...formValidation,
        isFormValid,
    };
};
