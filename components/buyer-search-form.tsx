// @COMMENT: Probably better named as ListingSearchForm
// I also realize it's not conventional to use snake-casing for file names in React
import { useState } from 'react';
import useForm, { FormContext, useFormContext } from 'react-hook-form';
import styled from 'styled-components';

import { objectIsEmpty } from '../functions/object-is-empty';
import { wait } from '../functions/wait';
import { Input } from './forms/input';
import { Incrementer } from './forms/incrementer';
import { FormError } from './forms/form-error';
import { Button } from './elements/button';
import { BuyerSearch } from '../types/buyer-search.type';
import { Loader } from './elements/loader'
import { Label } from './forms/label';
import { Fieldset } from './forms/Fieldset';

const Row = styled.div`
  display: flex;
  align-items: center;

  *:first-child {
    margin-right: 0.5rem;
  }
`;

const FormFieldContainer = styled.div`
  margin-bottom: 1rem;
`;

// @COMMENT: In the interest of time, I'm using react-hook-form.
// For a real (and bigger app), I might instead consider something more mature like redux-forms
// react-hook-form takes care of focusing error inputs on submit, error validadtion, and error strategy
const AdvancedSearchForm = () => {
  const { register, errors, formState, getValues, triggerValidation } = useFormContext<BuyerSearch>();
  const minValidators = (maxProp: keyof BuyerSearch) => ({
    // if min and max exists, min must be smaller than max
    // @COMMENT: I would normally move validator functions to another file and unit test it had I the time
    validate: (value: number) => {
      const maxValue = getValues()[maxProp];
      return (!value || !maxValue || value < Number(maxValue));
    }
  });

  return (
    <section>
      <FormFieldContainer>
        <Label id="bathroom">Bathrooms</Label>
        <Incrementer name="bathrooms" min={1} />
      </FormFieldContainer>

      <FormFieldContainer>
        <Label id="area-range-label">Square feet</Label>

        <Row>
          <Input
            ref={register(minValidators('maxArea'))}
            type="number"
            name="minArea"
            aria-label="Minimum area"
            placeholder="Min"
          />
          <Input
            ref={register}
            type="number"
            name="maxArea"
            placeholder="Max"
            aria-label="Maximum area"
            onChange={() => formState.isSubmitted && triggerValidation({ name: 'minPrice' })}
          />
        </Row>

        {errors.minArea && <FormError>Min needs to be greater than max</FormError>}
      </FormFieldContainer>

      <FormFieldContainer>
        <Label id="price-range-label">Price</Label>

        <Row>
          <Input
            ref={register(minValidators('maxPrice'))}
            type="number"
            aria-label="Minimum price"
            name="minPrice"
            placeholder="Min $"
          />
          <Input
            ref={register}
            type="number"
            aria-label="Maximum price"
            name="maxPrice"
            placeholder="Max $"
            onChange={() => formState.isSubmitted && triggerValidation({ name: 'minPrice' })}
          />
        </Row>

        {errors.minPrice && <FormError>Min needs to be greater than max</FormError>}
      </FormFieldContainer>

      <Button type="submit">Search</Button>
    </section>
  );
}

const AdvancedSearchButton = styled.button`
  border: 0;
  cursor: pointer;
  color: blue;
  margin-bottom: 0.5rem;
`;

// @COMMENT: This would normally be a redux dispatch
async function getListings() {
  await wait(1000);

  throw new Error('Something is wrong with the server. Try again later.');
}

const hasErrors = (errors: any) => !objectIsEmpty(errors);

const BuyerSearchForm = () => {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [loading, setLoading] = useState(false);

  const methods = useForm();
  const { register, handleSubmit, errors } = methods;

  // @COMMENT: Aside from form validation functions, everything else is mostly simple form setup.
  // The onSubmit would be the only other worthwhile thing to test.
  // I would need to mock out the getListings() function, test loading, success, and error states
  function onSubmit(form: BuyerSearch) {
    if (hasErrors(errors)) {
      // resolve errors shown in error validation before continuing
      return;
    }

    setLoading(true);

    getListings().catch(error => {
      setLoading(false);
      alert(error);
    });
  }

  return (
    <Loader loading={loading}>
      <FormContext {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Fieldset disabled={loading}>
            <section>
              <FormFieldContainer>
                <Row>
                  <Input type="text" name="address" aria-label="Search" placeholder="Enter an address..." ref={register} />
                  <Button type="submit">Search</Button>
                </Row>
              </FormFieldContainer>
            </section>

            <AdvancedSearchButton type="button" aria-expanded={showAdvanced} onClick={() => setShowAdvanced(!showAdvanced)}>
              { showAdvanced ? 'show less ✕' : 'show more' }
            </AdvancedSearchButton>

            { showAdvanced && <AdvancedSearchForm /> }
          </Fieldset>
        </form>
      </FormContext>
    </Loader>
  );
};

export default BuyerSearchForm;
