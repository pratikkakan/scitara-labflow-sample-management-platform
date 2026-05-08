import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import InlineNotice from '../components/InlineNotice.jsx';
import PageHeader from '../components/PageHeader.jsx';
import SampleForm from '../components/SampleForm.jsx';
import { createSample } from '../services/sampleService.js';
import { createInitialSampleValues, validateSampleForm } from '../utils/sampleForm.js';

export default function CreateSamplePage() {
  const navigate = useNavigate();
  const [values, setValues] = useState(createInitialSampleValues());
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(name, value) {
    setValues((currentValues) => ({
      ...currentValues,
      [name]: value,
    }));

    setErrors((currentErrors) => {
      if (!currentErrors[name]) {
        return currentErrors;
      }

      const nextErrors = { ...currentErrors };
      delete nextErrors[name];
      return nextErrors;
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const validationErrors = validateSampleForm(values);

    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    try {
      setIsSubmitting(true);
      setFormError('');

      const payload = {
        id: values.id.trim(),
        sampleName: values.sampleName.trim(),
        scientist: values.scientist.trim(),
        status: 'Pending',
      };

      if (!payload.id) {
        delete payload.id;
      }

      const newSample = await createSample(payload);

      navigate('/samples', {
        replace: true,
        state: {
          notice: {
            type: 'success',
            message: `${newSample.sampleName} was created and added to the pending queue.`,
          },
        },
      });
    } catch (error) {
      setFormError(error.message ?? 'Unable to save the sample.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="stack">
      <PageHeader
        eyebrow="Create Sample"
        title="Register a New Sample"
        description="Capture the essentials quickly and send the sample into the pending queue for the team."
        actions={
          <Link className="button secondary" to="/samples">
            Back to Dashboard
          </Link>
        }
      />

      <section className="panel form-panel">
        <div className="panel-header">
          <div>
            <p className="eyebrow">New Entry</p>
            <h3>Create Sample Form</h3>
            <p className="panel-description">
              Required fields are kept intentionally short so technicians can register
              work without friction.
            </p>
          </div>
        </div>

        {formError ? <InlineNotice message={formError} type="error" /> : null}

        <SampleForm
          errors={errors}
          isSubmitting={isSubmitting}
          onCancel={() => navigate('/samples')}
          onChange={handleChange}
          onSubmit={handleSubmit}
          values={values}
        />
      </section>
    </div>
  );
}
